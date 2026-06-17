import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// ── Resposta padrão ao exceder o limite ───────────────────────────────────────
const rateLimitHandler = (_req: Request, res: Response) => {
  res.status(429).json({
    error: 'RATE_LIMIT',
    message: 'Limite de requisições atingido. Tente novamente em 1 hora.',
    retryAfter: 3600,
  });
};

// ── Limite global: 100 req / 15min por IP ────────────────────────────────────
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skip: (req) => req.path === '/health', // health check não conta
});

// ── Limite por ferramenta: 10 conversões / hora por IP ──────────────────────
export const toolRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: Number(process.env.RATE_LIMIT_PER_HOUR) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  keyGenerator: (req) => `${req.ip}:${req.path}`, // separado por ferramenta
  skip: (req) => req.method === 'GET', // polling de status não conta
});
