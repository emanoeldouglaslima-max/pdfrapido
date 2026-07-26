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
  media: [
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
    'audio/x-m4a',
    'audio/webm',
    'audio/ogg',
    'audio/x-wav',
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
        // 1. Verificar tamanho (100MB se for media, 25MB para os demais)
        const isMedia = allowedTypes.includes('media');
        const limitMb = isMedia
          ? (Number(process.env.MAX_MEDIA_SIZE_MB) || 100)
          : (Number(process.env.MAX_FILE_SIZE_MB) || 25);
        const maxBytes = limitMb * 1024 * 1024;

        if (f.size > maxBytes) {
          throw new AppError('FILE_TOO_LARGE', 413);
        }

        // 2. Detectar MIME type real por magic numbers e file-type
        let detectedMime: string | undefined;

        try {
          const { fileTypeFromBuffer } = await (eval('import("file-type")') as any);
          const detected = await fileTypeFromBuffer(f.buffer);
          detectedMime = detected?.mime;
        } catch {
          // Ignore
        }

        // Fallback de Magic Bytes caso file-type não identifique arquivos pequenos ou customizados
        if (!detectedMime && f.buffer && f.buffer.length > 4) {
          const header = f.buffer.toString('binary', 0, 10);
          const hex = f.buffer.toString('hex', 0, 4);

          if (header.startsWith('%PDF-')) {
            detectedMime = 'application/pdf';
          } else if (hex.startsWith('ffd8ff')) {
            detectedMime = 'image/jpeg';
          } else if (hex === '89504e47') {
            detectedMime = 'image/png';
          } else if (hex === '52494646' && allowedTypes.includes('media')) { // RIFF (WAV/WEBM)
            detectedMime = 'audio/wav';
          } else if (header.startsWith('ID3') || hex.startsWith('494433') || hex.startsWith('fff3') || hex.startsWith('fff2')) {
            detectedMime = 'audio/mpeg';
          } else if (allowedTypes.includes('media') && allowed.includes(f.mimetype)) {
            // Se o MIME declarado pelo multer for permitido e for mídia
            detectedMime = f.mimetype;
          }
        }

        if (!detectedMime || !allowed.includes(detectedMime)) {
          logger.warn('Arquivo com MIME inválido rejeitado', {
            declared: f.mimetype,
            detected: detectedMime ?? 'desconhecido',
            filename: f.originalname,
          });
          throw new AppError(
            'FILE_INVALID',
            400,
            `MIME detectado: ${detectedMime ?? 'desconhecido'}`
          );
        }

        // 3. Sobrescrever mimetype com o valor real detectado
        f.mimetype = detectedMime;

        logger.debug('Arquivo validado com sucesso', {
          filename: f.originalname,
          mime: detectedMime,
          sizeKB: Math.round(f.size / 1024),
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
