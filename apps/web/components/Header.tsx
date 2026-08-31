'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { TOOLS, CATEGORIES_CONFIG } from '../app/constants';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Inicializa o tema do localStorage/sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(savedTheme === 'dark' || isDark ? 'dark' : 'light');
  }, []);

  // Fecha menu mobile e dropdowns ao trocar de rota
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-50 glass border-b border-white/40 dark:border-gray-800/50 dark:bg-gray-900/90 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Navegação Desktop com Dropdowns Categorizados */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {CATEGORIES_CONFIG.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            const isOpen = openDropdown === cat.id;

            return (
              <div key={cat.id} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : cat.id)}
                  onMouseEnter={() => setOpenDropdown(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/80 dark:hover:bg-gray-800 ${
                    isOpen ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800' : ''
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-2 z-50 animate-slide-down grid gap-1"
                  >
                    <p className="px-3 py-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {cat.name}
                    </p>
                    {catTools.map((t) => {
                      const isActive = pathname === `/${t.slug}`;
                      return (
                        <Link
                          key={t.slug}
                          href={`/${t.slug}`}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400'
                          }`}
                        >
                          <span className="text-sm">{t.icon}</span>
                          <span className="truncate">{t.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <span className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Links Institucionais */}
          <Link
            href="/blog"
            className={`px-3 py-2 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
              pathname.startsWith('/blog') ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800' : ''
            }`}
          >
            Blog
          </Link>
          <Link
            href="/sobre"
            className={`px-3 py-2 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
              pathname === '/sobre' ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800' : ''
            }`}
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className={`px-3 py-2 rounded-lg transition-all duration-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 ${
              pathname === '/contato' ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-gray-800' : ''
            }`}
          >
            Contato
          </Link>
        </nav>

        {/* Ações Direitas (Tema + Badge + Hamburguer) */}
        <div className="flex items-center gap-2">
          {pathname !== '/' && (
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Início
            </Link>
          )}

          {/* Alternar Dark/Light */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 active:scale-95"
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Badge Grátis */}
          <span className="hidden sm:flex items-center gap-1.5 text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 rounded-full font-bold shadow-sm cursor-default">
            ⚡ 100% Grátis
          </span>

          {/* Botão Hambúrguer Mobile */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-all active:scale-95"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Sanfonado por Categoria */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 max-h-[85vh] overflow-y-auto space-y-4 animate-fade-in">
          {CATEGORIES_CONFIG.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            return (
              <div key={cat.id} className="space-y-1">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5 px-2">
                  <span>{cat.icon}</span> {cat.name}
                </p>
                <div className="grid grid-cols-1 gap-1 pt-1">
                  {catTools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      <span>{t.icon}</span>
                      <span>{t.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link href="/blog" className="bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl text-center text-gray-700 dark:text-gray-200">
              📰 Blog
            </Link>
            <Link href="/sobre" className="bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl text-center text-gray-700 dark:text-gray-200">
              ℹ️ Sobre
            </Link>
            <Link href="/politica-de-privacidade" className="bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl text-center text-gray-700 dark:text-gray-200">
              🛡️ Privacidade
            </Link>
            <Link href="/contato" className="bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl text-center text-gray-700 dark:text-gray-200">
              ✉️ Contato
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
