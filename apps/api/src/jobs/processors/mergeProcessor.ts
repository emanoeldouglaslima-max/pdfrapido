import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { mergePdfs } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processMerge(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath } = job.data;
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'unificado.pdf');

  await job.progress(10);
  await mergePdfs(inputPath as string[], outputPath);
  await job.progress(100);

  return { outputFiles: [outputPath] };
}
