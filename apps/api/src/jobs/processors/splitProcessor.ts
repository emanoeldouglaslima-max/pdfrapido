import { Job } from 'bull';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { splitPdf, SplitMode } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processSplit(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, options } = job.data;
  const outputDir = createOutputDir(jobId);
  const splitMode = options?.split as SplitMode;

  await job.progress(10);
  const files = await splitPdf(inputPath as string, outputDir, splitMode);
  await job.progress(100);

  return { outputFiles: files };
}
