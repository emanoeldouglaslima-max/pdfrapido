import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade e LGPD | PDFRápido',
  description: 'Saiba como o PDFRápido coleta, processa e protege seus arquivos e dados de navegação de acordo com a LGPD e diretrizes de publicidade do Google.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/politica-de-privacidade',
  },
  openGraph: {
    title: 'Política de Privacidade e LGPD | PDFRápido',
    description: 'Saiba como o PDFRápido coleta, processa e protege seus arquivos e dados de navegação de acordo com a LGPD.',
    url: 'https://pdfrapido.com.br/politica-de-privacidade',
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://pdfrapido.com.br/og-image.png', width: 1200, height: 630, alt: 'Política de Privacidade PDFRápido' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidade e LGPD | PDFRápido',
    description: 'Saiba como o PDFRápido protege seus arquivos e dados.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function PoliticaPrivacidade() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Política de Privacidade e Proteção de Dados
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
          <p>
            Esta Política de Privacidade descreve com transparência e clareza como o <strong>PDFRápido</strong>, acessível no endereço{' '}
            <a href="https://pdfrapido.com.br" className="text-brand-600 dark:text-brand-400 hover:underline">pdfrapido.com.br</a>,
            trata os arquivos enviados pelos usuários, dados técnicos de conexão e cookies de navegação, respeitando integralmente a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)</strong> e os padrões internacionais de segurança.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Tratamento e Exclusão de Arquivos Enviados</h2>
          <p>
            O PDFRápido é uma plataforma utilitária focada na execução instantânea de ferramentas de documentos (compressão, conversão, divisão, junção e transcrição). Ao utilizar nossos serviços:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Transmissão Criptografada:</strong> Todos os envios e downloads são trafegados via conexão segura com criptografia SSL/TLS de 256 bits (HTTPS).</li>
            <li><strong>Processamento Isolado:</strong> Os documentos são recebidos em instâncias temporárias de processamento na nuvem exclusivamente para realizar a conversão ou alteração solicitada.</li>
            <li><strong>Sem Leitura ou Cópia:</strong> Nenhum ser humano ou algoritmo realiza análise de conteúdo, mineração de dados ou cópia das informações contidas nos seus arquivos.</li>
            <li>
              <strong>Descarte Automático Definitivo:</strong> Os arquivos intermediários são eliminados de nossos discos em até <strong>30 minutos</strong> por um script de limpeza automática, ou imediatamente após o download concluído pelo usuário.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Dados de Navegação e Registros Técnicos</h2>
          <p>
            Para manter a estabilidade da plataforma e prevenir abusos ou ataques de negação de serviço (DDoS), nossos servidores web registram dados técnicos anonimizados de acesso:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Endereço IP (utilizado de forma agregada para controle de limite de requisições / rate limiting);</li>
            <li>Identificação do navegador (User-Agent) e sistema operacional;</li>
            <li>Data, hora e rota solicitada na requisição;</li>
            <li>Código de status HTTP do servidor.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Uso de Cookies e Armazenamento Local (localStorage)</h2>
          <p>
            Utilizamos armazenamento local e cookies estritamente necessários e analíticos para melhorar a sua experiência:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Preferência de Tema (<code>theme</code>):</strong> Armazenado no seu próprio navegador para manter o modo claro ou escuro.</li>
            <li><strong>Consentimento de Privacidade (<code>cookie_consent</code>):</strong> Registra sua escolha no banner de privacidade.</li>
            <li><strong>Google Analytics 4 (GA4):</strong> Quando ativo, coleta estatísticas agregadas anonimizadas de acessos (páginas visitadas e tempo de permanência) sem identificar individualmente o usuário.</li>
            <li><strong>Microsoft Clarity:</strong> Quando ativo, analisa padrões visuais de navegação de forma agregada e anônima.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Publicidade Programática e Google AdSense</h2>
          <p>
            O PDFRápido pode exibir anúncios veiculados pela rede do <strong>Google AdSense</strong>. O Google e seus parceiros terceirizados utilizam cookies de publicidade para veicular anúncios relevantes com base no contexto da página e no perfil de navegação do usuário.
          </p>
          <p>
            Nossa plataforma suporta o <strong>Google Consent Mode v2</strong> e diretrizes da LGPD, permitindo que os visitantes aceitem, personalizem ou recusem os cookies de personalização de publicidade.
          </p>
          <p>
            Você também pode gerenciar ou desativar a personalização de anúncios diretamente no portal de configurações do Google:{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Configurações de Anúncios do Google</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">5. Direitos do Titular de Dados (LGPD)</h2>
          <p>
            Como titular de dados pessoais sob a LGPD (Lei nº 13.709/2018), você tem garantidos os seguintes direitos:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Confirmação da existência de tratamento de dados;</li>
            <li>Acesso aos dados pessoais existentes no sistema;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Eliminação imediata de dados pessoais tratados com o seu consentimento;</li>
            <li>Revogação do consentimento concedido para cookies não essenciais.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">6. Canal de Atendimento do Encarregado de Dados (DPO)</h2>
          <p>
            Para esclarecer dúvidas sobre esta Política de Privacidade ou solicitar qualquer requisição referente à LGPD, entre em contato diretamente com o responsável técnico:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="font-bold text-gray-900 dark:text-white text-sm">Emanoel Douglas — Responsável Técnico & DPO</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              E-mail oficial de contato:{' '}
              <a href="mailto:emanoeldouglaslima@gmail.com" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                emanoeldouglaslima@gmail.com
              </a>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Prazo estimado de resposta: até 24 horas úteis.</p>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-10">
            Última atualização e revisão técnica: 28 de agosto de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
