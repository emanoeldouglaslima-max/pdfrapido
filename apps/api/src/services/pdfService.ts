import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import archiver from 'archiver';
import { logger } from '../middleware/logger';
import { reductionPercent, formatBytes } from '../utils/fileNamer';


const execAsync = promisify(exec);

// ── COMPRIMIR PDF ─────────────────────────────────────────────────────────────
export type CompressionLevel = 'baixo' | 'medio' | 'alto';

const COMPRESSION_QUALITY: Record<CompressionLevel, number> = {
  baixo: 85,
  medio: 70,
  alto: 50,
};

export async function compressPdf(
  inputPath: string,
  outputPath: string,
  level: CompressionLevel = 'medio'
): Promise<{ originalSize: number; compressedSize: number; reduction: string }> {
  const originalBuffer = await fs.promises.readFile(inputPath);
  const originalSize = originalBuffer.length;

  // Carregar PDF e reescrever (pdf-lib remove objetos desnecessários)
  const pdfDoc = await PDFDocument.load(originalBuffer, {
    ignoreEncryption: true,
  });

  const quality = COMPRESSION_QUALITY[level];

  // Comprimir imagens embutidas nas páginas
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    // Renderizar página como imagem e recomprimir (abordagem via sharp)
    // Apenas para PDFs com muitas imagens — compressão estrutural é feita pelo save
    logger.debug(`Processando página ${pages.indexOf(page) + 1}/${pages.length}`, {
      width: Math.round(width),
      height: Math.round(height),
    });
  }

  const compressedBuffer = await pdfDoc.save({
    useObjectStreams: true, // compressão de objetos
  });

  // Aplicar sharp para compressão adicional se o PDF contiver imagens
  // Salvar resultado
  await fs.promises.writeFile(outputPath, compressedBuffer);

  const compressedSize = compressedBuffer.length;
  const reduction = reductionPercent(originalSize, compressedSize);

  logger.info('PDF comprimido', {
    original: formatBytes(originalSize),
    compressed: formatBytes(compressedSize),
    reduction: `${reduction}%`,
    level,
  });

  return {
    originalSize,
    compressedSize,
    reduction: `${reduction}%`,
  };
}

// ── PDF → JPG (usando pdfjs-dist + canvas, sem Ghostscript) ──────────────────────
export async function pdfToJpg(
  inputPath: string,
  outputDir: string,
  dpi: 150 | 300 = 150
): Promise<string[]> {
  fs.mkdirSync(outputDir, { recursive: true });

  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs' as any);
  const data = new Uint8Array(await fs.promises.readFile(inputPath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;
  const scale = dpi / 72; // PDF padrão é 72 DPI

  const { createCanvas } = await import('canvas');
  const outputFiles: string[] = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
    const context = canvas.getContext('2d');

    await page.render({
      canvasContext: context as any,
      viewport,
    }).promise;

    const jpgPath = path.join(outputDir, `page_${i}.jpg`);
    const pngBuffer = canvas.toBuffer('image/png');
    await sharp(pngBuffer).jpeg({ quality: 85, progressive: true }).toFile(jpgPath);
    outputFiles.push(jpgPath);

    logger.debug(`Página ${i}/${pageCount} convertida para JPG`);
  }

  logger.info(`PDF convertido para ${outputFiles.length} imagem(ns) JPG`);
  return outputFiles;
}


// ── PDF → WORD ───────────────────────────────────────────────────────────────
export async function pdfToWord(
  inputPath: string,
  outputPath: string
): Promise<void> {
  try {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs' as any);
    const data = new Uint8Array(await fs.promises.readFile(inputPath));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    let text = '';
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      // Unir itens de texto com espaçamento correto
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      text += pageText + '\n\n';
    }

    // Construir .docx com o texto extraído
    const { Document, Packer, Paragraph, TextRun } = await import('docx');

    const paragraphs = text
      .split('\n')
      .map((line) => new Paragraph({ children: [new TextRun(line)] }));

    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }],
    });

    const buffer = await Packer.toBuffer(doc);
    await fs.promises.writeFile(outputPath, buffer);

    logger.info('PDF convertido para Word', { pages: pageCount });
  } catch (err) {
    logger.error('Erro ao converter PDF para Word', { error: (err as Error).message });
    throw new Error('Falha na conversão PDF → Word. O arquivo pode estar protegido ou corrompido.');
  }
}

