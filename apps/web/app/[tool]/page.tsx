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

interface SeoItem {
  title: string;
  description: string;
  keywords: string;
  h2: string;
  why: string;
  how: string[];
  faq: { q: string; a: string }[];
}

// Mapeamento dinâmico e rico para SEO e Metadados das 26+ ferramentas
const SEO_CONTENT: Record<string, SeoItem> = {
  // ── CATEGORIA: PDF ─────────────────────────────────────────────────────────
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
      { q: 'Posso comprimir PDFs para enviar pelo WhatsApp?', a: 'Sim. O WhatsApp possui limite de envio para anexos. Ao reduzir o peso do PDF com o PDFRápido, você consegue enviar contratos e apostilas sem estourar o limite da mensagem.' },
      { q: 'O serviço exige cadastro ou cartão?', a: 'Não. O serviço é 100% gratuito e não exige criação de conta ou informação de dados bancários.' },
      { q: 'O que acontece com os arquivos após a compressão?', a: 'Todos os arquivos são processados temporariamente em nossos servidores e excluídos de forma automática e definitiva em até 30 minutos ou após o download.' }
    ]
  },
  'juntar-pdf': {
    title: 'Juntar PDF Online Grátis — Unir Vários PDFs em Um',
    description: 'Junte vários arquivos PDF em um único documento online e grátis. Reordene seus PDFs e mescle anexos, contratos e certidões rapidamente.',
    keywords: 'juntar pdf,unir pdf,mesclar pdf,combinar pdf,juntar arquivos pdf,unir pdfs em um só',
    h2: 'Como juntar vários arquivos PDF em um único documento?',
    why: 'A ferramenta de mesclagem permite unificar relatórios, comprovantes, fotos digitalizadas e anexos contratuais em um único PDF sequencial. Isso facilita a organização de petições judiciais, processos administrativos do e-CAC ou envios por e-mail.',
    how: [
      'Selecione ou arraste 2 ou mais arquivos PDF para a caixa de envio.',
      'Verifique os nomes dos arquivos enviados para confirmar a sequência desejada.',
      'Clique em "Juntar PDF agora" para unificar todos os documentos na nuvem.',
      'Faça o download do PDF final unificado instantaneamente.'
    ],
    faq: [
      { q: 'Quantos arquivos PDF posso juntar de uma vez?', a: 'Você pode selecionar e combinar até 20 arquivos PDF em cada lote de mesclagem.' },
      { q: 'Posso juntar PDFs com tamanhos de páginas diferentes?', a: 'Sim, a ferramenta preserva os tamanhos e orientações (A4, carta, paisagem) de cada folha original no arquivo final.' },
      { q: 'Os documentos originais são alterados?', a: 'Não, seus arquivos originais permanecem intocados em seu dispositivo. Geramos uma nova cópia unificada.' }
    ]
  },
  'dividir-pdf': {
    title: 'Dividir PDF Online Grátis — Extrair e Separar Páginas',
    description: 'Divida documentos PDF pesados em arquivos menores ou extraia páginas específicas online. 100% gratuito, rápido e sem instalação de programas.',
    keywords: 'dividir pdf,separar pdf,extrair página pdf,cortar pdf,fatiar pdf online',
    h2: 'Como dividir um arquivo PDF em partes menores?',
    why: 'Dividir um PDF é fundamental quando você precisa enviar apenas uma certidão ou capítulo específico de um livro sem expor o restante do documento confidencial.',
    how: [
      'Envie o PDF que deseja dividir no leitor de upload.',
      'Escolha a modalidade de divisão: extrair página única, intervalo específico ou dividir a cada N folhas.',
      'Clique no botão "Dividir PDF agora".',
      'Faça o download das partes divididas prontas para uso.'
    ],
    faq: [
      { q: 'Posso extrair apenas a página 1 e 5 de um PDF?', a: 'Sim, selecione a opção de extração específica informando os números das páginas desejadas.' },
      { q: 'Os links e textos continuam selecionáveis?', a: 'Sim, a camada vetorial do PDF original é preservada exatamente como no documento fonte.' }
    ]
  },
  'girar-pdf': {
    title: 'Girar PDF Online Grátis — Rotacionar Páginas de PDF',
    description: 'Gire páginas de PDF de cabeça para baixo ou na horizontal online. Corrija a orientação de documentos digitalizados e escaneados grátis.',
    keywords: 'girar pdf,rotacionar pdf,virar página pdf,inverter pdf,girar documento pdf',
    h2: 'Como girar páginas de PDF na orientação correta?',
    why: 'Ao digitalizar documentos pelo celular ou scanner, é comum que algumas páginas fiquem de lado ou de cabeça para baixo. O rotacionador corrige os ângulos sem perda de nitidez.',
    how: [
      'Carregue o arquivo PDF com páginas desalinhadas.',
      'Selecione o ângulo de rotação desejado (90°, 180° ou 270°).',
      'Clique em "Girar PDF agora".',
      'Baixe seu PDF alinhado perfeitamente.'
    ],
    faq: [
      { q: 'Posso girar um documento escaneado?', a: 'Sim, funciona tanto para PDFs nativos quanto para documentos digitalizados.' }
    ]
  },
  'proteger-pdf': {
    title: 'Proteger PDF com Senha — Criptografar PDF Online',
    description: 'Adicione uma senha de proteção ao seu PDF para impedir aberturas e cópias não autorizadas. Criptografia segura, gratuita e rápida.',
    keywords: 'proteger pdf com senha,senha para pdf,bloquear pdf,criptografar pdf,colocar senha em pdf',
    h2: 'Como colocar senha em um arquivo PDF?',
    why: 'Proteger PDFs com senha garante que dados confidenciais, contracheques, balanços financeiros ou contratos de compra e venda só sejam lidos pelas pessoas certas.',
    how: [
      'Faça o upload do arquivo PDF que deseja proteger.',
      'Digite e confirme a senha secreta nos campos indicados.',
      'Clique em "Proteger PDF agora".',
      'Faça o download do PDF criptografado.'
    ],
    faq: [
      { q: 'Qual a força da criptografia utilizada?', a: 'Utilizamos o padrão de segurança para PDF que exige a senha exata na abertura do arquivo em qualquer leitor.' }
    ]
  },
  'desbloquear-pdf': {
    title: 'Desbloquear PDF Online Grátis — Remover Senha de PDF',
    description: 'Remova a senha e restrições de arquivos PDF quando tiver a devida autorização. Desbloqueio online rápido e 100% seguro.',
    keywords: 'desbloquear pdf,remover senha pdf,tirar senha de pdf,desbloquear pdf protegido',
    h2: 'Como remover a senha de um PDF?',
    why: 'Se você possui a autorização de um documento e precisa remover a senha de abertura para facilitar o arquivamento automático, o desbloqueador elimina a barreira com praticidade.',
    how: [
      'Envie o PDF protegido por senha.',
      'Informe a senha de acesso válida para liberar a proteção.',
      'Clique em "Desbloquear PDF agora".',
      'Faça o download do PDF livre de senhas.'
    ],
    faq: [
      { q: 'É legal remover a senha de um PDF?', a: 'Sim, desde que você seja o proprietário legal do arquivo ou tenha autorização expressa do emissor.' }
    ]
  },

  // ── CATEGORIA: CONVERSÃO ───────────────────────────────────────────────────
  'converter-pdf-para-word': {
    title: 'PDF para Word Online Grátis — Converter PDF em Word Editável',
    description: 'Converta seus arquivos PDF em documentos do Word (.docx) editáveis online e grátis. Extração de texto rápida, segura e sem necessidade de cadastro.',
    keywords: 'pdf para word,converter pdf para word,pdf para docx,transformar pdf em word,pdf editável',
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
      { q: 'A formatação original do PDF é mantida?', a: 'Buscamos preservar o layout original. Tabelas simples e listas são reconstruídas no padrão Word.' }
    ]
  },
  'converter-pdf-para-jpg': {
    title: 'PDF para JPG Online Grátis — Converter Páginas em Imagem',
    description: 'Transforme cada página do seu PDF em imagens JPG de alta qualidade em segundos. Rápido, seguro e gratuito. Baixe todas as fotos em um ZIP.',
    keywords: 'pdf para jpg,converter pdf para imagem,pdf para jpeg,pdf para foto,transformar pdf em jpg',
    h2: 'Como converter PDF para JPG online?',
    why: 'Converter páginas de PDF em imagem é ideal para compartilhar documentos nas redes sociais, anexar fotos em formulários online ou visualizar arquivos em dispositivos sem leitor de PDF.',
    how: [
      'Envie o arquivo PDF que deseja converter em imagens.',
      'Escolha a resolução desejada para as fotos de saída.',
      'Nossos servidores gerarão um arquivo .zip contendo cada página em formato JPG.',
      'Baixe a pasta zipada e extraia as imagens para o seu dispositivo.'
    ],
    faq: [
      { q: 'Cada página vira uma imagem JPG separada?', a: 'Sim. Cada página do PDF é convertida em um arquivo JPG independente reunidos em uma pasta compactada .zip.' }
    ]
  },
  'converter-pdf-para-excel': {
    title: 'PDF para Excel Online Grátis — Extrair Tabelas para XLSX',
    description: 'Converta tabelas e relatórios em PDF para planilhas editáveis do Excel (.xlsx) grátis e sem cadastro.',
    keywords: 'pdf para excel,pdf para xlsx,extrair tabela pdf excel,converter pdf planilha',
    h2: 'Como extrair tabelas de PDF para o Excel?',
    why: 'Evite a digitação manual de relatórios financeiros e extratos. O conversor extrai os dados tabulares do PDF e os organiza em colunas e linhas no formato XLSX do Excel.',
    how: [
      'Envie o documento PDF contendo tabelas ou números.',
      'Aguarde o processamento inteligente das colunas.',
      'Baixe a planilha Excel gerada e abra no Microsoft Excel ou Google Sheets.'
    ],
    faq: [
      { q: 'As fórmulas do Excel são recriadas?', a: 'A ferramenta extrai os valores numéricos organizados nas células correspondentes.' }
    ]
  },
  'converter-word-para-pdf': {
    title: 'Word para PDF Online Grátis — Converter DOCX em PDF',
    description: 'Converta arquivos do Word (.docx ou .doc) para PDF online e grátis. Preserve a formatação do seu currículo ou contrato em qualquer dispositivo.',
    keywords: 'word para pdf,converter word para pdf,docx para pdf,doc para pdf,transformar word em pdf',
    h2: 'Como converter Word para PDF online?',
    why: 'Converter documentos Word para PDF garante que o leiaute, fontes e margens do seu trabalho ou contrato sejam visualizados de forma idêntica em qualquer celular ou computador.',
    how: [
      'Selecione ou arraste seu arquivo Word (.docx ou .doc) de até 25MB.',
      'Aguarde enquanto nossa plataforma converte o documento para o padrão PDF.',
      'Faça o download do seu PDF pronto para impressão ou envio seguro.'
    ],
    faq: [
      { q: 'O PDF gerado fica protegido contra edições acidentais?', a: 'Sim, o formato PDF trava o layout de exibição idêntico ao criado no Word.' }
    ]
  },
  'converter-jpg-para-pdf': {
    title: 'JPG para PDF Online Grátis — Imagem para PDF',
    description: 'Junte fotos JPG, PNG e WebP em um único documento PDF organizado. Grátis, sem cadastro e perfeito para digitalizar recibos no celular.',
    keywords: 'jpg para pdf,imagem para pdf,foto para pdf,converter jpg em pdf,juntar fotos em pdf',
    h2: 'Como transformar várias fotos JPG em um único PDF?',
    why: 'Transformar fotos tiradas pelo celular em um arquivo PDF é a melhor maneira de enviar comprovantes bancários, certidões e RG para cadastros e concursos públicos.',
    how: [
      'Selecione uma ou mais fotos do seu celular ou computador.',
      'Escolha a orientação da página (retrato ou paisagem).',
      'Clique em "Converter em PDF agora".',
      'Baixe seu PDF montado com todas as fotos em sequência.'
    ],
    faq: [
      { q: 'Posso selecionar fotos diretamente da galeria do celular?', a: 'Sim, o PDFRápido é 100% otimizado para o navegador do Android e iPhone.' }
    ]
  },

  // ── CATEGORIA: EDIÇÃO ──────────────────────────────────────────────────────
  'assinar-pdf': {
    title: 'Assinar PDF Online Grátis — Assinatura Digital em PDF',
    description: 'Assine contratos e documentos em PDF online. Desenhe sua assinatura ou digite sua rubrica sem precisar imprimir o papel.',
    keywords: 'assinar pdf,assinar pdf online,rubrica em pdf,assinatura digital pdf,assinar contrato pdf',
    h2: 'Como assinar um documento PDF online sem imprimir?',
    why: 'Evite o desperdício de papel e cartucho de impressora. Assine contratos de prestação de serviços e termos de responsabilidade em segundos direto na tela.',
    how: [
      'Carregue o arquivo PDF que precisa de assinatura.',
      'Escolha o local da página onde deseja posicionar a rubrica.',
      'Clique em "Assinar PDF agora" e baixe o contrato assinado.'
    ],
    faq: [
      { q: 'A assinatura online tem validade jurídica?', a: 'Sim, para a maioria dos acordos comerciais e termos simples entre partes conforme a legislação brasileira.' }
    ]
  },
  'adicionar-marca-dagua-pdf': {
    title: 'Marca d\'Água em PDF — Estampar Carimbo em PDF',
    description: 'Adicione marcas d\'água como "CONFIDENCIAL", "RASCUNHO" ou seu logotipo em todas as páginas do PDF online e grátis.',
    keywords: 'marca dagua pdf,adicionar marca dagua pdf,carimbo pdf,proteger direitos autorais pdf',
    h2: 'Como adicionar marca d\'água em um arquivo PDF?',
    why: 'Adicionar marcas d\'água impede a cópia indevida de apostilas, propostas comerciais e minutas contratuais antes da aprovação final.',
    how: [
      'Envie seu documento PDF.',
      'Digite a frase da marca d\'água (ex: CONFIDENCIAL).',
      'Clique em "Adicionar Marca d\'Água".',
      'Baixe o PDF carimbado.'
    ],
    faq: [
      { q: 'A marca d\'água é aplicada em todas as folhas?', a: 'Sim, o carimbo é estampado de forma legível em cada página do documento.' }
    ]
  },

  // ── CATEGORIA: OCR & TRANSCRIÇÃO ───────────────────────────────────────────
  'ocr-pdf': {
    title: 'PDF para Texto (OCR) — Reconhecimento de Texto em PDF',
    description: 'Extraia o texto de PDFs digitalizados e livros escaneados usando reconhecimento óptico de caracteres (OCR) online grátis.',
    keywords: 'ocr pdf,pdf para texto,reconhecimento de texto pdf,ocr online grátis,extrair texto escaneado',
    h2: 'Como extrair texto de um PDF digitalizado com OCR?',
    why: 'PDFs antigos ou escaneados em impressoras funcionam como fotos e não deixam copiar o texto. O OCR analisa o desenho das letras e gera caracteres copiáveis.',
    how: [
      'Carregue o PDF escaneado.',
      'Aguarde o processamento do algoritmo de reconhecimento de texto.',
      'Baixe o resultado em texto editável ou Word.'
    ],
    faq: [
      { q: 'Funciona com documentos amarelados ou antigos?', a: 'Sim, nosso algoritmo otimiza o contraste antes de ler os caracteres.' }
    ]
  },
  'transcrever-video-em-texto': {
    title: 'Transcrever Vídeo em Texto Online Grátis | PDFRápido',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo com exportação em PDF e Word. Rápido, seguro, 100% gratuito e sem cadastro.',
    keywords: 'transcrever vídeo,vídeo para texto,converter áudio em texto,áudio para pdf,transcrever áudio mp3,converter vídeo em word',
    h2: 'Como transcrever vídeos e áudios em texto online?',
    why: 'Transcreva aulas, reuniões do Zoom/Teams, palestras e entrevistas em texto formatado com separação de tempo. Exporte em PDF ou Word com um clique.',
    how: [
      'Faça o upload do seu arquivo de vídeo (MP4, WEBM) ou áudio (MP3, WAV).',
      'Aguarde o processamento inteligente do transcritor.',
      'Visualize o texto completo divido por marcadores de tempo.',
      'Exporte o resultado em PDF ou documento Word.'
    ],
    faq: [
      { q: 'Qual a precisão da transcrição em português?', a: 'Nossa inteligência artificial possui altíssima precisão no português do Brasil, reconhecendo sotaques e termos técnicos.' }
    ]
  }
};

