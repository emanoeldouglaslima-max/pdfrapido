'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { TOOLS } from '../constants';
import UploadZone from '../../components/UploadZone';
import ProgressBar from '../../components/ProgressBar';
import DownloadCard from '../../components/DownloadCard';
import AdUnit from '../../components/AdUnit';
import { usePdfTool } from '../hooks/usePdfTool';

// Configuração específica por ferramenta
const TOOL_CONFIG: Record<string, {
  endpoint: string;
  accept: Record<string, string[]>;
  multiple?: boolean;
  label: string;
  sublabel?: string;
  options?: React.ReactNode;
  buildFormData: (files: File[], opts: Record<string, string>) => FormData;
}> = {
  'comprimir-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui ou clique para selecionar',
    options: undefined,
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('level', opts.level || 'medio');
      return fd;
    },
  },
  'converter-pdf-para-word': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui para converter em Word',
    buildFormData: (files) => { const fd = new FormData(); fd.append('file', files[0]); return fd; },
  },
  'converter-pdf-para-jpg': {
    endpoint: 'pdf-to-jpg',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui para converter em imagens JPG',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('dpi', opts.dpi || '150');
      return fd;
    },
  },
  'converter-word-para-pdf': {
    endpoint: 'word-to-pdf',
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    label: 'Arraste seu arquivo Word (.docx) aqui',
    buildFormData: (files) => { const fd = new FormData(); fd.append('file', files[0]); return fd; },
  },
  'converter-jpg-para-pdf': {
    endpoint: 'jpg-to-pdf',
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    multiple: true,
    label: 'Arraste suas imagens aqui (JPG, PNG)',
    sublabel: 'Pode selecionar várias imagens de uma vez',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      fd.append('orientation', opts.orientation || 'portrait');
      return fd;
    },
  },
  'juntar-pdf': {
    endpoint: 'merge',
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
    label: 'Arraste os PDFs que quer juntar (mínimo 2)',
    sublabel: 'Selecione vários PDFs — eles serão unidos na ordem enviada',
    buildFormData: (files) => {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      return fd;
    },
  },
  'dividir-pdf': {
    endpoint: 'split',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF que quer dividir',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('mode', opts.mode || 'every');
      fd.append('pages', opts.pages || '1');
      fd.append('from', opts.from || '1');
      fd.append('to', opts.to || '1');
      fd.append('page', opts.page || '1');
      return fd;
    },
  },
};

