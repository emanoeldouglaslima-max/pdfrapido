import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS } from '../constants';
import ToolClientPage from './ToolClientPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';

interface PageProps {
  params: { tool: string };
}

// Mapeamento dinâmico para SEO e Metadados das ferramentas
const SEO_CONTENT: Record<string, {
  title: string;
  description: string;
  keywords: string;
  h2: string;
  why: string;
  how: string[];
  faq: { q: string; a: string }[];
}> = {
  'comprimir-pdf': {
    title: 'Comprimir PDF Online Grátis — Reduzir PDF sem Perder Qualidade',
    description: 'Reduza o tamanho do seu PDF online grátis sem perder qualidade. Ideal para enviar por e-mail ou WhatsApp. Sem cadastro e sem limites.',
    keywords: 'comprimir pdf,reduzir pdf,diminuir tamanho pdf,comprimir pdf online grátis,compactar pdf,pdf menor,comprimir pdf whatsapp',
    h2: 'Como comprimir PDF online grátis?',
    why: 'Comprimir PDF é essencial para enviar arquivos por e-mail, WhatsApp ou economizar espaço de armazenamento. Nosso compressor reduz o tamanho do PDF otimizando a estrutura interna e compactando imagens embutidas, mantendo o texto nítido.',
    how: [
      'Clique no botão de upload ou arraste o seu PDF para a área de seleção.',
      'Escolha o nível de compressão desejado (médio recomendado).',
      'Clique em "Comprimir PDF agora" para iniciar o processamento.',
      'Baixe o seu PDF reduzido em instantes.'
    ],
    faq: [
      { q: 'Quanto posso reduzir o tamanho de um PDF?', a: 'PDFs contendo muitas imagens podem ser reduzidos em até 80% do tamanho original. Arquivos contendo apenas texto têm uma redução menor.' },
      { q: 'A compressão reduz a qualidade das imagens?', a: 'O nível de compressão médio oferece o melhor equilíbrio, reduzindo o peso do arquivo enquanto mantém as imagens nítidas para leitura.' },
      { q: 'O site armazena os meus documentos?', a: 'Não. Todos os arquivos enviados e processados são excluídos permanentemente de nossos servidores após 30 minutos.' }
    ]
  },
  'converter-pdf-para-word': {
    title: 'PDF para Word Online Grátis — Converter PDF em Word Editável',
    description: 'Converta seus arquivos PDF em documentos do Word (.docx) editáveis online e grátis. Layout preservado, rápido e sem necessidade de cadastro.',
    keywords: 'pdf para word,converter pdf para word,pdf para docx,transformar pdf em word,pdf editável,converter pdf online grátis',
    h2: 'Como converter PDF para Word online?',
    why: 'Converter PDF para Word permite editar o conteúdo de um documento com facilidade no Microsoft Word ou Google Docs. Ideal para atualizar currículos, revisar contratos ou copiar trechos de relatórios.',
    how: [
      'Selecione o arquivo PDF que deseja converter do seu computador ou celular.',
      'Aguarde enquanto nossa ferramenta extrai o texto e reconstrói o documento.',
      'Clique no botão de download para obter o arquivo .docx editável.'
    ],
    faq: [
      { q: 'O texto convertido pode ser editado?', a: 'Sim. O arquivo final é gerado no formato .docx padrão, permitindo que você altere textos, tabelas e parágrafos.' },
      { q: 'A formatação original do PDF é mantida?', a: 'Nossa ferramenta extrai e preserva o texto de forma estruturada. Para PDFs muito complexos com muitos layouts gráficos, pequenos ajustes de design podem ser necessários após a conversão.' }
    ]
  },
  'converter-pdf-para-jpg': {
    title: 'PDF para JPG Online Grátis — Converter Páginas em Imagem',
    description: 'Transforme cada página do seu PDF em imagens JPG de alta qualidade em segundos. Rápido, seguro e gratuito. Baixe todas as fotos em um ZIP.',
    keywords: 'pdf para jpg,converter pdf para imagem,pdf para jpeg,pdf para foto,transformar pdf em jpg,extrair imagem pdf',
    h2: 'Como converter PDF para JPG online?',
    why: 'Converter páginas de PDF em imagem é excelente para compartilhar documentos nas redes sociais, usar como anexos de e-mail rápidos ou criar apresentações visuais sem precisar abrir leitores de PDF.',
    how: [
      'Envie o arquivo PDF que você deseja transformar em imagens.',
      'Escolha a qualidade de saída desejada (150 DPI para uso web ou 300 DPI para impressão).',
      'Aguarde o processamento e baixe o arquivo comprimido .zip contendo todas as páginas em JPG.'
    ],
    faq: [
      { q: 'Cada página vira uma imagem JPG separada?', a: 'Sim. Se o seu arquivo PDF tiver 5 páginas, a ferramenta gerará 5 imagens JPG individuais empacotadas em um único arquivo .zip para facilitar o download.' },
      { q: 'A ferramenta suporta PDFs grandes?', a: 'Sim, você pode converter PDFs de até 25MB de forma totalmente gratuita.' }
    ]
  },
  'converter-word-para-pdf': {
    title: 'Word para PDF Online Grátis — Converter DOCX em PDF',
    description: 'Converta arquivos do Word (.docx ou .doc) para PDF online e grátis. Preserve a formatação do seu currículo ou contrato em qualquer dispositivo.',
    keywords: 'word para pdf,converter word para pdf,docx para pdf,doc para pdf,transformar word em pdf,salvar word como pdf',
    h2: 'Como converter Word para PDF online?',
    why: 'A conversão de documentos do Word para PDF é altamente recomendada antes de enviar currículos, propostas comerciais ou relatórios formais. O PDF garante que o destinatário veja a formatação exata que você criou, independentemente do sistema operacional.',
    how: [
      'Arraste e solte o arquivo Word (.docx ou .doc) na área indicada.',
      'Aguarde o processamento do documento pelo nosso conversor.',
      'Baixe o documento em PDF finalizado.'
    ],
    faq: [
      { q: 'A formatação do Word é alterada na conversão?', a: 'Não. Nosso conversor preserva o layout original do documento, incluindo fontes, tabelas, imagens e espaçamento.' },
      { q: 'Posso converter de qualquer dispositivo?', a: 'Sim. A conversão é feita na nuvem, funcionando direto pelo navegador do celular, tablet ou computador.' }
    ]
  },
  'converter-jpg-para-pdf': {
    title: 'Imagem para PDF Online Grátis — Converter JPG e PNG para PDF',
    description: 'Junte fotos, capturas de tela e imagens PNG/JPG em um único arquivo PDF. Ideal para enviar documentos e formulários online de forma organizada.',
    keywords: 'jpg para pdf,imagem para pdf,foto para pdf,png para pdf,converter imagem em pdf,juntar fotos em pdf',
    h2: 'Como converter imagens para PDF online?',
    why: 'Converter fotos e imagens para PDF facilita o envio de comprovantes, digitalizações manuais ou fotos de documentos para portais do governo, faculdades ou escritórios, unindo múltiplas capturas em um único arquivo profissional.',
    how: [
      'Selecione uma ou mais imagens (JPG, PNG ou WebP) do seu aparelho.',
      'Escolha a orientação das páginas (Retrato ou Paisagem).',
      'Clique em "Imagem para PDF agora" e baixe o seu documento unificado.'
    ],
    faq: [
      { q: 'Posso enviar fotos em formatos misturados?', a: 'Sim. Você pode enviar arquivos JPG, JPEG, PNG e WebP simultaneamente. O sistema converterá todos e os adicionará na sequência correta no PDF.' },
      { q: 'As imagens perdem a qualidade?', a: 'A qualidade original das fotos é preservada ao máximo, com dimensionamento adequado para o formato de página A4.' }
    ]
  },
  'juntar-pdf': {
    title: 'Juntar PDF Online Grátis — Unir Vários Arquivos em Um',
    description: 'Una vários arquivos PDF em um único documento online. Ordene as páginas do seu jeito, rápido, fácil e totalmente seguro.',
    keywords: 'juntar pdf,unir pdf,combinar pdf,mesclar pdf,juntar arquivos pdf online,unir vários pdf em um',
    h2: 'Como juntar PDFs em um único arquivo?',
    why: 'Juntar PDFs é o recurso ideal para unificar petições judiciais, juntar contratos e anexos, consolidar relatórios de equipes ou organizar capítulos dispersos de uma apostila em um único documento centralizado.',
    how: [
      'Selecione dois ou mais PDFs que deseja juntar.',
      'Ordene a sequência das ferramentas enviando os arquivos na ordem que deseja lê-los.',
      'Clique em "Juntar PDF agora" e faça o download do PDF unificado.'
    ],
    faq: [
      { q: 'Quantos arquivos PDF posso juntar de uma vez?', a: 'Você pode enviar e unir até 20 arquivos em uma única operação, respeitando o limite total acumulado de 25MB.' },
      { q: 'É seguro juntar documentos confidenciais?', a: 'Sim. A comunicação é encriptada por SSL e todos os arquivos enviados são destruídos dos servidores após 30 minutos.' }
    ]
  },
  'dividir-pdf': {
    title: 'Dividir PDF Online Grátis — Extrair Páginas de PDF',
    description: 'Extraia páginas específicas de um PDF ou divida o documento em várias partes online. Grátis, sem cadastro e muito rápido.',
    keywords: 'dividir pdf,separar pdf,extrair páginas pdf,separar páginas pdf online,dividir pdf em partes,cortar pdf',
    h2: 'Como dividir PDF e extrair páginas online?',
    why: 'Dividir um PDF permite isolar apenas as folhas que interessam, como a página de assinatura de um contrato longo ou separar capítulos específicos de um e-book para estudos rápidos.',
    how: [
      'Faça o upload do PDF que você deseja dividir.',
      'Escolha a regra de divisão: a cada N páginas, extrair uma página específica ou extrair um intervalo de páginas.',
      'Inicie a divisão e baixe os arquivos separados (caso gere mais de um arquivo, eles virão agrupados em um ZIP).'
    ],
    faq: [
      { q: 'Como faço para extrair apenas a página 3 do meu PDF?', a: 'Escolha o modo "Extrair página específica", digite o número 3 no campo de texto e clique para processar.' },
      { q: 'Os arquivos divididos mantêm os links e formatação?', a: 'Sim. O processo de divisão preserva a estrutura interna do PDF original, incluindo links clicáveis, texto selecionável e cores.' }
    ]
  }
};

