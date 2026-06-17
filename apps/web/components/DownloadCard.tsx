'use client';

import { useState } from 'react';

interface DownloadCardProps {
  downloadUrl: string;
  filename?: string;
  meta?: Record<string, unknown>;
  onReset: () => void;
}

export default function DownloadCard({
  downloadUrl,
  filename = 'arquivo-processado',
  meta,
  onReset,
}: DownloadCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mt-6 rounded-2xl border-2 border-green-200 bg-green-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-green-800">Arquivo pronto!</p>
          <p className="text-sm text-green-600">Disponível por 30 minutos</p>
        </div>
      </div>

      {/* Meta de resultado (ex: compressão) */}
      {meta && (
        <div className="mb-4 flex flex-wrap gap-3">
          {meta.originalSize && (
            <div className="text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200">
              <span className="font-medium">Original:</span>{' '}
              {formatBytes(meta.originalSize as number)}
            </div>
          )}
          {meta.compressedSize && (
            <div className="text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200">
              <span className="font-medium">Comprimido:</span>{' '}
              {formatBytes(meta.compressedSize as number)}
            </div>
          )}
          {meta.reduction && (
            <div className="text-xs bg-green-500 text-white rounded-lg px-3 py-2 font-semibold">
              ↓ {meta.reduction as string} menor
            </div>
          )}
          {meta.pageCount && (
            <div className="text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200">
              <span className="font-medium">{meta.pageCount as number}</span> página(s)
            </div>
          )}
        </div>
      )}

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 btn-primary bg-green-600 hover:bg-green-700"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloaded ? 'Baixar novamente' : 'Baixar arquivo'}
        </button>
        <button
          onClick={onReset}
          className="flex-1 btn-secondary border-green-600 text-green-700 hover:bg-green-100"
        >
          Processar outro arquivo
        </button>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
