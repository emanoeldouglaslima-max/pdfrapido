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
    description: 'Reduza o tamanho do seu PDF online grátis. Ideal para enviar por e-mail ou WhatsApp. Sem cadastro, com limite de arquivo informado antes do envio.',
    keywords: 'comprimir pdf,reduzir pdf,diminuir tamanho pdf,comprimir pdf online grátis,compactar pdf,pdf menor,comprimir pdf whatsapp',
    h2: 'Como comprimir PDF online grátis?',
    why: 'Comprimir PDF é essencial para enviar arquivos por e-mail, WhatsApp ou economizar espaço de armazenamento. Nosso compressor reduz o tamanho do PDF otimizando a estrutura interna e compactando imagens embutidas, mantendo o texto nítido.',
    how: [
      'Clique no botão de upload ou arraste o seu PDF (limite de 25MB) para a área de seleção.',
      'Escolha o nível de compressão desejado (a compressão média é o padrão recomendado).',
      'Clique em "Comprimir PDF agora" para iniciar o processamento na nuvem.',
      'Aguarde a otimização e baixe o seu arquivo PDF reduzido em instantes.'
    ],
    faq: [
      { q: 'Quanto posso reduzir o tamanho de um PDF?', a: 'PDFs contendo muitas imagens podem ser reduzidos em até 80% do tamanho original. Arquivos contendo apenas texto têm uma redução menor devido à densidade dos caracteres.' },
      { q: 'A compressão reduz a qualidade das imagens e textos?', a: 'O texto vetorial do PDF permanece intacto e 100% nítido. O nível de compressão médio compacta as imagens internas de 300 DPI para 150 DPI, o que é perfeito para visualização em telas.' },
      { q: 'Funciona com arquivos digitalizados ou escaneados?', a: 'Sim. Se você tirou fotos de um documento ou o escaneou, o arquivo final costuma ser muito pesado. Nosso compressor é ideal para reamostrar essas imagens e encolher o arquivo.' },
      { q: 'Qual a diferença entre os níveis de compressão?', a: 'A compressão baixa prioriza a qualidade máxima de imagem. A média busca o melhor custo-benefício (equilíbrio peso/nitidez). A alta reduz bastante o peso, ideal para envios onde a qualidade da imagem não é o foco principal.' },
      { q: 'Meus arquivos ficam guardados?', a: 'Não. Todos os arquivos enviados são mantidos em memória temporária de processamento e excluídos de forma automática e permanente logo após o download ou por meio de nossa rotina a cada 30 minutos.' }
    ]
  },
  'converter-pdf-para-word': {
    title: 'PDF para Word Online Grátis — Converter PDF em Word Editável',
    description: 'Converta seus arquivos PDF em documentos do Word (.docx) editáveis online e grátis. Extração de texto rápida, segura e sem necessidade de cadastro.',
    keywords: 'pdf para word,converter pdf para word,pdf para docx,transformar pdf em word,pdf editável,converter pdf online grátis,pdf para word no celular',
    h2: 'Como converter PDF para Word online grátis?',
    why: 'O conversor de PDF para Word do PDFRápido foi desenvolvido para extrair o texto de arquivos PDF e organizá-los em um documento Word (.docx) para que você possa editá-lo no Microsoft Word, Google Docs ou LibreOffice. Ideal para fazer modificações em currículos, contratos ou relatórios digitalizados sem precisar reescrever tudo do zero.',
    how: [
      'Clique no campo de seleção e envie o seu arquivo PDF (limite de 25MB).',
      'Nossa API fará o processamento na nuvem para extrair a camada de texto do documento.',
      'O documento é reconstruído em parágrafos no formato padrão DOCX em poucos segundos.',
      'Baixe o arquivo convertido pronto para ser editado no seu editor de texto preferido.'
    ],
    faq: [
      { q: 'Como converter PDF para Word?', a: 'Basta enviar o seu documento PDF na área de upload acima, aguardar o processamento rápido na nuvem e clicar no botão para baixar o arquivo Word editável.' },
      { q: 'O conversor é gratuito?', a: 'Sim, a ferramenta é 100% gratuita, sem cobranças ocultas, assinaturas ou limites diários artificiais para uso individual.' },
      { q: 'Preciso instalar algum programa?', a: 'Não. Todo o processo de conversão ocorre online em nossos servidores de processamento. Você não precisa baixar nenhuma extensão ou software em seu aparelho.' },
      { q: 'Posso usar no celular?', a: 'Sim. O site é responsivo e funciona perfeitamente direto do navegador do seu smartphone Android, iPhone, tablet ou computador.' },
      { q: 'Posso converter PDF escaneado?', a: 'Nossa ferramenta extrai a camada de texto existente no PDF. Se o PDF for puramente uma imagem (uma foto escaneada sem camada de texto), o Word gerado ficará sem texto editável, pois o sistema não possui OCR (Reconhecimento Óptico de Caracteres) na versão atual.' },
      { q: 'A formatação original do PDF será preservada?', a: 'O conversor extrai e reconstrói o texto corrido de forma estruturada. No entanto, tabelas complexas com grades personalizadas, imagens posicionadas em layouts sofisticados ou fontes muito exclusivas podem precisar de pequenos ajustes manuais após o download.' },
      { q: 'Posso converter arquivos grandes?', a: 'Você pode enviar qualquer arquivo PDF de até 25MB para conversão direta, limite estabelecido para garantir o bom desempenho dos servidores de processamento.' },
      { q: 'Meus arquivos ficam armazenados?', a: 'Não de forma persistente. Seus documentos são processados temporariamente na memória de nosso servidor e imediatamente excluídos de forma definitiva após a conclusão do download.' },
      { q: 'O arquivo convertido pode ser editado?', a: 'Sim. O Word gerado vem com o texto em formato aberto, permitindo que você altere, apague ou insira trechos conforme necessário.' },
      { q: 'Qual formato de Word é gerado?', a: 'Geramos o arquivo no formato padrão .docx, compatível com as versões modernas do Microsoft Word, Google Docs e LibreOffice Writer.' }
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
      { q: 'A ferramenta suporta PDFs grandes?', a: 'Sim, você pode converter PDFs de até 25MB de forma totalmente gratuita.' },
      { q: 'Qual a diferença entre 150 DPI e 300 DPI?', a: 'DPI indica pontos por polegada. 150 DPI é ideal para telas, e-mails e WhatsApp porque gera arquivos mais leves. 300 DPI é recomendado se você planeja imprimir as imagens, gerando maior nível de nitidez.' },
      { q: 'As imagens são excluídas depois da conversão?', a: 'Sim, todos os arquivos temporários são apagados imediatamente do nosso servidor após o processamento e download.' }
    ]
  },
  'converter-word-para-pdf': {
    title: 'Word para PDF Online Grátis — Converter DOCX em PDF',
    description: 'Converta arquivos do Word (.docx ou .doc) para PDF online e grátis. Preserve a formatação do seu currículo ou contrato em qualquer dispositivo.',
    keywords: 'word para pdf,converter word para pdf,docx para pdf,doc para pdf,transformar word em pdf,salvar word como pdf',
    h2: 'Como converter Word para PDF online?',
    why: 'A conversão de documentos do Word para PDF é altamente recomendada antes de enviar currículos, propostas comerciais ou relatórios formais. O PDF garante que o destinatário veja a formatação exata que você criou, independentemente do sistema operacional.',
    how: [
      'Selecione ou arraste o arquivo Word (.docx ou .doc) de até 25MB na área indicada.',
      'Aguarde enquanto a nossa API converte a estrutura do documento.',
      'Baixe o documento em PDF finalizado e pronto para uso em segundos.'
    ],
    faq: [
      { q: 'A formatação do Word é alterada na conversão?', a: 'Não. Nosso conversor busca preservar o layout original do documento, incluindo fontes, alinhamentos, espaçamento de parágrafo e imagens embutidas.' },
      { q: 'Funciona com arquivos .doc antigos ou apenas .docx?', a: 'O conversor é compatível com ambas as extensões (.doc, criado em versões anteriores do Microsoft Word, e .docx, padrão das versões modernas).' },
      { q: 'O que acontece com imagens e tabelas do Word?', a: 'Imagens e tabelas são convertidas de forma nativa e desenhadas nas respectivas páginas do arquivo PDF final.' },
      { q: 'Preciso pagar para usar?', a: 'Não. O serviço é 100% gratuito, sem limite de uso e sem necessidade de criar conta ou realizar cadastros.' },
      { q: 'O site é seguro para documentos pessoais?', a: 'Sim. Os uploads e downloads ocorrem por conexões criptografadas (HTTPS) e todos os arquivos são deletados permanentemente do servidor logo após o processamento.' }
    ]
  },
  'converter-jpg-para-pdf': {
    title: 'Imagem para PDF Online Grátis — Converter JPG e PNG para PDF',
    description: 'Junte fotos, capturas de tela e imagens PNG/JPG em um único arquivo PDF. Ideal para enviar documentos e formulários online de forma organizada.',
    keywords: 'jpg para pdf,imagem para pdf,foto para pdf,png para pdf,converter imagem em pdf,juntar fotos em pdf',
    h2: 'Como converter imagens para PDF online?',
    why: 'Converter fotos e imagens para PDF facilita o envio de comprovantes, digitalizações manuais ou fotos de documentos para portais do governo, faculdades ou escritórios, unindo múltiplas capturas em um único arquivo profissional.',
    how: [
      'Selecione uma ou mais imagens (JPG, PNG ou WebP) do seu aparelho (limite de 20 arquivos).',
      'Defina a orientação desejada para o PDF de saída (Retrato ou Paisagem).',
      'Clique em "Imagem para PDF agora" para processar as fotos.',
      'Faça o download do seu documento PDF consolidado.'
    ],
    faq: [
      { q: 'Posso enviar fotos em formatos misturados?', a: 'Sim. Você pode enviar arquivos JPG, JPEG, PNG e WebP simultaneamente. O sistema converterá todas e as adicionará na sequência correta no PDF.' },
      { q: 'As imagens perdem a qualidade?', a: 'A qualidade original das fotos é preservada ao máximo, com dimensionamento adequado para o formato de página A4 padrão.' },
      { q: 'Posso juntar várias imagens em um único PDF?', a: 'Sim. Você pode fazer o upload de até 20 imagens de uma vez para gerar um único arquivo PDF contendo todas as páginas em sequência.' },
      { q: 'Existe uma ordem específica das imagens no PDF?', a: 'Sim. As fotos são organizadas no PDF final de acordo com a ordem em que foram selecionadas ou enviadas na área de upload.' },
      { q: 'Qual o limite de tamanho aceito pela ferramenta?', a: 'O limite é de 25MB no tamanho total acumulado dos arquivos de imagem por envio.' }
    ]
  },
  'juntar-pdf': {
    title: 'Juntar PDF Online Grátis — Unir Vários Arquivos em Um',
    description: 'Una vários arquivos PDF em um único documento online. Ordene as páginas do seu jeito, rápido, fácil e totalmente seguro.',
    keywords: 'juntar pdf,unir pdf,combinar pdf,mesclar pdf,juntar arquivos pdf online,unir vários pdf em um',
    h2: 'Como juntar PDFs em um único arquivo?',
    why: 'Juntar PDFs é o recurso ideal para unificar petições judiciais, juntar contratos e anexos, consolidar relatórios de equipes ou organizar capítulos dispersos de uma apostila em um único documento centralizado.',
    how: [
      'Selecione dois ou mais PDFs (máximo de 20 arquivos) que deseja juntar.',
      'Ordene a sequência das ferramentas enviando os arquivos na ordem que deseja combiná-los.',
      'Clique em "Juntar PDF agora" e aguarde o processamento.',
      'Faça o download do PDF unificado resultante.'
    ],
    faq: [
      { q: 'Quantos arquivos PDF posso juntar de uma vez?', a: 'Você pode enviar e unir até 20 arquivos em uma única operação, respeitando o limite total acumulado de 25MB.' },
      { q: 'É seguro juntar documentos confidenciais?', a: 'Sim. A comunicação é encriptada por SSL e todos os arquivos enviados são excluídos automaticamente de nossos servidores após o processamento.' },
      { q: 'Posso reordenar a sequência antes de juntar?', a: 'Os arquivos são mesclados de acordo com a sequência de upload. Para ordenar, basta enviar primeiro o documento que deve ser a primeira página e na sequência os demais.' },
      { q: 'Funciona com PDFs protegidos por senha?', a: 'Se algum dos PDFs selecionados estiver protegido por senha de leitura, você precisará remover a senha dele antes de tentar juntá-lo aos demais.' }
    ]
  },
  'dividir-pdf': {
    title: 'Dividir PDF Online Grátis — Extrair Páginas de PDF',
    description: 'Extraia páginas específicas de um PDF ou divida o documento em várias partes online. Grátis, sem cadastro e muito rápido.',
    keywords: 'dividir pdf,separar pdf,extrair páginas pdf,separar páginas pdf online,dividir pdf em partes,cortar pdf',
    h2: 'Como dividir PDF e extrair páginas online?',
    why: 'Dividir um PDF permite isolar apenas as folhas que interessam, como a página de assinatura de um contrato longo ou separar capítulos específicos de um e-book para estudos rápidos.',
    how: [
      'Faça o upload do PDF (limite de 25MB) que você deseja dividir.',
      'Escolha a regra de divisão: a cada N páginas, extrair uma página específica ou extrair um intervalo de páginas.',
      'Clique em "Dividir PDF agora" para processar.',
      'Baixe os arquivos separados (se gerado mais de um arquivo, eles virão agrupados em um ZIP).'
    ],
    faq: [
      { q: 'Como faço para extrair apenas a página 3 do meu PDF?', a: 'Escolha o modo "Extrair página específica", digite o número 3 no campo correspondente e inicie o processamento.' },
      { q: 'Os arquivos divididos mantêm os links e formatação?', a: 'Sim. O processo de divisão preserva a estrutura interna do PDF original, incluindo links clicáveis, texto selecionável e cores.' },
      { q: 'O que acontece se eu escolher um intervalo inválido?', a: 'O sistema retornará um erro informando que as páginas selecionadas estão fora dos limites do documento enviado.' },
      { q: 'Os PDFs gerados vêm em arquivos separados?', a: 'Sim. Se você extrair múltiplas páginas isoladas, o sistema empacotará todos os arquivos PDF gerados em um arquivo compactado ZIP para facilitar o download de uma só vez.' }
    ]
  },
  'transcrever-video-em-texto': {
    title: 'Transcrever Vídeo em Texto Online Grátis — PDFRápido',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo com exportação em PDF e Word. Rápido, seguro e gratuito.',
    keywords: 'transcrever vídeo,vídeo para texto,converter áudio em texto,áudio para pdf,transcrever áudio mp3,converter vídeo em word',
    h2: 'Como transcrever vídeo e áudio em texto online grátis?',
    why: 'Transcrever vídeos e gravações em texto é ideal para quem cria conteúdo para a internet, estudantes que assistem aulas gravadas ou profissionais que precisam de atas de reuniões rápido.',
    how: [
      'Faça o upload do vídeo ou áudio nos formatos MP4, WEBM, MOV, MP3 ou WAV.',
      'Selecione o idioma da gravação (Português, Inglês, Espanhol).',
      'Clique para iniciar a transcrição e acompanhe em tempo real.',
      'Copie o texto completo, baixe o arquivo de legenda .SRT ou exporte em PDF.'
    ],
    faq: [
      { q: 'É preciso se cadastrar para transcrever um vídeo?', a: 'Não. No PDFRápido você pode converter seu vídeo ou áudio em texto 100% grátis e sem precisar criar conta.' },
      { q: 'Quais formatos de arquivo são aceitos?', a: 'Aceitamos arquivos de vídeo como MP4, WEBM, MOV, AVI e áudios como MP3, WAV e M4A de até 100MB.' }
    ]
  },
  // Correção #9: SEO da nova ferramenta Proteger PDF com Senha
  'proteger-pdf': {
    title: 'Proteger PDF com Senha Online Grátis — Criptografar PDF',
    description: 'Adicione uma senha ao seu arquivo PDF online e grátis. Proteja documentos confidenciais contra acesso não autorizado. Sem cadastro, rápido e seguro.',
    keywords: 'proteger pdf com senha,senha para pdf,bloquear pdf,criptografar pdf,pdf com senha online,adicionar senha pdf',
    h2: 'Como proteger um PDF com senha online?',
    why: 'Proteger um PDF com senha é essencial para garantir a privacidade de documentos confidenciais como contratos, prontuários, extratos bancários e relatórios internos. Com o PDFRápido você adiciona criptografia AES-128 ao seu arquivo em segundos, sem precisar instalar nenhum software.',
    how: [
      'Selecione ou arraste o arquivo PDF (limite de 25MB) que deseja proteger.',
      'Digite a senha de sua escolha no campo indicado.',
      'Confirme a senha para evitar erros de digitação.',
      'Clique em "Proteger PDF agora" e baixe seu arquivo protegido com criptografia.'
    ],
    faq: [
      { q: 'Qual tipo de criptografia é utilizado?', a: 'Utilizamos criptografia AES-128, padrão amplamente suportado por todos os leitores de PDF modernos, incluindo Adobe Acrobat, Foxit Reader, browsers e apps mobile.' },
      { q: 'Posso abrir o PDF protegido em qualquer dispositivo?', a: 'Sim. O PDF protegido pode ser aberto em qualquer leitor de PDF compatível com senha — desde que você forneça a senha correta.' },
      { q: 'A ferramenta é gratuita?', a: 'Sim, 100% gratuita. Sem limite de uso, sem cadastro e sem cobranças ocultas.' },
      { q: 'Meus arquivos ficam armazenados?', a: 'Não. Todos os arquivos são excluídos automaticamente de nossos servidores imediatamente após o processamento e download.' },
      { q: 'Posso remover a senha depois?', a: 'Sim. Se você precisar remover a proteção, use nossa ferramenta complementar de remoção de senha ou serviços especializados, desde que você conheça a senha original.' }
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

        {/* Conteúdo SEO rico e otimizado */}
        <article className="prose prose-gray dark:prose-invert max-w-none mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{seo.h2}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">{seo.why}</p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6">Passo a passo para usar a ferramenta</h3>
          <ol className="mt-3 space-y-2">
            {seo.how.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {seo.faq.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">Perguntas frequentes</h3>
              <div className="mt-3 space-y-4">
                {seo.faq.map((f, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{f.q}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{f.a}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>

        {/* Widget Interativo de Avaliação de Estrelas */}
        <RatingWidget toolName={tool.name} />

        {/* Links Internos e Ferramentas Relacionadas */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Outras ferramentas gratuitas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={`${t.color} rounded-xl p-4 hover:shadow-sm transition-all text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-brand-700 dark:hover:text-brand-400 flex items-center gap-2`}
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
