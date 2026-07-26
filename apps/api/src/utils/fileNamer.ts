import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';
import path from 'path';

// Gera um jobId único
export function generateJobId(): string {
  return uuidv4();
}

// Sanitiza o nome original do arquivo (remove chars perigosos)
export function sanitizeFilename(original: string): string {
  const safe = sanitize(original, { replacement: '_' });
  return safe || 'arquivo';
}

// Retorna a extensão de um arquivo
export function getExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

// Monta o path de input de um job
export function getInputPath(jobId: string): string {
  return `/tmp/pdfjobs/${jobId}`;
}

// Monta o path de output de um job
export function getOutputPath(jobId: string): string {
  return `/tmp/output/${jobId}`;
}

// Formata o nome do arquivo final de download preservando a base do nome original enviado pelo usuário
export function buildDownloadFilename(
  originalName: string | undefined,
  fallbackBase: string,
  suffix?: string,
  targetExtension?: string
): string {
  const baseName = originalName ? path.parse(originalName).name : fallbackBase;
  const safeBase = sanitize(baseName, { replacement: '_' }) || fallbackBase;
  const ext = targetExtension
    ? targetExtension.startsWith('.') ? targetExtension : `.${targetExtension}`
    : originalName ? path.extname(originalName) : '.pdf';

  if (suffix) {
    return `${safeBase}_${suffix}${ext}`;
  }
  return `${safeBase}${ext}`;
}

// Gera os cabeçalhos Content-Disposition compatíveis com UTF-8 e navegadores legados
export function getDownloadContentDisposition(filename: string): string {
  const asciiSafe = filename.replace(/[^\x20-\x7E]/g, '_');
  const encodedUtf8 = encodeURIComponent(filename);
  return `attachment; filename="${asciiSafe}"; filename*=UTF-8''${encodedUtf8}`;
}

// Retorna o MIME type baseado na extensão do arquivo
export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'application/pdf';
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.doc':
      return 'application/msword';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.zip':
      return 'application/zip';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    case '.mov':
      return 'video/quicktime';
    case '.mp3':
      return 'audio/mpeg';
    case '.wav':
      return 'audio/wav';
    case '.m4a':
      return 'audio/mp4';
    case '.ogg':
      return 'audio/ogg';
    case '.json':
      return 'application/json';
    case '.txt':
      return 'text/plain';
    case '.srt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
}

// Formata bytes em string legível
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Calcula percentual de redução entre dois tamanhos
export function reductionPercent(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

