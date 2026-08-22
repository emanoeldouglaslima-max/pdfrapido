import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Guia Completo de Assinatura Eletrônica pelo Gov.br e Validade Jurídica',
  description: 'Descubra como assinar documentos PDF gratuitamente usando a conta Gov.br (níveis Prata e Ouro), conheça a Lei 14.063/2020 e valide assinaturas digitais.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/guia-completo-assinatura-eletronica-gov-br',
  },
  openGraph: {
    title: 'Guia Completo de Assinatura Eletrônica pelo Gov.br e Validade Jurídica',
    description: 'Descubra como assinar documentos PDF gratuitamente usando a conta Gov.br com validade jurídica.',
    url: 'https://pdfrapido.com.br/blog/guia-completo-assinatura-eletronica-gov-br',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoAssinaturaGovBr() {
  return (
    <>
      <Script
        id="schema-artigo-govbr"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Guia Completo de Assinatura Eletrônica pelo Gov.br e Validade Jurídica',
            description: 'Passo a passo detalhado para assinar PDFs pelo portal Gov.br com validade legal.',
            datePublished: '2026-08-05T10:00:00Z',
            dateModified: '2026-08-05T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/guia-completo-assinatura-eletronica-gov-br',
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
          <span className="text-gray-600 dark:text-gray-300">Assinatura Gov.br</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              Jurídico & Gov.br
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Guia Completo de Assinatura Eletrônica pelo Gov.br: Como Fazer e Validade Jurídica
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>05 de agosto de 2026</span>
              <span>•</span>
              <span>6 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Imprimir um contrato, assinar à caneta, escanear novamente e enviar por e-mail é uma prática totalmente ultrapassada. O Governo Federal brasileiro disponibiliza uma ferramenta oficial de assinatura eletrônica avançada 100% gratuita através da plataforma Gov.br. Saiba como utilizá-la e quais são seus efeitos legais.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">A assinatura do Gov.br tem validade jurídica?</h2>
            <p>
              <strong>Sim!</strong> A <em>Lei Federal nº 14.063/2020</em> e o <em>Decreto nº 10.543/2020</em> regulamentam o uso de assinaturas eletrônicas no Brasil, classificando-as em três modalidades:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Assinatura Eletrônica Simples:</strong> Identificação básica (ex: login por e-mail e senha).</li>
              <li><strong>Assinatura Eletrônica Avançada (Gov.br Prata ou Ouro):</strong> Garante a integridade do documento e a autoria de quem assinou, com validade jurídica aceita em órgãos públicos, contratos de locação, declarações e documentos empresariais.</li>
              <li><strong>Assinatura Eletrônica Qualificada (ICP-Brasil):</strong> Utiliza token físico ou certificado digital padrão ICP-Brasil (A1 ou A3).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Requisitos para assinar pelo Gov.br</h2>
            <p>
              Para utilizar o assinador oficial, o cidadão precisa ter uma conta Gov.br com nível de confiabilidade <strong>Prata</strong> (validada por banco conveniado ou biometria facial do Detran) ou <strong>Ouro</strong> (validada pelo TSE ou certificado digital).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Passo a Passo para Assinar um PDF no Gov.br</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Acesse o portal oficial do assinador em <code>assinador.iti.br</code> ou pelo aplicativo <strong>Gov.br</strong>.</li>
              <li>Faça login com seu CPF e senha da conta Gov.br.</li>
              <li>Envie o documento PDF que você precisa assinar (certifique-se de que o arquivo esteja com tamanho adequado antes do upload).</li>
              <li>Posicione o retângulo da assinatura na página e no local desejado do contrato.</li>
              <li>Autorize o envio do código de segurança SMS ou autenticação no aplicativo Gov.br.</li>
              <li>Baixe o documento PDF assinado contendo o selo criptográfico com QR Code de verificação do ITI (Instituto Nacional de Tecnologia da Informação).</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Como preparar seu PDF antes da assinatura</h2>
            <p>
              Antes de assinar, certifique-se de que o PDF não contenha páginas em branco ou erros de paginação. Se precisar unificar anexos ou relatórios ao contrato principal, utilize a ferramenta <Link href="/juntar-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Juntar PDF</Link> ou reduza o peso com o <Link href="/comprimir-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Compressor de PDF</Link>.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="05 de agosto de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
