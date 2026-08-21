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
  segments?: TranscriptionSegment[];
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

// ── Transcrever áudio com Google Gemini 2.5 Flash ────────────────────────────
export async function transcribeWithGemini(
  audioPath: string,
  language: string = 'pt'
): Promise<{ text: string; segments: TranscriptionSegment[]; summary?: string[] }> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) throw new Error('GEMINI_API_KEY não configurada');

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: geminiKey });
  const audioBuffer = await fs.promises.readFile(audioPath);
  const base64Audio = audioBuffer.toString('base64');

  logger.info('Enviando áudio para Google Gemini 2.5 Flash...', {
    file: path.basename(audioPath),
    sizeMB: (audioBuffer.length / (1024 * 1024)).toFixed(2),
  });

  const prompt = `Você é um motor profissional de transcrição de áudio e inteligência artificial de última geração.
Analise com precisão o áudio anexado e faça a transcrição completa no idioma falado (preferencialmente ${language}).
Gere a transcrição fiel, com segmentação temporal e um resumo conciso.

Retorne OBRIGATORIAMENTE um JSON válido com esta estrutura exata:
{
  "transcript": "Transcrição completa e contínua de todo o áudio com pontuação adequada.",
  "summary": [
    "Resumo dos pontos centrais abordados no áudio",
    "Segundo ponto de destaque ou conclusão"
  ],
  "segments": [
    {
      "start": 0.0,
      "end": 4.5,
      "text": "Frase falada neste intervalo de tempo..."
    }
  ]
}`;

  const ext = path.extname(audioPath).toLowerCase();
  const mimeType = ext === '.wav' ? 'audio/wav' : ext === '.ogg' ? 'audio/ogg' : 'audio/mp3';

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64Audio,
        },
      },
      {
        text: prompt,
      },
    ],
    config: {
      responseMimeType: 'application/json',
    },
  });

  const responseText = response.text || '{}';
  const cleanJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
  let parsed: any = {};
  try {
    parsed = JSON.parse(cleanJson);
  } catch {
    parsed = { transcript: responseText, summary: [], segments: [] };
  }

  const text = parsed.transcript || responseText || '';
  const summary = parsed.summary || [];
  let segments: TranscriptionSegment[] = (parsed.segments || []).map((s: any) => ({
    start: Number(s.start) || 0,
    end: Number(s.end) || 0,
    text: String(s.text || '').trim(),
  }));

  if (segments.length === 0 && text) {
    segments = [{ start: 0, end: 10, text }];
  }

  logger.info('Transcrição com Gemini 2.5 Flash concluída', {
    wordCount: text.split(/\s+/).length,
    segments: segments.length,
  });

  return { text, segments, summary };
}

// ── Transcrever áudio com Whisper API (OpenAI ou Groq) ou Gemini ─────────────
export async function transcribeAudio(
  audioPath: string,
  language: string = 'pt'
): Promise<{ text: string; segments: TranscriptionSegment[]; summary?: string[] }> {
  // 1. Se GEMINI_API_KEY estiver configurada, usa o Gemini 2.5 Flash
  if (process.env.GEMINI_API_KEY) {
    try {
      return await transcribeWithGemini(audioPath, language);
    } catch (err) {
      logger.error('Erro na transcrição com Gemini 2.5 Flash:', { error: (err as Error).message });
      if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
        throw new Error(`Erro no Gemini 2.5 Flash: ${(err as Error).message}`);
      }
      logger.info('Tentando fallback para OpenAI/Groq...');
    }
  }

  // 2. Fallback para OpenAI ou Groq Whisper
  const openaiKey = process.env.OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  if (!openaiKey && !groqKey && !process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY não configurada nas variáveis de ambiente do servidor Render.');
  }

  const isGroq = !openaiKey && !!groqKey;
  const apiKey = (openaiKey || groqKey) as string;

  const openai = new OpenAI({
    apiKey,
    ...(isGroq ? { baseURL: 'https://api.groq.com/openai/v1' } : {}),
  });

  const model = isGroq ? 'whisper-large-v3' : 'whisper-1';

  logger.info('Enviando áudio para Whisper API...', {
    provider: isGroq ? 'Groq (Whisper V3)' : 'OpenAI (Whisper-1)',
    file: path.basename(audioPath),
    language,
  });

  // Obter transcrição com timestamps (verbose_json retorna segmentos)
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model,
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
  let durationSec = await getAudioDuration(audioPath);

  // 3. Transcrever com Gemini ou Whisper
  logger.info('Passo 2/3: Transcrevendo com IA...', { durationSec });
  const transcription = await transcribeAudio(audioPath, language);
  const text = transcription.text;
  const segments = transcription.segments;

  // Se a duração via ffprobe for 0, calcula automaticamente através do último segmento temporal da IA
  if ((!durationSec || durationSec === 0) && segments.length > 0) {
    const lastSeg = segments[segments.length - 1];
    durationSec = Math.ceil(lastSeg.end || lastSeg.start || 0);
  }

  // 4. Gerar outputs
  logger.info('Passo 3/3: Formatando resultados...', { calculatedDurationSec: durationSec });
  const subtitles = generateSubtitles(segments);
  const summary = transcription.summary && transcription.summary.length > 0
    ? transcription.summary
    : generateSummary(text);
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
    segments,
  };
  fs.writeFileSync(path.join(outputDir, 'result.json'), JSON.stringify(result, null, 2), 'utf-8');

  // 8. Limpar áudio temporário
  try { fs.unlinkSync(audioPath); } catch { /* ok */ }

  return result;
}
