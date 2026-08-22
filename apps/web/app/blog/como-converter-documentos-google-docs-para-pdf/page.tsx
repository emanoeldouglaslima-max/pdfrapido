import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Salvar e Converter Documentos do Google Docs em PDF com Qualidade Máxima',
  description: 'Aprenda a exportar arquivos do Google Docs em PDF pelo computador ou aplicativo de celular, configurando margens, quebras de página e fontes sem erros.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-converter-documentos-google-docs-para-pdf',
  },
  openGraph: {
    title: 'Como Salvar e Converter Documentos do Google Docs em PDF com Qualidade Máxima',
    description: 'Aprenda a exportar arquivos do Google Docs em PDF pelo computador ou celular.',
    url: 'https://pdfrapido.com.br/blog/como-converter-documentos-google-docs-para-pdf',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoGoogleDocsParaPdf() {
  return (
    <>
      <Script
        id="schema-artigo-gdocs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Salvar e Converter Documentos do Google Docs em PDF com Qualidade Máxima',
            description: 'Guia para salvar documentos do Google Docs em PDF mantendo fontes e layout.',
            datePublished: '2026-07-16T10:00:00Z',
            dateModified: '2026-07-16T10:00:00Z',
            author: {
              '@type': 'Person',
              name: 'Emanoel Douglas',
            },
            publisher: {
              '@type': 'Organization',
              name: 'PDFRápido',
              logo: {
                '@type': 'ImageObject',
                url: 'https://pdfrapido.com.br/apple-icon.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://pdfrapido.com.br/blog/como-converter-documentos-google-docs-para-pdf',
            },
          }),
        }}
      />

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">Google Docs para PDF</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300">
              Google Docs & Nuvem
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Salvar e Converter Documentos do Google Docs em PDF com Qualidade Máxima
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>16 de julho de 2026</span>
              <span>•</span>
              <span>4 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              O Google Docs (Documentos Google) é a ferramenta de edição de texto colaborativo mais utilizada no mundo acadêmico e corporativo. Aprenda a exportar seus trabalhos e relatórios em PDF com formatação impecável no computador e no celular.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Exportando no Computador (Web)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Abra o documento no seu navegador.</li>
              <li>Acesse o menu <strong>Arquivo &gt; Fazer download &gt; Documento PDF (.pdf)</strong>.</li>
              <li>O download começará automaticamente mantendo as fontes e imagens perfeitamente renderizadas.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Exportando no Celular (Android e iPhone)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>No aplicativo Documentos Google, abra o arquivo e toque no ícone de três pontinhos (<code>...</code>) no canto superior direito.</li>
              <li>Selecione <strong>Compartilhar e exportar &gt; Salvar como</strong>.</li>
              <li>Escolha <strong>Documento PDF (.pdf)</strong> e confirme.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">O que fazer se o PDF ficar muito pesado?</h2>
            <p>
              Documentos do Google Docs que contêm muitas imagens em alta resolução podem gerar arquivos de 15MB a 30MB ao serem exportados em PDF. Para resolver isso e enviar por e-mail ou WhatsApp, passe o arquivo na ferramenta <Link href="/comprimir-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Comprimir PDF do PDFRápido</Link>.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="16 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
