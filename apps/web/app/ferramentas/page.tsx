import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS, CATEGORIES_CONFIG } from '../constants';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';
import { SITE_URL } from '../../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Todas as Ferramentas de PDF e Documentos — PDFRápido',
  description: 'Catálogo completo de ferramentas gratuitas para comprimir, converter, juntar, dividir, assinar e editar arquivos PDF e documentos online.',
  alternates: { canonical: `${SITE_URL}/ferramentas` },
};

export default function FerramentasPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
            ⚡ Catálogo Geral
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Todas as Ferramentas de PDF e Documentos
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Selecione qualquer utilitário abaixo. Processamento 100% online, gratuito, rápido e com descarte automático de dados.
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORIES_CONFIG.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            if (catTools.length === 0) return null;

            return (
              <div key={cat.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cat.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="group bg-gray-50 dark:bg-gray-800/60 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 flex items-center justify-center text-xl text-brand-600 dark:text-brand-400 flex-shrink-0">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '0000000003'}
            format="auto"
            className="ad-slot-horizontal"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
