import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Como Reduzir o Tamanho do PDF no Windows sem Instalar Programas',
  description: 'Descubra como comprimir e diminuir o tamanho de arquivos PDF pesados no Windows 10 e 11 usando ferramentas nativas e truques de navegador.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-reduzir-tamanho-pdf-windows',
  },
};

export default function Artigo10Page() {
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
            headline: 'Como Reduzir o Tamanho do PDF no Windows sem Instalar Programas',
            description: 'Descubra como comprimir e diminuir o tamanho de arquivos PDF pesados no Windows 10 e 11 usando ferramentas nativas e truques de navegador.',
            datePublished: '2026-07-10T12:00:00Z',
            dateModified: '2026-07-10T12:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/como-reduzir-tamanho-pdf-windows',
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
          <span className="text-gray-600">Reduzir Tamanho do PDF no Windows</span>
        </div>

        <article>
          {/* Header do Artigo */}
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
              Organização
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Como Reduzir o Tamanho do PDF no Windows sem Instalar Programas
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>10 de julho de 2026</span>
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
              Você acabou de preencher um formulário importante no Windows, inseriu cópias de documentos de identificação e, na hora de fazer o upload em um portal do governo, percebeu que o arquivo tem 25MB, enquanto o limite do site é de apenas 5MB?
            </p>
            <p>
              Esse é um dos problemas mais frustrantes do escritório digital. Muitos usuários correm para instalar programas gratuitos duvidosos da internet, que muitas vezes vêm acompanhados de vírus ou adwares. Felizmente, no Windows 10 e 11, você consegue compactar seus PDFs usando funções nativas do sistema.
            </p>
            <p>
              Veja a seguir os melhores métodos para encolher PDFs no Windows de forma totalmente segura e sem instalar nada.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Truque do Microsoft Edge: Imprimir em escala de cinza</h2>
            <p>
              Arquivos PDF coloridos contendo digitalizações de fotos são extremamente pesados. Se o destinatário do documento não precisa visualizar as imagens em cores (como certidões de nascimento ou RG), converter o PDF para tons de cinza reduz consideravelmente o tamanho do arquivo:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Clique com o botão direito no PDF pesado e selecione **Abrir com** &gt; **Microsoft Edge**.</li>
              <li>Pressione as teclas **Ctrl + P** para abrir a janela de impressão do navegador.</li>
              <li>No campo da Impressora, escolha a opção **Microsoft Print to PDF**.</li>
              <li>Role as opções adicionais para baixo e altere o campo **Cor** de *Colorido* para **Tons de cinza** (Preto e Branco).</li>
              <li>Clique em **Imprimir**, selecione a pasta onde salvar e defina um novo nome.</li>
              <li>O Windows gerará um PDF em escala de cinza muito mais leve, ideal para upload em portais do governo.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Compactação nativa ao salvar no Word</h2>
            <p>
              Se você está criando o PDF a partir de um documento do Microsoft Word contendo muitas imagens pesadas (por exemplo, um catálogo de produtos ou um relatório com fotos de obras), você pode configurar a compressão automática na hora de salvar:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>No Word, clique em **Arquivo** &gt; **Salvar Como**.</li>
              <li>Selecione o local de salvamento e altere o tipo de arquivo para **PDF (*.pdf)**.</li>
              <li>Abaixo do tipo de arquivo, localize o campo **Otimizar para** e selecione a opção **Tamanho mínimo (publicação online)**. </li>
              <li>Essa opção reamostra as imagens do documento para 150 DPI automaticamente, o que reduz bastante o tamanho final do PDF mantendo a legibilidade na tela.</li>
              <li>Clique em **Salvar**.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. A forma mais rápida: Compressão Online Inteligente</h2>
            <p>
              Se os métodos manuais descritos acima ainda não reduzirem o tamanho do arquivo o suficiente, ou se você precisa manter as imagens coloridas com excelente nitidez, a melhor alternativa é usar algoritmos modernos de compressão de PDF.
            </p>
            <p>
              O nosso compressor remove elementos estruturais desnecessários (como metadados redundantes de editores, fontes duplicadas e históricos de revisão) e otimiza imagens com algoritmos inteligentes de compressão de imagem de última geração. O resultado é um arquivo até **80% menor** em poucos segundos.
            </p>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Seu arquivo continua pesado no Windows?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Reduza o tamanho do seu documento instantaneamente em nosso compressor. Seguro, gratuito e sem instalação.
              </p>
              <div className="pt-2">
                <Link
                  href="/comprimir-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Comprimir PDF Agora
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
