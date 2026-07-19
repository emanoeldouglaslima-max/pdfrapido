'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { TOOLS } from '../app/constants';

import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Inicializa o tema do localStorage/sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(savedTheme === 'dark' || isDark ? 'dark' : 'light');
  }, []);

  // Alterna o tema
  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40 dark:border-gray-800/50 dark:bg-gray-900/80 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Links rápidos para as principais ferramentas */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
          {TOOLS.slice(0, 4).map((t) => {
            const isActive = pathname === `/${t.slug}`;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800'
                    : ''
                }`}
              >
                {t.shortName || t.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 dark:bg-brand-500 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Separador visual */}
          <span className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Links institucionais */}
          <Link
            href="/blog"
            className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
              pathname.startsWith('/blog')
                ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800'
                : ''
            }`}
          >
            Blog
            {pathname.startsWith('/blog') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 dark:bg-brand-500 rounded-full" />
            )}
          </Link>
          <Link
            href="/sobre"
            className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
              pathname === '/sobre'
                ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800'
                : ''
            }`}
          >
            Sobre
            {pathname === '/sobre' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 dark:bg-brand-500 rounded-full" />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {pathname !== '/' && (
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Início
            </Link>
          )}

          {/* Botão de Alternar Modo Dark/Light */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 active:scale-95"
          >
            {theme === 'light' ? (
              <svg className="w-4.5 h-4.5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Badge animado "100% Grátis" */}
          <span className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md shadow-green-200 dark:shadow-none hover:shadow-lg transition-all duration-200 cursor-default">
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
