'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

export type JobStatus = 'idle' | 'uploading' | 'queued' | 'processing' | 'done' | 'failed';

interface ProgressBarProps {
  jobId: string | null;
  status: JobStatus;
  uploadProgress?: number; // 0–100 durante o upload
  onDone: (downloadUrl: string, meta?: Record<string, unknown>) => void;
  onError: (message: string) => void;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const STATUS_LABELS: Record<JobStatus, string> = {
  idle:       '',
  uploading:  'Enviando arquivo...',
  queued:     'Na fila — aguardando processamento...',
  processing: 'Processando PDF...',
  done:       'Pronto! Seu arquivo está pronto.',
  failed:     'Erro no processamento.',
};

export default function ProgressBar({
  jobId,
  status,
  uploadProgress = 0,
  onDone,
  onError,
}: ProgressBarProps) {
  const [serverProgress, setServerProgress] = useState(0);

  // Calcular progresso visual total
  const visualProgress = (() => {
    if (status === 'uploading') return Math.min(uploadProgress * 0.4, 40); // upload = 0–40%
    if (status === 'queued')    return 45;
    if (status === 'processing') return 45 + serverProgress * 0.5;        // proc  = 45–95%
    if (status === 'done')      return 100;
    return 0;
  })();

  // Polling de status enquanto o job estiver na fila ou processando
  const pollStatus = useCallback(async () => {
    if (!jobId) return;

    try {
      const res = await fetch(`${API}/api/status/${jobId}`);
      const data = await res.json();

      if (data.status === 'done') {
        setServerProgress(100);
        onDone(`${API}${data.downloadUrl}`, data.meta);
      } else if (data.status === 'failed') {
        onError(data.error || 'Erro no processamento. Tente novamente.');
      } else {
        setServerProgress(data.progress ?? 0);
      }
    } catch {
      // Falha de rede — tentar novamente no próximo ciclo
    }
  }, [jobId, onDone, onError]);

  useEffect(() => {
    if (status !== 'queued' && status !== 'processing') return;

    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [status, pollStatus]);

  if (status === 'idle') return null;

  return (
    <div className="mt-6 space-y-3">
      {/* Barra de progresso */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            status === 'failed' ? 'bg-red-500' : 'bg-brand-600',
            status !== 'done' && status !== 'failed' && 'animate-pulse'
          )}
          style={{ width: `${visualProgress}%` }}
        />
      </div>

      {/* Label de status */}
      <div className="flex items-center justify-between text-sm">
        <span className={clsx(
          'font-medium',
          status === 'failed' ? 'text-red-500' : 'text-gray-600'
        )}>
          {STATUS_LABELS[status]}
        </span>
        {status !== 'failed' && (
          <span className="text-gray-400 font-mono text-xs">
            {Math.round(visualProgress)}%
          </span>
        )}
      </div>
    </div>
  );
}
