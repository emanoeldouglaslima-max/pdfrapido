import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { imagesToPdf } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processJpgToPdf(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, options } = job.data;
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'documento.pdf');
  const orientation = (options?.orientation as 'portrait' | 'landscape') || 'portrait';

  await job.progress(10);
  await imagesToPdf(inputPath as string[], outputPath, orientation);
  await job.progress(100);

  return { outputFiles: [outputPath] };
}
