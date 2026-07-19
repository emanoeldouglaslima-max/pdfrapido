import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Diferença entre PDF/A e PDF Comum: Quando Usar Cada Um?',
  description: 'Entenda o que é o formato PDF/A, a diferença em relação ao PDF tradicional e as exigências em concursos públicos e processos judiciais (PJe).',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/diferenca-pdfa-pdf-comum',
  },
};

export default function Artigo6Page() {
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
            headline: 'Diferença entre PDF/A e PDF Comum: Quando Usar Cada Um?',
            description: 'Entenda o que é o formato PDF/A, a diferença em relação ao PDF tradicional e as exigências em concursos públicos e processos judiciais (PJe).',
            datePublished: '2026-07-14T12:00:00Z',
            dateModified: '2026-07-14T12:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/diferenca-pdfa-pdf-comum',
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
          <span className="text-gray-600">Diferença entre PDF/A e PDF Comum</span>
        </div>

        <article>
          {/* Header do Artigo */}
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
              Organização
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Diferença entre PDF/A e PDF Comum: Quando Usar Cada Um?
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>14 de julho de 2026</span>
              <span>•</span>
              <span>4 min de leitura</span>
            </div>
          </header>

          {/* === ADSENSE SLOT: Topo do Artigo (horizontal/responsivo) === */}
          {/* Descomentar após aprovação do Google AdSense:
          <div className="my-6 text-center">
            <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-8269194570705692" data-ad-slot="SLOT_ID_AQUI" data-ad-format="auto" data-full-width-responsive="true" />
          </div>
          */}

          {/* Corpo do Artigo */}
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg text-gray-700 font-medium">
              Ao enviar um arquivo para uma plataforma governamental, portal de concursos públicos ou sistema judiciário (PJe), você já deve ter visto o aviso: &quot;O documento enviado deve estar no formato PDF/A&quot;.
            </p>
            <p>
              Mas afinal de contas, qual a diferença real entre o PDF/A e o PDF que usamos todos os dias? Por que as instituições exigem esse padrão e como você pode converter seus documentos sem dificuldades?
            </p>
            <p>
              Neste artigo, explicamos os aspectos técnicos dessa variante do PDF, quando ela é indispensável e como garantir que seus arquivos cumpram a exigência legal.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. O que é o PDF/A e qual sua finalidade?</h2>
            <p>
              O **PDF/A** (onde a letra &quot;A&quot; significa *Archival*, ou Arquivamento) é uma versão padronizada pela ISO (Organização Internacional de Padronização) específica para a preservação de longo prazo de documentos digitais.
            </p>
            <p>
              Ao contrário do PDF comum, que pode mudar de aparência dependendo das fontes instaladas no leitor ou de links externos, o PDF/A garante que o documento seja renderizado **exatamente da mesma forma**, independentemente do software, do dispositivo ou do sistema operacional, mesmo que aberto daqui a 50 ou 100 anos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Diferenças Técnicas: PDF/A vs. PDF Comum</h2>
            <p>
              Para assegurar que o conteúdo nunca mude, o padrão PDF/A restringe certos recursos interativos e dinâmicos do formato original:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Fontes Embutidas (Embedded Fonts):</strong> No PDF/A, todas as fontes (famílias de letras) devem estar incorporadas no arquivo. Se o leitor do futuro não tiver a fonte &quot;Arial&quot;, ele usará a cópia embutida no documento, impedindo distorções no texto.</li>
              <li><strong>Sem Links Externos ou Scripts:</strong> O PDF/A proíbe links de internet e códigos JavaScript. Isso evita que o documento tente buscar informações em sites que podem deixar de existir.</li>
              <li><strong>Cores Estáticas:</strong> O arquivo deve usar espaços de cores independentes de dispositivo (como sRGB) para manter os tons e imagens fiéis.</li>
              <li><strong>Proibição de Criptografia por Senha:</strong> Um arquivo criptografado exige chaves ou senhas de abertura. Para preservação a longo prazo, senhas são proibidas para evitar que o conteúdo se perca permanentemente.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Quando você deve utilizar o PDF/A?</h2>
            <p>
              O PDF/A não é ideal para documentos do dia a dia (pois torna os arquivos ligeiramente maiores), mas é obrigatório nas seguintes situações:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Petições e Processos Judiciais (PJe):</strong> Advogados e partes no processo judicial eletrônico brasileiro devem submeter documentos no padrão PDF/A para garantir o registro permanente e sem alterações das provas.</li>
              <li><strong>Concursos Públicos e Licitações:</strong> Editais exigem a digitalização de diplomas e certidões em PDF/A para assegurar que as tabelas de notas e assinaturas fiquem perfeitamente legíveis na verificação dos avaliadores.</li>
              <li><strong>Arquivamento de Teses e TCCs:</strong> Universidades utilizam o PDF/A para catalogar pesquisas e monografias em repositórios digitais acadêmicos nacionais e internacionais.</li>
            </ol>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Precisa unificar arquivos para editais ou petições?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Junte todos os seus certificados e comprovantes em um só arquivo PDF limpo e ordenado, pronto para submissão digital.
              </p>
              <div className="pt-2">
                <Link
                  href="/juntar-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Juntar PDFs Agora
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Como gerar ou converter um arquivo para PDF/A?</h2>
            <p>
              Você pode criar arquivos PDF/A diretamente dos programas de edição de texto mais comuns:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>No Microsoft Word:</strong> Vá em *Salvar Como* &gt; selecione o tipo de arquivo *PDF* &gt; clique no botão *Opções* &gt; marque a caixa **Compatível com PDF/A** &gt; clique em *Salvar*.</li>
              <li><strong>No LibreOffice / Writer:</strong> Vá em *Arquivo* &gt; *Exportar Como* &gt; *Exportar como PDF* &gt; marque a opção **PDF/A-1b** ou superior &gt; clique em *Exportar*.</li>
            </ul>
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
