'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { JobStatus } from '../../components/ProgressBar';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface UsePdfToolReturn {
  status: JobStatus;
  jobId: string | null;
  uploadProgress: number;
  downloadUrl: string | null;
  meta: Record<string, unknown> | null;
  errorMsg: string | null;
  submit: (endpoint: string, formData: FormData) => Promise<void>;
  reset: () => void;
  handleDone: (url: string, m?: Record<string, unknown>) => void;
  handleError: (msg: string) => void;
}

export function usePdfTool(): UsePdfToolReturn {
  const [status, setStatus]           = useState<JobStatus>('idle');
  const [jobId, setJobId]             = useState<string | null>(null);
  const [uploadProgress, setProgress] = useState(0);
  const [downloadUrl, setDownload]    = useState<string | null>(null);
  const [meta, setMeta]               = useState<Record<string, unknown> | null>(null);
  const [errorMsg, setError]          = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setJobId(null);
    setProgress(0);
    setDownload(null);
    setMeta(null);
    setError(null);
  }, []);

  const handleDone = useCallback((url: string, m?: Record<string, unknown>) => {
    setStatus('done');
    setDownload(url);
    if (m) setMeta(m);
  }, []);

  const handleError = useCallback((msg: string) => {
    setStatus('failed');
    setError(msg);
  }, []);

  const submit = useCallback(async (endpoint: string, formData: FormData) => {
    reset();
    setStatus('uploading');

    try {
      const { data } = await axios.post(`${API}/api/${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = e.total ? Math.round((e.loaded / e.total) * 100) : 0;
          setProgress(pct);
        },
      });

      setJobId(data.jobId);
      setStatus('queued');
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err)
          ? err.response?.data?.message || 'Erro ao enviar o arquivo.'
          : 'Erro inesperado. Tente novamente.';
      handleError(msg);
    }
  }, [reset, handleError]);

  return {
    status, jobId, uploadProgress, downloadUrl, meta, errorMsg,
    submit, reset, handleDone, handleError,
  };
}
