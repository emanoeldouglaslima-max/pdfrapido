import fs from 'fs';
import path from 'path';
import os from 'os';
import { logger } from '../middleware/logger';

const JOBS_DIR = path.join(os.tmpdir(), 'pdfjobs');
const OUTPUT_DIR = path.join(os.tmpdir(), 'pdfoutput');


// Garante que os diretórios existam
export function ensureDirs(): void {
  [JOBS_DIR, OUTPUT_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

// Salva o buffer de um arquivo no diretório de input do job
export async function saveInputFile(
  jobId: string,
  filename: string,
  buffer: Buffer
): Promise<string> {
  const dir = path.join(JOBS_DIR, jobId);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.promises.writeFile(filePath, buffer);
  logger.debug(`Arquivo salvo em ${filePath}`);
  return filePath;
}

// Salva múltiplos buffers (ex: merge de PDFs)
export async function saveInputFiles(
  jobId: string,
  files: { filename: string; buffer: Buffer }[]
): Promise<string[]> {
  const dir = path.join(JOBS_DIR, jobId);
  fs.mkdirSync(dir, { recursive: true });

  const paths: string[] = [];
  for (const f of files) {
    const filePath = path.join(dir, f.filename);
    await fs.promises.writeFile(filePath, f.buffer);
    paths.push(filePath);
  }
  return paths;
}

// Cria o diretório de output de um job e retorna o path
export function createOutputDir(jobId: string): string {
  const dir = path.join(OUTPUT_DIR, jobId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// Verifica se o output de um job existe
export function outputExists(jobId: string): boolean {
  const dir = path.join(OUTPUT_DIR, jobId);
  return fs.existsSync(dir) && fs.readdirSync(dir).length > 0;
}

// Lista arquivos do output de um job
export function listOutputFiles(jobId: string): string[] {
  const dir = path.join(OUTPUT_DIR, jobId);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map((f) => path.join(dir, f));
}

// Remove recursivamente uma pasta
function removeDirSync(dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

// Limpa arquivos com mais de `ageMinutes` minutos
// Se ageMinutes = 0, limpa tudo (usado no boot)
export async function cleanupOldFiles(ageMinutes: number): Promise<void> {
  const now = Date.now();
  const maxAge = ageMinutes * 60 * 1000;
  let deletedCount = 0;

  for (const baseDir of [JOBS_DIR, OUTPUT_DIR]) {
    if (!fs.existsSync(baseDir)) continue;

    const entries = await fs.promises.readdir(baseDir);
    for (const entry of entries) {
      const fullPath = path.join(baseDir, entry);
      try {
        const stat = await fs.promises.stat(fullPath);
        const age = now - stat.mtimeMs;

        if (ageMinutes === 0 || age > maxAge) {
          removeDirSync(fullPath);
          deletedCount++;
        }
      } catch {
        // arquivo pode ter sido deletado por outro processo — ignorar
      }
    }
  }

  logger.info(`Limpeza concluída: ${deletedCount} entradas removidas`, {
    ageMinutes,
  });
}
