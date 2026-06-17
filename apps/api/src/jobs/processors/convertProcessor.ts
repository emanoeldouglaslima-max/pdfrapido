import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { pdfToWord } from '../../services/pdfService';
import { createOutputDir } from '../../services/tempStorage';

export async function processConvert(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath } = job.data;
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'documento.docx');

  await job.progress(10);
  await pdfToWord(inputPath as string, outputPath);
  await job.progress(100);

  return { outputFiles: [outputPath] };
}
