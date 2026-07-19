import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Como Juntar Vários PDFs em um Só Documento para Concursos e Petições',
  description: 'Aprenda a unificar e organizar documentos PDF para envio em editais de concursos públicos, petições jurídicas no PJe e processos seletivos.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-juntar-pdf-concursos-peticoes',
  },
};

export default function Artigo4Page() {
  return (
    <>
      {/* Schema.org dinâmico (BlogPosting) */}
      <Script
        id="schema-org-blogpost"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Juntar Vários PDFs em um Só Documento para Concursos e Petições',
            description: 'Aprenda a unificar e organizar documentos PDF para envio em editais de concursos públicos, petições jurídicas no PJe e processos seletivos.',
            datePublished: '2026-07-04T12:00:00Z',
            dateModified: '2026-07-04T12:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'Equipe PDFRápido',
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
              '@id': 'https://pdfrapido.com.br/blog/como-juntar-pdf-concursos-peticoes',
            },
          }),
        }}
      />

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-brand-600">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600">Juntar PDFs para Concursos</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
              Organização
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Como Juntar Vários PDFs em um Só Documento para Concursos e Petições
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>04 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          {/* === ADSENSE SLOT: Topo do Artigo (horizontal/responsivo) === */}
          {/* Descomentar após aprovação do Google AdSense:
          <div className="my-6 text-center">
            <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-8269194570705692" data-ad-slot="SLOT_ID_AQUI" data-ad-format="auto" data-full-width-responsive="true" />
          </div>
          */}

          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg text-gray-700 font-medium">
              Precisou enviar uma inscrição de concurso público que exige RG, CPF, comprovante de residência e diploma em um único arquivo PDF? Ou então anexar todas as peças processuais em uma só petição no sistema PJe?
            </p>
            <p>
              Unificar documentos em um único PDF é uma das tarefas mais requisitadas no dia a dia profissional brasileiro. Editais de concursos públicos, processos judiciais eletrônicos, seleções de estágio e até inscrições em programas de pós-graduação frequentemente exigem que todos os documentos comprobatórios sejam reunidos em um único arquivo PDF com tamanho máximo definido.
            </p>
            <p>
              Neste guia completo, explicamos como resolver essa necessidade de forma rápida e gratuita, sem instalar programas pesados no computador.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Por que os editais exigem um único arquivo PDF?</h2>
            <p>
              A exigência de um PDF unificado existe por razões práticas de organização e auditoria. Quando uma banca examinadora ou um órgão público recebe dezenas de milhares de inscrições, cada documento avulso (fotos, comprovantes, diplomas) multiplicaria exponencialmente o trabalho de conferência e armazenamento.
            </p>
            <p>
              Com um único arquivo PDF contendo todas as páginas em sequência lógica, o avaliador pode simplesmente rolar o documento para verificar item por item sem precisar abrir múltiplos anexos. Além disso, sistemas jurídicos como o <strong>PJe (Processo Judicial Eletrônico)</strong> e o <strong>SEI (Sistema Eletrônico de Informações)</strong> possuem limitações técnicas que só aceitam um arquivo por campo de upload.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Passo a Passo: Unificando seus PDFs</h2>
            <p>
              Com o PDFRápido, o processo é simples e direto:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Acesse nossa ferramenta de <Link href="/juntar-pdf" className="text-brand-600 font-bold hover:underline">Juntar PDF</Link>.</li>
              <li>Arraste e solte todos os arquivos PDF que deseja unificar na área de upload. Você também pode clicar para selecionar múltiplos arquivos de uma vez.</li>
              <li><strong>Reorganize a ordem:</strong> Antes de processar, arraste os cards para reordenar os documentos na sequência que o edital ou petição exige. Por exemplo: 1) RG, 2) CPF, 3) Comprovante de Residência, 4) Diploma.</li>
              <li>Clique em &quot;Juntar PDFs&quot; e aguarde o processamento na nuvem.</li>
              <li>Baixe o arquivo final unificado com todas as páginas na ordem correta.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Dicas para concursos públicos</h2>
            <p>
              Editais de concursos são extremamente rigorosos com o formato dos documentos. Aqui vão algumas dicas essenciais:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Respeite o limite de tamanho:</strong> Muitos editais definem um limite de 5MB ou 10MB por arquivo. Se o PDF unificado ficar maior que o permitido, use nosso <Link href="/comprimir-pdf" className="text-brand-600 font-bold hover:underline">Compressor de PDF</Link> para reduzi-lo antes do envio.</li>
              <li><strong>Nomeie o arquivo corretamente:</strong> Siga o padrão do edital (ex: <code>NOME_COMPLETO_DOCUMENTOS.pdf</code>). Evite acentos, espaços e caracteres especiais no nome do arquivo.</li>
              <li><strong>Confira a legibilidade:</strong> Abra o PDF final e verifique se todas as páginas estão legíveis, sem cortes e na orientação correta (retrato/paisagem).</li>
              <li><strong>Inclua apenas o que é pedido:</strong> Documentos extras que não constam no edital podem causar a desclassificação da inscrição em alguns concursos.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Dicas para petições jurídicas (PJe e Tribunais)</h2>
            <p>
              No universo jurídico, a organização documental é ainda mais crítica. O sistema PJe impõe limites rigorosos:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tamanho máximo por arquivo:</strong> O PJe geralmente limita cada documento a <strong>10MB</strong>. Petições complexas com dezenas de anexos (laudos, fotos, extratos) precisam ser unificadas e comprimidas.</li>
              <li><strong>Formato exclusivo PDF/A:</strong> Alguns tribunais exigem o formato PDF/A (padrão de preservação de longo prazo). O PDF gerado pelo PDFRápido é compatível com os leitores do PJe.</li>
              <li><strong>Ordem processual:</strong> Organize os documentos na ordem cronológica dos fatos ou na ordem exigida pelo tipo de peça processual (inicial, contestação, réplica).</li>
            </ul>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Precisa unificar documentos agora?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Use nosso unificador de PDF para juntar todos os seus documentos em um só arquivo. Gratuito, sem limites e com exclusão automática.
              </p>
              <div className="pt-2">
                <Link
                  href="/juntar-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🔗 Juntar PDFs Agora
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Resumo: Fluxo completo para envio de documentos</h2>
            <p>
              Para garantir que seus documentos sejam aceitos sem problemas, siga este checklist rápido:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Digitalize ou fotografe todos os documentos necessários.</li>
              <li>Se necessário, converta as imagens JPG em PDF usando nosso <Link href="/converter-jpg-para-pdf" className="text-brand-600 font-bold hover:underline">Conversor JPG para PDF</Link>.</li>
              <li>Junte tudo em um único PDF com a ferramenta <Link href="/juntar-pdf" className="text-brand-600 font-bold hover:underline">Juntar PDF</Link>.</li>
              <li>Comprima o arquivo final se necessário com o <Link href="/comprimir-pdf" className="text-brand-600 font-bold hover:underline">Compressor de PDF</Link>.</li>
              <li>Renomeie o arquivo conforme o padrão exigido e faça o upload.</li>
            </ol>
          </div>

          {/* === ADSENSE SLOT: Final do Artigo (horizontal/responsivo) === */}
          {/* Descomentar após aprovação do Google AdSense:
          <div className="my-8 text-center">
            <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-8269194570705692" data-ad-slot="SLOT_ID_AQUI" data-ad-format="auto" data-full-width-responsive="true" />
          </div>
          */}
        </article>
      </main>
      <Footer />
    </>
  );
}
