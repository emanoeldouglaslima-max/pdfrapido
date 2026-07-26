import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { upload, uploadMedia } from '../middleware/upload';
import { fileValidator } from '../middleware/fileValidator';
import { toolRateLimiter } from '../middleware/rateLimiter';
import { addJob, getJobStatus } from '../services/jobQueue';
import { saveInputFile, saveInputFiles, listOutputFiles, outputExists, getOutputMeta } from '../services/tempStorage';
import { getTodayStats } from '../services/stats';
import { generateJobId, sanitizeFilename, getDownloadContentDisposition, getMimeType } from '../utils/fileNamer';
import { AppError } from '../utils/errorCodes';

const router = Router();

// ─── Helper: enfileirar job e responder ──────────────────────────────────────
async function enqueueJob(
  type: Parameters<typeof addJob>[0]['type'],
  jobId: string,
  inputPath: string | string[],
  options?: Record<string, unknown>,
  originalName?: string | string[]
) {
  await addJob({ jobId, type, inputPath, originalName, options });
  return { jobId, status: 'queued', pollUrl: `/api/status/${jobId}` };
}

// ── POST /api/compress ────────────────────────────────────────────────────────
router.post(
  '/compress',
  toolRateLimiter,
  upload.single('file'),
  fileValidator(['pdf']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const filename = sanitizeFilename(originalName);
      const inputPath = await saveInputFile(jobId, filename, req.file!.buffer);
      const level = (req.body.level as string) || 'medio';
      res.json(await enqueueJob('compress', jobId, inputPath, { level }, originalName));
    } catch (err) { next(err); }
  }
);

// ── POST /api/pdf-to-word ─────────────────────────────────────────────────────
router.post(
  '/pdf-to-word',
  toolRateLimiter,
  upload.single('file'),
  fileValidator(['pdf']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const inputPath = await saveInputFile(jobId, sanitizeFilename(originalName), req.file!.buffer);
      res.json(await enqueueJob('pdf-to-word', jobId, inputPath, undefined, originalName));
    } catch (err) { next(err); }
  }
);

// ── POST /api/pdf-to-jpg ──────────────────────────────────────────────────────
router.post(
  '/pdf-to-jpg',
  toolRateLimiter,
  upload.single('file'),
  fileValidator(['pdf']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const inputPath = await saveInputFile(jobId, sanitizeFilename(originalName), req.file!.buffer);
      const dpi = req.body.dpi === '300' ? 300 : 150;
      res.json(await enqueueJob('pdf-to-jpg', jobId, inputPath, { dpi }, originalName));
    } catch (err) { next(err); }
  }
);

// ── POST /api/word-to-pdf ─────────────────────────────────────────────────────
router.post(
  '/word-to-pdf',
  toolRateLimiter,
  upload.single('file'),
  fileValidator(['word']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const inputPath = await saveInputFile(jobId, sanitizeFilename(originalName), req.file!.buffer);
      res.json(await enqueueJob('word-to-pdf', jobId, inputPath, undefined, originalName));
    } catch (err) { next(err); }
  }
);

// ── POST /api/jpg-to-pdf ──────────────────────────────────────────────────────
router.post(
  '/jpg-to-pdf',
  toolRateLimiter,
  upload.array('files', 20),
  fileValidator(['image']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const uploadedFiles = req.files as Express.Multer.File[];
      const originalNames = uploadedFiles.map((f) => f.originalname);
      const files = uploadedFiles.map((f, i) => ({
        filename: `img_${i + 1}${path.extname(f.originalname)}`,
        buffer: f.buffer,
      }));
      const inputPaths = await saveInputFiles(jobId, files);
      const orientation = req.body.orientation || 'portrait';
      res.json(await enqueueJob('jpg-to-pdf', jobId, inputPaths, { orientation }, originalNames));
    } catch (err) { next(err); }
  }
);

// ── POST /api/merge ───────────────────────────────────────────────────────────
router.post(
  '/merge',
  toolRateLimiter,
  upload.array('files', 20),
  fileValidator(['pdf']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadedFiles = req.files as Express.Multer.File[];
      if (!uploadedFiles || uploadedFiles.length < 2) {
        throw new AppError('FILE_MISSING', 400, 'Envie pelo menos 2 PDFs para juntar');
      }
      const jobId = generateJobId();
      const originalNames = uploadedFiles.map((f) => f.originalname);
      const files = uploadedFiles.map((f, i) => ({
        filename: `doc_${i + 1}.pdf`,
        buffer: f.buffer,
      }));
      const inputPaths = await saveInputFiles(jobId, files);
      res.json(await enqueueJob('merge', jobId, inputPaths, undefined, originalNames));
    } catch (err) { next(err); }
  }
);

