import { Job } from 'bull';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { wordToPdf } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processWordToPdf(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName } = job.data;
  const outputDir = createOutputDir(jobId);

  await job.progress(10);
  const outputPath = await wordToPdf(inputPath as string, outputDir);
  await job.progress(100);

  const downloadName = buildDownloadFilename(originalName as string, 'documento', undefined, '.pdf');
  saveOutputMeta(jobId, {
    downloadName,
    originalName: originalName as string,
    mimeType: 'application/pdf',
  });

  return { outputFiles: [outputPath] };
}
