import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Como Extrair Apenas Algumas Páginas de um PDF Longo no Mac e Windows',
  description: 'Aprenda a fracionar arquivos PDF grandes e salvar páginas específicas como novos arquivos separados usando softwares nativos e gratuitos.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/extrair-paginas-de-pdf',
  },
};

export default function Artigo9Page() {
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
            headline: 'Como Extrair Apenas Algumas Páginas de um PDF Longo no Mac e Windows',
            description: 'Aprenda a fracionar arquivos PDF grandes e salvar páginas específicas como novos arquivos separados usando softwares nativos e gratuitos.',
            datePublished: '2026-07-11T12:00:00Z',
            dateModified: '2026-07-11T12:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/extrair-paginas-de-pdf',
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
          <span className="text-gray-600">Extrair Páginas de PDF</span>
        </div>

        <article>
          {/* Header do Artigo */}
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
              Organização
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Como Extrair Apenas Algumas Páginas de um PDF Longo no Mac e Windows
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>11 de julho de 2026</span>
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
              Imagine que você comprou um e-book em PDF de 300 páginas, mas precisa enviar apenas um capítulo específico de 5 páginas para um colega por e-mail ou WhatsApp. Ou então, necessita desmembrar um relatório corporativo gigante para separar suas informações fiscais.
            </p>
            <p>
              Enviar o arquivo inteiro é um desperdício de dados e dificulta a vida de quem vai ler. Felizmente, você não precisa comprar o caro Adobe Acrobat Pro para dividir um PDF. Tanto o sistema operacional macOS (da Apple) quanto o Windows (da Microsoft) possuem formas fáceis e nativas de fracionamento de arquivos.
            </p>
            <p>
              Neste artigo, ensinamos o passo a passo detalhado para realizar esse procedimento de forma rápida e segura.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Como dividir e extrair páginas de PDF no Windows</h2>
            <p>
              No Windows, a forma mais fácil é usar qualquer navegador de internet moderno (como Microsoft Edge, Google Chrome ou Firefox) por meio do utilitário de impressão virtual:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Clique com o botão direito sobre o arquivo PDF e escolha **Abrir com** &gt; **Microsoft Edge** (ou Google Chrome).</li>
              <li>Pressione as teclas **Ctrl + P** para abrir a janela de impressão.</li>
              <li>No campo **Impressora**, selecione a opção **Salvar como PDF** ou *Microsoft Print to PDF*.</li>
              <li>No campo **Páginas**, selecione a opção **Páginas personalizadas** ou **Intervalo**.</li>
              <li>Digite os números das páginas que deseja separar. Por exemplo: digite `3-7` para extrair as páginas 3, 4, 5, 6 e 7, ou digite `2, 5, 9` para extrair apenas essas páginas individuais.</li>
              <li>Clique em **Salvar**, dê um novo nome ao arquivo e clique em *Confirmar*. O novo PDF conterá estritamente as páginas selecionadas.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Como dividir e extrair páginas de PDF no Mac (macOS)</h2>
            <p>
              O sistema operacional da Apple possui o aplicativo nativo **Visualização Rápida (Preview)**, que é um dos melhores gerenciadores de PDF gratuitos do mercado:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Dê dois cliques sobre o arquivo PDF para abri-lo automaticamente no **Preview**.</li>
              <li>Clique no botão de visualização no canto superior esquerdo e marque a opção **Miniaturas (Thumbnails)** para exibir a barra lateral de páginas.</li>
              <li>Selecione as páginas que deseja extrair (segure a tecla *Command* para selecionar páginas alternadas).</li>
              <li>Agora, basta **clicar e arrastar** as páginas selecionadas para fora da janela do Preview e soltá-las na sua **Mesa (Desktop)**.</li>
              <li>O macOS criará automaticamente um novo arquivo PDF contendo exclusivamente as páginas que você arrastou!</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Como fazer divisões complexas online e de graça</h2>
            <p>
              As alternativas acima são perfeitas para extrair intervalos sequenciais simples de um documento. No entanto, se o seu arquivo possui centenas de páginas e você precisa cortá-lo em vários pedaços ao mesmo tempo (por exemplo: extrair as páginas 1-10, 20-30 e 50-60 de uma vez em arquivos independentes), utilizar os navegadores demandará muito tempo.
            </p>
            <p>
              Para esses casos, você pode usar nosso divididor de páginas online. Carregue o arquivo de forma segura, digite os intervalos de corte e baixe um arquivo ZIP contendo todas as partes separadas instantaneamente.
            </p>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Precisa extrair ou remover páginas de um PDF?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Use nossa ferramenta de fracionamento para separar intervalos de páginas de arquivos grandes, reduzindo o peso final.
              </p>
              <div className="pt-2">
                <Link
                  href="/dividir-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Dividir PDF Grátis
                </Link>
              </div>
            </div>
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
