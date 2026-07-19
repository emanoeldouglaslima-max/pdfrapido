'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já consentiu
    const consent = localStorage.getItem('pdfrapido_cookie_consent');
    if (!consent) {
      // Pequeno delay para uma transição elegante
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pdfrapido_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 animate-slide-up">
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800 text-white rounded-2xl p-5 shadow-2xl shadow-black/40 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5" role="img" aria-label="cookie">
            🍪
          </span>
          <div className="space-y-1">
            <h4 className="font-bold text-sm tracking-tight">Valorizamos sua privacidade</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Utilizamos cookies para otimizar sua experiência de conversão de arquivos e personalizar anúncios com o Google AdSense. Ao continuar navegando, você concorda com nosso uso de cookies de acordo com a nossa{' '}
              <Link href="/cookies" className="text-brand-400 hover:underline font-semibold">
                Política de Cookies
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end text-xs">
          <Link
            href="/cookies"
            className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Configurar
          </Link>
          <button
            onClick={handleAccept}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-600/10 active:scale-[0.98]"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