// Conteúdo SEO por ferramenta
const SEO_CONTENT: Record<string, {
  h2: string;
  why: string;
  how: string[];
  faq: { q: string; a: string }[];
}> = {
  'comprimir-pdf': {
    h2: 'Como comprimir PDF online grátis?',
    why: 'Comprimir PDF é essencial para enviar arquivos por e-mail, WhatsApp ou armazenar com menos espaço. Nosso compressor reduz o tamanho do PDF sem comprometer a qualidade visual.',
    how: ['Clique em "Selecionar arquivo" ou arraste o PDF', 'Escolha o nível de compressão desejado', 'Clique em "Comprimir PDF" e aguarde', 'Baixe o arquivo comprimido'],
    faq: [
      { q: 'Quanto posso reduzir um PDF?', a: 'Depende do conteúdo. PDFs com muitas imagens podem ser reduzidos em até 80%. PDFs de texto puro têm menos redução.' },
      { q: 'A qualidade do texto é preservada?', a: 'Sim. O texto sempre é preservado. A compressão afeta principalmente as imagens embutidas.' },
    ],
  },
  'converter-pdf-para-word': {
    h2: 'Como converter PDF para Word online?',
    why: 'Converter PDF para Word permite editar o conteúdo do documento. Útil para currículo, contratos e qualquer documento que precise ser modificado.',
    how: ['Envie o PDF que deseja converter', 'Aguarde o processamento automático', 'Baixe o arquivo .docx pronto para editar no Word ou Google Docs'],
    faq: [
      { q: 'A formatação é mantida?', a: 'Tentamos preservar a estrutura, mas PDFs complexos com colunas e tabelas podem ter variações.' },
      { q: 'Funciona com PDF escaneado?', a: 'PDFs escaneados (imagens) têm resultado limitado. Funciona melhor com PDFs gerados digitalmente.' },
    ],
  },
  'converter-pdf-para-jpg': {
    h2: 'Como converter PDF para JPG online?',
    why: 'Converter PDF para imagem é útil para compartilhar páginas nas redes sociais, usar como referência visual ou criar thumbnails.',
    how: ['Envie o PDF', 'Escolha a qualidade (150 DPI para web, 300 DPI para impressão)', 'Baixe as imagens — cada página vira uma imagem JPG'],
    faq: [
      { q: 'Todas as páginas são convertidas?', a: 'Sim. Cada página do PDF vira uma imagem JPG. Se o PDF tiver mais de 1 página, você receberá um arquivo .zip.' },
    ],
  },
  'juntar-pdf': {
    h2: 'Como juntar PDF online?',
    why: 'Juntar vários PDFs em um só é ideal para organizar documentos, criar relatórios ou enviar múltiplos arquivos como um só.',
    how: ['Selecione 2 ou mais PDFs', 'Organize a ordem se necessário', 'Clique em "Juntar PDFs"', 'Baixe o documento unificado'],
    faq: [
      { q: 'Quantos PDFs posso juntar?', a: 'Você pode juntar até 20 arquivos de uma vez, desde que o total não ultrapasse 25MB.' },
    ],
  },
  'dividir-pdf': {
    h2: 'Como dividir PDF online?',
    why: 'Dividir PDF é útil quando você precisa extrair páginas específicas, separar capítulos ou reduzir um arquivo grande em partes menores.',
    how: ['Envie o PDF', 'Escolha como dividir: por número de páginas, por intervalo ou página específica', 'Baixe as partes separadas'],
    faq: [
      { q: 'Posso extrair só uma página?', a: 'Sim. Escolha a opção "Página específica" e informe o número da página que deseja extrair.' },
    ],
  },
};

interface PageProps {
  params: { tool: string };
}