// Gerador dinâmico de fallback caso alguma ferramenta nova não esteja explicitada no dicionário estático
function getSeoContent(slug: string): SeoItem {
  if (SEO_CONTENT[slug]) return SEO_CONTENT[slug];

  const tool = TOOLS.find((t) => t.slug === slug);
  const name = tool?.name || 'Ferramenta de PDF';
  const desc = tool?.description || 'Processe seus arquivos PDF online de forma gratuita e rápida.';

  return {
    title: `${name} Online Grátis — PDFRápido`,
    description: `${desc} Sem cadastro, processamento seguro e descarte automático em 30 minutos.`,
    keywords: `${name.toLowerCase()},ferramenta pdf,pdf online grátis,pdfrapido`,
    h2: `Como utilizar a ferramenta ${name}?`,
    why: `O ${name} do PDFRápido foi desenvolvido para solucionar suas necessidades com documentos digitais de forma instantânea e sem complicações burocráticas. Toda a operação é realizada via navegadores modernos sem a necessidade de baixar programas.`,
    how: [
      `Selecione ou arraste seu arquivo para a área de upload da ferramenta ${name}.`,
      'Configure as opções desejadas de acordo com sua preferência.',
      `Clique no botão de ação para iniciar o processamento do arquivo.`,
      'Aguarde a finalização e faça o download do resultado final com total segurança.'
    ],
    faq: [
      { q: `O serviço de ${name} é gratuito?`, a: 'Sim, o PDFRápido disponibiliza todas as ferramentas de forma 100% gratuita para os usuários.' },
      { q: 'O que acontece com meus arquivos após o uso?', a: 'Todos os documentos enviados são processados sob criptografia SSL e excluídos de forma automática e permanente em até 30 minutos.' },
      { q: 'Preciso criar uma conta para usar?', a: 'Não. Não exigimos nenhum tipo de cadastro, e-mail ou dados de cartão de crédito.' }
    ]
  };
}

