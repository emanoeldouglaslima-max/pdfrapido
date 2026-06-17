import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS } from './constants';
import AdUnit from '../components/AdUnit';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrápido.com.br';

export const metadata: Metadata = {
  title: 'Ferramentas de PDF Online Grátis — Converter, Comprimir, Juntar | PDFRápido',
  description:
    'Converta, comprima, junte e divida PDFs online de graça. Sem cadastro, sem limite. PDF para Word, PDF para JPG, Word para PDF e muito mais. Funciona no celular.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'PDFRápido — Ferramentas de PDF Online Grátis',
    description: 'Todas as ferramentas de PDF que você precisa, grátis e sem cadastro.',
    url: SITE_URL,
  },
};

// Dados das ferramentas importados de constants.ts

async function getStats(): Promise<{ total_files_processed: number }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/stats`,
      { next: { revalidate: 60 } } // cache de 1 minuto
    );
    if (!res.ok) return { total_files_processed: 0 };
    return res.json();
  } catch {
    return { total_files_processed: 0 };
  }
}

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

      {/* ── HEADER / NAV ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-brand-600 tracking-tight">PDF</span>
            <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Rápido</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {TOOLS.slice(0, 4).map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="hover:text-brand-600 transition-colors">
                {t.name}
              </Link>
            ))}
          </nav>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">
            100% Grátis
          </span>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">
              Ferramentas Online Gratuitas
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Tudo que você precisa para{' '}
              <span className="text-brand-600">editar PDF online</span>{' '}
              — grátis e sem cadastro
            </h1>
            <p className="mt-6 text-xl text-gray-500 leading-relaxed">
              Comprima, converta, junte e divida seus PDFs em segundos. Funciona no celular,
              computador e tablet. Seus arquivos são deletados automaticamente após 30 minutos.
            </p>

            {/* Stats */}
            {processed > 0 && (
              <div className="mt-8 inline-flex items-center gap-2 bg-white border border-brand-100 rounded-full px-5 py-2.5 shadow-sm text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha sua ferramenta</h2>
          <p className="text-gray-500 mb-8">Clique na ferramenta que você precisa e comece agora.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className={`group block ${tool.color} rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{tool.description}</p>
                <span className="mt-3 inline-flex items-center text-brand-600 text-sm font-semibold gap-1">
                  Usar grátis
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BENEFÍCIOS ── */}
        <section className="bg-gray-50 py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Por que usar o PDFRápido?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🔒', title: 'Seus arquivos são seguros', desc: 'Todos os arquivos são deletados automaticamente após 30 minutos. Nunca armazenamos seus documentos.' },
                { icon: '⚡', title: 'Rápido e fácil', desc: 'Sem cadastro, sem instalação. Apenas envie seu arquivo e baixe o resultado em segundos.' },
                { icon: '📱', title: 'Funciona no celular', desc: 'Nosso site é totalmente responsivo. Use no iPhone, Android, tablet ou computador.' },
              ].map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
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

            {/* ANÚNCIO IN-ARTICLE */}
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

          {/* ANÚNCIO FINAL */}
          <div className="mt-10">
            <AdUnit
              slot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '0000000003'}
              format="auto"
              className="ad-slot-horizontal"
            />
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <span className="text-white font-extrabold text-xl">PDFRápido</span>
              <p className="mt-2 text-sm">Ferramentas de PDF online grátis para brasileiros.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3 text-sm">Ferramentas</p>
              <ul className="space-y-2">
                {TOOLS.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${t.slug}`} className="text-sm hover:text-white transition-colors">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-center">
            © {new Date().getFullYear()} PDFRápido. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
