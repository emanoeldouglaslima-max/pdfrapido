import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { compressPdf, CompressionLevel } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processCompress(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName, options } = job.data;
  const level = (options?.level as CompressionLevel) || 'medio';
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'comprimido.pdf');

  await job.progress(10);
  const meta = await compressPdf(inputPath as string, outputPath, level);
  await job.progress(100);

  const downloadName = buildDownloadFilename(originalName as string, 'comprimido', 'comprimido', '.pdf');
  saveOutputMeta(jobId, { downloadName, originalName: originalName as string, mimeType: 'application/pdf' });

  return { outputFiles: [outputPath], meta };
}
