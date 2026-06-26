'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { TOOLS } from '../app/constants';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Links rápidos para as principais ferramentas */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-600">
          {TOOLS.slice(0, 4).map((t) => {
            const isActive = pathname === `/${t.slug}`;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-brand-600 hover:bg-brand-50 ${
                  isActive
                    ? 'text-brand-600 font-bold bg-brand-50'
                    : ''
                }`}
              >
                {t.shortName || t.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 rounded-full" />
                )}
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

          {/* Badge animado "100% Grátis" */}
          <span className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md shadow-green-200 hover:shadow-lg transition-all duration-200 cursor-default">
            <svg className="w-3 h-3 animate-bounce-slow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            100% Grátis
          </span>
        </div>
      </div>
    </header>
  );
}
