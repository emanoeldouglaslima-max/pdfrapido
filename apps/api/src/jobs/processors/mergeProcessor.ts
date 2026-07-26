import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { mergePdfs } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processMerge(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName } = job.data;
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'unificado.pdf');

  await job.progress(10);
  await mergePdfs(inputPath as string[], outputPath);
  await job.progress(100);

  const firstOriginal = Array.isArray(originalName) ? originalName[0] : originalName;
  const downloadName = buildDownloadFilename(firstOriginal, 'pdf_unificado', 'unificado', '.pdf');

  saveOutputMeta(jobId, {
    downloadName,
    mimeType: 'application/pdf',
  });

  return { outputFiles: [outputPath] };
}
