import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { compressPdf, CompressionLevel } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processCompress(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, options } = job.data;
  const level = (options?.level as CompressionLevel) || 'medio';
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'comprimido.pdf');

  await job.progress(10);
  const meta = await compressPdf(inputPath as string, outputPath, level);
  await job.progress(100);

  return { outputFiles: [outputPath], meta };
}
