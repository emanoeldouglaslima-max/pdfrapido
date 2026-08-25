'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackConsentUpdate } from '../lib/analytics';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Verifica se o usuário já possui consentimento registrado
    const savedConsent = localStorage.getItem('pdfrapido_cookie_consent');
    if (!savedConsent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed: CookiePreferences = JSON.parse(savedConsent);
        trackConsentUpdate(parsed.analytics, parsed.marketing);
      } catch {
        // Formato legado ('accepted')
        trackConsentUpdate(true, true);
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('pdfrapido_cookie_consent', JSON.stringify(prefs));
    trackConsentUpdate(prefs.analytics, prefs.marketing);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 animate-slide-up"
    >
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-800 text-white rounded-2xl p-5 shadow-2xl shadow-black/50 flex flex-col gap-4">
        
        {/* Cabeçalho do Banner */}
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5 select-none" role="img" aria-label="ícone de cookie">
            🍪
          </span>
          <div className="space-y-1.5 flex-1">
            <h2 className="font-bold text-sm tracking-tight text-white">Privacidade e Uso de Cookies</h2>
            <p className="text-xs text-gray-300 dark:text-gray-300 leading-relaxed">
              Utilizamos cookies necessários para o funcionamento correto das ferramentas e cookies opcionais para análise de navegação e exibição de anúncios personalizados via Google AdSense. Saiba mais em nossa{' '}
              <Link href="/cookies" className="text-brand-400 hover:text-brand-300 underline font-semibold">
                Política de Cookies
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Modal/Expansor de Configuração de Preferências */}
        {showSettings && (
          <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-3.5 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-200">Essenciais (Necessários)</p>
                <p className="text-[11px] text-gray-400">Processamento de arquivos e segurança.</p>
              </div>
              <span className="text-[10px] font-bold bg-brand-900/60 text-brand-300 px-2 py-0.5 rounded-md border border-brand-700/50">
                Sempre Ativo
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
              <div>
                <p className="font-bold text-gray-200">Estatísticas & Desempenho</p>
                <p className="text-[11px] text-gray-400">Ajuda a medir o uso das ferramentas.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="sr-only peer"
                  aria-label="Permitir cookies de estatísticas"
                />
                <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
              <div>
                <p className="font-bold text-gray-200">Publicidade Personalizada</p>
                <p className="text-[11px] text-gray-400">Google AdSense e parceiros de mídia.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="sr-only peer"
                  aria-label="Permitir cookies de publicidade"
                />
                <div className="w-8 h-4 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-2 justify-end text-xs pt-1">
          {!showSettings ? (
            <>
              <button
                onClick={() => setShowSettings(true)}
                className="px-3 py-2 text-gray-400 hover:text-white transition-colors underline font-medium"
              >
                Personalizar
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-3.5 py-2 rounded-xl transition-all border border-gray-700 active:scale-95"
              >
                Apenas Essenciais
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-600/20 active:scale-95"
              >
                Aceitar Todos
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleSaveCustom}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-600/20 active:scale-95"
              >
                Salvar Preferências
              </button>
            </>
          )}
        </div>

      </div>
    </aside>
  );
}
