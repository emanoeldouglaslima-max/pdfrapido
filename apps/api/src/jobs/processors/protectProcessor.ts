import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { protectPdf } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processProtect(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName, options } = job.data;
  const password = (options?.password as string) || '';
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'protegido.pdf');

  await job.progress(10);
  await protectPdf(inputPath as string, outputPath, password);
  await job.progress(100);

  const downloadName = buildDownloadFilename(originalName as string, 'protegido', 'protegido', '.pdf');
  saveOutputMeta(jobId, { downloadName, originalName: originalName as string, mimeType: 'application/pdf' });

  return { outputFiles: [outputPath] };
}