// ── POST /api/split ───────────────────────────────────────────────────────────
router.post(
  '/split',
  toolRateLimiter,
  upload.single('file'),
  fileValidator(['pdf']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const inputPath = await saveInputFile(jobId, sanitizeFilename(originalName), req.file!.buffer);

      // Montar objeto split baseado nos parâmetros enviados
      let split;
      const mode = req.body.mode as string;
      if (mode === 'single') {
        split = { mode: 'single', page: Number(req.body.page) };
      } else if (mode === 'range') {
        split = { mode: 'range', from: Number(req.body.from), to: Number(req.body.to) };
      } else {
        split = { mode: 'every', pages: Number(req.body.pages) || 1 };
      }

      res.json(await enqueueJob('split', jobId, inputPath, { split }, originalName));
    } catch (err) { next(err); }
  }
);

// ── GET /api/status/:jobId ────────────────────────────────────────────────────
router.get('/status/:jobId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (status.status === 'not_found') {
      // Verificar se o output existe (job pode ter sido removido da fila mas arquivo ainda existe)
      if (outputExists(jobId)) {
        const files = listOutputFiles(jobId);
        return res.json({
          status: 'done',
          downloadUrl: `/api/download/${jobId}`,
          files: files.map((f) => path.basename(f)),
        });
      }
      throw new AppError('JOB_NOT_FOUND', 404);
    }

    if (status.status === 'done') {
      return res.json({
        status: 'done',
        downloadUrl: `/api/download/${jobId}`,
        meta: status.result?.meta,
      });
    }

    return res.json({
      status: status.status,
      progress: status.progress ?? 0,
      error: status.error,
    });
  } catch (err) { next(err); }
});

// ── GET /api/download/:jobId ──────────────────────────────────────────────────
router.get('/download/:jobId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;

    if (!outputExists(jobId)) {
      throw new AppError('JOB_EXPIRED', 410);
    }

    const files = listOutputFiles(jobId);
    if (files.length === 0) throw new AppError('JOB_NOT_FOUND', 404);

    const filePath = files[0];
    const meta = getOutputMeta(jobId);
    const downloadFilename = meta?.downloadName || path.basename(filePath);
    const mimeType = meta?.mimeType || getMimeType(downloadFilename);

    res.setHeader('Content-Disposition', getDownloadContentDisposition(downloadFilename));
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    res.sendFile(filePath);
  } catch (err) { next(err); }
});

// ── POST /api/transcribe ──────────────────────────────────────────────────────
router.post(
  '/transcribe',
  toolRateLimiter,
  uploadMedia.single('file'),
  fileValidator(['media']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = generateJobId();
      const originalName = req.file!.originalname;
      const inputPath = await saveInputFile(jobId, sanitizeFilename(originalName), req.file!.buffer);
      const language = (req.body.language as string) || 'pt';
      res.json(await enqueueJob('transcribe', jobId, inputPath, { language }, originalName));
    } catch (err) { next(err); }
  }
);

// ── GET /api/transcribe/result/:jobId ─────────────────────────────────────────
router.get('/transcribe/result/:jobId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (status.status === 'not_found') {
      // Verificar se o resultado existe em disco
      if (outputExists(jobId)) {
        const files = listOutputFiles(jobId);
        const jsonFile = files.find((f) => f.endsWith('result.json'));
        if (jsonFile) {
          const resultData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
          return res.json({ status: 'done', data: resultData });
        }
      }
      throw new AppError('JOB_NOT_FOUND', 404);
    }

    if (status.status === 'done') {
      // Retornar resultado diretamente do meta do job
      return res.json({
        status: 'done',
        data: status.result?.meta || {},
      });
    }

    return res.json({
      status: status.status,
      progress: status.progress ?? 0,
      error: status.error,
    });
  } catch (err) { next(err); }
});

// ── GET /api/stats ─────────────────────────────────────────────────────────────
router.get('/stats', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await getTodayStats();
    res.json(stats);
  } catch (err) { next(err); }
});

export default router;
