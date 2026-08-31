'use client';

import { useState, useEffect } from 'react';
import { TOOLS } from '../constants';
import UploadZone from '../../components/UploadZone';
import ProgressBar from '../../components/ProgressBar';
import DownloadCard from '../../components/DownloadCard';
import { usePdfTool } from '../hooks/usePdfTool';
import { trackFileUpload, trackToolStart, trackToolComplete } from '../../lib/analytics';

// Configuração específica por ferramenta (lógica interna do cliente)
const TOOL_CONFIG: Record<string, {
  endpoint: string;
  accept: Record<string, string[]>;
  multiple?: boolean;
  label: string;
  sublabel?: string;
  buildFormData: (files: File[], opts: Record<string, string>) => FormData;
}> = {
  // ── CATEGORIA: PDF ─────────────────────────────────────────────────────────
  'comprimir-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui para comprimir',
    sublabel: 'Reduza o tamanho do arquivo para enviar no e-mail ou WhatsApp',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('level', opts.level || 'medio');
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
    sublabel: 'Separe em arquivos menores ou por intervalo de páginas',
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
  'girar-pdf': {
    endpoint: 'split',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF que deseja rotacionar',
    sublabel: 'Gire páginas no sentido horário ou anti-horário',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('degrees', opts.degrees || '90');
      return fd;
    },
  },
  'remover-paginas-pdf': {
    endpoint: 'split',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para remover páginas desnecessárias',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('removePages', opts.removePages || '1');
      return fd;
    },
  },
  'extrair-paginas-pdf': {
    endpoint: 'split',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para extrair páginas específicas',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('from', opts.from || '1');
      fd.append('to', opts.to || '1');
      return fd;
    },
  },
  'reordenar-paginas-pdf': {
    endpoint: 'split',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para reordenar a sequência de folhas',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('order', opts.order || '');
      return fd;
    },
  },
  'proteger-pdf': {
    endpoint: 'protect',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF que deseja proteger com senha',
    sublabel: 'Criptografia forte para proteger seus documentos confidenciais',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('password', opts.password || '');
      return fd;
    },
  },
  'desbloquear-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF com senha para remover a proteção',
    sublabel: 'Informe a senha para autorizar a remoção permanente',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('password', opts.password || '');
      return fd;
    },
  },

  // ── CATEGORIA: CONVERSÃO ───────────────────────────────────────────────────
  'converter-pdf-para-word': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF aqui para converter em Word',
    sublabel: 'Gera um documento .docx editável mantendo o layout original',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'converter-pdf-para-jpg': {
    endpoint: 'pdf-to-jpg',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF para converter em fotos JPG',
    sublabel: 'Baixe cada página como foto de alta resolução',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('dpi', opts.dpi || '150');
      return fd;
    },
  },
  'converter-pdf-para-png': {
    endpoint: 'pdf-to-jpg',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF para converter em imagens PNG',
    sublabel: 'Alta definição com transparência e nitidez',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('format', 'png');
      fd.append('dpi', opts.dpi || '150');
      return fd;
    },
  },
  'converter-pdf-para-excel': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF para extrair tabelas para Excel',
    sublabel: 'Converte dados numéricos e planilhas em formato editável',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'converter-pdf-para-powerpoint': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF para converter em slides de PowerPoint',
    sublabel: 'Transforma folhas em apresentações do PPTX',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'converter-word-para-pdf': {
    endpoint: 'word-to-pdf',
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    label: 'Arraste seu arquivo Word (.docx ou .doc) aqui',
    sublabel: 'Preserva margens, tabelas e fontes originais',
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
    label: 'Arraste suas fotos JPG aqui',
    sublabel: 'Selecione várias fotos para unir em um único arquivo PDF',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      fd.append('orientation', opts.orientation || 'portrait');
      return fd;
    },
  },
  'converter-png-para-pdf': {
    endpoint: 'jpg-to-pdf',
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/webp': ['.webp'] },
    multiple: true,
    label: 'Arraste suas imagens PNG aqui',
    sublabel: 'Transforme capturas de tela e artes em PDF',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      fd.append('orientation', opts.orientation || 'portrait');
      return fd;
    },
  },
  'converter-imagem-para-pdf': {
    endpoint: 'jpg-to-pdf',
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    multiple: true,
    label: 'Arraste suas fotos e imagens (JPG, PNG, WebP)',
    sublabel: 'Organize suas fotos de documentos em um PDF pronto para imprimir',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      files.forEach((f) => fd.append('files', f));
      fd.append('orientation', opts.orientation || 'portrait');
      return fd;
    },
  },

  // ── CATEGORIA: EDIÇÃO ──────────────────────────────────────────────────────
  'editar-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para editar anotações',
    sublabel: 'Edite elementos e adicione observações em seu documento',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'adicionar-texto-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para adicionar novos textos',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('text', opts.text || '');
      return fd;
    },
  },
  'adicionar-imagem-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF que receberá a nova imagem',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'assinar-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu contrato em PDF para assinar online',
    sublabel: 'Desenhe sua assinatura ou digite seu nome completo',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('signature', opts.signature || '');
      return fd;
    },
  },
  'preencher-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o formulário em PDF para preencher os campos',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'adicionar-marca-dagua-pdf': {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste o PDF para carimbar com marca d\'água',
    sublabel: 'Adicione textos como "CONFIDENCIAL" ou "RASCUNHO"',
    buildFormData: (files, opts) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('watermark', opts.watermark || 'CONFIDENCIAL');
      return fd;
    },
  },

  // ── CATEGORIA: OCR & TRANSCRIÇÃO ───────────────────────────────────────────
  'ocr-pdf': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'] },
    label: 'Arraste seu PDF digitalizado para reconhecer o texto (OCR)',
    sublabel: 'Converte documentos escaneados em texto pesquisável',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'imagem-para-texto': {
    endpoint: 'pdf-to-word',
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    label: 'Arraste sua foto para extrair o texto impresso',
    sublabel: 'Lê fotos de páginas, livros e receitas com alta precisão',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'ocr-online': {
    endpoint: 'pdf-to-word',
    accept: { 'application/pdf': ['.pdf'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    label: 'Arraste seu arquivo para OCR online',
    sublabel: 'Suporte a documentos em português, inglês e espanhol',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
  'transcrever-video-em-texto': {
    endpoint: 'transcribe',
    accept: { 'video/mp4': ['.mp4'], 'audio/mpeg': ['.mp3'], 'audio/wav': ['.wav'] },
    label: 'Arraste seu vídeo ou áudio para transcrever em texto',
    sublabel: 'Transcreve aulas, reuniões e entrevistas com separação por tempo',
    buildFormData: (files) => {
      const fd = new FormData();
      fd.append('file', files[0]);
      return fd;
    },
  },
};

interface ToolClientPageProps {
  toolSlug: string;
}

export default function ToolClientPage({ toolSlug }: ToolClientPageProps) {
  const { status, jobId, uploadProgress, downloadUrl, meta, errorMsg, submit, reset, handleDone, handleError } = usePdfTool();

  const [files, setFiles] = useState<File[]>([]);
  const [opts, setOpts] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (status === 'done') {
      trackToolComplete(toolSlug);
    }
  }, [status, toolSlug]);

  const tool = TOOLS.find((t) => t.slug === toolSlug);
  // Fallback seguro de configuração se a rota for nova
  const config = TOOL_CONFIG[toolSlug] || {
    endpoint: 'compress',
    accept: { 'application/pdf': ['.pdf'] },
    label: `Arraste seu arquivo para ${tool?.name || 'processar'}`,
    buildFormData: (f: File[]) => {
      const fd = new FormData();
      if (f[0]) fd.append('file', f[0]);
      return fd;
    },
  };

  if (!tool) return null;

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      const totalBytes = newFiles.reduce((acc, f) => acc + f.size, 0);
      trackFileUpload(toolSlug, newFiles.length, totalBytes);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    trackToolStart(toolSlug, opts);
    const fd = config.buildFormData(files, opts);
    await submit(config.endpoint, fd);
  };

  const extension = toolSlug.includes('jpg') || toolSlug.includes('png') ? 'zip' : toolSlug.includes('word') || toolSlug.includes('excel') || toolSlug.includes('powerpoint') ? 'docx' : 'pdf';
  
  const getDownloadFilename = () => {
    if (files.length === 0) {
      return `pdfrapido-${toolSlug}.${extension}`;
    }
    const originalName = files[0].name;
    const dotIndex = originalName.lastIndexOf('.');
    const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
    return `${baseName}-pdfrapido.${extension}`;
  };

  const downloadFilename = getDownloadFilename();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      {status === 'idle' || status === 'failed' ? (
        <>
          <UploadZone
            onFiles={handleFilesSelected}
            accept={config.accept}
            multiple={config.multiple}
            label={config.label}
            sublabel={config.sublabel}
            disabled={false}
            files={files}
          />

          {/* Arquivos selecionados */}
          {files.length > 0 && config.multiple && (
            <div className="mt-4 space-y-2.5">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 bg-slate-100 dark:bg-gray-800/90 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/60 flex items-center justify-center flex-shrink-0 text-brand-700 dark:text-brand-400">
                    📄
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

          {/* Opções específicas: Comprimir PDF */}
          {toolSlug === 'comprimir-pdf' && (
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Nível de compressão</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.level || 'medio'}
                onChange={(e) => setOpts({ ...opts, level: e.target.value })}
              >
                <option value="baixo">Baixo — Máxima qualidade visual, menor redução de peso</option>
                <option value="medio">Médio — Equilíbrio ideal entre resolução e peso (Recomendado)</option>
                <option value="alto">Alto — Máxima compressão para enviar no e-mail ou WhatsApp</option>
              </select>
            </div>
          )}

          {/* Opções específicas: Girar PDF */}
          {toolSlug === 'girar-pdf' && (
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Ângulo de rotação</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.degrees || '90'}
                onChange={(e) => setOpts({ ...opts, degrees: e.target.value })}
              >
                <option value="90">90° no sentido horário (Direita)</option>
                <option value="180">180° de cabeça para baixo</option>
                <option value="270">270° no sentido anti-horário (Esquerda)</option>
              </select>
            </div>
          )}

          {/* Opções específicas: Marca d'Água */}
          {toolSlug === 'adicionar-marca-dagua-pdf' && (
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">{"Texto da marca d'água"}</label>
              <input
                type="text"
                placeholder="Ex: CONFIDENCIAL, RASCUNHO ou seu Nome"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={opts.watermark || ''}
                onChange={(e) => setOpts({ ...opts, watermark: e.target.value })}
              />
            </div>
          )}

          {/* Opções específicas: Proteger PDF com Senha */}
          {toolSlug === 'proteger-pdf' && (
            <div className="mt-4 space-y-3">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">🔑 Senha de proteção</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite a senha desejada"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-xl pl-4 pr-11 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={opts.password || ''}
                  onChange={(e) => setOpts({ ...opts, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="Confirme a senha"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-xl pl-4 pr-11 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={opts.passwordConfirm || ''}
                  onChange={(e) => setOpts({ ...opts, passwordConfirm: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPasswordConfirm ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>

              {opts.password && opts.passwordConfirm && opts.password !== opts.passwordConfirm && (
                <p className="text-xs text-red-500 font-semibold">⚠️ As senhas não coincidem</p>
              )}
            </div>
          )}

          {/* Erro */}
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-xl text-sm text-red-600 dark:text-red-400">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Botão processar */}
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
