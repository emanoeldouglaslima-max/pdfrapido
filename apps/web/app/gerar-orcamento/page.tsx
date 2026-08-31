import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';
import RatingWidget from '../../components/RatingWidget';
import OrcamentoClientPage from './OrcamentoClientPage';
import { SITE_URL } from '../../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Gerador de Orçamento Online Grátis em PDF — PDFRápido',
  description: 'Crie orçamentos comerciais profissionais em PDF para prestação de serviços ou vendas em menos de 1 minuto. Grátis, sem cadastro e pronto para baixar.',
  keywords: 'gerador de orçamento,criar orçamento pdf,modelo de orçamento grátis,orçamento comercial pdf,gerar orçamento online,gerar orçamento whatsapp',
  alternates: { canonical: `${SITE_URL}/gerar-orcamento` },
  openGraph: {
    title: 'Gerador de Orçamento Online Grátis em PDF — PDFRápido',
    description: 'Crie orçamentos comerciais em PDF com logotipo, tabela de itens, cálculo de totais e chave PIX de graça.',
    url: `${SITE_URL}/gerar-orcamento`,
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerador de Orçamento Online Grátis em PDF — PDFRápido',
    description: 'Crie orçamentos comerciais em PDF com calculadores de desconto e tabela de itens de graça.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const FAQ_ITEMS = [
  {
    q: 'O Gerador de Orçamento do PDFRápido é 100% gratuito?',
    a: 'Sim! Você pode criar quantos orçamentos desejar sem pagar nada, sem limite de uso e sem necessidade de cadastrar cartão de crédito.',
  },
  {
    q: 'Preciso criar conta ou fazer login para baixar o PDF?',
    a: 'Não. Não exigimos nenhum tipo de cadastro ou e-mail. Você preenche os campos e faz o download imediato do seu PDF.',
  },
  {
    q: 'O orçamento gerado é compatível com celular e WhatsApp?',
    a: 'Sim! O PDF é gerado no formato padrão A4 em altíssima resolução, perfeito para ser enviado direto pelo WhatsApp ou impresso.',
  },
  {
    q: 'Meus dados comerciais ficam salvos no site?',
    a: 'Não. Por respeito à sua privacidade e conformidade com a LGPD, o PDF é gerado temporariamente no seu navegador e não fica armazenado em nossos servidores.',
  },
];

export default function GerarOrcamentoPage() {
  return (
    <>
      {/* Schema.org — WebApplication */}
      <Script
        id="schema-orcamento-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Gerador de Orçamento em PDF — PDFRápido',
            url: `${SITE_URL}/gerar-orcamento`,
            description: 'Ferramenta online gratuita para criar orçamentos comerciais profissionais em PDF.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'BRL',
            },
          }),
        }}
      />

      {/* Schema.org — HowTo */}
      <Script
        id="schema-orcamento-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Como criar um orçamento profissional em PDF online?',
            description: 'Passo a passo simples para preencher e gerar um orçamento comercial em PDF.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Preencha seus dados', text: 'Informe seu nome ou empresa, contato e e-mail.' },
              { '@type': 'HowToStep', position: 2, name: 'Preencha os dados do cliente', text: 'Informe o nome e contato do cliente destinatário.' },
              { '@type': 'HowToStep', position: 3, name: 'Adicione os itens do serviço', text: 'Descreva os serviços, quantidades e valores unitários.' },
              { '@type': 'HowToStep', position: 4, name: 'Gere o PDF', text: 'Clique em Gerar Orçamento em PDF e faça o download instantâneo.' },
            ],
          }),
        }}
      />

      {/* Schema.org — FAQPage */}
      <Script
        id="schema-orcamento-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb visual */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 mb-6 font-semibold" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Início</Link>
          <span>/</span>
          <Link href="/criar-documento" className="hover:text-brand-600 dark:hover:text-brand-400">Criar Documento</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">Gerador de Orçamento</span>
        </nav>

        {/* AdSense Topo */}
        <AdUnit
          slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_TOP || '0000000004'}
          format="horizontal"
          className="mb-8 ad-slot-horizontal rounded-xl overflow-hidden"
        />

        {/* Hero do Gerador */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-blue-50 dark:bg-blue-950/40 rounded-2xl items-center justify-center text-3xl mb-4 shadow-sm">
            💼
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Gerador de Orçamento Online Grátis
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Monte orçamentos comerciais profissionais em PDF para prestação de serviços ou vendas em poucos segundos.
          </p>
        </div>

        {/* Componente Interativo do Cliente */}
        <OrcamentoClientPage />

        {/* AdSense Meio */}
        <div className="my-8">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_MID || '0000000005'}
            format="fluid"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* Conteúdo SEO Editorial & FAQ */}
        <section className="mt-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Por que usar um Gerador de Orçamento Profissional?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              Apresentar um orçamento organizado e bem formatado transmite confiança imediata ao seu cliente. Seja você um profissional autônomo, freelancer, encanador, eletricista, designer, consultor ou pequena empresa, o <strong>Gerador de Orçamento do PDFRápido</strong> calcula automaticamente os subtotais, descontos e valores finais em Reais (R$), gerando um documento limpo e pronto para enviar pelo WhatsApp.
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Perguntas Frequentes (FAQ) — Orçamento em PDF
            </h3>
            <div className="space-y-4 not-prose">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800/90 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{item.q}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Widget de Avaliação */}
        <RatingWidget toolName="Gerador de Orçamento" />

        {/* AdSense Rodapé */}
        <div className="mt-10">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_BOTTOM || '0000000006'}
            format="auto"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
