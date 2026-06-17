'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, format = 'auto', style, className }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    // Só executar uma vez por montagem e somente se o AdSense estiver configurado
    if (!adsenseId || pushed.current) return;

    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Silencioso — pode falhar em dev sem AdSense configurado
    }
  }, [adsenseId]);

  // Em dev sem AdSense: mostrar placeholder visual
  if (!adsenseId) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-400 text-[10px] uppercase tracking-widest ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        <span className="opacity-70 font-medium">Anúncio Patrocinado</span>
        <span className="text-[8px] opacity-40 mt-0.5 font-mono">ID: {slot}</span>
      </div>
    );
  }

  return (
    // Wrapper com min-height fixo para evitar CLS
    <div
      className={className}
      style={{ minHeight: format === 'rectangle' ? 250 : 90, ...style }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
