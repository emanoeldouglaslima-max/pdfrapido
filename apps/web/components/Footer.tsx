'use client';

import Link from 'next/link';
import Logo from './Logo';
import { TOOLS } from '../app/constants';

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 pt-14 pb-8 px-4 border-t border-gray-800 overflow-hidden">
      {/* Gradiente decorativo no topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      {/* Orbs decorativos */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Coluna 1 — Logo e descrição */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo className="invert brightness-200" />
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">
              As melhores ferramentas de PDF online, rápidas, seguras e 100% gratuitas para o público brasileiro. Seus arquivos são excluídos automaticamente.
            </p>
            {/* Selos de segurança */}
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-800">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                SSL/HTTPS
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-800">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                LGPD
              </span>
            </div>
          </div>

          {/* Coluna 2 — Ferramentas */}
          <div>
            <p className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Ferramentas de PDF</p>
            <ul className="grid grid-cols-1 gap-2">
              {TOOLS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="text-sm hover:text-white transition-colors block py-1 group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                      {t.icon} {t.shortName || t.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Institucional */}
          <div>
            <p className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Institucional</p>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Segurança e Legal */}
          <div>
            <p className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Segurança e Legal</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Todos os arquivos enviados são criptografados durante o upload e deletados permanentemente de nossos servidores após 30 minutos de processamento.
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href="/politica-de-privacidade"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-6 border-t border-gray-800/50 text-xs text-gray-600 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} PDFRápido. Todos os direitos reservados.</span>
          <span className="flex items-center gap-1.5">
            Feito com
            <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            para brasileiros
          </span>
        </div>
      </div>
    </footer>
  );
}
