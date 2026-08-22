import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Organizar e Juntar Documentos PDF para a Declaração do Imposto de Renda',
  description: 'Aprenda a agrupar informes de rendimentos, recibos médicos e comprovantes bancários em um único PDF organizado e leve para a Receita Federal.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-organizar-documentos-pdf-para-declaracao-imposto-de-renda',
  },
  openGraph: {
    title: 'Como Organizar e Juntar Documentos PDF para a Declaração do Imposto de Renda',
    description: 'Aprenda a agrupar informes de rendimentos, recibos médicos e comprovantes bancários em um único PDF organizado.',
    url: 'https://pdfrapido.com.br/blog/como-organizar-documentos-pdf-para-declaracao-imposto-de-renda',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoImpostoRenda() {
  return (
    <>
      <Script
        id="schema-artigo-irpf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Organizar e Juntar Documentos PDF para a Declaração do Imposto de Renda',
            description: 'Guia prático para digitalizar, organizar e juntar comprovantes do IRPF.',
            datePublished: '2026-08-08T10:00:00Z',
            dateModified: '2026-08-08T10:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/como-organizar-documentos-pdf-para-declaracao-imposto-de-renda',
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
          <span className="text-gray-600 dark:text-gray-300">Imposto de Renda</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              Finanças & Organização
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Organizar e Juntar Documentos PDF para a Declaração do Imposto de Renda
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>08 de agosto de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Na época de prestar contas à Receita Federal, acumular dezenas de comprovantes em pastas separadas é garantia de dor de cabeça. Aprenda a estruturar seus informes financeiros, comprovantes médicos e notas fiscais em arquivos PDF organizados e fáceis de anexar no programa do IRPF ou no e-CAC.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Quais documentos devem ser arquivados em PDF?</h2>
            <p>
              A Receita Federal exige que todos os contribuintes guardem os comprovantes da declaração por pelo menos <strong>5 anos</strong>. Os principais arquivos digitais que você deve manter em mãos são:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Informes de Rendimentos:</strong> Emitidos pelas empresas empregadoras e instituições financeiras (bancos e corretoras).</li>
              <li><strong>Despesas Médicas e Odontológicas:</strong> Notas fiscais e recibos de consultas, exames, planos de saúde e tratamentos.</li>
              <li><strong>Comprovantes de Instrução:</strong> Mensalidades escolares, faculdades e pós-graduações.</li>
              <li><strong>Comprovantes de Compra e Venda de Bens:</strong> Escrituras, contratos de veículos e extratos de financiamento imobiliário.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Estratégia para Organizar e Unificar os Arquivos</h2>
            <p>
              Em vez de enviar dezenas de anexos soltos para seu contador ou guardar arquivos avulsos, una-os por categoria usando a ferramenta <Link href="/juntar-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Juntar PDF</Link> do PDFRápido:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Nomeação Clara:</strong> Renomeie os comprovantes antes da junção (ex: <code>01_informe_banco_x.pdf</code>, <code>02_recibo_medico_dra_ana.pdf</code>).</li>
              <li><strong>Unificação por Categoria:</strong> Crie um PDF único para saúde, outro para educação e outro para rendimentos.</li>
              <li><strong>Comprima se necessário:</strong> Se o arquivo resultante ultrapassar os limites de upload do e-CAC, utilize o <Link href="/comprimir-pdf" className="text-brand-600 dark:text-brand-400 font-semibold underline">Compressor de PDF</Link> para reduzir o tamanho mantendo a legibilidade dos valores e CPFs.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Cuidados com a Segurança dos Dados Fiscais</h2>
            <p>
              Documentos fiscais contêm dados ultra-sensíveis como CPF, endereço e movimentações financeiras. Certifique-se sempre de utilizar plataformas como o PDFRápido, que possuem criptografia SSL/TLS e não armazenam cópias dos seus arquivos em banco de dados permanente.
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="08 de agosto de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
