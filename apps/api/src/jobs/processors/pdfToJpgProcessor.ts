import { Job } from 'bull';
import path from 'path';
import fs from 'fs';
import { JobPayload, JobResult } from '../../services/jobQueue';
import { pdfToJpg, zipFiles } from '../../services/pdfService';
import { createOutputDir, saveOutputMeta } from '../../services/tempStorage';
import { buildDownloadFilename } from '../../utils/fileNamer';

export async function processPdfToJpg(job: Job<JobPayload>): Promise<JobResult> {
  const { jobId, inputPath, originalName, options } = job.data;
  const dpi = (options?.dpi as 150 | 300) || 150;
  const outputDir = createOutputDir(jobId);

  await job.progress(10);
  const files = await pdfToJpg(inputPath as string, outputDir, dpi);
  await job.progress(80);

  // Se mais de 1 página, zipar
  let finalFiles = files;
  let downloadName = '';
  let mimeType = 'image/jpeg';

  if (files.length > 1) {
    const zipPath = path.join(outputDir, 'imagens.zip');
    await zipFiles(files, zipPath);
    files.forEach((f) => { try { fs.unlinkSync(f); } catch {} });
    finalFiles = [zipPath];
    downloadName = buildDownloadFilename(originalName as string, 'imagens', 'imagens', '.zip');
    mimeType = 'application/zip';
  } else {
    downloadName = buildDownloadFilename(originalName as string, 'pagina_1', undefined, '.jpg');
  }

  saveOutputMeta(jobId, { downloadName, mimeType });

  await job.progress(100);
  return { outputFiles: finalFiles, meta: { pageCount: files.length } };
}
