'use client';

import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface UploadZoneProps {
  onFiles: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  files?: File[];
}

export default function UploadZone({
  onFiles,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = false,
  maxSizeMB = 25,
  label = 'Arraste seu PDF aqui',
  sublabel,
  disabled = false,
  files = [],
}: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: import('react-dropzone').FileRejection[]) => {
      setError(null);
      if (rejected.length > 0) {
        const firstError = rejected[0].errors[0];
        if (firstError.code === 'file-too-large') {
          setError(`Arquivo muito grande. Limite: ${maxSizeMB}MB`);
        } else if (firstError.code === 'file-invalid-type') {
          setError('Tipo de arquivo não suportado.');
        } else {
          setError('Arquivo inválido. Tente novamente.');
        }
        return;
      }
      if (accepted.length > 0) onFiles(accepted);
    },
    [onFiles, maxSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
    disabled,
  });

  const acceptedExtensions = Object.values(accept).flat().join(', ');
  const hasFiles = files && files.length > 0;

  // Calcula tamanho total dos arquivos selecionados
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center
          cursor-pointer select-none transition-all duration-300 group
          ${isDragActive && !isDragReject
            ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-950/30 dark:to-indigo-950/30 scale-[1.02] shadow-inner shadow-brand-100 dark:shadow-none'
            : isDragReject
            ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
            : hasFiles
            ? 'border-emerald-500 dark:border-emerald-600 bg-gradient-to-br from-emerald-50/40 to-white dark:from-emerald-950/10 dark:to-gray-900 hover:border-brand-500 shadow-sm'
            : 'border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-900 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-gradient-to-br hover:from-brand-50/40 hover:to-white dark:hover:from-brand-950/20 dark:hover:to-gray-900 hover:shadow-sm'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        {/* Padrão de pontos decorativo */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-100 dark:bg-brand-800/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 dark:bg-purple-800/20 rounded-full blur-2xl" />
        </div>

        {/* Estado com arquivos carregados */}
        {hasFiles && !isDragActive ? (
          <div className="space-y-4 animate-fade-in relative z-10">
            {/* Imagem de sobreposição do PDF (30% opacidade / pouco destaque) no fundo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.25] select-none overflow-hidden -z-10">
              <svg className="w-56 h-56 text-red-500/20 dark:text-red-500/10 scale-125" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .8-.7 1.5-1.5 1.5H7v1.5H5.5V9H8c.8 0 1.5.7 1.5 1.5v1zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V9H13c.8 0 1.5.7 1.5 1.5v3zm4.5-3.5h-3V15h-1.5V9H19v1.5zM9 10.5H8v1h1v-1zm4 1.5h-1v1.5h1V12z" />
              </svg>
            </div>

            {/* Ícone de arquivo carregado com checkmark */}
            <div className="relative mx-auto w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/20 flex items-center justify-center shadow-md">
              <svg className="w-11 h-11 text-red-600 dark:text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .8-.7 1.5-1.5 1.5H7v1.5H5.5V9H8c.8 0 1.5.7 1.5 1.5v1zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V9H13c.8 0 1.5.7 1.5 1.5v3zm4.5-3.5h-3V15h-1.5V9H19v1.5zM9 10.5H8v1h1v-1zm4 1.5h-1v1.5h1V12z" />
              </svg>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-black border-2 border-white dark:border-gray-900 shadow-md">
                ✓
              </span>
            </div>

            {/* Títulos e detalhes */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-150 leading-snug max-w-xl mx-auto truncate px-4">
                {files.length === 1 ? files[0].name : `${files.length} arquivos selecionados`}
              </h3>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5">
                <span>{formatBytes(totalSize)}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400">Arquivo Pronto</span>
              </p>
            </div>

            {/* Sublabel de instrução */}
            <p className="text-xs text-gray-500">
              Arraste outro arquivo ou{' '}
              <span className="text-brand-600 dark:text-brand-400 font-bold underline underline-offset-2 hover:text-brand-700">
                clique aqui para trocar
              </span>
            </p>
          </div>
        ) : (
          /* Estado padrão de upload ou arrastando */
          <>
            {/* Ícone central animado */}
            <div className={`
              relative mx-auto mb-5 w-20 h-20 rounded-2xl flex items-center justify-center
              transition-all duration-300
              ${isDragActive && !isDragReject
                ? 'bg-brand-600 shadow-lg shadow-brand-300 scale-110'
                : 'bg-gradient-to-br from-brand-100 to-indigo-100 dark:from-brand-900/40 dark:to-indigo-900/40 group-hover:from-brand-200 group-hover:to-indigo-200 dark:group-hover:from-brand-800/50 dark:group-hover:to-indigo-800/50'
              }
            `}>
              {isDragActive && !isDragReject ? (
                <svg className="w-10 h-10 text-white animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              ) : isDragReject ? (
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-brand-600 group-hover:animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>

            {/* Texto principal */}
            <p className={`text-lg font-bold transition-colors duration-200 ${
              isDragActive && !isDragReject ? 'text-brand-700 dark:text-brand-400' : 'text-gray-700 dark:text-gray-200 group-hover:text-brand-700 dark:group-hover:text-brand-400'
            }`}>
              {isDragActive && !isDragReject
                ? '✨ Solte para processar!'
                : isDragReject
                ? '❌ Arquivo não suportado'
                : label}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {sublabel || (
                <>
                  ou <span className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2">clique para selecionar</span>
                  {' · '}<span className="font-medium">{acceptedExtensions.toUpperCase()}</span>
                  {' · '}máx. <span className="font-medium">{maxSizeMB}MB</span>
                </>
              )}
            </p>
          </>
        )}

        {/* Ícone de segurança inferior */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 select-none">
          <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Exclusão automática após o processamento · Conexão criptografada (HTTPS)
        </div>
      </div>

      {/* Erro */}
      {error && (
        <p className="mt-3 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-800/50 rounded-xl px-4 py-2.5 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
