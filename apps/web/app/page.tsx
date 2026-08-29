import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS } from './constants';
import AdUnit from '../components/AdUnit';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComparisonTable from '../components/ComparisonTable';

import { SITE_URL } from '../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Ferramentas de PDF Online Grátis — Converter, Comprimir, Juntar e Transcrever',
  description:
    'Converta, comprima, junte e divida PDFs online de graça. Transcreva áudio e vídeo com alta precisão. Sem cadastro, com descarte automático e 100% gratuito.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'PDFRápido — Ferramentas de PDF Online Grátis',
    description: 'Todas as ferramentas de documentos e PDF que você precisa, grátis, sem cadastro e com segurança LGPD.',
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

// Paleta de cores por ferramenta para cards premium
const TOOL_STYLES: Record<string, { gradient: string; iconGradient: string; border: string; hover: string }> = {
  'comprimir-pdf':             { gradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20', iconGradient: 'from-blue-500 to-indigo-500',   border: 'border-blue-100 dark:border-blue-900/30',   hover: 'hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-blue-100 dark:hover:shadow-none' },
  'converter-pdf-para-word':   { gradient: 'from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20', iconGradient: 'from-indigo-500 to-violet-500', border: 'border-indigo-100 dark:border-indigo-900/30', hover: 'hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-indigo-100 dark:hover:shadow-none' },
  'converter-pdf-para-jpg':    { gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',  iconGradient: 'from-emerald-500 to-teal-500', border: 'border-emerald-100 dark:border-emerald-900/30', hover: 'hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-emerald-100 dark:hover:shadow-none' },
  'converter-word-para-pdf':   { gradient: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',   iconGradient: 'from-purple-500 to-pink-500',  border: 'border-purple-100 dark:border-purple-900/30',  hover: 'hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-purple-100 dark:hover:shadow-none' },
  'converter-jpg-para-pdf':    { gradient: 'from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20',  iconGradient: 'from-amber-500 to-orange-500', border: 'border-amber-100 dark:border-amber-900/30',   hover: 'hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-amber-100 dark:hover:shadow-none' },
  'juntar-pdf':                { gradient: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',    iconGradient: 'from-orange-500 to-red-500',   border: 'border-orange-100 dark:border-orange-900/30',  hover: 'hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-orange-100 dark:hover:shadow-none' },
  'dividir-pdf':               { gradient: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',     iconGradient: 'from-rose-500 to-pink-500',    border: 'border-rose-100 dark:border-rose-900/30',    hover: 'hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-rose-100 dark:hover:shadow-none' },
  'transcrever-video-em-texto': { gradient: 'from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20', iconGradient: 'from-emerald-500 to-cyan-500', border: 'border-emerald-100 dark:border-emerald-900/30', hover: 'hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-emerald-100 dark:hover:shadow-none' },
  'proteger-pdf':               { gradient: 'from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20',       iconGradient: 'from-slate-500 to-gray-600',   border: 'border-slate-100 dark:border-slate-900/30',   hover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-slate-100 dark:hover:shadow-none' },
};

// Categorização das ferramentas
const CATEGORIES = [
  {
    id: 'pdf',
    title: 'Manipulação e Edição de PDF',
    description: 'Comprima, junte, divida, proteja com senha e converta documentos PDF.',
    icon: '📑',
    slugs: ['comprimir-pdf', 'converter-pdf-para-word', 'converter-word-para-pdf', 'juntar-pdf', 'dividir-pdf', 'proteger-pdf'],
  },
  {
    id: 'images',
    title: 'Imagens e Conversão Visual',
    description: 'Transforme páginas em imagens JPG de alta qualidade ou crie PDFs a partir de fotos.',
    icon: '🖼️',
    slugs: ['converter-pdf-para-jpg', 'converter-jpg-para-pdf'],
  },
  {
    id: 'media-text',
    title: 'Áudio, Vídeo e Transcrição',
    description: 'Converta arquivos de áudio e vídeo em texto editável com marcação de tempo.',
    icon: '🎙️',
    slugs: ['transcrever-video-em-texto'],
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
            description: 'Ferramentas de PDF online gratuitas para o público brasileiro',
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
          {/* Orbs decorativos de fundo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-200/30 dark:bg-brand-800/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
          </div>

          {/* Padrão de pontos */}
          <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Badge de confiança */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-brand-100 dark:border-gray-800 rounded-full px-4 py-2 shadow-sm mb-6 animate-fade-in">
              <span className="text-green-500" aria-hidden="true">●</span>
              <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold">
                100% Gratuito · Sem Cadastro · Privacidade LGPD
              </span>
            </div>

            <p className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest mb-4">
              ⚡ Suíte Completa de Ferramentas de Documentos
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight animate-slide-up">
              Edite, converta e organize documentos{' '}
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                online e grátis
              </span>
            </h1>

            <p className="mt-5 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Comprima, converta em Word, junte anexos, divida páginas e transcreva gravações em segundos.
              Funciona direto no navegador do celular ou computador, sem instalar nada.
            </p>

            {/* Selos de vantagens */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              {[
                { icon: '✅', label: '100% Grátis' },
                { icon: '🔒', label: 'Exclusão automática em 30 min' },
                { icon: '📱', label: 'Compatível com Celular' },
                { icon: '🚫', label: 'Sem Cadastro Obrigatório' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full shadow-sm"
                >
                  {item.icon} {item.label}
                </span>
              ))}
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

        {/* ── FERRAMENTAS ORGANIZADAS POR CATEGORIAS ── */}
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Catálogo de Ferramentas
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              Selecione a operação desejada abaixo. Todas as ferramentas são executadas em servidores seguros de alta velocidade.
            </p>
          </div>

          {CATEGORIES.map((cat) => {
            const categoryTools = TOOLS.filter((t) => cat.slugs.includes(t.slug));
            return (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <span className="text-2xl" role="img" aria-label={cat.title}>
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {categoryTools.map((tool, idx) => {
                    const styles = TOOL_STYLES[tool.slug] || {
                      gradient: 'from-gray-50 to-white dark:from-gray-900 dark:to-gray-950',
                      iconGradient: 'from-gray-400 to-gray-500',
                      border: 'border-gray-100 dark:border-gray-800',
                      hover: 'hover:border-gray-300 dark:hover:border-gray-700',
                    };
                    const isPopular = tool.slug === 'comprimir-pdf' || tool.slug === 'transcrever-video-em-texto';

                    return (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className={`
                          group relative block bg-gradient-to-br ${styles.gradient}
                          border ${styles.border} rounded-2xl p-5
                          hover:shadow-lg ${styles.hover}
                          transition-all duration-300 hover:-translate-y-1
                          animate-slide-up
                        `}
                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                      >
                        {/* Badge popular */}
                        {isPopular && (
                          <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-gradient-to-r from-brand-600 to-violet-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                            🔥 Destaque
                          </span>
                        )}

                        {/* Ícone com gradiente */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
                          bg-gradient-to-br ${styles.iconGradient}
                          shadow-md group-hover:scale-110 transition-transform duration-300 text-white
                        `}>
                          {tool.icon}
                        </div>

                        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>

                        <span className="mt-4 inline-flex items-center text-brand-600 dark:text-brand-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                          Acessar ferramenta grátis
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── COMO FUNCIONA (3 PASSOS SIMPLES) ── */}
        <section className="bg-white dark:bg-gray-900/50 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
                Simplicidade e Agilidade
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                Como funciona o PDFRápido em 3 passos?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 relative">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-black flex items-center justify-center text-lg mb-4 shadow-md">
                  1
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Envie o Arquivo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Arraste seu PDF, imagem ou gravação para a área de upload ou selecione pelo celular.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg mb-4 shadow-md">
                  2
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Processamento na Nuvem</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Nossos servidores dedicados convertem, comprimem ou transcrevem o arquivo sem sobrecarregar sua memória.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-lg mb-4 shadow-md">
                  3
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Download & Exclusão</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Baixe o resultado imediatamente. Os dados temporários são eliminados definitivamente dos nossos discos em até 30 minutos ou após o download.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENEFÍCIOS & TABELA COMPARATIVA ── */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/40 dark:to-gray-950 py-14 px-4 border-t border-b border-gray-100 dark:border-gray-800/80">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              Por que escolher o PDFRápido?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: '🔒',
                  title: 'Segurança e LGPD',
                  desc: 'Arquivos protegidos por criptografia SSL/TLS e excluídos automaticamente após o download ou em até 30 minutos.',
                  color: 'from-green-100 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10',
                  border: 'border-green-200 dark:border-green-900/30',
                },
                {
                  icon: '⚡',
                  title: 'Sem Cadastros Invasivos',
                  desc: 'Não exigimos cartão, senhas ou e-mail para utilizar as ferramentas essenciais do dia a dia.',
                  color: 'from-brand-100 to-indigo-50 dark:from-indigo-950/20 dark:to-brand-950/10',
                  border: 'border-brand-200 dark:border-brand-900/30',
                },
                {
                  icon: '📱',
                  title: '100% Responsivo',
                  desc: 'Interface fluida para iPhone, Android, tablets, notebooks e computadores de qualquer sistema.',
                  color: 'from-purple-100 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/10',
                  border: 'border-purple-200 dark:border-purple-900/30',
                },
              ].map((b) => (
                <div key={b.title} className={`bg-gradient-to-br ${b.color} border ${b.border} rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200`}>
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* ── TABELA COMPARATIVA (HIGH VALUE CONTENT) ── */}
            <ComparisonTable />
          </div>
        </section>

        {/* ── ARTIGO EDITORIAL SEO & FAQ COM JSON-LD ── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              O que é o PDFRápido e como ele facilita o seu dia a dia?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              O <strong>PDFRápido</strong> é uma plataforma brasileira desenvolvida para simplificar o tratamento de documentos digitais. Em vez de instalar softwares pesados ou pagar assinaturas caras para tarefas rotineiras, você executa conversões, compressões e transcrições com apenas um clique.
            </p>

            <div className="my-8">
              <AdUnit
                slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE || '0000000002'}
                format="fluid"
                className="ad-slot-horizontal"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">
              Principais dúvidas sobre o uso das ferramentas
            </h2>
            <div className="space-y-4 mt-4 not-prose">
              {[
                {
                  q: 'O PDFRápido é realmente gratuito?',
                  a: 'Sim, você pode utilizar todas as ferramentas de conversão, compressão, divisão, junção e proteção de documentos gratuitamente sem necessidade de cadastro ou cartão.',
                },
                {
                  q: 'O que acontece com os arquivos após o envio?',
                  a: 'Seus arquivos são transmitidos de forma segura via HTTPS, armazenados em memória temporária para execução do serviço e excluídos automaticamente após o download ou em até 30 minutos.',
                },
                {
                  q: 'Posso usar o PDFRápido no celular Android ou iPhone?',
                  a: 'Sim! Toda a plataforma é otimizada para navegadores móveis (Safari, Chrome, Firefox, Edge, Opera), permitindo comprimir ou converter arquivos direto do celular.',
                },
                {
                  q: 'Como enviar PDFs grandes pelo WhatsApp ou e-mail?',
                  a: 'Utilize nossa ferramenta de Comprimir PDF. Ela reduz o tamanho do arquivo em até 80% preservando a nitidez de textos e imagens para anexação sem erro de limite.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-gray-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-10">
            <AdUnit
              slot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '0000000003'}
              format="auto"
              className="ad-slot-horizontal"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
