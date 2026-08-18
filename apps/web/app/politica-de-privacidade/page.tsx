import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como o PDFRápido coleta, usa e protege suas informações. Conheça nossa política de privacidade alinhada à LGPD.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/politica-de-privacidade',
  },
};

export default function PoliticaPrivacidade() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Política de Privacidade</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
          <p>
            Esta Política de Privacidade descreve como o <strong>PDFRápido</strong>, acessível em{' '}
            <a href="https://pdfrapido.com.br" className="text-brand-600 dark:text-brand-400 hover:underline">pdfrapido.com.br</a>,
            coleta, utiliza e protege as informações dos visitantes. Ao utilizar nosso site, você concorda com as práticas descritas aqui.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. Arquivos Enviados para Processamento</h2>
          <p>
            O PDFRápido é uma plataforma de processamento de arquivos. Quando você envia um documento para qualquer uma das nossas ferramentas (compressão, conversão, junção, divisão etc.), ocorre o seguinte:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>O arquivo é transmitido de forma criptografada via <strong>HTTPS/TLS</strong>.</li>
            <li>O arquivo é armazenado temporariamente em memória e em diretórios temporários de nossos servidores exclusivamente para executar a operação solicitada.</li>
            <li>
              Os arquivos são <strong>excluídos automaticamente</strong> pelos seguintes mecanismos:{' '}
              (a) logo após o processamento e download, sempre que tecnicamente possível;{' '}
              (b) por um processo automático de limpeza que executa periodicamente e remove arquivos com mais de 30 minutos de existência nos diretórios temporários;{' '}
              (c) na reinicialização do servidor, que executa uma limpeza total imediata.
            </li>
            <li>Não realizamos análise, leitura ou cópia do conteúdo dos seus documentos em hipótese alguma.</li>
            <li>Não armazenamos seus documentos de forma permanente nem como serviço de armazenamento em nuvem.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Dados de Navegação e Logs Técnicos</h2>
          <p>
            Como qualquer servidor web, nosso sistema pode registrar automaticamente informações técnicas de acesso, incluindo:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Endereço IP do visitante</li>
            <li>Tipo de navegador e sistema operacional</li>
            <li>Páginas acessadas e horário de acesso</li>
            <li>Código de status HTTP das requisições</li>
          </ul>
          <p>
            Esses dados são utilizados exclusivamente para fins de diagnóstico técnico, segurança e estabilidade do sistema. Não são vinculados a nenhuma informação de identificação pessoal.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Cookies e Armazenamento Local</h2>
          <p>
            O PDFRápido utiliza cookies e armazenamento local do navegador (localStorage) para as seguintes finalidades:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Preferência de tema (claro/escuro):</strong> armazenado em localStorage para manter sua preferência de exibição entre sessões.</li>
            <li><strong>Consentimento de cookies:</strong> armazenado em localStorage para não exibir o banner novamente após aceite.</li>
            <li><strong>Avaliação pessoal de ferramenta:</strong> armazenada em localStorage no seu dispositivo. Não é enviada a nenhum servidor.</li>
            <li><strong>Cookies do Google AdSense:</strong> nosso site carrega o script do Google AdSense (<code>pagead2.googlesyndication.com</code>) para exibição de anúncios. O Google utiliza cookies para personalizar anúncios com base em visitas anteriores a este e a outros sites. Consulte a{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Política de Privacidade do Google</a>{' '}
              para mais informações.
            </li>
            <li><strong>Cookies do Google Analytics (quando ativado):</strong> se a variável de ambiente <code>NEXT_PUBLIC_GA_ID</code> estiver configurada, o Google Analytics 4 é carregado para análise agregada de uso do site (páginas visitadas, tempo na página etc.). Esses dados são anônimos e agregados.</li>
            <li><strong>Microsoft Clarity (quando ativado):</strong> se a variável de ambiente <code>NEXT_PUBLIC_CLARITY_ID</code> estiver configurada, o Microsoft Clarity é carregado para análise de comportamento de usuário (mapas de calor, gravações de sessão anonimizadas). Consulte a{' '}
              <a href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Política de Privacidade da Microsoft</a>.
            </li>
          </ul>
          <p>
            Você pode desativar cookies no seu navegador a qualquer momento. No entanto, isso pode afetar funcionalidades como a preferência de tema.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Google AdSense e Publicidade</h2>
          <p>
            O PDFRápido utiliza o Google AdSense para exibição de anúncios. O Google, como fornecedor terceiro, usa cookies para exibir anúncios baseados em visitas anteriores dos usuários ao nosso site e a outros sites na internet.
          </p>
          <p>
            Os usuários podem optar por não utilizar o cookie DART para publicidade baseada em interesse visitando:{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">https://www.google.com/settings/ads</a>
          </p>
          <p>
            Para mais informações sobre como o Google usa os dados coletados, consulte:{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Como o Google usa dados de sites que utilizam seus serviços</a>
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">5. Fontes Externas</h2>
          <p>
            O site carrega a fonte <strong>Inter</strong> do Google Fonts (<code>fonts.googleapis.com</code>). Isso permite que o Google registre o IP do visitante ao servir o arquivo de fonte. Consulte a{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Política de Privacidade do Google</a>{' '}
            para mais informações.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">6. Seus Direitos (LGPD)</h2>
          <p>
            Nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD), você tem os seguintes direitos em relação aos seus dados:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Confirmar a existência de tratamento de dados pessoais;</li>
            <li>Acessar os dados pessoais que possuímos sobre você;</li>
            <li>Solicitar a correção, portabilidade ou eliminação dos seus dados;</li>
            <li>Revogar o consentimento dado anteriormente;</li>
            <li>Opor-se ao tratamento realizado com base em legítimo interesse.</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelo e-mail:{' '}
            <a href="mailto:emanoeldouglaslima@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">emanoeldouglaslima@gmail.com</a>
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">7. Segurança</h2>
          <p>
            Adotamos medidas técnicas para proteger os dados transmitidos e processados em nossa plataforma, incluindo comunicação criptografada via HTTPS, validação de tipo de arquivo por assinatura binária (magic bytes) e limitação de tamanho e taxa de requisições (rate limiting). No entanto, nenhum sistema é 100% inviolável e não podemos garantir segurança absoluta.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">8. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas nesta página com a data de atualização. Recomendamos que você consulte esta página regularmente.
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-10">
            Última atualização: 17 de agosto de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
