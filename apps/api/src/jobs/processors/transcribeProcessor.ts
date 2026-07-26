import { Job } from 'bull';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { processTranscription, TranscriptionResult } from '../../services/transcriptionService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';
import { logger } from '../../middleware/logger';

export async function processTranscribe(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName, options } = job.data;
  const language = (options?.language as string) || 'pt';
  const input = Array.isArray(inputPath) ? inputPath[0] : inputPath;
  const origName = Array.isArray(originalName) ? originalName[0] : originalName;

  const outputDir = createOutputDir(jobId);

  await job.progress(10);
  logger.info('Iniciando transcrição', { jobId, language, file: origName });

  // Processar transcrição completa
  await job.progress(20);
  const result: TranscriptionResult = await processTranscription(input, language, outputDir);

  await job.progress(90);

  // Salvar metadados para download
  const downloadName = buildDownloadFilename(origName, 'transcricao', undefined, '.json');
  saveOutputMeta(jobId, {
    downloadName,
    originalName: origName,
    mimeType: 'application/json',
  });

  await job.progress(100);

  return {
    outputFiles: [
      `${outputDir}/result.json`,
      `${outputDir}/transcricao.txt`,
      `${outputDir}/legendas.srt`,
    ],
    meta: {
      transcript: result.transcript,
      wordCount: result.wordCount,
      duration: result.duration,
      subtitles: result.subtitles,
      summary: result.summary,
    },
  };
}
