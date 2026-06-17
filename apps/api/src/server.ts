import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import os from 'os';
import fs from 'fs';
import cron from 'node-cron';

import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { globalRateLimiter } from './middleware/rateLimiter';
import routes from './routes/index';
import { initQueue } from './services/jobQueue';
import { cleanupOldFiles } from './services/tempStorage';
import { initFirebase } from './services/stats';

const app = express();
const PORT = process.env.PORT || 8080;

// ── Garantir diretórios temporários ────────────────────────────────────────────
const DIRS = [
  path.join(os.tmpdir(), 'pdfjobs'),
  path.join(os.tmpdir(), 'pdfoutput'),
];

DIRS.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Middlewares de segurança ──────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// ── Logging de requisições ────────────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// ── Rate limiting global ──────────────────────────────────────────────────────
app.use(globalRateLimiter);

// ── Rotas principais ──────────────────────────────────────────────────────────
app.use('/api', routes);

// ── Health check (para Cloud Run) ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Middleware de erro (deve ser o último) ────────────────────────────────────
app.use(errorHandler);

// ── Cron: limpar arquivos antigos a cada 30 minutos ───────────────────────────
cron.schedule('*/30 * * * *', () => {
  logger.info('Cron: iniciando limpeza de arquivos temporários...');
  cleanupOldFiles(30).catch((err) =>
    logger.error('Erro na limpeza de arquivos', { error: err.message })
  );
});

// ── Inicialização ─────────────────────────────────────────────────────────────
async function bootstrap() {
  try {
    // Inicializar Firebase
    initFirebase();
    logger.info('Firebase inicializado com sucesso');

    // Inicializar fila de jobs
    await initQueue();
    logger.info('Fila de jobs inicializada com sucesso');

    // Limpar arquivos da sessão anterior ao subir
    await cleanupOldFiles(0);
    logger.info('Limpeza inicial de arquivos temporários concluída');

    // Subir servidor
    app.listen(PORT, () => {
      logger.info(`🚀 PDFRápido API rodando na porta ${PORT}`);
      logger.info(`📁 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    logger.error('Falha ao inicializar o servidor', { error: err });
    process.exit(1);
  }
}

bootstrap();

export default app;
