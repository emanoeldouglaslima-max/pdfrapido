import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS, CATEGORIES_CONFIG } from './constants';
import AdUnit from '../components/AdUnit';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComparisonTable from '../components/ComparisonTable';
import DocumentSearch from '../components/DocumentSearch';
import { SITE_URL } from '../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Crie, Edite e Transforme seus Documentos em PDF — PDFRápido',
  description:
    'Ferramentas rápidas e gratuitas para trabalhar com documentos online. Crie orçamentos, recibos e currículos em PDF. Comprima, converta e assine sem cadastro.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'PDFRápido — Crie, Edite e Transforme Documentos em PDF',
    description: 'Geradores de documentos e ferramentas de PDF gratuitas, rápidas e seguras com conformidade LGPD.',
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

async function getStats(): Promise<{ total_files_processed: number }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return { total_files_processed: 0 };

  try {
    const res = await fetch(`${apiUrl}/api/stats`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return { total_files_processed: 0 };
    return res.json();
  } catch {
    return { total_files_processed: 0 };
  }
}

const DOCUMENT_GENERATORS = [
  {
    title: 'Orçamento Comercial',
    desc: 'Crie orçamentos em PDF com calculadores de desconto, itens e prazos.',
    icon: '💼',
    link: '/gerar-orcamento',
    badge: '🔥 Ativo',
  },
  {
    title: 'Recibo de Pagamento',
    desc: 'Gere recibos de prestação de serviços ou venda prontos para assinar.',
    icon: '🧾',
    link: '/criar-documento',
    badge: 'Em Breve',
  },
  {
    title: 'Currículo Profissional',
    desc: 'Monte seu currículo ATS otimizado para vagas de emprego em PDF.',
    icon: '📄',
    link: '/criar-documento',
    badge: 'Em Breve',
  },
  {
    title: 'Proposta Comercial',
    desc: 'Elabore propostas formais com escopo, prazos e condições comerciais.',
    icon: '📋',
    link: '/criar-documento',
    badge: 'Em Breve',
  },
  {
    title: 'Ordem de Serviço (OS)',
    desc: 'Emita ordens de serviço para manutenção, suporte e oficinas.',
    icon: '🛠️',
    link: '/criar-documento',
    badge: 'Em Breve',
  },
  {
    title: 'Checklist de Verificação',
    desc: 'Monte listas de tarefas e rotina imprimíveis em PDF.',
    icon: '✅',
    link: '/criar-documento',
    badge: 'Em Breve',
  },
];

