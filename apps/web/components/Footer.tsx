'use client';

import Link from 'next/link';
import Logo from './Logo';
import { TOOLS, CATEGORIES_CONFIG } from '../app/constants';

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 pt-16 pb-8 px-4 border-t border-gray-800 overflow-hidden">
      {/* Gradiente decorativo no topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      {/* Orbs decorativos */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Coluna 1 & 2 — Logo, descrição e selos */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo forceDark />
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Plataforma 100% gratuita de ferramentas para PDF e conversão de arquivos. Processamento seguro na nuvem com exclusão automática dos documentos em até 30 minutos ou imediatamente após o download.
            </p>
            {/* Selos de segurança */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                🔒 Criptografia SSL/TLS 256-bit
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                🛡️ Conformidade LGPD
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                ⚡ Descarte Automático
              </span>
            </div>
          </div>

          {/* Colunas por Categoria de Ferramentas */}
          {CATEGORIES_CONFIG.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            return (
              <div key={cat.id}>
                <p className="text-white font-bold mb-3 text-xs tracking-wider uppercase flex items-center gap-1.5">
                  <span>{cat.icon}</span> {cat.name}
                </p>
                <ul className="space-y-1 text-xs">
                  {catTools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        className="hover:text-white transition-colors py-1 inline-block text-gray-400 hover:underline"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Coluna Institucional e Legal */}
          <div>
            <p className="text-white font-bold mb-3 text-xs tracking-wider uppercase flex items-center gap-1.5">
              📜 Transparência
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/sobre" rel="about" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Sobre Nós (Sobre)
                </Link>
              </li>
              <li>
                <Link href="/contato" rel="contact" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Contato (Fale Conosco)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Blog & Tutoriais
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" rel="privacy-policy" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" rel="terms-of-service" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" rel="disclaimer" className="hover:text-white transition-colors text-gray-400 hover:underline">
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-6 border-t border-gray-800/80 text-[11px] text-gray-500 text-center flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} PDFRápido. Todos os direitos reservados.</span>
          <span>Desenvolvido com foco em velocidade, utilidade e privacidade para o Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  );
}
