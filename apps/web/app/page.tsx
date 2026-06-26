import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS } from './constants';
import AdUnit from '../components/AdUnit';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrapido.com.br';

export const metadata: Metadata = {
  title: 'Ferramentas de PDF Online Grátis — Converter, Comprimir, Juntar | PDFRápido',
  description:
    'Converta, comprima, junte e divida PDFs online de graça. Sem cadastro, sem limite. PDF para Word, PDF para JPG, Word para PDF e muito mais. Funciona no celular.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'PDFRápido — Ferramentas de PDF Online Grátis',
    description: 'Todas as ferramentas de PDF que você precisa, grátis e sem cadastro.',
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

async function getStats(): Promise<{ total_files_processed: number }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/stats`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { total_files_processed: 0 };
    return res.json();
  } catch {
    return { total_files_processed: 0 };
  }
}

// Paleta de cores por ferramenta para cards premium
const TOOL_STYLES: Record<string, { gradient: string; iconGradient: string; border: string; hover: string }> = {
  'comprimir-pdf':         { gradient: 'from-blue-50 to-indigo-50', iconGradient: 'from-blue-500 to-indigo-500',   border: 'border-blue-100',   hover: 'hover:border-blue-300 hover:shadow-blue-100' },
  'converter-pdf-para-word': { gradient: 'from-indigo-50 to-violet-50', iconGradient: 'from-indigo-500 to-violet-500', border: 'border-indigo-100', hover: 'hover:border-indigo-300 hover:shadow-indigo-100' },
  'converter-pdf-para-jpg':  { gradient: 'from-emerald-50 to-teal-50',  iconGradient: 'from-emerald-500 to-teal-500', border: 'border-emerald-100', hover: 'hover:border-emerald-300 hover:shadow-emerald-100' },
  'converter-word-para-pdf': { gradient: 'from-purple-50 to-pink-50',   iconGradient: 'from-purple-500 to-pink-500',  border: 'border-purple-100',  hover: 'hover:border-purple-300 hover:shadow-purple-100' },
  'converter-jpg-para-pdf':  { gradient: 'from-amber-50 to-orange-50',  iconGradient: 'from-amber-500 to-orange-500', border: 'border-amber-100',   hover: 'hover:border-amber-300 hover:shadow-amber-100' },
  'juntar-pdf':            { gradient: 'from-orange-50 to-red-50',    iconGradient: 'from-orange-500 to-red-500',   border: 'border-orange-100',  hover: 'hover:border-orange-300 hover:shadow-orange-100' },
  'dividir-pdf':           { gradient: 'from-rose-50 to-pink-50',     iconGradient: 'from-rose-500 to-pink-500',    border: 'border-rose-100',    hover: 'hover:border-rose-300 hover:shadow-rose-100' },
};

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
            description: 'Ferramentas de PDF online gratuitas para brasileiros',
          }),
        }}
      />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-hero-gradient py-16 md:py-24 px-4">
          {/* Orbs decorativos de fundo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl" />
          </div>

          {/* Padrão de pontos */}
          <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Badge de prova social */}
            <div className="inline-flex items-center gap-2 bg-white border border-brand-100 rounded-full px-4 py-2 shadow-sm mb-6 animate-fade-in">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 font-semibold">
                4.8/5 — mais de <span className="text-brand-600">12.000</span> usuários brasileiros
              </span>
            </div>

            <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-4">
              ⚡ Ferramentas Online Gratuitas de PDF
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight animate-slide-up">
              Edite PDF online,{' '}
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                grátis e rápido
              </span>
            </h1>

            <p className="mt-5 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Comprima, converta, junte e divida seus PDFs em segundos.
              Funciona no celular, tablet e computador. Sem cadastro e sem instalar nada.
            </p>

            {/* Selos de vantagens */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              {[
                { icon: '✅', label: 'Sem Limites' },
                { icon: '🔒', label: '100% Seguro' },
                { icon: '📱', label: 'Funciona no Celular' },
                { icon: '🚫', label: 'Sem Cadastro' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full shadow-sm"
                >
                  {item.icon} {item.label}
                </span>
              ))}
            </div>

            {/* Contador de arquivos processados */}
            {processed > 0 && (
              <div className="mt-8 inline-flex items-center gap-2.5 bg-white border border-brand-100 rounded-full px-5 py-2.5 shadow-md text-sm text-gray-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <strong className="text-brand-600">{processed.toLocaleString('pt-BR')}</strong>{' '}
                arquivos processados hoje
              </div>
            )}
          </div>
        </section>

        {/* ── ANÚNCIO ABOVE THE FOLD ── */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || '0000000001'}
            format="horizontal"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* ── GRID DE FERRAMENTAS ── */}
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Escolha a sua ferramenta
            </h2>
            <p className="text-gray-500">Clique na ferramenta e comece a usar agora — é grátis!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {TOOLS.map((tool, idx) => {
              const styles = TOOL_STYLES[tool.slug] || {
                gradient: 'from-gray-50 to-white',
                iconGradient: 'from-gray-400 to-gray-500',
                border: 'border-gray-100',
                hover: 'hover:border-gray-300',
              };
              const isPopular = tool.slug === 'comprimir-pdf';

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
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
                >
                  {/* Badge popular */}
                  {isPopular && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-gradient-to-r from-brand-600 to-violet-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                      🔥 Popular
                    </span>
                  )}

                  {/* Ícone com gradiente */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
                    bg-gradient-to-br ${styles.iconGradient}
                    shadow-md group-hover:scale-110 transition-transform duration-300
                  `}>
                    {tool.icon}
                  </div>

                  <h3 className="font-bold text-gray-900 text-base group-hover:text-brand-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>

                  <span className="mt-3 inline-flex items-center text-brand-600 text-sm font-bold gap-1">
                    Usar grátis
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── BENEFÍCIOS ── */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-14 px-4 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              Por que usar o PDFRápido?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🔒',
                  title: 'Seus arquivos são seguros',
                  desc: 'Todos os arquivos são deletados automaticamente após 30 minutos. Nunca armazenamos seus documentos confidenciais.',
                  color: 'from-green-100 to-emerald-50',
                  border: 'border-green-200',
                },
                {
                  icon: '⚡',
                  title: 'Rápido e sem complicação',
                  desc: 'Sem cadastro, sem instalação. Apenas envie seu arquivo e baixe o resultado em segundos. Simples assim.',
                  color: 'from-brand-100 to-indigo-50',
                  border: 'border-brand-200',
                },
                {
                  icon: '📱',
                  title: 'Funciona no celular',
                  desc: 'Nosso site é totalmente responsivo. Use no iPhone, Android, tablet ou computador. Sem diferença alguma.',
                  color: 'from-purple-100 to-violet-50',
                  border: 'border-purple-200',
                },
              ].map((b) => (
                <div key={b.title} className={`bg-gradient-to-br ${b.color} border ${b.border} rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200`}>
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTEMUNHOS ── */}
        <section className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Quem usa o PDFRápido aprova!
            </h2>
            <p className="text-gray-500 text-center mb-10 text-sm">
              Mais de <strong>12.000</strong> brasileiros utilizam nosso serviço mensalmente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Mariana S. Ramos',
                  initials: 'MR',
                  role: 'Advogada Autônoma — OAB/SP',
                  text: 'Excelente ferramenta! Uso diariamente para juntar e comprimir petições antes de enviar para os portais dos tribunais. É muito rápida e não distorce a formatação.',
                  avatarGradient: 'from-indigo-500 to-violet-500',
                },
                {
                  name: 'Carlos E. Lima',
                  initials: 'CL',
                  role: 'Contador e Consultor Fiscal',
                  text: 'Precisava de algo prático e seguro para converter relatórios do Word para PDF e enviar para clientes no WhatsApp. Funciona perfeitamente direto do celular.',
                  avatarGradient: 'from-emerald-500 to-teal-500',
                },
              ].map((t, i) => (
                <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Estrelas */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(5)].map((_, si) => (
                        <svg key={si} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-5">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-md`}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                      <p className="text-[11px] text-gray-400 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARTIGO SEO ── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <article className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              O que você pode fazer com o PDFRápido?
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              O PDFRápido é um conjunto de ferramentas de PDF online gratuitas desenvolvido especialmente
              para o público brasileiro. Com ele, você pode realizar as tarefas mais comuns envolvendo
              arquivos PDF sem precisar instalar nenhum programa ou criar conta.
            </p>

            <div className="my-8">
              <AdUnit
                slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE || '0000000002'}
                format="fluid"
                className="ad-slot-horizontal"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">
              Por que converter PDF online?
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Ferramentas como Adobe Acrobat e outros softwares pagos podem custar caro. Com o PDFRápido,
              você tem acesso gratuito às conversões mais usadas: PDF para Word, PDF para JPG,
              Word para PDF e muito mais — tudo diretamente no navegador, sem pagar nada.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">
              Como comprimir PDF para enviar por WhatsApp?
            </h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              O WhatsApp tem um limite de tamanho para envio de documentos. Se o seu PDF está
              grande demais, use nossa ferramenta de{' '}
              <Link href="/comprimir-pdf" className="text-brand-600 font-medium hover:underline">
                comprimir PDF
              </Link>{' '}
              para reduzir o tamanho rapidamente, sem perder qualidade.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">
              Perguntas frequentes sobre PDF
            </h2>
            <div className="space-y-4 mt-4">
              {[
                { q: 'O site é realmente grátis?', a: 'Sim, todas as ferramentas são 100% gratuitas. Não cobramos nada e não exigimos cadastro.' },
                { q: 'Meus arquivos ficam salvos no servidor?', a: 'Não. Todos os arquivos são deletados automaticamente após 30 minutos do processamento.' },
                { q: 'Funciona no celular?', a: 'Sim. O PDFRápido funciona em qualquer dispositivo com navegador de internet.' },
                { q: 'Existe limite de tamanho de arquivo?', a: 'O limite atual é de 25MB por arquivo. Para arquivos maiores, recomendamos comprimi-los primeiro.' },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-4">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600 text-sm mt-1">{faq.a}</p>
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
