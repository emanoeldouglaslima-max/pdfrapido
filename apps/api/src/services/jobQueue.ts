import Bull, { Queue, Job } from 'bull';
import Redis from 'ioredis';
import { logger } from '../middleware/logger';
import { processCompress } from '../jobs/processors/compressProcessor';
import { processConvert } from '../jobs/processors/convertProcessor';
import { processMerge } from '../jobs/processors/mergeProcessor';
import { processSplit } from '../jobs/processors/splitProcessor';
import { processPdfToJpg } from '../jobs/processors/pdfToJpgProcessor';
import { processWordToPdf } from '../jobs/processors/wordToPdfProcessor';
import { processJpgToPdf } from '../jobs/processors/jpgToPdfProcessor';

export type JobType =
  | 'compress'
  | 'pdf-to-word'
  | 'pdf-to-jpg'
  | 'word-to-pdf'
  | 'jpg-to-pdf'
  | 'merge'
  | 'split';

export interface JobPayload {
  jobId: string;
  type: JobType;
  inputPath: string | string[];
  options?: Record<string, unknown>;
}

export interface JobResult {
  outputFiles: string[];
  meta?: Record<string, unknown>;
}

// ── Estado ────────────────────────────────────────────────────────────────────
let pdfQueue: Queue<JobPayload> | null = null;
let useInMemory = false;

// Store in-memory para quando Redis não está disponível
const memoryStore = new Map<string, {
  status: 'queued' | 'processing' | 'done' | 'failed';
  progress: number;
  result?: JobResult;
  error?: string;
}>();

const QUEUE_CONFIG = {
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  defaultJobOptions: {
    attempts: 2,
    timeout: 2 * 60 * 1000,
    removeOnComplete: { age: 60 * 60 },
    removeOnFail: { age: 24 * 60 * 60 },
    backoff: { type: 'exponential' as const, delay: 3000 },
  },
};

// ── Processador central ───────────────────────────────────────────────────────
async function processJob(data: JobPayload): Promise<JobResult> {
  // Criar um objeto job "fake" compatível com a interface Bull para os processadores
  const fakeJob = {
    data,
    progress: (_p?: number) => Promise.resolve(),
    id: data.jobId,
  } as unknown as Job<JobPayload>;

  switch (data.type) {
    case 'compress':      return processCompress(fakeJob);
    case 'pdf-to-word':   return processConvert(fakeJob);
    case 'pdf-to-jpg':    return processPdfToJpg(fakeJob);
    case 'word-to-pdf':   return processWordToPdf(fakeJob);
    case 'jpg-to-pdf':    return processJpgToPdf(fakeJob);
    case 'merge':         return processMerge(fakeJob);
    case 'split':         return processSplit(fakeJob);
    default:
      throw new Error(`Tipo de job desconhecido: ${data.type}`);
  }
}

// ── Inicialização ─────────────────────────────────────────────────────────────
export async function initQueue(): Promise<void> {
  try {
    // Fazer teste real de ping com ioredis e timeout rígido
    logger.info('Testando conexão com o Redis...');
    const redisClient = new Redis(QUEUE_CONFIG.redis, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
    });

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        redisClient.disconnect();
        reject(new Error('Timeout de ping no Redis (2s)'));
      }, 2000);

      redisClient.ping().then(() => {
        clearTimeout(timer);
        redisClient.disconnect();
        resolve();
      }).catch((err) => {
        clearTimeout(timer);
        redisClient.disconnect();
        reject(err);
      });
    });

    // Redis está disponível e operacional — usar Bull normalmente
    pdfQueue = new Bull<JobPayload>('pdf-jobs', {
      redis: QUEUE_CONFIG.redis,
      defaultJobOptions: QUEUE_CONFIG.defaultJobOptions,
    });

    pdfQueue.process(3, async (job: Job<JobPayload>) => {
      logger.info(`Iniciando job [${job.data.type}]`, { jobId: job.data.jobId });

      switch (job.data.type) {
        case 'compress':      return processCompress(job);
        case 'pdf-to-word':   return processConvert(job);
        case 'pdf-to-jpg':    return processPdfToJpg(job);
        case 'word-to-pdf':   return processWordToPdf(job);
        case 'jpg-to-pdf':    return processJpgToPdf(job);
        case 'merge':         return processMerge(job);
        case 'split':         return processSplit(job);
        default:
          throw new Error(`Tipo de job desconhecido: ${job.data.type}`);
      }
    });

    pdfQueue.on('completed', (job) => {
      logger.info(`Job concluído [${job.data.type}]`, { jobId: job.data.jobId });
    });

    pdfQueue.on('failed', (job, err) => {
      logger.error(`Job falhou [${job.data.type}]`, {
        jobId: job.data.jobId,
        error: err.message,
        attempts: job.attemptsMade,
      });
    });

    pdfQueue.on('stalled', (job) => {
      logger.warn(`Job travado [${job.data.type}]`, { jobId: job.data.jobId });
    });

    useInMemory = false;
    logger.info('Fila Bull inicializada com sucesso (Redis conectado)');

  } catch (err) {
    // Redis não está disponível ou falhou no ping — usar modo in-memory
    useInMemory = true;
    pdfQueue = null;
    logger.warn('Redis falhou no teste de Ping. Usando processamento direto (in-memory).', {
      error: (err as Error).message,
    });
  }
}

