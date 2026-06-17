'use client';

import Link from 'next/link';
import Logo from './Logo';
import { TOOLS } from '../app/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4 border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo className="invert brightness-200" />
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">
              As melhores ferramentas de PDF online, rápidas, seguras e 100% gratuitas para o público brasileiro. Seus arquivos são excluídos automaticamente.
            </p>
          </div>
          <div>
            <p className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Ferramentas de PDF</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOOLS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="text-sm hover:text-white transition-colors block py-0.5">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-bold mb-4 text-sm tracking-wider uppercase">Segurança e Privacidade</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Todos os arquivos enviados são criptografados durante o upload e deletados permanentemente de nossos servidores após 30 minutos de processamento.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-900 text-xs text-gray-600 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} PDFRápido. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Políticas de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
