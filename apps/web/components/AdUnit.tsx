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
  const canShowAds = Boolean(
    adsenseId &&
    slot &&
    !/^0+$/.test(slot) &&
    process.env.NEXT_PUBLIC_ENABLE_AD_UNITS === 'true'
  );

  useEffect(() => {
    // Push only real, approved ad units. The AdSense account script can still
    // live in <head> for site review without rendering placeholder ad blocks.
    if (!canShowAds || pushed.current) return;

    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Silencioso — pode falhar em dev sem AdSense configurado
    }
  }, [canShowAds]);

  if (!canShowAds) {
    return null;
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
