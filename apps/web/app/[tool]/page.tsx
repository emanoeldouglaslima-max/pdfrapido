import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { TOOLS } from '../constants';
import ToolClientPage from './ToolClientPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';
import RatingWidget from '../../components/RatingWidget';

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
    title: 'Comprimir PDF Online Grátis — Reduzir Tamanho de PDF',
    description: 'Reduza o tamanho de arquivos PDF online de forma simples e gratuita. Ideal para enviar por e-mail ou WhatsApp. Sem cadastro, com descarte automático.',
    keywords: 'comprimir pdf,reduzir pdf,diminuir tamanho pdf,comprimir pdf online grátis,compactar pdf,pdf menor,comprimir pdf whatsapp',
    h2: 'Como comprimir PDF online grátis?',
    why: 'O otimizador de PDF do PDFRápido reduz o peso total de documentos PDF reamostrando elementos visuais internos e reestruturando metadados desnecessários. Dependendo da quantidade e resolução das imagens embutidas, a redução de tamanho pode ser expressiva, mantendo os textos perfeitamente legíveis.',
    how: [
      'Clique no botão de seleção ou arraste seu arquivo PDF (tamanho máximo de 25MB) para a área de upload.',
      'Escolha a intensidade de compressão desejada (a compressão recomendada oferece o melhor equilíbrio).',
      'Clique no botão "Comprimir PDF agora" para processar o documento em nossos servidores seguros.',
      'Aguarde a conclusão e faça o download do seu PDF otimizado em poucos segundos.'
    ],
    faq: [
      { q: 'Qual a redução de tamanho esperada ao comprimir um PDF?', a: 'A taxa de redução varia de acordo com o conteúdo original do arquivo. Documentos escaneados ou contendo muitas fotos de alta resolução podem apresentar reduções significativas de tamanho. PDFs compostos exclusivamente por texto vetorial apresentam uma variação menor.' },
      { q: 'A qualidade dos textos e imagens é preservada?', a: 'Os textos vetoriais e fontes do documento permanecem intactos. No modo de compressão recomendado, as imagens passam por uma reamostragem equilibrada, garantindo excelente nitidez em telas de celular e computador.' },
      { q: 'Posso comprimir PDFs digitalizados ou fotos de documentos?', a: 'Sim. Se você digitalizou folhas ou tirou fotos com o celular, o arquivo costuma ficar pesado. A compressão reamostra as imagens para um formato adequado de envio.' },
      { q: 'Qual o limite de tamanho para upload?', a: 'Aceitamos arquivos PDF de até 25MB por operação, limite suficiente para a maioria dos contratos, apostilas e certidões.' },
      { q: 'O serviço exige cadastro ou cartão?', a: 'Não. O serviço é 100% gratuito e não exige criação de conta ou informação de dados bancários.' },
      { q: 'O que acontece com os arquivos após a compressão?', a: 'Todos os arquivos são processados temporariamente em nossos servidores e excluídos de forma automática e definitiva em até 30 minutos ou após o download.' },
      { q: 'Funciona no celular Android e iPhone?', a: 'Sim, o PDFRápido é inteiramente responsivo e funciona em navegadores móveis como Safari, Chrome e Firefox.' },
      { q: 'Posso comprimir múltiplos PDFs em lote?', a: 'No momento, cada compressão é realizada por arquivo individual para garantir máxima velocidade de processamento.' }
    ]
  },
  'converter-pdf-para-word': {
    title: 'PDF para Word Online Grátis — Converter PDF em Word Editável',
    description: 'Converta seus arquivos PDF em documentos do Word (.docx) editáveis online e grátis. Extração de texto rápida, segura e sem necessidade de cadastro.',
    keywords: 'pdf para word,converter pdf para word,pdf para docx,transformar pdf em word,pdf editável,converter pdf online grátis,pdf para word no celular',
    h2: 'Como converter PDF para Word online grátis?',
    why: 'O conversor de PDF para Word extrai a camada de texto e layout dos seus arquivos PDF, gerando um documento Word (.docx) editável. Isso permite fazer modificações em currículos, trabalhos acadêmicos ou relatórios sem precisar reescrever o texto do zero.',
    how: [
      'Selecione ou arraste seu arquivo PDF (limite de 25MB) para a área de upload.',
      'Aguarde a extração da estrutura do texto por nossos servidores na nuvem.',
      'O documento é reconstruído em formato .docx em poucos segundos.',
      'Baixe o arquivo Word editável e abra no Microsoft Word, Google Docs ou LibreOffice.'
    ],
    faq: [
      { q: 'Como funciona a conversão de PDF para Word?', a: 'Nossa ferramenta analisa a camada textual do PDF e reconstrói o documento em parágrafos e estilos compatíveis com o formato .docx do Word.' },
      { q: 'O conversor é 100% gratuito?', a: 'Sim, você pode utilizar o conversor sem pagar nada e sem necessidade de cadastro.' },
      { q: 'Preciso instalar algum software ou extensão?', a: 'Não. Todo o processamento ocorre online direto no seu navegador.' },
      { q: 'Como converter PDFs escaneados ou imagens?', a: 'A ferramenta extrai textos de documentos que possuem camada de texto selecionável. Se o PDF for puramente uma foto escaneada sem OCR integrado, o texto poderá vir como imagem no Word.' },
      { q: 'A formatação original do PDF é mantida?', a: 'Buscamos preservar o layout original. No entanto, tabelas complexas ou fontes personalizadas podem necessitar de pequenos ajustes após a conversão.' },
      { q: 'Qual o limite de tamanho do arquivo?', a: 'O limite é de 25MB por arquivo PDF enviado.' },
      { q: 'Posso editar o arquivo Word gerado no celular?', a: 'Sim. O arquivo .docx gerado pode ser aberto e editado em aplicativos como Microsoft Word Mobile, Google Docs e WPS Office no Android ou iPhone.' },
      { q: 'Meus documentos ficam protegidos?', a: 'Sim. Todas as conexões utilizam criptografia SSL de 256 bits e os arquivos são apagados automaticamente em até 30 minutos.' }
    ]
  },
  'converter-pdf-para-jpg': {
    title: 'PDF para JPG Online Grátis — Converter Páginas em Imagem',
    description: 'Transforme cada página do seu PDF em imagens JPG de alta qualidade em segundos. Rápido, seguro e gratuito. Baixe todas as fotos em um ZIP.',
    keywords: 'pdf para jpg,converter pdf para imagem,pdf para jpeg,pdf para foto,transformar pdf em jpg,extrair imagem pdf',
    h2: 'Como converter PDF para JPG online?',
    why: 'Converter páginas de PDF em imagem é ideal para compartilhar documentos nas redes sociais, anexar fotos em formulários online ou visualizar arquivos em dispositivos sem leitor de PDF.',
    how: [
      'Envie o arquivo PDF (limite de 25MB) que deseja converter em imagens.',
      'Escolha a resolução desejada para as fotos de saída.',
      'Nossos servidores gerarão um arquivo .zip contendo cada página em formato JPG.',
      'Baixe a pasta zipada e extraia as imagens para o seu dispositivo.'
    ],
    faq: [
      { q: 'Cada página vira uma imagem JPG separada?', a: 'Sim. Cada página do PDF é convertida em um arquivo JPG independente, reunidos em um arquivo compactado .zip para facilitar o download.' },
      { q: 'Qual a resolução das imagens geradas?', a: 'As imagens são geradas com resolução adequada para visualização clara em telas de celular, computador e apresentações.' },
      { q: 'Posso converter PDFs grandes?', a: 'Sim, aceitamos arquivos de até 25MB contendo múltiplas páginas.' },
      { q: 'O serviço é seguro?', a: 'Sim. A comunicação é criptografada e os arquivos são removidos dos servidores automaticamente em até 30 minutos.' },
      { q: 'Funciona em sistemas iOS e Android?', a: 'Sim, você pode baixar o arquivo .zip direto no celular e abrir na galeria de imagens.' }
    ]
  },
  'converter-word-para-pdf': {
    title: 'Word para PDF Online Grátis — Converter DOCX em PDF',
    description: 'Converta arquivos do Word (.docx ou .doc) para PDF online e grátis. Preserve a formatação do seu currículo ou contrato em qualquer dispositivo.',
    keywords: 'word para pdf,converter word para pdf,docx para pdf,doc para pdf,transformar word em pdf,salvar word como pdf',
    h2: 'Como converter Word para PDF online?',
    why: 'Converter documentos Word para PDF garante que o leiaute, fontes e margens do seu trabalho ou contrato sejam visualizados de forma idêntica em qualquer celular ou computador, evitando desalinhamentos.',
    how: [
      'Selecione ou arraste seu arquivo Word (.docx ou .doc) de até 25MB.',
      'Aguarde enquanto nossa plataforma converte o documento para o padrão PDF.',
      'Faça o download do seu PDF pronto para envio ou impressão.'
    ],
    faq: [
      { q: 'A formatação do documento original é preservada?', a: 'Sim. Fontes, margens, tabelas e imagens inseridas no Word são mantidas na conversão para PDF.' },
      { q: 'Suporta os formatos .doc e .docx?', a: 'Sim, nosso conversor é compatível com versões antigas (.doc) e modernas (.docx) do Microsoft Word.' },
      { q: 'Preciso criar conta para converter?', a: 'Não, a ferramenta é totalmente aberta e gratuita.' },
      { q: 'Meus arquivos ficam seguros?', a: 'Sim. O tráfego de dados é criptografado por SSL e todos os arquivos são deletados em até 30 minutos.' }
    ]
  },
  'converter-jpg-para-pdf': {
    title: 'Imagem para PDF Online Grátis — Converter JPG e PNG para PDF',
    description: 'Junte fotos, capturas de tela e imagens PNG/JPG em um único arquivo PDF. Ideal para enviar documentos e formulários online de forma organizada.',
    keywords: 'jpg para pdf,imagem para pdf,foto para pdf,png para pdf,converter imagem em pdf,juntar fotos em pdf',
    h2: 'Como converter imagens para PDF online?',
    why: 'Unir fotos de comprovantes, documentos digitalizados ou capturas de tela em um único PDF organiza suas entregas e atende às exigências de portais acadêmicos e corporativos.',
    how: [
      'Faça o upload de uma ou mais imagens (JPG, PNG, WebP) de até 25MB no total.',
      'Ajuste a orientação do documento de saída se necessário.',
      'Clique em "Imagem para PDF agora" para consolidar as fotos.',
      'Baixe o arquivo PDF completo.'
    ],
    faq: [
      { q: 'Posso unir várias fotos em um único arquivo PDF?', a: 'Sim. Você pode enviar múltiplas imagens simultaneamente e o sistema irá compilar todas em sequência em um único PDF.' },
      { q: 'Quais formatos de foto são aceitos?', a: 'Aceitamos JPG, JPEG, PNG e WebP.' },
      { q: 'As fotos perdem qualidade?', a: 'A nitidez das fotos é preservada para garantir leitura clara do conteúdo.' },
      { q: 'É gratuito?', a: 'Sim, 100% gratuito e sem necessidade de cadastro.' }
    ]
  },
  'juntar-pdf': {
    title: 'Juntar PDF Online Grátis — Unir Vários Arquivos em Um',
    description: 'Una vários arquivos PDF em um único documento online. Ordene as páginas do seu jeito, rápido, fácil e totalmente seguro.',
    keywords: 'juntar pdf,unir pdf,combinar pdf,mesclar pdf,juntar arquivos pdf online,unir vários pdf em um',
    h2: 'Como juntar PDFs em um único arquivo?',
    why: 'Juntar arquivos PDF permite consolidar anexos, petições jurídicas, relatórios e capítulos de apostilas em um único documento organizado.',
    how: [
      'Envie os arquivos PDF (até 20 arquivos, limite acumulado de 25MB).',
      'Ordene a sequência de exibição desejada.',
      'Clique em "Juntar PDF agora" para unir os documentos.',
      'Faça o download do PDF unificado.'
    ],
    faq: [
      { q: 'Quantos PDFs posso juntar de uma vez?', a: 'Você pode enviar até 20 arquivos simultaneamente respeitando o limite total de 25MB.' },
      { q: 'Como definir a ordem das páginas?', a: 'Envie os arquivos na sequência que deseja que apareçam no documento final.' },
      { q: 'Os documentos originais são alterados?', a: 'Não. Uma nova versão combinada é gerada mantendo seus arquivos originais intactos no seu dispositivo.' },
      { q: 'É seguro enviar documentos bancários ou contratos?', a: 'Sim, a conexão é protegida por SSL de 256 bits e os arquivos são apagados automaticamente em até 30 minutos.' }
    ]
  },
  'dividir-pdf': {
    title: 'Dividir PDF Online Grátis — Extrair Páginas de PDF',
    description: 'Extraia páginas específicas de um PDF ou divida o documento em várias partes online. Grátis, sem cadastro e muito rápido.',
    keywords: 'dividir pdf,separar pdf,extrair páginas pdf,separar páginas pdf online,dividir pdf em partes,cortar pdf',
    h2: 'Como dividir PDF e extrair páginas online?',
    why: 'Dividir um PDF é a solução perfeita para extrair apenas a folha de interesse de um contrato longo ou separar capítulos de um e-book pesado.',
    how: [
      'Envie o PDF (limite de 25MB) que deseja dividir.',
      'Indique quais páginas deseja extrair ou o intervalo desejado.',
      'Clique em "Dividir PDF agora" para processar.',
      'Baixe os arquivos PDF separados.'
    ],
    faq: [
      { q: 'Posso extrair apenas uma página específica?', a: 'Sim, você pode informar exatamente o número da página que deseja isolar.' },
      { q: 'Os links e a formatação interna continuam funcionando?', a: 'Sim, a estrutura vetorial e os links internos da página extraída são mantidos.' },
      { q: 'Como recebo os arquivos se extrair mais de uma página?', a: 'Quando múltiplas páginas são divididas, o sistema gera um arquivo .zip contendo todos os PDFs separados.' }
    ]
  },
  'transcrever-video-em-texto': {
    title: 'Transcrever Vídeo em Texto Online Grátis — PDFRápido',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo com exportação em PDF e Word. Rápido, seguro e gratuito.',
    keywords: 'transcrever vídeo,vídeo para texto,converter áudio em texto,áudio para pdf,transcrever áudio mp3,converter vídeo em word',
    h2: 'Como transcrever vídeo e áudio em texto online grátis?',
    why: 'A transcrição automática transforma gravações de aulas, reuniões e vídeos em texto editável, economizando horas de digitação manual.',
    how: [
      'Envie seu arquivo de áudio ou vídeo (MP4, WEBM, MOV, MP3, WAV de até 100MB).',
      'Selecione o idioma da gravação.',
      'Acompanhe o processamento da inteligência artificial de reconhecimento de fala.',
      'Copie o texto gerado ou exporte diretamente para PDF ou Word.'
    ],
    faq: [
      { q: 'Quais formatos de mídia são aceitos?', a: 'Aceitamos arquivos de vídeo (MP4, WEBM, MOV) e áudio (MP3, WAV, M4A).' },
      { q: 'A transcrição é precisa?', a: 'Áudios limpos e sem ruídos de fundo oferecem altíssima precisão no reconhecimento de palavras.' },
      { q: 'O serviço possui limite de tempo?', a: 'Aceitamos arquivos de mídia com até 100MB de tamanho por envio.' }
    ]
  },
  'proteger-pdf': {
    title: 'Proteger PDF com Senha Online Grátis — Criptografar PDF',
    description: 'Adicione uma senha ao seu arquivo PDF online e grátis. Proteja documentos confidenciais contra acesso não autorizado. Sem cadastro, rápido e seguro.',
    keywords: 'proteger pdf com senha,senha para pdf,bloquear pdf,criptografar pdf,pdf com senha online,adicionar senha pdf',
    h2: 'Como proteger um PDF com senha online?',
    why: 'Proteger um PDF com senha garante a confidencialidade de relatórios financeiros, contratos e documentos pessoais contra acessos indesejados.',
    how: [
      'Faça o upload do seu arquivo PDF (limite de 25MB).',
      'Digite a senha forte que deseja atribuir ao documento.',
      'Confirme a senha para evitar erros.',
      'Baixe o seu PDF criptografado e protegido.'
    ],
    faq: [
      { q: 'Qual o tipo de proteção aplicada?', a: 'Aplicamos criptografia padrão compatível com leitores de PDF modernos.' },
      { q: 'Posso abrir em qualquer aplicativo leitor de PDF?', a: 'Sim, qualquer leitor de PDF solicitará a senha definida para abrir o arquivo.' },
      { q: 'O site guarda a minha senha?', a: 'Não. Não armazenamos senhas nem os arquivos dos usuários.' }
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
const RELATED_STYLES: Record<string, string> = {
  'comprimir-pdf':             'bg-blue-50/90 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-900 dark:text-blue-200 hover:bg-blue-100/50 dark:hover:bg-blue-900/50',
  'converter-pdf-para-word':   'bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50',
  'converter-pdf-para-jpg':    'bg-green-50/90 dark:bg-green-950/40 border border-green-100 dark:border-green-900/30 text-green-900 dark:text-green-200 hover:bg-green-100/50 dark:hover:bg-green-900/50',
  'converter-word-para-pdf':   'bg-purple-50/90 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 text-purple-900 dark:text-purple-200 hover:bg-purple-100/50 dark:hover:bg-purple-900/50',
  'converter-jpg-para-pdf':    'bg-yellow-50/90 dark:bg-amber-950/40 border border-yellow-100 dark:border-amber-900/30 text-amber-900 dark:text-amber-200 hover:bg-yellow-100/50 dark:hover:bg-amber-900/50',
  'juntar-pdf':                'bg-orange-50/90 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30 text-orange-900 dark:text-orange-200 hover:bg-orange-100/50 dark:hover:bg-orange-900/50',
  'dividir-pdf':               'bg-red-50/90 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-200 hover:bg-red-100/50 dark:hover:bg-red-900/50',
  'transcrever-video-em-texto': 'bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50',
  'proteger-pdf':               'bg-slate-50/90 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/30 text-slate-900 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/50',
};

// Geração de páginas estáticas em tempo de build (SSG)
export async function generateStaticParams() {
  return TOOLS
    .filter((t) => t.slug !== 'transcrever-video-em-texto')
    .map((t) => ({
      tool: t.slug,
    }));
}

export default function ToolPage({ params }: PageProps) {
  // Evita conflito com a rota estática dedicada
  if (params.tool === 'transcrever-video-em-texto') {
    notFound();
  }

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

      {/* Schema.org BreadcrumbList */}
      <Script
        id="schema-org-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Início',
                item: 'https://pdfrapido.com.br',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: tool.name,
                item: canonicalUrl,
              },
            ],
          }),
        }}
      />

      {/* Schema.org — HowTo (Instruções de Uso) */}
      <Script
        id={`schema-howto-${params.tool}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `${seo.h2} — Instruções de Uso`,
            description: tool.description,
            step: seo.how.map((step, idx) => ({
              '@type': 'HowToStep',
              position: idx + 1,
              name: `Passo ${idx + 1}`,
              text: step,
            })),
          }),
        }}
      />

      {/* Schema.org — WebApplication (Aplicação Utilitária) */}
      <Script
        id={`schema-webapp-${params.tool}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.name,
            url: canonicalUrl,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'BRL',
            },
          }),
        }}
      />

      <Header />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb visual */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 mb-6 font-semibold" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Início</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">{tool.name}</span>
        </nav>

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
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {tool.name} Online Grátis
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">{tool.description} Sem cadastro e com limite de arquivo informado antes do envio.</p>
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

        {/* Conteúdo SEO rico, Explicação da Ferramenta e Instruções de Uso */}
        <section id="instrucoes-e-explicacao" aria-label="Instruções de uso e explicação da ferramenta" className="mt-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Explicação da Ferramenta: {tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-2 text-base">
              {seo.why}
            </p>

            {/* Guia em 4 Passos com Microdados semânticos */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Instruções de Uso e Passo a Passo Simplificado
            </h3>
            <ol className="space-y-3 not-prose">
              {seo.how.map((step, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-200 text-sm">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                  <span className="mt-0.5 font-medium leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            {/* Especificações Técnicas e Segurança LGPD */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-5 rounded-2xl">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm flex items-center gap-2 mb-2">
                  <span>⚡</span> Especificações Técnicas
                </h4>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1.5 leading-relaxed">
                  <li><strong>Tamanho Máximo por Arquivo:</strong> 25 MB por upload.</li>
                  <li><strong>Formatos Suportados:</strong> PDF, DOCX, JPG, PNG, MP4, MP3, WebP.</li>
                  <li><strong>Velocidade Média:</strong> Processamento na nuvem em menos de 5 segundos.</li>
                  <li><strong>Compatibilidade:</strong> Funciona em celular, tablet e computador.</li>
                </ul>
              </div>

              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 p-5 rounded-2xl">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2 mb-2">
                  <span>🛡️</span> Segurança e Privacidade (LGPD)
                </h4>
                <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5 leading-relaxed">
                  <li><strong>Conexão Criptografada:</strong> Tráfego protegido por SSL/TLS de 256 bits.</li>
                  <li><strong>Exclusão Automática:</strong> Arquivos excluídos em até 30 minutos.</li>
                  <li><strong>Sem Leitura Humana:</strong> Processamento 100% automatizado por software.</li>
                  <li><strong>Sem Cadastro:</strong> Não exigimos e-mail ou dados pessoais para uso.</li>
                </ul>
              </div>
            </div>

            {/* Perguntas Frequentes (FAQ) com High Value Content */}
            {seo.faq.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Perguntas Frequentes (FAQ) — {tool.name}
                </h3>
                <div className="space-y-4 not-prose">
                  {seo.faq.map((f, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">{f.q}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-2 leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </section>

        {/* Widget Interativo de Avaliação de Estrelas */}
        <RatingWidget toolName={tool.name} />

        {/* Links Internos e Ferramentas Relacionadas */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Outras ferramentas gratuitas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => {
              const styleClass = RELATED_STYLES[t.slug] || 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
              return (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className={`${styleClass} rounded-xl p-4 hover:shadow-sm transition-all text-sm font-semibold flex items-center gap-2`}
                >
                  <span>{t.icon}</span> {t.name}
                </Link>
              );
            })}
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
