import multer from 'multer';

const MAX_SIZE_BYTES = (Number(process.env.MAX_FILE_SIZE_MB) || 25) * 1024 * 1024;
const MAX_MEDIA_SIZE_BYTES = (Number(process.env.MAX_MEDIA_SIZE_MB) || 100) * 1024 * 1024;

// Upload padrão para PDFs/imagens/docs (até 25MB)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE_BYTES,
    files: 20, // máximo de arquivos por request (para merge)
  },
});

// Upload para mídia (vídeo/áudio) — limite de 100MB
export const uploadMedia = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_MEDIA_SIZE_BYTES,
    files: 1,
  },
});
