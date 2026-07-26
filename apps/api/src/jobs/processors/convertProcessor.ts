import { Job } from 'bull';
import path from 'path';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { pdfToWord } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processConvert(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName } = job.data;
  const outputDir = createOutputDir(jobId);
  const outputPath = path.join(outputDir, 'documento.docx');

  await job.progress(10);
  await pdfToWord(inputPath as string, outputPath);
  await job.progress(100);

  const downloadName = buildDownloadFilename(originalName as string, 'documento', undefined, '.docx');
  saveOutputMeta(jobId, {
    downloadName,
    originalName: originalName as string,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  return { outputFiles: [outputPath] };
}