// ── Adicionar job ─────────────────────────────────────────────────────────────
export async function addJob(payload: JobPayload): Promise<string> {
  if (!useInMemory && pdfQueue) {
    try {
      // Modo Bull/Redis
      const job = await pdfQueue.add(payload, { jobId: payload.jobId });
      logger.debug(`Job enfileirado [${payload.type}]`, { jobId: payload.jobId, bullId: job.id });
      return payload.jobId;
    } catch (err) {
      logger.error(`Erro ao adicionar job na fila do Redis. Alternando para in-memory.`, { error: (err as Error).message });
      useInMemory = true;
      pdfQueue = null;
    }
  }

  // Modo in-memory: processar de forma assíncrona (não bloquear o request)
  memoryStore.set(payload.jobId, { status: 'queued', progress: 0 });

  // Processar em background (sem await para não travar a resposta)
  setImmediate(async () => {
    memoryStore.set(payload.jobId, { status: 'processing', progress: 10 });
    try {
      const result = await processJob(payload);
      memoryStore.set(payload.jobId, { status: 'done', progress: 100, result });
      logger.info(`Job concluído [${payload.type}] (in-memory)`, { jobId: payload.jobId });
    } catch (err) {
      memoryStore.set(payload.jobId, {
        status: 'failed',
        progress: 0,
        error: (err as Error).message,
      });
      logger.error(`Job falhou [${payload.type}] (in-memory)`, {
        jobId: payload.jobId,
        error: (err as Error).message,
      });
    }
  });

  logger.debug(`Job enfileirado [${payload.type}] (in-memory)`, { jobId: payload.jobId });
  return payload.jobId;
}

// ── Consultar status ──────────────────────────────────────────────────────────
export async function getJobStatus(jobId: string): Promise<{
  status: 'queued' | 'processing' | 'done' | 'failed' | 'not_found';
  progress?: number;
  result?: JobResult;
  error?: string;
}> {
  if (!useInMemory && pdfQueue) {
    try {
      // Modo Bull/Redis
      const job = await pdfQueue.getJob(jobId);
      if (!job) return { status: 'not_found' };

      const state = await job.getState();
      if (state === 'waiting' || state === 'delayed') return { status: 'queued', progress: 0 };
      if (state === 'active') return { status: 'processing', progress: job.progress() as number };
      if (state === 'failed') return { status: 'failed', error: job.failedReason };
      if (state === 'completed') return { status: 'done', result: job.returnvalue as JobResult };
      return { status: 'queued' };
    } catch (err) {
      logger.error(`Erro ao consultar status no Redis. Alternando para in-memory.`, { error: (err as Error).message });
      useInMemory = true;
      pdfQueue = null;
    }
  }

  // Modo in-memory
  const entry = memoryStore.get(jobId);
  if (!entry) return { status: 'not_found' };
  return entry;
}
