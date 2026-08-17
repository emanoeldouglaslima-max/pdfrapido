'use client';

import { useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TranscreverVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'texto' | 'legendas' | 'resumo'>('texto');
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<{
    transcript: string;
    summary: string[];
    wordCount: number;
    duration: string;
    subtitles: { time: string; text: string }[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      if (selected.size > 100 * 1024 * 1024) {
        alert('Arquivo maior que 100MB.');
        return;
      }
      setFile(selected);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(15);
    setStatusMessage('Enviando arquivo de mídia...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pdfrapido-api.onrender.com';

    try {
      // 1. Enviar arquivo para enfileirar o job de transcrição
      const response = await fetch(`${apiUrl}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao enviar arquivo para o servidor');
      }

      const { jobId } = await response.json();
      setProgress(30);
      setStatusMessage('Extraindo áudio e processando com Whisper AI...');

      // 2. Fazer polling do resultado a cada 1.5 segundos
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`${apiUrl}/api/transcribe/result/${jobId}`);
          if (!statusRes.ok) return;

          const statusData = await statusRes.json();

          if (statusData.status === 'processing') {
            setProgress((prev) => Math.min(prev + 10, 85));
            setStatusMessage('Transcrevendo áudio com Whisper IA...');
          } else if (statusData.status === 'done' && statusData.data) {
            clearInterval(pollInterval);
            setProgress(100);
            setIsProcessing(false);
            setResult({
              transcript: statusData.data.transcript || 'Nenhum texto detectado.',
              summary: statusData.data.summary || ['Transcrição concluída.'],
              wordCount: statusData.data.wordCount || 0,
              duration: statusData.data.duration || '00:00',
              subtitles: statusData.data.subtitles || [],
            });
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            setIsProcessing(false);
            alert(`Erro no processamento: ${statusData.error || 'Falha na transcrição'}`);
          }
        } catch {
          // Erro de rede temporário no polling — continuar tentando
        }
      }, 1500);

    } catch (err: any) {
      setIsProcessing(false);
      alert(`Falha no upload: ${err.message || 'Verifique a conexão com o servidor'}`);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (content: string, name: string, type: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleDownloadTxt = () => {
    if (!result || !file) return;
    downloadFile(result.transcript, `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.txt`, 'text/plain;charset=utf-8');
  };

  const handleDownloadSrt = () => {
    if (!result || !file) return;
    const srt = result.subtitles
      .map((s, i) => `${i + 1}\n${s.time.replace('→', '-->')}\n${s.text}\n`)
      .join('\n');
    downloadFile(srt, `${file.name.replace(/\.[^/.]+$/, '')}_legendas.srt`, 'text/plain;charset=utf-8');
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 md:py-12">

        {/* ─── Título ─── */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Transcrever Vídeo em Texto
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Envie um vídeo ou áudio e receba o texto, legendas SRT e resumo por IA.
          </p>
        </div>

        {/* ─── Estado: Upload ─── */}
        {!result && !isProcessing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Card Upload (2 colunas) */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-6 shadow-sm">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-400 rounded-xl p-10 text-center cursor-pointer transition-all group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*,audio/*,.mp4,.webm,.mov,.mp3,.wav,.m4a"
                  className="hidden"
                />

                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {file ? '📎' : '🎥'}
                </div>

                {file ? (
                  <>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatSize(file.size)} — Clique para trocar</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Arraste ou clique para selecionar</p>
                    <p className="text-xs text-gray-400 mt-1">MP4, WEBM, MOV, MP3, WAV — até 100MB</p>
                  </>
                )}
              </div>

              {/* Botão Transcrever */}
              <button
                onClick={handleTranscribe}
                disabled={!file}
                className={`mt-5 w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  file
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-md active:scale-[0.99]'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                Transcrever Agora
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Card Configurações (1 coluna) */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-6 shadow-sm space-y-5">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Configurações</h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Idioma do áudio</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'pt' | 'en' | 'es')}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none"
                >
                  <option value="pt">Português (BR)</option>
                  <option value="en">Inglês</option>
                  <option value="es">Espanhol</option>
                </select>
              </div>

              {/* Mini cards de info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white">5s</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">Tempo médio</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white">98%</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">Precisão IA</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Sem cadastro necessário
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Arquivos excluídos automaticamente após processamento
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Exporta TXT, SRT e PDF
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Estado: Processando ─── */}
        {isProcessing && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-10 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl animate-pulse">
              🎙️
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{statusMessage}</h3>

            <div className="mt-5 max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gray-900 dark:bg-white h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-400 mt-2 block">{progress}%</span>
          </div>
        )}

        {/* ─── Estado: Resultado ─── */}
        {result && !isProcessing && (
          <div className="space-y-4 animate-fade-in">

            {/* Barra de métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.wordCount}</p>
                <p className="text-[11px] text-gray-400 font-medium">Palavras</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.duration}</p>
                <p className="text-[11px] text-gray-400 font-medium">Duração</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.subtitles.length}</p>
                <p className="text-[11px] text-gray-400 font-medium">Segmentos</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">✓</p>
                <p className="text-[11px] text-gray-400 font-medium">Concluído</p>
              </div>
            </div>

            {/* Card principal de resultado */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm overflow-hidden">

              {/* Header com abas e ações */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                {/* Abas */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  {(['texto', 'legendas', 'resumo'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${
                        activeTab === tab
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab === 'texto' ? '📝 Texto' : tab === 'legendas' ? '⏱️ SRT' : '💡 Resumo'}
                    </button>
                  ))}
                </div>

                {/* Botões de ação */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 transition-all"
                  >
                    {copied ? '✅ Copiado' : '📋 Copiar'}
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 transition-all"
                  >
                    📄 TXT
                  </button>
                  <button
                    onClick={handleDownloadSrt}
                    className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    🎬 Baixar SRT
                  </button>
                </div>
              </div>

              {/* Conteúdo da aba */}
              <div className="p-5">
                {activeTab === 'texto' && (
                  <textarea
                    readOnly
                    value={result.transcript}
                    className="w-full h-56 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none resize-none"
                  />
                )}

                {activeTab === 'legendas' && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {result.subtitles.map((sub, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                        <span className="shrink-0 text-[11px] font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          {sub.time}
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'resumo' && (
                  <ul className="space-y-3">
                    {result.summary.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">{i + 1}</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Botão de nova transcrição */}
            <button
              onClick={() => { setResult(null); setFile(null); }}
              className="w-full py-3 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-sm"
            >
              + Transcrever outro arquivo
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
