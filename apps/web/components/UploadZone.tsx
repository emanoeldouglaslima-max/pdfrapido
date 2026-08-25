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
          <div className="space-y-5 animate-fade-in relative z-10 py-2">
            {/* 1. Marca d'água de sobreposição no fundo com 30% de opacidade / pouco destaque */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.30] select-none overflow-hidden -z-10">
              <svg className="w-64 h-64 text-red-500/25 dark:text-red-400/15 scale-125" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>

            {/* 2. Aura de Brilho Gradiente e Cartão 3D do Ícone */}
            <div className="relative mx-auto w-24 h-28 flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-brand-500/30 to-purple-500/30 rounded-2xl blur-xl animate-pulse" />
              
              {/* Cartão de Documento 3D Interativo */}
              <div className="relative w-full h-full bg-white dark:bg-gray-800 border-2 border-red-500/80 dark:border-red-500/90 rounded-2xl shadow-xl shadow-red-500/10 flex flex-col justify-between p-3 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                {/* Orelha dobrada no canto superior direito */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-red-100 dark:bg-gray-700 border-l border-b border-red-200 dark:border-gray-600 rounded-bl-lg" />

                {/* Linhas simulando texto no documento */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-10 h-1.5 bg-red-400/40 rounded-full" />
                  <div className="w-14 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>

                {/* Badge com a extensão em tipografia vetorial nítida */}
                <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[11px] tracking-wider uppercase py-1 px-2 rounded-lg text-center shadow-md">
                  {files[0].name.split('.').pop()?.substring(0, 4) || 'PDF'}
                </div>

                {/* Linha inferior de detalhe */}
                <div className="w-full flex justify-between items-center pb-0.5">
                  <div className="w-3 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  <div className="w-6 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Selo verde de confirmação reluzente */}
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-extrabold border-2 border-white dark:border-gray-900 shadow-lg shadow-emerald-500/40 animate-bounce-slow">
                ✓
              </span>
            </div>

            {/* 3. Título do arquivo e meta em alta visibilidade */}
            <div className="space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-gray-800/90 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm shadow-sm max-w-xl mx-auto">
                <span className="text-base">📄</span>
                <span className="font-bold text-gray-900 dark:text-gray-100 truncate max-w-xs md:max-w-md">
                  {files.length === 1 ? files[0].name : `${files.length} arquivos selecionados`}
                </span>
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-100/80 dark:bg-brand-900/60 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-700">
                  {formatBytes(totalSize)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Arquivo pronto para processamento
                </span>
              </div>
            </div>

            {/* 4. Sublabel de alteração */}
            <p className="text-xs text-gray-400 pt-1">
              Deseja trocar?{' '}
              <span className="text-brand-600 dark:text-brand-400 font-bold underline underline-offset-2 hover:text-brand-700">
                Clique aqui ou arraste outro arquivo
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
