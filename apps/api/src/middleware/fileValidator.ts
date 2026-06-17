import { Request, Response, NextFunction } from 'express';

import { AppError } from '../utils/errorCodes';
import { logger } from './logger';

// MIMEs permitidos por categoria
const ALLOWED_MIMES = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/png', 'image/webp'],
  word: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ],
};

export type AllowedFileType = keyof typeof ALLOWED_MIMES;

// Retorna todos os MIMEs permitidos de uma ou mais categorias
function getAllowedMimes(types: AllowedFileType[]): string[] {
  return types.flatMap((t) => ALLOWED_MIMES[t]);
}

// Factory: cria middleware de validação para os tipos informados
export function fileValidator(allowedTypes: AllowedFileType[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const files = req.files as Express.Multer.File[] | undefined;
      const allFiles = file ? [file] : files ?? [];

      if (allFiles.length === 0) {
        throw new AppError('FILE_MISSING', 400);
      }

      const allowed = getAllowedMimes(allowedTypes);

      for (const f of allFiles) {
        // 1. Verificar tamanho
        const maxBytes = (Number(process.env.MAX_FILE_SIZE_MB) || 25) * 1024 * 1024;
        if (f.size > maxBytes) {
          throw new AppError('FILE_TOO_LARGE', 413);
        }

        const { fileTypeFromBuffer } = await (eval('import("file-type")') as any);
        const detected = await fileTypeFromBuffer(f.buffer);

        if (!detected || !allowed.includes(detected.mime)) {
          logger.warn('Arquivo com MIME inválido rejeitado', {
            declared: f.mimetype,
            detected: detected?.mime ?? 'desconhecido',
            filename: f.originalname,
          });
          throw new AppError(
            'FILE_INVALID',
            400,
            `MIME detectado: ${detected?.mime ?? 'desconhecido'}`
          );
        }

        // 3. Sobrescrever mimetype com o valor real detectado
        f.mimetype = detected.mime;

        logger.debug('Arquivo validado com sucesso', {
          filename: f.originalname,
          mime: detected.mime,
          sizeKB: Math.round(f.size / 1024),
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
