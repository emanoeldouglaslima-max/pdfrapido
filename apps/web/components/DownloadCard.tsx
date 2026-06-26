'use client';

import { useState, useEffect } from 'react';

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada com pequeno delay
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    setDownloaded(true);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reduction = meta?.reduction as string | undefined;
  const originalSize = meta?.originalSize as number | undefined;
  const compressedSize = meta?.compressedSize as number | undefined;
  const pageCount = meta?.pageCount as number | undefined;

  // Calcular percentual de redução numérico para barra de progresso
  const reductionPercent = reduction ? parseInt(reduction.replace('%', ''), 10) : null;

  return (
    <div className={`
      mt-6 rounded-2xl overflow-hidden border border-green-200 
      shadow-lg shadow-green-100/50
      transition-all duration-500
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {/* Header com gradiente verde */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-5 flex items-center gap-4">
        {/* Checkmark animado */}
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-2 border-white/40">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: visible ? 0 : 100,
                transition: 'stroke-dashoffset 0.6s ease-out 0.2s',
              }}
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-white text-lg leading-tight">Arquivo pronto para download!</p>
          <p className="text-green-100 text-sm mt-0.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Disponível por 30 minutos
          </p>
        </div>
      </div>

      <div className="bg-green-50/50 px-6 py-5">
        {/* Meta de resultado com design premium */}
        {meta && (originalSize || pageCount || reduction) && (
          <div className="mb-5">
            {/* Barra de redução visual (para compressão) */}
            {reductionPercent !== null && originalSize && compressedSize && (
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className="text-gray-600 font-medium">Redução alcançada</span>
                  <span className="font-bold text-green-700 text-base">{reduction} menor</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-1000"
                    style={{ width: visible ? `${Math.min(reductionPercent, 100)}%` : '0%' }}
                  />
                </div>
              </div>
            )}

            {/* Chips de info */}
            <div className="flex flex-wrap gap-2">
              {originalSize && (
                <div className="flex items-center gap-1.5 text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                  <span className="font-medium">Original:</span> {formatBytes(originalSize)}
                </div>
              )}
              {compressedSize && (
                <div className="flex items-center gap-1.5 text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="font-medium">Processado:</span> {formatBytes(compressedSize)}
                </div>
              )}
              {pageCount && (
                <div className="flex items-center gap-1.5 text-xs bg-white rounded-lg px-3 py-2 text-gray-600 border border-green-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  <span className="font-medium">{pageCount}</span> página(s)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 
                       bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl
                       hover:from-emerald-700 hover:to-green-700
                       active:scale-[0.98] transition-all duration-200
                       shadow-md shadow-green-300"
          >
            {downloaded ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar novamente
              </>
            ) : (
              <>
                <svg className="w-5 h-5 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar arquivo
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5
                       border-2 border-green-600 text-green-700 font-semibold rounded-xl
                       hover:bg-green-50 active:scale-[0.98] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Processar outro arquivo
          </button>
        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