export default async function HomePage() {
  const stats = await getStats();
  const processed = stats.total_files_processed || 0;

  return (
    <>
      {/* Schema.org — Organization */}
      <Script
        id="schema-org-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PDFRápido',
            url: SITE_URL,
            description: 'Plataforma completa para criar, editar e converter documentos em PDF online',
            founder: {
              '@type': 'Person',
              name: 'Emanoel Douglas',
            },
            sameAs: [SITE_URL],
          }),
        }}
      />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-hero-gradient py-16 md:py-24 px-4">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-200/30 dark:bg-brand-800/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
          </div>

          <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge de confiança */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-brand-100 dark:border-gray-800 rounded-full px-4 py-2 shadow-sm mb-6 animate-fade-in">
              <span className="text-green-500" aria-hidden="true">●</span>
              <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold">
                100% Gratuito · Sem Cadastro · Privacidade LGPD
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight animate-slide-up">
              Crie, edite e transforme seus{' '}
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                documentos em PDF
              </span>
            </h1>

            <p className="mt-5 text-base md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Ferramentas rápidas e gratuitas para trabalhar com documentos online.
            </p>

            {/* CTAs Principal e Secundário */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/criar-documento" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto shadow-lg shadow-brand-500/20">
                🚀 Começar agora
              </Link>
              <Link href="/ferramentas" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
                🔍 Ver ferramentas
              </Link>
            </div>

            {/* Campo de Busca de Documentos e Ferramentas */}
            <div className="mt-10">
              <DocumentSearch />
            </div>

            {/* Contador de arquivos processados */}
            {processed > 0 && (
              <div className="mt-8 inline-flex items-center gap-2.5 bg-white dark:bg-gray-900 border border-brand-100 dark:border-gray-800 rounded-full px-5 py-2.5 shadow-md text-sm text-gray-600 dark:text-gray-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <strong className="text-brand-600 dark:text-brand-400">{processed.toLocaleString('pt-BR')}</strong>{' '}
                arquivos processados hoje
              </div>
            )}
          </div>
        </section>

        {/* ── ANÚNCIO TOP BANNER ── */}
        <div className="max-w-4xl mx-auto px-4 py-2">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || '0000000001'}
            format="horizontal"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* ── SEÇÃO: CRIE DOCUMENTOS PERSONALIZADOS ── */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
              ✨ Geradores Rápidos
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Crie documentos personalizados
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2">
              Escolha um dos modelos abaixo, preencha os dados e faça o download em PDF formatado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOCUMENT_GENERATORS.map((doc) => (
              <Link
                key={doc.title}
                href={doc.link}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{doc.icon}</span>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {doc.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <span className="mt-6 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Criar agora ➔
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CATALOGO DE FERRAMENTAS POR CATEGORIA ── */}
        <section id="catalogo" className="max-w-7xl mx-auto px-4 py-12 space-y-14 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Ferramentas Gratuitas de PDF
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              Execute conversões, compressões e edições com velocidade total na nuvem.
            </p>
          </div>

          {CATEGORIES_CONFIG.map((cat) => {
            const categoryTools = TOOLS.filter((t) => t.category === cat.id);
            if (categoryTools.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-5">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-xl text-brand-600 dark:text-brand-400 mb-3">
                        {tool.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── COMO FUNCIONA (4 ETAPAS SIMPLES) ── */}
        <section className="bg-white dark:bg-gray-900 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
                Simplicidade e Agilidade
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                Como funciona o PDFRápido em 4 passos?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '1', title: 'Escolha a Ferramenta', desc: 'Selecione um gerador de documento ou uma ferramenta de PDF no catálogo.' },
                { num: '2', title: 'Preencha ou Envie', desc: 'Informe os dados do documento ou envie seu arquivo para a área de upload.' },
                { num: '3', title: 'Personalize', desc: 'Configure os parâmetros, valores, senhas ou marcas d\'água desejadas.' },
                { num: '4', title: 'Baixe o PDF', desc: 'Faça o download instantâneo do seu documento pronto para imprimir ou enviar.' },
              ].map((step) => (
                <div key={step.num} className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-base mb-4 shadow-sm">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFÍCIOS & TABELA COMPARATIVA ── */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/40 dark:to-gray-950 py-14 px-4 border-t border-b border-gray-100 dark:border-gray-800/80">
          <div className="max-w-4xl mx-auto">
            <ComparisonTable />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Perguntas Frequentes (FAQ)
            </h2>
            <div className="space-y-4 mt-6 not-prose">
              {[
                {
                  q: 'O PDFRápido é gratuito para gerar orçamentos e documentos?',
                  a: 'Sim, você pode utilizar nossos geradores de documentos e utilitários de PDF gratuitamente sem necessidade de cadastrar cartão ou criar conta.',
                },
                {
                  q: 'Meus dados ficam salvos nos servidores do PDFRápido?',
                  a: 'Não. Os dados digitados nos formulários são processados diretamente no seu navegador e os arquivos enviados para conversão são descartados em até 30 minutos.',
                },
                {
                  q: 'Posso usar o PDFRápido pelo celular?',
                  a: 'Sim! Toda a plataforma foi desenvolvida com foco em Mobile-First, funcionando em iPhones, smartphones Android e tablets.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white dark:bg-gray-800/90 p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
