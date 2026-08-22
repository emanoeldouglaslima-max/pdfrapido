import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Extrair Textos de PDFs e Imagens Digitalizadas: Guia Definitivo',
  description: 'Aprenda a copiar e extrair textos de arquivos PDF protegidos, digitalizados ou escaneados sem precisar digitar palavra por palavra manualmente.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-extrair-texto-de-pdf-e-documentos-digitalizados',
  },
  openGraph: {
    title: 'Como Extrair Textos de PDFs e Imagens Digitalizadas: Guia Definitivo',
    description: 'Aprenda a copiar e extrair textos de arquivos PDF protegidos, digitalizados ou escaneados.',
    url: 'https://pdfrapido.com.br/blog/como-extrair-texto-de-pdf-e-documentos-digitalizados',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoExtrairTexto() {
  return (
    <>
      <Script
        id="schema-artigo-extrair-texto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Extrair Textos de PDFs e Imagens Digitalizadas: Guia Definitivo',
            description: 'Técnicas práticas para extrair textos de PDFs e documentos digitalizados.',
            datePublished: '2026-07-28T10:00:00Z',
            dateModified: '2026-07-28T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/como-extrair-texto-de-pdf-e-documentos-digitalizados',
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
          <span className="text-gray-600 dark:text-gray-300">Extrair Texto</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
              Tutoriais & Conversão
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Extrair Textos de PDFs e Documentos Digitalizados sem Digitar Nada Manualmente
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>28 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Você precisa reaproveitar um trecho de um livro, petição, contrato ou edital, mas o arquivo PDF não permite selecionar o texto ou veio como uma digitalização de scanner? Conheça os procedimentos corretos para extrair os parágrafos em formato editável.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">PDF Nativo vs. PDF Escaneado (Imagem)</h2>
            <p>
              O primeiro passo é identificar a natureza do seu arquivo:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>PDF Nativo (Vetorial):</strong> Gerado a partir do Word, Google Docs ou impressoras virtuais. Possui uma camada de texto real que pode ser extraída instantaneamente por ferramentas como o <Link href="/converter-pdf-para-word" className="text-brand-600 dark:text-brand-400 font-semibold underline">Conversor de PDF para Word</Link>.</li>
              <li><strong>PDF Escaneado (Bitmap):</strong> Trata-se de uma foto de um papel guardada dentro do container PDF. Exige processamento de OCR (Reconhecimento Óptico de Caracteres).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Método Rápido: Conversão Direta para Word (.docx)</h2>
            <p>
              Para documentos que já possuem texto vetorial, o método mais rápido e limpo é enviar o arquivo para a ferramenta de conversão do PDFRápido. O sistema analisa os blocos de texto, parágrafos e títulos, reconstruindo um arquivo DOCX idêntico ao original e pronto para ser copiado no Microsoft Word ou Google Docs.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="28 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
