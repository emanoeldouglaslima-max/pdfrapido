import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { splitPdf, SplitMode } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processSplit(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName, options } = job.data;
  const outputDir = createOutputDir(jobId);
  const splitMode = options?.split as SplitMode;

  await job.progress(10);
  const files = await splitPdf(inputPath as string, outputDir, splitMode);
  await job.progress(100);

  const isZip = files.length > 0 && files[0].endsWith('.zip');
  const suffix = isZip ? 'dividido' : 'extraido';
  const ext = isZip ? '.zip' : '.pdf';
  const downloadName = buildDownloadFilename(originalName as string, 'pdf_dividido', suffix, ext);

  saveOutputMeta(jobId, {
    downloadName,
    mimeType: isZip ? 'application/zip' : 'application/pdf',
  });

  return { outputFiles: files };
}
