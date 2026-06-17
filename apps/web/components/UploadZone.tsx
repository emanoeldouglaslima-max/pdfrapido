'use client';

import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import clsx from 'clsx';

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
        className={clsx(
          'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 select-none',
          isDragActive && !isDragReject && 'border-brand-500 bg-brand-50 scale-[1.01]',
          isDragReject && 'border-red-400 bg-red-50',
          !isDragActive && !isDragReject && 'border-gray-300 hover:border-brand-400 hover:bg-gray-50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />

        {/* Ícone */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        {/* Texto principal */}
        <p className="text-lg font-semibold text-gray-700">
          {isDragActive ? 'Solte o arquivo aqui...' : label}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {sublabel || `ou clique para selecionar · ${acceptedExtensions.toUpperCase()} · máx. ${maxSizeMB}MB`}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