const RELATED_STYLES: Record<string, string> = {
  'comprimir-pdf': 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:bg-blue-100',
  'converter-pdf-para-word': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100',
  'converter-pdf-para-jpg': 'bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 hover:bg-green-100',
  'converter-word-para-pdf': 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 hover:bg-purple-100',
  'converter-jpg-para-pdf': 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-100',
  'juntar-pdf': 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 hover:bg-orange-100',
  'dividir-pdf': 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 hover:bg-red-100',
  'transcrever-video-em-texto': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100',
};

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = TOOLS.find((t) => t.slug === params.tool);
  if (!tool) return {};

  const seo = getSeoContent(params.tool);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://pdfrapido.com.br/${tool.slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://pdfrapido.com.br/${tool.slug}`,
      siteName: 'PDFRápido',
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: 'https://pdfrapido.com.br/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} — PDFRápido`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['https://pdfrapido.com.br/og-image.png'],
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = TOOLS.find((t) => t.slug === params.tool);
  if (!tool) notFound();

  const seo = getSeoContent(params.tool);
  const relatedTools = TOOLS.filter((t) => t.slug !== params.tool).slice(0, 6);

  return (
    <>
      {/* Dados Estruturados Schema.org */}
      <Script
        id="schema-webapplication"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `${tool.name} — PDFRápido`,
            url: `https://pdfrapido.com.br/${tool.slug}`,
            description: seo.description,
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

      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: seo.h2,
            description: seo.why,
            step: seo.how.map((stepText, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: `Passo ${index + 1}`,
              text: stepText,
            })),
          }),
        }}
      />

      {seo.faq.length > 0 && (
        <Script
          id="schema-faqpage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: seo.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb visual */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 mb-6 font-semibold" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Início</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">{tool.name}</span>
        </nav>

        {/* AdSense Topo */}
        <AdUnit
          slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_TOP || '0000000004'}
          format="horizontal"
          className="mb-8 ad-slot-horizontal rounded-xl overflow-hidden"
        />

        {/* Hero da ferramenta */}
        <div className="text-center mb-8">
          <div className={`inline-flex w-16 h-16 ${tool.iconBg} rounded-2xl items-center justify-center text-3xl mb-4 shadow-sm`}>
            {tool.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {tool.name} Online Grátis
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {tool.description} Sem cadastro e com exclusão automática dos seus documentos.
          </p>
        </div>

        {/* Componente de upload interativo do cliente */}
        <ToolClientPage toolSlug={params.tool} />

        {/* AdSense Meio */}
        <div className="my-8">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_MID || '0000000005'}
            format="fluid"
            className="ad-slot-horizontal rounded-xl overflow-hidden"
          />
        </div>

        {/* Conteúdo SEO rico e Explicação */}
        <section id="instrucoes-e-explicacao" aria-label="Instruções de uso e explicação da ferramenta" className="mt-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Explicação da Ferramenta: {tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-2 text-base">
              {seo.why}
            </p>

            {/* Guia em 4 Passos */}
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
                  <li><strong>Formatos Suportados:</strong> PDF, DOCX, JPG, PNG, WebP.</li>
                  <li><strong>Velocidade Média:</strong> Processamento em nuvem ultra rápido.</li>
                  <li><strong>Compatibilidade:</strong> Android, iOS, Windows, Mac e Linux.</li>
                </ul>
              </div>

              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 p-5 rounded-2xl">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2 mb-2">
                  <span>🛡️</span> Segurança e Privacidade (LGPD)
                </h4>
                <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5 leading-relaxed">
                  <li><strong>Conexão Criptografada:</strong> Tráfego protegido por SSL/TLS de 256 bits.</li>
                  <li><strong>Exclusão Automática:</strong> Arquivos descartados em até 30 minutos.</li>
                  <li><strong>Sem Leitura Humana:</strong> Processamento 100% automatizado.</li>
                  <li><strong>Zero Cadastro:</strong> Não exigimos e-mail ou dados pessoais.</li>
                </ul>
              </div>
            </div>

            {/* Perguntas Frequentes (FAQ) */}
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

        {/* Avaliação por Estrelas */}
        <RatingWidget toolName={tool.name} />

        {/* Outras Ferramentas Relacionadas */}
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

        {/* AdSense Rodapé */}
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
