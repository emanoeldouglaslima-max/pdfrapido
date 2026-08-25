'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  showLabel?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = 'auto',
  style,
  className = '',
  showLabel = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const canShowAds = Boolean(
    adsenseId &&
    slot &&
    !/^0+$/.test(slot) &&
    process.env.NEXT_PUBLIC_ENABLE_AD_UNITS === 'true'
  );

  useEffect(() => {
    if (!canShowAds || pushed.current) return;

    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silencioso em caso de bloqueador de anúncios ou ambiente de testes
    }
  }, [canShowAds]);

  if (!canShowAds) {
    return null;
  }

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center ${className}`}
      style={{
        minHeight: format === 'rectangle' ? 250 : 90,
        ...style,
      }}
    >
      {showLabel && (
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 select-none">
          Publicidade
        </span>
      )}
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
