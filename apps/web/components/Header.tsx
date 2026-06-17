'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { TOOLS } from '../app/constants';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Links rápidos para as principais ferramentas */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          {TOOLS.slice(0, 4).map((t) => {
            const isActive = pathname === `/${t.slug}`;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`transition-colors hover:text-brand-600 py-1 ${
                  isActive ? 'text-brand-600 font-bold border-b-2 border-brand-600' : ''
                }`}
              >
                {t.name.replace(' PDF', '')}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {pathname !== '/' && (
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Início
            </Link>
          )}
          <span className="text-xs bg-green-50 text-green-700 border border-green-200/60 px-3 py-1.5 rounded-full font-semibold shadow-sm animate-pulse">
            ⚡ 100% Grátis
          </span>
        </div>
      </div>
    </header>
  );
}
