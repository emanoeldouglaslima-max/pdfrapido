'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { trackFileUpload, trackToolStart, trackToolComplete, trackDownload } from '../../lib/analytics';

interface Segment {
  start: number;
  end: number;
  text: string;
}

export default function TranscreverVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [language, setLanguage] = useState<string>('pt');
  const [modelMode, setModelMode] = useState<'whale' | 'dolphin' | 'cheetah'>('whale');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Abas: Transcrição por tempo, Texto Completo contínuo, ou Resumo por IA
  const [activeTab, setActiveTab] = useState<'tempo' | 'completo' | 'resumo'>('tempo');
  const [copied, setCopied] = useState(false);
  const [copiedParagraphIdx, setCopiedParagraphIdx] = useState<number | null>(null);
  
  // Estado interativo de reprodução e edição
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [followPlayback, setFollowPlayback] = useState(true);

  const [result, setResult] = useState<{
    transcript: string;
    summary: string[];
    wordCount: number;
    duration: string;
    subtitles: { time: string; text: string }[];
    segments: Segment[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const segmentsContainerRef = useRef<HTMLDivElement>(null);

  // Libera a URL do arquivo de mídia temporário ao desmontar
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  // Sincroniza a velocidade do player
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, result]);

  // Autoscroll para o segmento ativo durante a reprodução
  useEffect(() => {
    if (!followPlayback || !result || !mediaRef.current || isEditing || activeTab !== 'tempo') return;

    const activeSegIdx = result.segments.findIndex(
      (seg) => currentTime >= seg.start && currentTime <= seg.end
    );

    if (activeSegIdx !== -1) {
      const activeEl = document.getElementById(`segment-${activeSegIdx}`);
      if (activeEl && segmentsContainerRef.current) {
        const container = segmentsContainerRef.current;
        const rect = activeEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const isVisible = rect.top >= containerRect.top && rect.bottom <= containerRect.bottom;

        if (!isVisible) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }, [currentTime, result, followPlayback, isEditing, activeTab]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      if (selected.size > 100 * 1024 * 1024) {
        alert('Arquivo maior que 100MB. Escolha um arquivo menor.');
        return;
      }
      setFile(selected);
      setResult(null);
      trackFileUpload('transcrever-video-em-texto', 1, selected.size);
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      setFileUrl(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      const selected = e.dataTransfer.files[0];
      if (selected.size > 100 * 1024 * 1024) {
        alert('Arquivo maior que 100MB. Escolha um arquivo menor.');
        return;
      }
      setFile(selected);
      setResult(null);
      trackFileUpload('transcrever-video-em-texto', 1, selected.size);
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      setFileUrl(URL.createObjectURL(selected));
    }
  };

  // Atualiza duração exata quando os metadados do arquivo carregam no navegador
  const handleMediaLoaded = (e: React.SyntheticEvent<HTMLAudioElement | HTMLVideoElement>) => {
    const dur = e.currentTarget.duration;
    if (dur && !isNaN(dur) && dur > 0) {
      const formatted = formatTime(Math.round(dur));
      setResult((prev) => (prev ? { ...prev, duration: formatted } : prev));
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);
    setStatusMessage('Enviando arquivo para o servidor de processamento...');
    trackToolStart('transcrever-video-em-texto', { language, model: modelMode });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('model', modelMode);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pdfrapido-api.onrender.com';

    try {
      const response = await fetch(`${apiUrl}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao enviar arquivo para o servidor');
      }

      const { jobId } = await response.json();
      setProgress(25);
      setStatusMessage('Áudio enviado! Processando transcrição em alta precisão...');

      // Polling para acompanhar o status do job
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`${apiUrl}/api/transcribe/result/${jobId}`);
          if (!statusRes.ok) return;

          const statusData = await statusRes.json();

          if (statusData.status === 'processing') {
            setProgress((prev) => Math.min(prev + 5, 90));
            setStatusMessage('Processando a fala e estruturando o texto...');
          } else if (statusData.status === 'done' && statusData.data) {
            clearInterval(pollInterval);
            setProgress(100);
            setIsProcessing(false);
            trackToolComplete('transcrever-video-em-texto');

            let segments = statusData.data.segments || [];
            if (segments.length === 0 && statusData.data.subtitles) {
              segments = statusData.data.subtitles.map((sub: any) => {
                const parts = sub.time.split('→').map((t: string) => t.trim());
                const parseTime = (timeStr: string) => {
                  const [m, s] = timeStr.split(':').map(Number);
                  return (m || 0) * 60 + (s || 0);
                };
                return {
                  start: parseTime(parts[0]),
                  end: parseTime(parts[1] || parts[0]),
                  text: sub.text,
                };
              });
            }

            // Duração calculada do backend ou dos segmentos
            let calculatedDuration = statusData.data.duration || '00:00';
            if (calculatedDuration === '00:00' && segments.length > 0) {
              const lastSec = Math.ceil(segments[segments.length - 1].end || 0);
              if (lastSec > 0) calculatedDuration = formatTime(lastSec);
            }

            setResult({
              transcript: statusData.data.transcript || 'Nenhum texto detectado.',
              summary: statusData.data.summary || ['Transcrição concluída com sucesso.'],
              wordCount: statusData.data.wordCount || 0,
              duration: calculatedDuration,
              subtitles: statusData.data.subtitles || [],
              segments: segments,
            });
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            setIsProcessing(false);
            alert(`Erro no processamento: ${statusData.error || 'Falha na transcrição'}`);
          }
        } catch {
          // Ignora erros temporários de conexão durante o polling
        }
      }, 2000);

    } catch (err: any) {
      setIsProcessing(false);
      alert(`Falha no upload: ${err.message || 'Verifique sua conexão com a API'}`);
    }
  };

  const getEditableText = () => {
    if (!result) return '';
    if (result.segments && result.segments.length > 0) {
      return result.segments.map((s) => s.text).join('\n\n');
    }
    return result.transcript;
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(getEditableText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyParagraph = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedParagraphIdx(idx);
    setTimeout(() => setCopiedParagraphIdx(null), 2000);
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // 1. Download em TXT
  const handleDownloadTxt = () => {
    if (!result || !file) return;
    const textContent = getEditableText();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    trackDownload('transcrever-video-em-texto', `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.txt`);
    downloadBlob(blob, `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.txt`);
  };

  // 2. Download em Word (.DOCX)
  const handleDownloadDocx = async () => {
    if (!result || !file) return;
    try {
      trackDownload('transcrever-video-em-texto', `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.docx`);
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
      const textContent = getEditableText();
      const rawParagraphs = textContent.split(/\n+/).filter(Boolean);
      const paragraphsList = rawParagraphs.length > 0 ? rawParagraphs : [textContent];

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: 'Transcrição de Áudio — PDFRápido',
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 120 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Arquivo: ${file.name} | Duração: ${result.duration} | Palavras: ${result.wordCount}`,
                    italics: true,
                    color: '666666',
                    size: 20,
                  }),
                ],
                spacing: { after: 300 },
              }),
              ...paragraphsList.map(
                (p) =>
                  new Paragraph({
                    children: [new TextRun({ text: p, size: 23 })],
                    spacing: { after: 200 },
                  })
              ),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      downloadBlob(blob, `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.docx`);
    } catch (err: any) {
      alert('Erro ao gerar documento Word: ' + err.message);
    }
  };

  // 3. Download em PDF (.PDF)
  const handleDownloadPdf = async () => {
    if (!result || !file) return;
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const margin = 50;
      const pageWidth = 595.28; // A4
      const pageHeight = 841.89; // A4
      const contentWidth = pageWidth - margin * 2;
      const fontSize = 10;
      const lineHeight = 14;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      // Cabeçalho PDF
      page.drawText('PDFRápido — Transcrição de Áudio / Vídeo', {
        x: margin,
        y,
        size: 15,
        font: fontBold,
        color: rgb(0.12, 0.12, 0.18),
      });
      y -= 20;

      page.drawText(`Arquivo: ${file.name}  |  Duração: ${result.duration}  |  Palavras: ${result.wordCount}`, {
        x: margin,
        y,
        size: 8.5,
        font: font,
        color: rgb(0.45, 0.45, 0.5),
      });
      y -= 20;

      page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: 0.8,
        color: rgb(0.85, 0.85, 0.9),
      });
      y -= 18;

      // Parágrafos
      const textContent = getEditableText();
      const rawParagraphs = textContent.split(/\n+/).filter(Boolean);
      const paragraphs = rawParagraphs.length > 0 ? rawParagraphs : [textContent];

      for (const paragraph of paragraphs) {
        const words = paragraph.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const width = font.widthOfTextAtSize(testLine, fontSize);

          if (width > contentWidth && currentLine) {
            if (y < margin + lineHeight) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
            page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.15, 0.15, 0.15) });
            y -= lineHeight;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          if (y < margin + lineHeight) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.15, 0.15, 0.15) });
          y -= lineHeight + 7;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      trackDownload('transcrever-video-em-texto', `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.pdf`);
      downloadBlob(blob, `${file.name.replace(/\.[^/.]+$/, '')}_transcricao.pdf`);
    } catch (err: any) {
      alert('Erro ao gerar PDF: ' + err.message);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleJumpToTime = (start: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = start;
      mediaRef.current.play();
    }
  };

  const handleSegmentTextChange = (index: number, newText: string) => {
    if (!result) return;
    const updatedSegments = [...result.segments];
    updatedSegments[index].text = newText;
    setResult({ ...result, segments: updatedSegments });
  };

  const getFilteredSegments = () => {
    if (!result) return [];
    if (!searchTerm.trim()) return result.segments;
    return result.segments.map((seg, idx) => ({ ...seg, originalIdx: idx })).filter((seg) =>
      seg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredSegments = getFilteredSegments();
  const isVideo = file?.type.startsWith('video/');

  // Agrupa os segmentos em parágrafos naturais e fluídos para a aba "Texto Completo"
  const getFullParagraphs = () => {
    if (!result) return [];
    const text = getEditableText();
    const split = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
    if (split.length > 1) return split;

    // Se veio um bloco único contínuo, quebra inteligentemente por sentenças para facilitar leitura
    const sentences = text.split(/(?<=[.?!])\s+/);
    const paragraphs: string[] = [];
    let cur = '';

    for (const s of sentences) {
      cur = cur ? `${cur} ${s}` : s;
      if (cur.length > 250) {
        paragraphs.push(cur);
        cur = '';
      }
    }
    if (cur) paragraphs.push(cur);
    return paragraphs.length > 0 ? paragraphs : [text];
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Título */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-800/60 px-3.5 py-1.5 rounded-full shadow-sm">
            ⚡ Reconhecimento Automático de Fala
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-4">
            Transcrição de Áudio e Vídeo
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Converta palestras, reuniões, aulas e vídeos em texto limpo, resumos estruturados e exporte em PDF ou Word (.docx).
          </p>
        </div>

        {/* ─── ESTADO: Upload Inicial ─── */}
        {!result && !isProcessing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card de Drop / Upload */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-400 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group bg-gray-50/50 dark:bg-gray-800/30"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*,audio/*,.mp4,.webm,.mov,.mp3,.wav,.m4a"
                  className="hidden"
                />

                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-brand-100 to-indigo-100 dark:from-brand-900/30 dark:to-indigo-900/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {file ? '📎' : '🎥'}
                </div>

                {file ? (
                  <div className="space-y-2">
                    <p className="font-bold text-gray-800 dark:text-white text-base truncate max-w-md mx-auto">{file.name}</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{formatSize(file.size)}</p>
                    <p className="text-xs text-gray-400">Clique ou arraste outro para substituir</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-bold text-gray-850 dark:text-white text-base">Arraste seu vídeo ou áudio aqui</p>
                    <p className="text-xs text-gray-400">ou <span className="text-brand-600 dark:text-brand-400 underline font-semibold">clique para procurar</span> no seu dispositivo</p>
                    <p className="text-[11px] text-gray-400">MP4, WEBM, MOV, MP3, WAV, M4A · Limite: 100MB</p>
                  </div>
                )}
              </div>

              {/* Botão de Transcrição */}
              <button
                onClick={handleTranscribe}
                disabled={!file}
                className={`mt-6 w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                  file
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-100 dark:shadow-none active:scale-[0.99] cursor-pointer'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-650 cursor-not-allowed'
                }`}
              >
                Começar transcrição gratuita 🚀
              </button>
            </div>

            {/* Configurações Extra */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-450 dark:text-gray-455 uppercase tracking-widest mb-4">Ajustes da Transcrição</h3>
                <div className="space-y-4">
                  {/* Idioma */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Idioma do Áudio</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    >
                      <option value="pt">Português (BR)</option>
                      <option value="en">Inglês</option>
                      <option value="es">Espanhol</option>
                      <option value="fr">Francês</option>
                      <option value="de">Alemão</option>
                      <option value="it">Italiano</option>
                    </select>
                  </div>

                  {/* Qualidade do Reconhecimento */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">Qualidade do Processamento</label>
                    <div className="grid grid-cols-1 gap-2">
                      <div
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-500 bg-brand-50/20 dark:bg-brand-950/20 ring-1 ring-brand-500"
                      >
                        <span className="text-xl">⚡</span>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">Alta Fidelidade (Recomendado)</p>
                          <p className="text-[10px] text-gray-400">Pontuação natural, timestamps precisos e síntese dos pontos-chave.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-4 space-y-2.5 text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Sem limites diários artificiais
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Exporta diretamente em PDF, Word e TXT
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── ESTADO: Processando / Transcrevendo ─── */}
        {isProcessing && (
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-8 md:p-12 shadow-sm text-center space-y-6 animate-pulse">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-4xl shadow-inner animate-bounce">
              🎙️
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-lg text-gray-850 dark:text-white">{statusMessage}</h3>
              <p className="text-xs text-gray-400">Isso pode levar de alguns segundos a minutos dependendo do tamanho do arquivo.</p>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-gray-150 dark:bg-gray-800">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                />
              </div>
              <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400 mt-2 block">{progress}% concluído</span>
            </div>
          </div>
        )}

        {/* ─── ESTADO: Dashboard de Resultado Interativo ─── */}
        {result && !isProcessing && (
          <div className="space-y-6 animate-fade-in">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-800 dark:text-white">{result.wordCount}</p>
                <p className="text-xs text-gray-400 mt-0.5">Palavras</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-800 dark:text-white">{result.duration}</p>
                <p className="text-xs text-gray-400 mt-0.5">Duração do Áudio</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-gray-800 dark:text-white">{result.segments.length}</p>
                <p className="text-xs text-gray-400 mt-0.5">Trechos Temporais</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-4 shadow-sm text-center">
                <p className="text-2xl font-extrabold text-green-500">100%</p>
                <p className="text-xs text-gray-400 mt-0.5">Concluído</p>
              </div>
            </div>

            {/* Layout Principal Duas Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Coluna Esquerda: Player e Exportações */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Player de Mídia</h3>
                  
                  {/* Container de mídia dinâmica */}
                  <div className="rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-3 shadow-inner">
                    {isVideo ? (
                      <video
                        ref={mediaRef as any}
                        src={fileUrl}
                        controls
                        onLoadedMetadata={handleMediaLoaded}
                        onTimeUpdate={(e) => setCurrentTime((e.target as any).currentTime)}
                        className="w-full max-h-56 object-contain"
                      />
                    ) : (
                      <div className="w-full py-4 text-center">
                        <span className="text-4xl block mb-3 animate-pulse">🎵</span>
                        <audio
                          ref={mediaRef as any}
                          src={fileUrl}
                          controls
                          onLoadedMetadata={handleMediaLoaded}
                          onTimeUpdate={(e) => setCurrentTime((e.target as any).currentTime)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Controle de Velocidade */}
                  <div className="flex items-center justify-between text-xs border-t border-gray-100 dark:border-gray-850 pt-3">
                    <span className="font-semibold text-gray-500">Velocidade:</span>
                    <div className="flex gap-1.5">
                      {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`px-2 py-1 rounded-md font-bold transition-all ${
                            playbackSpeed === speed
                              ? 'bg-brand-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info do Arquivo */}
                  <div className="border-t border-gray-100 dark:border-gray-850 pt-3 space-y-2 text-xs text-gray-500">
                    <p className="truncate"><span className="font-semibold">Arquivo:</span> {file?.name}</p>
                    <p><span className="font-semibold">Tamanho:</span> {file && formatSize(file.size)}</p>
                    <p><span className="font-semibold">Duração:</span> {result.duration}</p>
                  </div>
                </div>

                {/* Opções de Download Aprimoradas (PDF, DOCX, TXT) */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 p-5 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Exportar Resultados</h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Botão Baixar em PDF */}
                    <button
                      onClick={handleDownloadPdf}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800/60 rounded-2xl text-xs font-bold text-brand-700 dark:text-brand-300 transition-all shadow-sm group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">📄</span>
                        <span>Baixar em PDF (.PDF)</span>
                      </span>
                      <span className="bg-brand-200/60 dark:bg-brand-800 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">PDF</span>
                    </button>

                    {/* Botão Baixar em Word */}
                    <button
                      onClick={handleDownloadDocx}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl text-xs font-bold text-indigo-700 dark:text-indigo-300 transition-all shadow-sm group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">📝</span>
                        <span>Baixar em Word (.DOCX)</span>
                      </span>
                      <span className="bg-indigo-200/60 dark:bg-indigo-800 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">DOCX</span>
                    </button>

                    {/* Botão Baixar em TXT */}
                    <button
                      onClick={handleDownloadTxt}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-2xl text-xs font-bold text-gray-700 dark:text-gray-200 transition-all border border-gray-150 dark:border-gray-800"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">📋</span>
                        <span>Baixar Texto (.TXT)</span>
                      </span>
                      <span className="text-gray-400 text-[10px] uppercase font-bold">TXT</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Abas (Tempo, Texto Completo, Resumo) */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                
                {/* Header com as 3 Abas */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-850">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
                    <button
                      onClick={() => setActiveTab('tempo')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'tempo'
                          ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      ⏱️ Transcrição por Tempo
                    </button>

                    <button
                      onClick={() => setActiveTab('completo')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'completo'
                          ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      📄 Texto Completo
                    </button>

                    <button
                      onClick={() => setActiveTab('resumo')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'resumo'
                          ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      💡 Destaques & Síntese
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Botão Copiar Tudo */}
                    <button
                      onClick={handleCopy}
                      className="px-3.5 py-2 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:opacity-90 rounded-xl text-xs font-bold transition-all"
                    >
                      {copied ? '✅ Copiado!' : '📋 Copiar tudo'}
                    </button>
                  </div>
                </div>

                {/* Filtro e Busca na aba de Tempo */}
                {activeTab === 'tempo' && (
                  <div className="bg-gray-50/50 dark:bg-gray-950/30 border-b border-gray-100 dark:border-gray-850 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Buscar palavras..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs rounded-xl pl-8 pr-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-gray-400"
                      />
                      <svg className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={followPlayback}
                          onChange={(e) => setFollowPlayback(e.target.checked)}
                          className="rounded text-brand-600 focus:ring-brand-500 border-gray-300"
                        />
                        Seguir reprodução
                      </label>

                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          isEditing
                            ? 'bg-brand-600 border-brand-600 text-white shadow-sm shadow-brand-100 dark:shadow-none'
                            : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {isEditing ? '🔒 Travar' : '✏️ Editar'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Conteúdo da Aba */}
                <div className="p-6 flex-grow">
                  
                  {/* 1. Aba Transcrição por Tempo */}
                  {activeTab === 'tempo' && (
                    <div
                      ref={segmentsContainerRef}
                      className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin"
                    >
                      {filteredSegments.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm">
                          Nenhum trecho correspondente à busca.
                        </div>
                      ) : (
                        filteredSegments.map((seg, i) => {
                          const idx = (seg as any).originalIdx !== undefined ? (seg as any).originalIdx : i;
                          const isActive = currentTime >= seg.start && currentTime <= seg.end;
                          
                          return (
                            <div
                              key={idx}
                              id={`segment-${idx}`}
                              className={`group relative flex flex-col md:flex-row gap-3 items-start p-3 rounded-2xl border transition-all duration-200 ${
                                isActive
                                  ? 'border-brand-500 bg-brand-50/10 dark:bg-brand-950/20 ring-1 ring-brand-500 shadow-sm shadow-brand-50'
                                  : 'border-transparent hover:bg-gray-50/50 dark:hover:bg-gray-800/20'
                              }`}
                            >
                              {/* Botão de Tempo */}
                              <button
                                onClick={() => handleJumpToTime(seg.start)}
                                className={`shrink-0 flex items-center gap-1 font-mono text-[11px] font-bold px-2.5 py-1.5 rounded-lg border shadow-sm transition-all active:scale-95 ${
                                  isActive
                                    ? 'bg-brand-600 border-brand-600 text-white'
                                    : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white'
                                }`}
                                title="Pular áudio para este trecho"
                              >
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                                {formatTime(seg.start)}
                              </button>

                              {/* Texto */}
                              <div className="flex-1 w-full">
                                {isEditing ? (
                                  <textarea
                                    value={seg.text}
                                    rows={1}
                                    onChange={(e) => handleSegmentTextChange(idx, e.target.value)}
                                    className="w-full text-sm bg-gray-50 dark:bg-gray-950 border border-gray-250 dark:border-gray-850 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-y"
                                  />
                                ) : (
                                  <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                                    isActive
                                      ? 'text-gray-900 dark:text-white font-medium'
                                      : 'text-gray-650 dark:text-gray-300'
                                  }`}>
                                    {seg.text}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* 2. Aba Texto Completo (Parágrafos Fluídos e Contínuos) */}
                  {activeTab === 'completo' && (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                      <div className="bg-gray-50 dark:bg-gray-950/40 p-6 rounded-2xl border border-gray-150 dark:border-gray-850 space-y-5">
                        {getFullParagraphs().map((paragraph, pIdx) => (
                          <div key={pIdx} className="group relative">
                            <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 font-normal">
                              {paragraph}
                            </p>
                            <button
                              onClick={() => handleCopyParagraph(paragraph, pIdx)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                            >
                              {copiedParagraphIdx === pIdx ? '✅ Parágrafo copiado!' : '📋 Copiar parágrafo'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Aba Destaques & Síntese */}
                  {activeTab === 'resumo' && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pontos Principais & Conclusões</h4>
                      <ul className="space-y-3">
                        {result.summary.map((point, i) => (
                          <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-850">
                            <span className="shrink-0 w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs font-bold text-brand-700 dark:text-brand-400">
                              {i + 1}
                            </span>
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Nova Transcrição */}
            <button
              onClick={() => { setResult(null); setFile(null); setFileUrl(''); }}
              className="w-full py-4 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-850 border border-gray-200/80 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all shadow-sm"
            >
              + Transcrever novo arquivo de áudio ou vídeo
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO EDITORIAL RICO — GUIA COMPLETO, CASOS DE USO E FAQ (ADSENSE/SEO) */}
        {/* ========================================================================= */}
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800 space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          
          {/* 1. O que é e Como Funciona */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              O que é e como funciona o Transcritor de Vídeo e Áudio em Texto?
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              O <strong>Transcritor de Vídeo em Texto do PDFRápido</strong> é uma ferramenta online de alta precisão projetada para converter arquivos audiovisuais e faixas sonoras em texto corrido estruturado, pontuado e pesquisável. Utilizando processamento avançado de reconhecimento automático de fala (ASR), o sistema separa as frequências vocais dos ruídos de fundo, transcrevendo falas em português (Brasil), inglês ou espanhol em poucos segundos.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Diferente de métodos manuais que exigem pausar o áudio a cada 3 segundos, nossa plataforma processa todo o conteúdo na nuvem e entrega a transcrição dividida em blocos de tempo sincronizados, em parágrafos contínuos para leitura e em tópicos de destaques e síntese para revisão rápida.
            </p>
          </div>

          {/* 2. Guia Passo a Passo */}
          <div className="bg-gray-50 dark:bg-gray-850/60 p-6 md:p-8 rounded-3xl border border-gray-150 dark:border-gray-800 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>📋</span> Como Transcrever Vídeos e Áudios em 4 Passos Simples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center mb-3">1</span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Selecione seu Arquivo</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Arraste gravações em MP4, WEBM, MOV, MP3, M4A, OGG ou WAV de até 100MB diretamente no navegador.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center mb-3">2</span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Defina o Idioma e Modo</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Escolha o idioma nativo da fala e a modalidade de processamento (Baleia para máxima precisão ou Guepardo para ultra velocidade).</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center mb-3">3</span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Revise e Edite</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Acompanhe a reprodução sincronizada, faça buscas por palavras-chave ou edite qualquer termo diretamente na tela.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <span className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center mb-3">4</span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Exporte em PDF ou Word</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Baixe o documento completo em PDF (.pdf) ou Word (.docx) pronto para ser compartilhado ou arquivado.</p>
              </div>
            </div>
          </div>

          {/* 3. Tabela Comparativa de Formatos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Formatos de Arquivos Suportados e Recomendações
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-gray-200 dark:border-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Tipo de Mídia</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Extensões Aceitas</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Ideal Para</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Velocidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Vídeo</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">MP4, WEBM, MOV, MKV</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Videoaulas, reuniões gravadas, podcasts em vídeo e entrevistas.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-emerald-600 dark:text-emerald-400 font-bold">Rápida</td>
                  </tr>
                  <tr className="bg-gray-50/50 dark:bg-gray-850/40">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Áudio Comprimido</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">MP3, M4A, AAC, OGG</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Áudios do WhatsApp, gravador de voz do celular, reuniões sem vídeo.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-emerald-600 dark:text-emerald-400 font-bold">Ultra Rápida</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-semibold">Áudio Sem Perdas</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">WAV, FLAC</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Gravações profissionais de microfone de lapela ou estúdio.</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 font-bold">Padrão</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Segurança e LGPD */}
          <div className="bg-gray-50 dark:bg-gray-850/60 p-6 md:p-8 rounded-3xl border border-gray-150 dark:border-gray-800 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🛡️</span> Privacidade e Segurança de Dados (LGPD)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Sabemos que reuniões e gravações de voz frequentemente contêm dados confidenciais, termos contratuais e discussões internas de empresas. Por isso, nossa infraestrutura segue rigorosamente a Lei Geral de Proteção de Dados (LGPD):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              <li><strong>Criptografia SSL de 256 bits:</strong> Todos os uploads e downloads trafegam por canais seguros e protegidos.</li>
              <li><strong>Sem Retenção Permanente:</strong> Os arquivos de mídia e os textos gerados são apagados automaticamente da memória do servidor após o download.</li>
              <li><strong>Zero Treinamento com Seus Dados:</strong> Suas gravações nunca são utilizadas para treinar modelos públicos de linguagem ou compartilhadas com terceiros.</li>
            </ul>
          </div>

          {/* 5. FAQ — Perguntas Frequentes */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Perguntas Frequentes sobre Transcrição de Vídeo
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">A ferramenta de transcrição é realmente gratuita?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Sim! O PDFRápido disponibiliza o transcritor de forma 100% gratuita, sem necessidade de cadastro, sem cartão de crédito e sem cobranças ocultas.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">Qual o tamanho máximo de arquivo aceito?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Você pode enviar arquivos de áudio ou vídeo de até <strong>100MB</strong> por processamento, o que é suficiente para a grande maioria das videoaulas, podcasts e reuniões corporativas.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">Em quais formatos posso baixar o texto final?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Você pode baixar o resultado em <strong>PDF (.pdf)</strong> formatado com paginação e cabeçalho limpo, em <strong>Word (.docx)</strong> pronto para edição no Microsoft Word/Google Docs, ou em <strong>Texto Puro (.txt)</strong>.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">A transcrição funciona bem em celulares?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Sim. Nossa interface é 100% responsiva e funciona perfeitamente pelo navegador em smartphones Android, iPhones, iPads e tablets.
                </p>
              </div>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
