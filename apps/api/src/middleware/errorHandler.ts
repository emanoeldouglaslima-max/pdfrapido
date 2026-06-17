import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorCodes';
import { logger } from './logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isProd = process.env.NODE_ENV === 'production';

  // Erro conhecido da aplicação
  if (err instanceof AppError) {
    logger.warn(`AppError [${err.code}] em ${req.path}`, {
      code: err.code,
      statusCode: err.statusCode,
      ip: req.ip,
    });

    res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
      ...((!isProd && err.details) ? { details: err.details } : {}),
    });
    return;
  }

  // Erro do multer (arquivo muito grande)
  if (err.message?.includes('File too large')) {
    res.status(413).json({
      error: 'FILE_TOO_LARGE',
      message: 'O arquivo é muito grande. O limite é 25MB.',
    });
    return;
  }

  // Erro desconhecido
  logger.error(`Erro não tratado em ${req.path}`, {
    error: err.message,
    stack: !isProd ? err.stack : undefined,
    ip: req.ip,
  });

  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'Erro interno do servidor. Tente novamente em instantes.',
    ...(!isProd ? { details: err.message } : {}),
  });
}
