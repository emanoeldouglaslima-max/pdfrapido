import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';
import { SITE_URL } from '../../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Modelos e Templates de Documentos em PDF — PDFRápido',
  description: 'Confira modelos prontos de orçamentos, recibos, propostas e declarações editáveis online em PDF de graça.',
  alternates: { canonical: `${SITE_URL}/modelos` },
};

const TEMPLATES = [
  {
    name: 'Modelo de Orçamento de Prestação de Serviços',
    desc: 'Ideal para autônomos, freelancers, consultores e pequenas empresas.',
    icon: '💼',
    link: '/gerar-orcamento',
    tag: 'Orçamento',
  },
  {
    name: 'Modelo de Orçamento Comercial para Vendas',
    desc: 'Formatado com tabela de produtos, quantidade e cálculo de frete.',
    icon: '📊',
    link: '/gerar-orcamento',
    tag: 'Orçamento',
  },
  {
    name: 'Modelo de Recibo Simples de Pagamento',
    desc: 'Comprovante pronto para impressão com vias para pagador e recebedor.',
    icon: '🧾',
    link: '/criar-documento',
    tag: 'Recibo',
  },
  {
    name: 'Modelo de Proposta de Prestação de Serviço',
    desc: 'Escopo detalhado, cronograma de execução e valores.',
    icon: '📝',
    link: '/criar-documento',
    tag: 'Proposta',
  },
];

export default function ModelosPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
            📂 Biblioteca de Templates
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Modelos de Documentos Editáveis em PDF
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Selecione um modelo pronto para preencher os dados do seu negócio e baixar em PDF em poucos segundos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.name}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{tmpl.icon}</span>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full">
                    {tmpl.tag}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tmpl.name}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tmpl.desc}
                </p>
              </div>

              <Link
                href={tmpl.link}
                className="mt-6 btn-primary text-xs py-2.5 px-4 inline-flex items-center justify-center gap-2 self-start"
              >
                Preencher Este Modelo ➔
              </Link>
            </div>
          ))}
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
