'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS } from '../app/constants';

interface SearchOption {
  type: 'tool' | 'generator';
  title: string;
  desc: string;
  url: string;
  icon: string;
  badge: string;
}

const GENERATORS_OPTIONS: SearchOption[] = [
  { type: 'generator', title: 'Gerador de Orçamento Comercial', desc: 'Monte orçamentos em PDF com itens, descontos e prazos de entrega.', url: '/gerar-orcamento', icon: '💼', badge: 'Gerador' },
  { type: 'generator', title: 'Gerador de Recibo de Pagamento', desc: 'Gere recibos formais de prestação de serviço ou venda.', url: '/criar-documento', icon: '🧾', badge: 'Gerador' },
  { type: 'generator', title: 'Gerador de Currículo Profissional', desc: 'Crie seu currículo em modelo ATS pronto para baixar em PDF.', url: '/criar-documento', icon: '📄', badge: 'Gerador' },
  { type: 'generator', title: 'Gerador de Proposta Comercial', desc: 'Elabore propostas de serviços com investimento e cronograma.', url: '/criar-documento', icon: '📋', badge: 'Gerador' },
  { type: 'generator', title: 'Ordem de Serviço (OS)', desc: 'Crie folhas de ordem de serviço para oficinas e suporte técnico.', url: '/criar-documento', icon: '🛠️', badge: 'Gerador' },
  { type: 'generator', title: 'Checklist de Verificação', desc: 'Monte listas de tarefas e rotina para imprimir.', url: '/criar-documento', icon: '✅', badge: 'Gerador' },
];

export default function DocumentSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const allOptions = useMemo<SearchOption[]>(() => {
    const toolOptions: SearchOption[] = TOOLS.map((t) => ({
      type: 'tool',
      title: t.name,
      desc: t.description,
      url: `/${t.slug}`,
      icon: t.icon,
      badge: 'Ferramenta',
    }));

    return [...GENERATORS_OPTIONS, ...toolOptions];
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allOptions.filter(
      (opt) => opt.title.toLowerCase().includes(q) || opt.desc.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, allOptions]);

  return (
    <div className="relative max-w-2xl mx-auto w-full z-30">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Qual documento ou ferramenta você precisa hoje?"
          className="w-full bg-white dark:bg-gray-900 border-2 border-brand-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-2xl pl-12 pr-4 py-4 text-base font-semibold shadow-lg focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all duration-200"
        />
        <svg
          className="w-6 h-6 text-brand-500 absolute left-4 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Autocompletar / Resultados */}
      {isFocused && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-2 z-50 animate-slide-down">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {"Resultados para \""}{query}{"\""}
              </p>
              {filtered.map((opt) => (
                <Link
                  key={opt.title + opt.url}
                  href={opt.url}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    {opt.badge}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-gray-400">
              {"Nenhuma ferramenta encontrada para \""}{query}{"\". Tente buscar por Orçamento, Comprimir, Word ou Assinar."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
