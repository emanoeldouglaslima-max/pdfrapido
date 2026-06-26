'use client';

import { useEffect, useState, useCallback } from 'react';

export type JobStatus = 'idle' | 'uploading' | 'queued' | 'processing' | 'done' | 'failed';

interface ProgressBarProps {
  jobId: string | null;
  status: JobStatus;
  uploadProgress?: number;
  onDone: (downloadUrl: string, meta?: Record<string, unknown>) => void;
  onError: (message: string) => void;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const STATUS_CONFIG: Record<JobStatus, { label: string; icon: string; color: string }> = {
  idle:       { label: '',                                     icon: '',  color: 'bg-gray-200' },
  uploading:  { label: 'Enviando arquivo...',                  icon: '📤', color: 'bg-brand-500' },
  queued:     { label: 'Na fila — aguardando processamento...', icon: '⏳', color: 'bg-amber-500' },
  processing: { label: 'Processando seu PDF...',               icon: '⚙️', color: 'bg-brand-600' },
  done:       { label: 'Pronto! Download disponível.',         icon: '✅', color: 'bg-green-500' },
  failed:     { label: 'Erro no processamento.',               icon: '❌', color: 'bg-red-500' },
};

export default function ProgressBar({
  jobId,
  status,
  uploadProgress = 0,
  onDone,
  onError,
}: ProgressBarProps) {
  const [serverProgress, setServerProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status !== 'idle') setVisible(true);
  }, [status]);

  const visualProgress = (() => {
    if (status === 'uploading')  return Math.min(uploadProgress * 0.4, 40);
    if (status === 'queued')     return 45;
    if (status === 'processing') return 45 + serverProgress * 0.5;
    if (status === 'done')       return 100;
    return 0;
  })();

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
      // falha de rede — tentar novamente no próximo ciclo
    }
  }, [jobId, onDone, onError]);

  useEffect(() => {
    if (status !== 'queued' && status !== 'processing') return;
    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [status, pollStatus]);

  if (status === 'idle') return null;

  const config = STATUS_CONFIG[status];
  const isError = status === 'failed';

  return (
    <div className={`mt-6 space-y-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Card de progresso */}
      <div className={`rounded-2xl border p-5 ${isError ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
        {/* Status icon + label */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
            isError ? 'bg-red-100' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm ${isError ? 'text-red-700' : 'text-gray-700'}`}>
              {config.label}
            </p>
            {!isError && status !== 'done' && (
              <p className="text-xs text-gray-400 mt-0.5">Seus arquivos são excluídos em 30 minutos</p>
            )}
          </div>
          {/* Percentual */}
          {!isError && (
            <span className={`text-sm font-bold tabular-nums ${
              status === 'done' ? 'text-green-600' : 'text-brand-600'
            }`}>
              {Math.round(visualProgress)}%
            </span>
          )}
        </div>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${config.color} ${
              status !== 'done' && !isError ? 'animate-pulse' : ''
            }`}
            style={{ width: `${visualProgress}%` }}
          />
        </div>

        {/* Etapas de progresso visual */}
        {!isError && (
          <div className="flex justify-between mt-3">
            {(['uploading', 'queued', 'processing', 'done'] as JobStatus[]).map((step, i) => {
              const stepPercents: Record<string, number> = {
                uploading: 40, queued: 45, processing: 95, done: 100,
              };
              const isCompleted = visualProgress >= stepPercents[step];
              const isCurrent = status === step;
              return (
                <div key={step} className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isCompleted ? 'bg-brand-600 scale-125' : isCurrent ? 'bg-brand-400 animate-pulse' : 'bg-gray-300'
                  }`} />
                  <span className={`text-[9px] font-medium hidden sm:block ${
                    isCompleted ? 'text-brand-600' : 'text-gray-400'
                  }`}>
                    {['Upload', 'Fila', 'Processo', 'Pronto'][i]}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