export default function ToolPage({ params }: PageProps) {
  const tool = TOOLS.find((t) => t.slug === params.tool);
  const config = TOOL_CONFIG[params.tool];

  if (!tool || !config) notFound();

  const seo = SEO_CONTENT[params.tool] || {
    h2: `Como usar: ${tool.name}`,
    why: tool.description,
    how: ['Envie seu arquivo', 'Aguarde o processamento', 'Baixe o resultado'],
    faq: [],
  };

  const { status, jobId, uploadProgress, downloadUrl, meta, errorMsg, submit, reset, handleDone, handleError } = usePdfTool();

  const [files, setFiles] = useState<File[]>([]);
  const [opts, setOpts] = useState<Record<string, string>>({});

  const handleUpload = async () => {
    if (files.length === 0) return;
    const fd = config.buildFormData(files, opts);
    await submit(config.endpoint, fd);
  };

  const relatedTools = TOOLS.filter((t) => t.slug !== params.tool).slice(0, 3);

  return (
    <>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-brand-600 hover:opacity-80">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Início</span>
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* ── ANÚNCIO ABOVE FOLD ── */}
        <AdUnit
          slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_TOP || '0000000004'}
          format="horizontal"
          className="mb-8 ad-slot-horizontal rounded-xl overflow-hidden"
        />

        {/* ── HERO DA FERRAMENTA ── */}
        <div className="text-center mb-8">
          <div className={`inline-flex w-16 h-16 ${tool.iconBg} rounded-2xl items-center justify-center text-3xl mb-4`}>
            {tool.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {tool.name} Online Grátis
          </h1>
          <p className="mt-3 text-lg text-gray-500">{tool.description} Sem cadastro.</p>
        </div>

        {/* ── FERRAMENTA ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {status === 'idle' || status === 'failed' ? (
            <>
              <UploadZone
                onFiles={setFiles}
                accept={config.accept}
                multiple={config.multiple}
                label={config.label}
                sublabel={(config as { sublabel?: string }).sublabel}
                disabled={false}
              />

              {/* Arquivos selecionados */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 text-sm">
                      <span className="text-gray-700 truncate">{f.name}</span>
                      <span className="text-gray-400 flex-shrink-0 ml-3">{(f.size / 1024).toFixed(0)} KB</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Opções específicas por ferramenta */}
              {params.tool === 'comprimir-pdf' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível de compressão</label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={opts.level || 'medio'}
                    onChange={(e) => setOpts({ ...opts, level: e.target.value })}
                  >
                    <option value="baixo">Baixo — Máxima qualidade, menor redução</option>
                    <option value="medio">Médio — Equilíbrio entre qualidade e tamanho (recomendado)</option>
                    <option value="alto">Alto — Máxima redução, qualidade menor</option>
                  </select>
                </div>
              )}

              {params.tool === 'converter-pdf-para-jpg' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualidade da imagem</label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={opts.dpi || '150'}
                    onChange={(e) => setOpts({ ...opts, dpi: e.target.value })}
                  >
                    <option value="150">150 DPI — Para web e e-mail</option>
                    <option value="300">300 DPI — Alta qualidade para impressão</option>
                  </select>
                </div>
              )}

              {params.tool === 'dividir-pdf' && (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Como dividir?</label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={opts.mode || 'every'}
                    onChange={(e) => setOpts({ ...opts, mode: e.target.value })}
                  >
                    <option value="every">A cada N páginas</option>
                    <option value="range">Extrair intervalo de páginas</option>
                    <option value="single">Extrair página específica</option>
                  </select>
                  {(opts.mode === 'every' || !opts.mode) && (
                    <input type="number" min="1" placeholder="Número de páginas por parte"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={opts.pages || ''} onChange={(e) => setOpts({ ...opts, pages: e.target.value })} />
                  )}
                  {opts.mode === 'range' && (
                    <div className="flex gap-3">
                      <input type="number" min="1" placeholder="Página inicial"
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={opts.from || ''} onChange={(e) => setOpts({ ...opts, from: e.target.value })} />
                      <input type="number" min="1" placeholder="Página final"
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={opts.to || ''} onChange={(e) => setOpts({ ...opts, to: e.target.value })} />
                    </div>
                  )}
                  {opts.mode === 'single' && (
                    <input type="number" min="1" placeholder="Número da página"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      value={opts.page || ''} onChange={(e) => setOpts({ ...opts, page: e.target.value })} />
                  )}
                </div>
              )}

              {/* Erro */}
              {errorMsg && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Botão processar */}
              <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className="btn-primary w-full mt-5 text-base py-3.5"
              >
                {tool.icon} {tool.name} agora
              </button>
            </>
          ) : status === 'done' && downloadUrl ? (
            <DownloadCard
              downloadUrl={downloadUrl}
              filename={`pdfrápido-${params.tool}.${params.tool.includes('jpg') ? 'zip' : params.tool.includes('word') ? 'docx' : 'pdf'}`}
              meta={meta || undefined}
              onReset={reset}
            />
          ) : (
            <ProgressBar
              jobId={jobId}
              status={status}
              uploadProgress={uploadProgress}
              onDone={handleDone}
              onError={handleError}
            />
          )}
        </div>

        {/* ── ANÚNCIO IN-TOOL ── */}
        <div className="my-8">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_MID || '0000000005'}
            format="fluid"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* ── ARTIGO SEO ── */}
        <article className="prose prose-gray max-w-none mt-10">
          <h2 className="text-2xl font-bold text-gray-900">{seo.h2}</h2>
          <p className="text-gray-600 leading-relaxed mt-3">{seo.why}</p>

          <h3 className="text-xl font-bold text-gray-900 mt-6">Passo a passo</h3>
          <ol className="mt-3 space-y-2">
            {seo.how.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          {seo.faq.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-gray-900 mt-8">Perguntas frequentes</h3>
              <div className="mt-3 space-y-4">
                {seo.faq.map((f, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <h4 className="font-semibold text-gray-900">{f.q}</h4>
                    <p className="text-gray-500 text-sm mt-1">{f.a}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>

        {/* ── OUTRAS FERRAMENTAS ── */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Outras ferramentas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`${t.color} rounded-xl p-4 hover:shadow-sm transition-all text-sm font-semibold text-gray-800 hover:text-brand-700 flex items-center gap-2`}
              >
                <span>{t.icon}</span> {t.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ── ANÚNCIO FINAL ── */}
        <div className="mt-10">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_BOTTOM || '0000000006'}
            format="auto"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>
      </main>
    </>
  );
}