// Gerador de Metadados dinâmico com foco em SEO local e canônicos válidos
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = TOOLS.find((t) => t.slug === params.tool);
  const seo = SEO_CONTENT[params.tool];
  
  if (!tool || !seo) {
    return {};
  }

  const canonicalUrl = `https://pdfrapido.com.br/${params.tool}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: 'https://pdfrapido.com.br/og-image.png',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@pdfrapido',
      title: seo.title,
      description: seo.description,
      images: ['https://pdfrapido.com.br/og-image.png'],
    },
  };
}

// Geração de páginas estáticas em tempo de build (SSG)
export async function generateStaticParams() {
  return TOOLS.map((t) => ({
    tool: t.slug,
  }));
}

export default function ToolPage({ params }: PageProps) {
  const tool = TOOLS.find((t) => t.slug === params.tool);
  
  if (!tool) {
    notFound();
  }

  const seo = SEO_CONTENT[params.tool] || {
    title: `${tool.name} Online Grátis | PDFRápido`,
    description: tool.description,
    h2: `Como usar: ${tool.name}`,
    why: tool.description,
    how: ['Envie seu arquivo', 'Aguarde o processamento', 'Baixe o resultado'],
    faq: [],
  };

  const relatedTools = TOOLS.filter((t) => t.slug !== params.tool).slice(0, 3);
  const canonicalUrl = `https://pdfrapido.com.br/${params.tool}`;

  return (
    <>
      {/* Schema.org dinâmico (WebApplication) */}
      <Script
        id="schema-org-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: seo.title,
            url: canonicalUrl,
            description: seo.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires HTML5 support',
            inLanguage: 'pt-BR',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'BRL',
            },
          }),
        }}
      />

      {/* Schema.org dinâmico para FAQs se existirem */}
      {seo.faq.length > 0 && (
        <Script
          id="schema-org-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: seo.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            }),
          }}
        />
      )}

      <Header />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Bloco de anúncio do topo da ferramenta (oculta se AdSense desligado) */}
        <AdUnit
          slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_TOP || '0000000004'}
          format="horizontal"
          className="mb-8 ad-slot-horizontal rounded-xl overflow-hidden"
        />

        {/* Hero da ferramenta */}
        <div className="text-center mb-8">
          <div className={`inline-flex w-16 h-16 ${tool.iconBg} rounded-2xl items-center justify-center text-3xl mb-4`}>
            {tool.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {tool.name} Online Grátis
          </h1>
          <p className="mt-3 text-lg text-gray-500">{tool.description} Sem cadastro e sem limites.</p>
        </div>

        {/* Componente de upload interativo do cliente */}
        <ToolClientPage toolSlug={params.tool} />

        {/* Bloco de anúncio no meio da página (oculta se AdSense desligado) */}
        <div className="my-8">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_MID || '0000000005'}
            format="fluid"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* Conteúdo SEO rico e otimizado */}
        <article className="prose prose-gray max-w-none mt-10">
          <h2 className="text-2xl font-bold text-gray-900">{seo.h2}</h2>
          <p className="text-gray-600 leading-relaxed mt-3">{seo.why}</p>

          <h3 className="text-xl font-bold text-gray-900 mt-6">Passo a passo para usar a ferramenta</h3>
          <ol className="mt-3 space-y-2">
            {seo.how.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {seo.faq.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-gray-900 mt-8">Perguntas frequentes</h3>
              <div className="mt-3 space-y-4">
                {seo.faq.map((f, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <h4 className="font-semibold text-gray-900">{f.q}</h4>
                    <p className="text-gray-500 text-sm mt-1">{f.a}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>

        {/* Links Internos e Ferramentas Relacionadas */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Outras ferramentas gratuitas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`${t.color} rounded-xl p-4 hover:shadow-sm transition-all text-sm font-semibold text-gray-800 hover:text-brand-700 flex items-center gap-2`}
              >
                <span>{t.icon}</span> {t.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bloco de anúncio no final da ferramenta (oculta se AdSense desligado) */}
        <div className="mt-10">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_BOTTOM || '0000000006'}
            format="auto"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
