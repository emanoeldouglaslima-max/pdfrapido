import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Como Converter Imagens PNG para PDF no Celular sem Aplicativos',
  description: 'Aprenda a transformar fotos e imagens em formato PNG ou JPG em arquivos PDF usando recursos integrados do Android e iOS, sem instalar nada.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/converter-png-para-pdf-celular',
  },
};

export default function Artigo8Page() {
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
            headline: 'Como Converter Imagens PNG para PDF no Celular sem Aplicativos',
            description: 'Aprenda a transformar fotos e imagens em formato PNG ou JPG em arquivos PDF usando recursos integrados do Android e iOS, sem instalar nada.',
            datePublished: '2026-07-12T12:00:00Z',
            dateModified: '2026-07-12T12:00:00Z',
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
              '@id': 'https://pdfrapido.com.br/blog/converter-png-para-pdf-celular',
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
          <span className="text-gray-600">Converter PNG para PDF no Celular</span>
        </div>

        <article>
          {/* Header do Artigo */}
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-indigo-100 text-indigo-700">
              Conversor
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Como Converter Imagens PNG para PDF no Celular sem Aplicativos
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>12 de julho de 2026</span>
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
              Precisa digitalizar uma foto do seu documento de identidade, contrato assinado à mão ou comprovante de endereço e enviá-lo em formato PDF para um cadastro? 
            </p>
            <p>
              Muitos usuários correm para a Google Play ou App Store e baixam aplicativos de scanner pesados, que entopem a memória do celular de propagandas intrusivas. Porém, tanto o Android quanto o iOS (iPhone) possuem ótimas ferramentas nativas que fazem essa conversão de imagem PNG/JPG para PDF em segundos e com excelente qualidade.
            </p>
            <p>
              Aprenda a seguir como transformar suas fotos em documentos PDF sem instalar nenhum aplicativo adicional.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Como converter fotos em PDF no iPhone (iOS)</h2>
            <p>
              No iPhone, você pode usar o aplicativo nativo **Fotos** ou o app **Arquivos** para gerar um PDF instantaneamente:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Abra o aplicativo **Fotos** do seu iPhone e selecione a imagem PNG ou JPG que deseja converter.</li>
              <li>Toque no botão de **Compartilhar** (ícone da caixinha com a seta para cima no canto inferior esquerdo).</li>
              <li>Role a lista de opções para baixo e selecione **Imprimir**.</li>
              <li>Na janela de visualização de impressão, faça um gesto de &quot;pinça&quot; (afastar dois dedos) em cima da imagem da página. Isso abrirá a visualização em modo PDF.</li>
              <li>Toque novamente no botão de **Compartilhar** no canto superior direito e selecione a opção **Salvar em Arquivos**.</li>
              <li>Escolha a pasta de destino e salve. O seu arquivo de imagem agora é um PDF oficial de página inteira.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Como converter fotos em PDF no Android</h2>
            <p>
              Os celulares modernos com sistema operacional Android utilizam o recurso de impressão nativo do sistema integrado ao Google Fotos:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Abra a imagem no aplicativo **Google Fotos** ou na galeria padrão do seu celular.</li>
              <li>Toque no menu de três pontos verticais no canto superior direito e selecione **Imprimir** (ou vá em Compartilhar &gt; Imprimir).</li>
              <li>No menu suspenso de impressoras na parte superior da tela, selecione **Salvar como PDF**.</li>
              <li>Clique no botão circular azul com a inscrição &quot;PDF&quot; para fazer o download.</li>
              <li>Selecione a pasta do armazenamento interno onde deseja salvar e confirme o salvamento.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Como converter PNG em PDF online em lote</h2>
            <p>
              Os métodos nativos do celular descritos acima são excelentes para converter uma única imagem de cada vez. No entanto, se você tirou fotos de 5 páginas de um contrato e precisa juntá-las em um único arquivo PDF ordenado, fazer um por um no celular dará muito trabalho.
            </p>
            <p>
              Para resolver isso, você pode usar nossa ferramenta de conversão de imagens. Basta carregar todas as fotos de uma vez, ordenar arrastando-as na tela do celular e exportar em um único documento compilado.
            </p>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Tem várias fotos para transformar em um único PDF?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Una todas as suas fotos PNG ou JPG em um arquivo de forma sequencial. Rápido, direto no celular e sem limite de envios.
              </p>
              <div className="pt-2">
                <Link
                  href="/converter-jpg-para-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Converter Imagens para PDF
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
