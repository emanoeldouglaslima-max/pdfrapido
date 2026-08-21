'use client';

import { useState } from 'react';
import { TOOLS } from '../constants';
import UploadZone from '../../components/UploadZone';
import ProgressBar from '../../components/ProgressBar';
import DownloadCard from '../../components/DownloadCard';
import { usePdfTool } from '../hooks/usePdfTool';

// Configuração específica por ferramenta (lógica interna do cliente)
const TOOL_CONFIG: Record<string, {
  endpoint: string;
  accept: Record<string, string[]>;
  multiple?: boolean;
  label: string;
  sublabel?: string;
  buildFormData: (files: File[], opts: Record<string, string>) => FormData;
}> = {
  'comprimir-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui ou clique para selecionar',
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
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
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
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
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
  // Correção #9: Nova ferramenta Proteger PDF com Senha
  'proteger-pdf': {
    endpoint: 'protect',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF que deseja proteger com senha',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('password', opts.password || '');
      return fd;
    },
  },
};

interface ToolClientPageProps {
  toolSlug: string;
}

export default function ToolClientPage({ toolSlug }: ToolClientPageProps) {
  const tool = TOOLS.find((t) => t.slug === toolSlug);
  const config = TOOL_CONFIG[toolSlug];

  if (!tool || !config) return null;

  const { status, jobId, uploadProgress, downloadUrl, meta, errorMsg, submit, reset, handleDone, handleError } = usePdfTool();

  const [files, setFiles] = useState<File[]>([]);
  const [opts, setOpts] = useState<Record<string, string>>({});

  const handleUpload = async () => {
    if (files.length === 0) return;
    const fd = config.buildFormData(files, opts);
    await submit(config.endpoint, fd);
  };

  const extension = toolSlug.includes('jpg') ? 'zip' : toolSlug.includes('word') ? 'docx' : 'pdf';
  
  // Função para preservar o nome original do arquivo do usuário
  const getDownloadFilename = () => {
    if (files.length === 0) {
      return `pdfrapido-${toolSlug}.${extension}`;
    }
    const originalName = files[0].name;
    const dotIndex = originalName.lastIndexOf('.');
    const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;

    // Adiciona sufixo opcional explicativo dependendo do processo
    let suffix = '';
    if (toolSlug === 'comprimir-pdf') {
      suffix = '-comprimido';
    } else if (toolSlug === 'converter-pdf-para-word' || toolSlug === 'converter-word-para-pdf') {
      suffix = '-convertido';
    }

    return `${baseName}${suffix}.${extension}`;
  };

  const downloadFilename = getDownloadFilename();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      {status === 'idle' || status === 'failed' ? (
        <>
          <UploadZone
            onFiles={setFiles}
            accept={config.accept}
            multiple={config.multiple}
            label={config.label}
            sublabel={config.sublabel}
            disabled={false}
          />

          {/* Arquivos selecionados — preview com alto contraste, ícone, nome e tamanho */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2.5">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 bg-slate-100 dark:bg-gray-800/90 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm shadow-sm animate-fade-in"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/60 flex items-center justify-center flex-shrink-0 text-brand-700 dark:text-brand-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-50 font-bold truncate flex-1 tracking-tight text-sm">
                    {f.name}
                  </span>
                  <span className="text-brand-800 dark:text-brand-200 font-extrabold text-xs bg-brand-200/70 dark:bg-brand-800/80 px-2.5 py-1 rounded-lg border border-brand-300 dark:border-brand-700 flex-shrink-0">
                    {f.size >= 1024 * 1024
                      ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                      : `${(f.size / 1024).toFixed(0)} KB`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Opções específicas por ferramenta */}
          {toolSlug === 'comprimir-pdf' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nível de compressão</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.level || 'medio'}
                onChange={(e) => setOpts({ ...opts, level: e.target.value })}
              >
                <option value="baixo">Baixo — Máxima qualidade, menor redução</option>
                <option value="medio">Médio — Equilíbrio entre qualidade e tamanho (recomendado)</option>
                <option value="alto">Alto — Máxima redução, qualidade menor</option>
              </select>
            </div>
          )}

          {toolSlug === 'converter-pdf-para-jpg' && (
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

          {toolSlug === 'converter-jpg-para-pdf' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Orientação da página</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.orientation || 'portrait'}
                onChange={(e) => setOpts({ ...opts, orientation: e.target.value })}
              >
                <option value="portrait">Retrato (A4 em pé)</option>
                <option value="landscape">Paisagem (A4 deitado)</option>
              </select>
            </div>
          )}

          {toolSlug === 'dividir-pdf' && (
            <div className="mt-4 space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Como dividir?</label>
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
                <input
                  type="number"
                  min="1"
                  placeholder="Número de páginas por parte"
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={opts.pages || ''}
                  onChange={(e) => setOpts({ ...opts, pages: e.target.value })}
                />
              )}
              {opts.mode === 'range' && (
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="1"
                    placeholder="Página inicial"
                    className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={opts.from || ''}
                    onChange={(e) => setOpts({ ...opts, from: e.target.value })}
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Página final"
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={opts.to || ''}
                    onChange={(e) => setOpts({ ...opts, to: e.target.value })}
                  />
                </div>
              )}
              {opts.mode === 'single' && (
                <input
                  type="number"
                  min="1"
                  placeholder="Número da página"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={opts.page || ''}
                  onChange={(e) => setOpts({ ...opts, page: e.target.value })}
                />
              )}
            </div>
          )}

          {/* Opções específicas: Proteger PDF com Senha (Correção #9) */}
          {toolSlug === 'proteger-pdf' && (
            <div className="mt-4 space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                🔑 Senha de proteção
              </label>
              <input
                type="password"
                placeholder="Digite a senha"
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.password || ''}
                onChange={(e) => setOpts({ ...opts, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirme a senha"
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.passwordConfirm || ''}
                onChange={(e) => setOpts({ ...opts, passwordConfirm: e.target.value })}
              />
              {opts.password && opts.passwordConfirm && opts.password !== opts.passwordConfirm && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  As senhas não coincidem
                </p>
              )}
            </div>
          )}

          {/* Erro */}
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-xl text-sm text-red-600 dark:text-red-400">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Botão processar — com tooltip quando desabilitado (Correção #3) */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            title={files.length === 0 ? 'Selecione um arquivo para continuar' : undefined}
            className="btn-primary w-full mt-5 text-base py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {tool.icon} {tool.name} agora
          </button>
        </>
      ) : status === 'done' && downloadUrl ? (
        <DownloadCard
          downloadUrl={downloadUrl}
          filename={downloadFilename}
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
  );
}
