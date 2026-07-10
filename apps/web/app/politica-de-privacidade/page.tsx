import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como protegemos seus dados e arquivos. O PDFRápido preza pela sua segurança e privacidade.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/politica-de-privacidade',
  },
};

export default function PoliticaPrivacidade() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Política de Privacidade</h1>
        
        <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-6">
          <p>
            No <strong>PDFRápido</strong>, acessível em <a href="https://pdfrapido.com.br" className="text-brand-600 hover:underline">pdfrapido.com.br</a>, uma de nossas principais prioridades é a privacidade dos nossos visitantes. Este documento contém os tipos de informações que são coletadas e registradas pelo PDFRápido e como as utilizamos.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. Segurança dos Seus Arquivos (Exclusão Automática)</h2>
          <p>
            O PDFRápido é uma ferramenta de processamento de arquivos. Nós não armazenamos permanentemente os documentos que você envia para nossas ferramentas.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Todos os arquivos enviados são transmitidos de forma segura e criptografada (HTTPS).</li>
            <li>Os arquivos processados e seus respectivos downloads são <strong>deletados de nossos servidores permanentemente após 30 minutos</strong> de forma automatizada.</li>
            <li>Não realizamos cópias, análise de conteúdo ou leitura dos dados contidos nos seus documentos em hipótese alguma.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Arquivos de Log (Log Files)</h2>
          <p>
            O PDFRápido segue um procedimento padrão de uso de arquivos de log. Esses arquivos registram os visitantes quando eles visitam websites. Todas as empresas de hospedagem fazem isso como parte dos serviços de análise técnica. 
            As informações coletadas pelos arquivos de log incluem endereços de protocolo de internet (IP), tipo de navegador, Provedor de Serviços de Internet (ISP), carimbo de data e hora, páginas de referência/saída e, possivelmente, o número de cliques. Esses dados não estão vinculados a nenhuma informação que seja pessoalmente identificável. O objetivo das informações é analisar tendências, administrar o site, rastrear o movimento dos usuários no site e coletar informações demográficas.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Cookies e Web Beacons</h2>
          <p>
            Como qualquer outro website, o PDFRápido utiliza &quot;cookies&quot;. Esses cookies são usados para armazenar informações, incluindo as preferências dos visitantes e as páginas no site que o visitante acessou ou visitou. As informações são usadas para otimizar a experiência dos usuários, personalizando o conteúdo da nossa página web com base no tipo de navegador dos visitantes e/ou outras informações.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Cookie Google DoubleClick DART</h2>
          <p>
            O Google é um dos fornecedores terceiros em nosso site. Ele também usa cookies, conhecidos como cookies DART, para veicular anúncios aos visitantes do nosso site com base em suas visitas a pdfrapido.com.br e a outros sites na internet. 
            Os visitantes podem optar por recusar o uso de cookies DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google no seguinte URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">https://policies.google.com/technologies/ads</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Nossos Parceiros de Publicidade</h2>
          <p>
            Alguns dos anunciantes em nosso site podem usar cookies e web beacons. Nossos parceiros de publicidade incluem o Google AdSense. Cada um de nossos parceiros de publicidade tem sua própria Política de Privacidade para suas políticas sobre dados do usuário.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">6. Consentimento</h2>
          <p>
            Ao utilizar nosso website, você concorda com a nossa Política de Privacidade e aceita os seus Termos e Condições.
          </p>
          
          <p className="text-xs text-gray-400 mt-10">
            Última atualização: 26 de junho de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
