import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Otimizar e Reduzir PDFs para Envio em Concursos e Vestibulares',
  description: 'Guia passo a passo para respeitar os limites rígidos de 2MB, 5MB ou 10MB exigidos por bancas como Cebraspe, FGV, Vunesp e FCC sem perder a nitidez dos documentos.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-otimizar-pdf-para-concursos-e-vestibulares',
  },
  openGraph: {
    title: 'Como Otimizar e Reduzir PDFs para Envio em Concursos e Vestibulares',
    description: 'Guia passo a passo para respeitar os limites de tamanho de arquivos em bancas de concursos.',
    url: 'https://pdfrapido.com.br/blog/como-otimizar-pdf-para-concursos-e-vestibulares',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoConcursosVestibulares() {
  return (
    <>
      <Script
        id="schema-artigo-concursos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Otimizar e Reduzir PDFs para Envio em Concursos e Vestibulares',
            description: 'Dicas práticas para envio de títulos e laudos em bancas examinadoras.',
            datePublished: '2026-07-22T10:00:00Z',
            dateModified: '2026-07-22T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/como-otimizar-pdf-para-concursos-e-vestibulares',
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
          <span className="text-gray-600 dark:text-gray-300">Concursos Públicos</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300">
              Concursos & Editais
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Otimizar e Reduzir PDFs para Envio em Portais de Concursos e Vestibulares
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>22 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Quem presta concursos públicos ou vestibulares conhece bem a tensão do envio de títulos, laudos médicos para vagas de cotas/PCD e pedidos de isenção de taxa. Bancas renomadas como Cebraspe, FGV, Fundação Carlos Chagas (FCC) e Vunesp impõem limites de tamanho severos (geralmente entre 1MB e 5MB por arquivo). Descubra como garantir que seus documentos sejam aceitos sem risco de desclassificação.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Exigências Comuns dos Editais</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Extensão Única:</strong> A grande maioria dos sistemas aceita apenas arquivos com extensão <code>.pdf</code>. Imagens soltas (JPG/PNG) costumam ser rejeitadas.</li>
              <li><strong>Limite de Peso:</strong> Documentos acima do limite estipulado causam erro de timeout ou são bloqueados pelo upload do portal.</li>
              <li><strong>Nitidez e Legibilidade:</strong> Certidões, carimbos e assinaturas de diplomas precisam ser perfeitamente legíveis para que a banca avaliadora não indefira o pedido.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Como Resolver o Tamanho em 3 Etapas</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Unifique os Comprovantes:</strong> Se você precisa enviar frente e verso de diploma e histórico escolar em um único campo, junte-os com a ferramenta <Link href="/juntar-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Juntar PDF</Link>.</li>
              <li><strong>Aplique Compressão Inteligente:</strong> Envie o arquivo unificado para o <Link href="/comprimir-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Compressor de PDF do PDFRápido</Link>. Escolha o nível médio para reduzir até 70% do peso mantendo as letras nítidas.</li>
              <li><strong>Verifique o Resultado:</strong> Abra o PDF baixado no seu computador ou celular com zoom em 100% para conferir a nitidez de nomes, notas e datas antes de submeter no portal da banca.</li>
            </ol>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="22 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
