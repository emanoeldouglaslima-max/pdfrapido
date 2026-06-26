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
}

export default function UploadZone({
  onFiles,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = false,
  maxSizeMB = 25,
  label = 'Arraste seu PDF aqui',
  sublabel,
  disabled = false,
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

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center
          cursor-pointer select-none transition-all duration-300 group
          ${isDragActive && !isDragReject
            ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-indigo-50 scale-[1.02] shadow-inner shadow-brand-100'
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : 'border-gray-200 bg-gradient-to-br from-gray-50/80 to-white hover:border-brand-400 hover:bg-gradient-to-br hover:from-brand-50/40 hover:to-white hover:shadow-sm'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        {/* Padrão de pontos decorativo */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-100 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl" />
        </div>

        {/* Ícone central animado */}
        <div className={`
          relative mx-auto mb-5 w-20 h-20 rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${isDragActive && !isDragReject
            ? 'bg-brand-600 shadow-lg shadow-brand-300 scale-110'
            : 'bg-gradient-to-br from-brand-100 to-indigo-100 group-hover:from-brand-200 group-hover:to-indigo-200'
          }
        `}>
          {isDragActive && !isDragReject ? (
            // Ícone de "soltar" com animação
            <svg className="w-10 h-10 text-white animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          ) : isDragReject ? (
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ícone de upload padrão com efeito de subida
            <svg className="w-10 h-10 text-brand-600 group-hover:animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          )}
        </div>

        {/* Texto principal */}
        <p className={`text-lg font-bold transition-colors duration-200 ${
          isDragActive && !isDragReject ? 'text-brand-700' : 'text-gray-700 group-hover:text-brand-700'
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
              ou <span className="text-brand-600 font-semibold underline underline-offset-2">clique para selecionar</span>
              {' · '}<span className="font-medium">{acceptedExtensions.toUpperCase()}</span>
              {' · '}máx. <span className="font-medium">{maxSizeMB}MB</span>
            </>
          )}
        </p>

        {/* Ícone de segurança */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Arquivos deletados em 30 min · Conexão criptografada (HTTPS)
        </div>
      </div>

      {/* Erro */}
      {error && (
        <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
