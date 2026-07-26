import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { logger } from '../middleware/logger';

// Configura FFmpeg com binário estático
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResult {
  transcript: string;
  wordCount: number;
  duration: string;
  subtitles: { time: string; text: string }[];
  summary: string[];
}

// ── Extrair áudio de vídeo/áudio → MP3 mono 16kHz ────────────────────────────
export function extractAudio(inputPath: string, outputDir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, 'audio.mp3');

    ffmpeg(inputPath)
      .noVideo()
      .audioCodec('libmp3lame')
      .audioChannels(1)        // Mono (Whisper trabalha melhor)
      .audioFrequency(16000)   // 16kHz (nativo do Whisper)
      .audioBitrate('64k')     // 64kbps (sweet spot para fala)
      .on('start', (cmd) => {
        logger.debug('FFmpeg iniciado', { command: cmd });
      })
      .on('error', (err) => {
        logger.error('Erro no FFmpeg ao extrair áudio', { error: err.message });
        reject(new Error(`Falha ao extrair áudio: ${err.message}`));
      })
      .on('end', () => {
        logger.info('Áudio extraído com sucesso', { output: outputPath });
        resolve(outputPath);
      })
      .save(outputPath);
  });
}

// ── Obter duração do áudio via FFprobe ────────────────────────────────────────
export function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        logger.warn('Erro ao obter duração do áudio', { error: err.message });
        resolve(0);
        return;
      }
      const duration = metadata.format.duration || 0;
      resolve(Math.round(duration));
    });
  });
}

// ── Formatar segundos para MM:SS ──────────────────────────────────────────────
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// ── Formatar segundos para timestamp SRT (HH:MM:SS,mmm) ──────────────────────
function formatSrtTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  const ms = Math.round((totalSeconds % 1) * 1000).toString().padStart(3, '0');
  return `${hours}:${mins}:${secs},${ms}`;
}

// ── Transcrever áudio com Whisper API ─────────────────────────────────────────
export async function transcribeAudio(
  audioPath: string,
  language: string = 'pt'
): Promise<{ text: string; segments: TranscriptionSegment[] }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY não configurada no .env');
  }

  const openai = new OpenAI({ apiKey });

  logger.info('Enviando áudio para Whisper API...', {
    file: path.basename(audioPath),
    language,
  });

  // Obter transcrição com timestamps (verbose_json retorna segmentos)
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: 'whisper-1',
    language,
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
  });

  const text = (response as any).text || '';
  const rawSegments = (response as any).segments || [];

  const segments: TranscriptionSegment[] = rawSegments.map((seg: any) => ({
    start: seg.start || 0,
    end: seg.end || 0,
    text: (seg.text || '').trim(),
  }));

  logger.info('Transcrição concluída', {
    wordCount: text.split(/\s+/).length,
    segments: segments.length,
  });

  return { text, segments };
}

// ── Gerar conteúdo SRT a partir dos segmentos ─────────────────────────────────
export function generateSrt(segments: TranscriptionSegment[]): string {
  return segments
    .map((seg, i) => {
      const start = formatSrtTime(seg.start);
      const end = formatSrtTime(seg.end);
      return `${i + 1}\n${start} --> ${end}\n${seg.text}\n`;
    })
    .join('\n');
}

// ── Gerar legendas no formato do frontend ─────────────────────────────────────
export function generateSubtitles(segments: TranscriptionSegment[]): { time: string; text: string }[] {
  return segments.map((seg) => {
    const startMM = Math.floor(seg.start / 60).toString().padStart(2, '0');
    const startSS = Math.floor(seg.start % 60).toString().padStart(2, '0');
    const endMM = Math.floor(seg.end / 60).toString().padStart(2, '0');
    const endSS = Math.floor(seg.end % 60).toString().padStart(2, '0');
    return {
      time: `${startMM}:${startSS} → ${endMM}:${endSS}`,
      text: seg.text,
    };
  });
}

// ── Gerar resumo simples (top 3 sentenças mais longas) ────────────────────────
export function generateSummary(text: string): string[] {
  if (!text || text.trim().length === 0) return ['Sem conteúdo para resumir.'];

  // Dividir em sentenças
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length === 0) return [text.slice(0, 200)];

  // Pegar as 3 sentenças mais longas (geralmente contêm mais informação)
  const sorted = [...sentences].sort((a, b) => b.length - a.length);
  return sorted.slice(0, 3).map((s) => s + '.');
}

// ── Pipeline completa: extrair → transcrever → formatar ───────────────────────
export async function processTranscription(
  inputPath: string,
  language: string = 'pt',
  outputDir: string
): Promise<TranscriptionResult> {
  // 1. Extrair áudio do vídeo (ou otimizar áudio existente)
  logger.info('Passo 1/3: Extraindo áudio...', { inputPath });
  const audioPath = await extractAudio(inputPath, outputDir);

  // 2. Obter duração
  const durationSec = await getAudioDuration(audioPath);

  // 3. Transcrever com Whisper
  logger.info('Passo 2/3: Transcrevendo com Whisper...', { durationSec });
  const { text, segments } = await transcribeAudio(audioPath, language);

  // 4. Gerar outputs
  logger.info('Passo 3/3: Formatando resultados...');
  const subtitles = generateSubtitles(segments);
  const summary = generateSummary(text);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const duration = formatDuration(durationSec);

  // 5. Salvar SRT no outputDir
  const srtContent = generateSrt(segments);
  fs.writeFileSync(path.join(outputDir, 'legendas.srt'), srtContent, 'utf-8');

  // 6. Salvar texto completo no outputDir
  fs.writeFileSync(path.join(outputDir, 'transcricao.txt'), text, 'utf-8');

  // 7. Salvar resultado JSON no outputDir
  const result: TranscriptionResult = {
    transcript: text,
    wordCount,
    duration,
    subtitles,
    summary,
  };
  fs.writeFileSync(path.join(outputDir, 'result.json'), JSON.stringify(result, null, 2), 'utf-8');

  // 8. Limpar áudio temporário
  try { fs.unlinkSync(audioPath); } catch { /* ok */ }

  return result;
}