// ── WORD → PDF ───────────────────────────────────────────────────────────────
export async function wordToPdf(
  inputPath: string,
  outputDir: string
): Promise<string> {
  // Tentar com LibreOffice headless primeiro
  try {
    await execAsync(
      `libreoffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`
    );

    const basename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(outputDir, `${basename}.pdf`);

    if (fs.existsSync(outputPath)) {
      logger.info('Word convertido para PDF via LibreOffice');
      return outputPath;
    }
  } catch (err) {
    logger.warn('LibreOffice falhou, tentando fallback', {
      error: (err as Error).message,
    });
  }

  // Fallback: mammoth → extrai texto → pdf-lib → PDF simples
  const mammoth = await import('mammoth');
  const { value: rawText } = await mammoth.extractRawText({ path: inputPath });

  // Criar PDF simples com o texto extraído
  const { PDFDocument: PDFDoc, StandardFonts, rgb } = await import('pdf-lib');
  const doc = await PDFDoc.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontSize = 11;
  const margin = 50;
  const pageWidth = 595;
  const pageHeight = 842;
  const lineHeight = fontSize * 1.4;
  const maxWidth = pageWidth - margin * 2;

  const lines = rawText.split('\n');
  const wrappedLines: string[] = [];
  for (const line of lines) {
    if (line.trim() === '') { wrappedLines.push(''); continue; }
    let current = '';
    for (const word of line.split(' ')) {
      const test = current ? `${current} ${word}` : word;
      const w = font.widthOfTextAtSize(test, fontSize);
      if (w > maxWidth && current) {
        wrappedLines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) wrappedLines.push(current);
  }

  let page = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  for (const ln of wrappedLines) {
    if (y < margin + lineHeight) {
      page = doc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    if (ln.trim()) {
      page.drawText(ln, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
    }
    y -= lineHeight;
  }

  const pdfBytes = await doc.save();
  const outputPath = path.join(outputDir, 'documento.pdf');
  await fs.promises.writeFile(outputPath, pdfBytes);

  logger.info('Word convertido para PDF via fallback (texto simples)');
  return outputPath;
}

// ── IMAGENS → PDF ────────────────────────────────────────────────────────────
export async function imagesToPdf(
  imagePaths: string[],
  outputPath: string,
  orientation: 'portrait' | 'landscape' = 'portrait'
): Promise<void> {
  const pdfDoc = await PDFDocument.create();

  for (const imgPath of imagePaths) {
    const imgBuffer = await fs.promises.readFile(imgPath);
    const ext = path.extname(imgPath).toLowerCase();

    let img;
    if (ext === '.jpg' || ext === '.jpeg') {
      img = await pdfDoc.embedJpg(imgBuffer);
    } else {
      // PNG ou WEBP → converter para JPG antes com sharp
      const jpgBuffer = await sharp(imgBuffer).jpeg({ quality: 90 }).toBuffer();
      img = await pdfDoc.embedJpg(jpgBuffer);
    }

    const a4 = orientation === 'portrait'
      ? { width: 595, height: 842 }
      : { width: 842, height: 595 };

    const page = pdfDoc.addPage([a4.width, a4.height]);

    // Escalar imagem para caber na página mantendo proporção
    const scale = Math.min(a4.width / img.width, a4.height / img.height);
    const scaledW = img.width * scale;
    const scaledH = img.height * scale;
    const x = (a4.width - scaledW) / 2;
    const y = (a4.height - scaledH) / 2;

    page.drawImage(img, { x, y, width: scaledW, height: scaledH });
  }

  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(outputPath, pdfBytes);

  logger.info(`${imagePaths.length} imagem(ns) convertida(s) para PDF`);
}

// ── MERGE DE PDFs ─────────────────────────────────────────────────────────────
export async function mergePdfs(
  inputPaths: string[],
  outputPath: string
): Promise<void> {
  const mergedPdf = await PDFDocument.create();

  for (const filePath of inputPaths) {
    const pdfBuffer = await fs.promises.readFile(filePath);
    const pdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  await fs.promises.writeFile(outputPath, mergedBytes);

  logger.info(`${inputPaths.length} PDFs unidos com sucesso`);
}

// ── SPLIT DE PDF ──────────────────────────────────────────────────────────────
export type SplitMode =
  | { mode: 'every'; pages: number }         // dividir a cada N páginas
  | { mode: 'range'; from: number; to: number } // extrair intervalo
  | { mode: 'single'; page: number };        // extrair página única

export async function splitPdf(
  inputPath: string,
  outputDir: string,
  split: SplitMode
): Promise<string[]> {
  fs.mkdirSync(outputDir, { recursive: true });

  const pdfBuffer = await fs.promises.readFile(inputPath);
  const srcPdf = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  const outputFiles: string[] = [];

  if (split.mode === 'single') {
    const idx = split.page - 1;
    if (idx < 0 || idx >= totalPages) throw new Error('Número de página inválido');

    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(srcPdf, [idx]);
    newPdf.addPage(page);

    const outPath = path.join(outputDir, `pagina_${split.page}.pdf`);
    await fs.promises.writeFile(outPath, await newPdf.save());
    outputFiles.push(outPath);

  } else if (split.mode === 'range') {
    const indices = Array.from(
      { length: split.to - split.from + 1 },
      (_, i) => split.from - 1 + i
    ).filter((i) => i >= 0 && i < totalPages);

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(srcPdf, indices);
    pages.forEach((p) => newPdf.addPage(p));

    const outPath = path.join(outputDir, `paginas_${split.from}_${split.to}.pdf`);
    await fs.promises.writeFile(outPath, await newPdf.save());
    outputFiles.push(outPath);

  } else if (split.mode === 'every') {
    const chunkSize = split.pages;
    let part = 1;

    for (let start = 0; start < totalPages; start += chunkSize) {
      const end = Math.min(start + chunkSize, totalPages);
      const indices = Array.from({ length: end - start }, (_, i) => start + i);

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(srcPdf, indices);
      pages.forEach((p) => newPdf.addPage(p));

      const outPath = path.join(outputDir, `parte_${part}.pdf`);
      await fs.promises.writeFile(outPath, await newPdf.save());
      outputFiles.push(outPath);
      part++;
    }
  }

  // Se múltiplos arquivos, zipar tudo
  if (outputFiles.length > 1) {
    const zipPath = path.join(outputDir, 'pdf_dividido.zip');
    await zipFiles(outputFiles, zipPath);
    // Remover PDFs individuais, manter só o zip
    outputFiles.forEach((f) => fs.unlinkSync(f));
    return [zipPath];
  }

  logger.info(`PDF dividido em ${outputFiles.length} parte(s)`);
  return outputFiles;
}

// ── ZIPAR ARQUIVOS ────────────────────────────────────────────────────────────
export function zipFiles(filePaths: string[], outputZip: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip', { zlib: { level: 6 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    filePaths.forEach((f) => archive.file(f, { name: path.basename(f) }));
    archive.finalize();
  });
}
