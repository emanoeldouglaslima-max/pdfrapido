import { Job } from 'bull';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { wordToPdf } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processWordToPdf(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath } = job.data;
  const outputDir = createOutputDir(jobId);

  await job.progress(10);
  const outputPath = await wordToPdf(inputPath as string, outputDir);
  await job.progress(100);

  return { outputFiles: [outputPath] };
}
