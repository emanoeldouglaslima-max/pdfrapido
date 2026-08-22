import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Melhores Práticas para Digitalizar Documentos com a Câmera do Celular',
  description: 'Dicas profissionais de iluminação, enquadramento, resolução e conversão para transformar fotos de documentos em PDFs nítidos e leves.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/melhores-praticas-para-digitalizar-documentos-com-celular',
  },
  openGraph: {
    title: 'Melhores Práticas para Digitalizar Documentos com a Câmera do Celular',
    description: 'Dicas profissionais de iluminação, enquadramento e conversão de fotos em PDF.',
    url: 'https://pdfrapido.com.br/blog/melhores-praticas-para-digitalizar-documentos-com-celular',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoDigitalizarCelular() {
  return (
    <>
      <Script
        id="schema-artigo-digitalizar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Melhores Práticas para Digitalizar Documentos com a Câmera do Celular',
            description: 'Como tirar fotos perfeitas de documentos e converter em PDF profissional.',
            datePublished: '2026-07-25T10:00:00Z',
            dateModified: '2026-07-25T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/melhores-praticas-para-digitalizar-documentos-com-celular',
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
          <span className="text-gray-600 dark:text-gray-300">Digitalizar com Celular</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300">
              Celular & Produtividade
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Melhores Práticas para Digitalizar Documentos com a Câmera do Celular em Alta Resolução
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>25 de julho de 2026</span>
              <span>•</span>
              <span>4 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Hoje em dia, praticamente ninguém precisa mais comprar um aparelho scanner de mesa para digitalizar RG, CNH, diplomas ou comprovantes. A câmera do seu smartphone tem resolução de sobra para criar cópias digitais perfeitas — desde que você siga algumas regras simples de fotografia documental.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">1. Iluminação: Evite a Sombra do Próprio Celular</h2>
            <p>
              O erro mais comum ao fotografar uma folha sobre a mesa é posicionar a lâmpada atrás de você, criando a sombra da sua mão e do aparelho sobre o texto. Coloque o documento próximo a uma janela durante o dia ou posicione a fonte de luz lateralmente.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">2. Superfície de Contraste e Ângulo Reto (90º)</h2>
            <p>
              Coloque o papel sobre uma mesa escura ou com cor contrastante. Posicione a câmera do celular perfeitamente paralela à folha (ângulo de 90º), evitando distorções de perspectiva que deixam o topo da folha maior que a base.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">3. Como Transformar as Fotos em um PDF Único</h2>
            <p>
              Após fotografar as páginas com seu Android ou iPhone, acesse a ferramenta <Link href="/converter-jpg-para-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Imagem para PDF</Link> do PDFRápido. Selecione as imagens na ordem desejada e o sistema gerará um documento PDF pronto para ser anexado em qualquer formulário.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="25 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
