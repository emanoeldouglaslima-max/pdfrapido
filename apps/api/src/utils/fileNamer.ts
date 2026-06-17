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
