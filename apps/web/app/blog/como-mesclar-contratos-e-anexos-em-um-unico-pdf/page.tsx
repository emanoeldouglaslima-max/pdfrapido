import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Mesclar Contratos, Comprovantes e Anexos em um Único PDF',
  description: 'Guia para advogados, corretores e gestores organizarem propostas, contratos de prestação de serviços e anexos em um documento PDF sequencial e profissional.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-mesclar-contratos-e-anexos-em-um-unico-pdf',
  },
  openGraph: {
    title: 'Como Mesclar Contratos, Comprovantes e Anexos em um Único PDF',
    description: 'Guia para advogados, corretores e gestores organizarem contratos e anexos em um único PDF.',
    url: 'https://pdfrapido.com.br/blog/como-mesclar-contratos-e-anexos-em-um-unico-pdf',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoMesclarContratos() {
  return (
    <>
      <Script
        id="schema-artigo-mesclar-contratos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Mesclar Contratos, Comprovantes e Anexos em um Único PDF',
            description: 'Como unificar contratos e comprovantes em um PDF profissional.',
            datePublished: '2026-07-18T10:00:00Z',
            dateModified: '2026-07-18T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/como-mesclar-contratos-e-anexos-em-um-unico-pdf',
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
          <span className="text-gray-600 dark:text-gray-300">Mesclar Contratos</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
              Contratos & Negócios
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Mesclar Contratos, Comprovantes e Anexos em um Único Arquivo PDF Profissional
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>18 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Enviar múltiplos arquivos soltos por e-mail (como o contrato principal, fotos de documentos pessoais e comprovantes de endereço) gera confusão, perda de anexos e passa uma impressão de amadorismo para clientes e parceiros. Aprenda como consolidar tudo em um documento corporativo limpo.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">A Sequência Ideal de um Dossiê em PDF</h2>
            <p>
              Ao montar um arquivo consolidado para assinatura ou protocolo, siga esta estrutura padrão:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Folha de Rosto / Sumário:</strong> Identificação das partes envolvidas e índice dos anexos.</li>
              <li><strong>Instrumento Contratual Principal:</strong> O corpo do contrato com cláusulas e páginas de assinatura.</li>
              <li><strong>Anexo I — Documentos de Identificação:</strong> Cópias de RG, CNH, CNPJ e procurações.</li>
              <li><strong>Anexo II — Comprovantes Financeiros / Imobiliários:</strong> Matrícula do imóvel, certidões negativas ou extratos bancários.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Passo a Passo com a Ferramenta Juntar PDF</h2>
            <p>
              Com a ferramenta <Link href="/juntar-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Juntar PDF do PDFRápido</Link>, você pode selecionar até 20 documentos em formatos misturados de até 25MB e uni-los instantaneamente com total segurança e exclusão automática pós-download.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="18 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
