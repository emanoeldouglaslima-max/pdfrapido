import multer from 'multer';

const MAX_SIZE_BYTES = (Number(process.env.MAX_FILE_SIZE_MB) || 25) * 1024 * 1024;

// Usar memoryStorage para validar o buffer antes de salvar em disco
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE_BYTES,
    files: 20, // máximo de arquivos por request (para merge)
  },
});
