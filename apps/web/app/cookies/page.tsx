import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Cookies e Armazenamento Local | PDFRápido',
  description: 'Conheça a lista detalhada de cookies e chaves de armazenamento local (localStorage) utilizados no PDFRápido, alinhada ao Google Consent Mode v2 e à LGPD.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/cookies',
  },
  openGraph: {
    title: 'Política de Cookies e Armazenamento Local | PDFRápido',
    description: 'Conheça a lista detalhada de cookies e armazenamento local do PDFRápido.',
    url: 'https://pdfrapido.com.br/cookies',
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://pdfrapido.com.br/og-image.png', width: 1200, height: 630, alt: 'Política de Cookies PDFRápido' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Cookies e Armazenamento Local | PDFRápido',
    description: 'Conheça o gerenciamento de cookies no PDFRápido.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Política de Cookies</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
          <p>
            No <strong>PDFRápido</strong>, acessível em <a href="https://pdfrapido.com.br" className="text-brand-600 dark:text-brand-400 hover:underline">pdfrapido.com.br</a>, prezamos pela transparência absoluta sobre o armazenamento de dados no navegador do usuário. Esta página descreve detalhadamente a lista de cookies e itens de armazenamento local (<code>localStorage</code>) realmente utilizados em nossa plataforma.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">1. O que são Cookies e localStorage?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo pelo navegador. O <code>localStorage</code> é uma tecnologia web moderna que permite guardar preferências locais diretamente no seu navegador, sem enviar dados a servidores em todas as requisições.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">2. Inventário Real de Cookies e Armazenamento do PDFRápido</h2>
          
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-800 text-xs">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                  <th className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Chave / Cookie</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Tipo</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Fornecedor</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Finalidade</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Duração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-600 dark:text-gray-300">
                <tr>
                  <td className="p-3 font-mono">theme</td>
                  <td className="p-3 font-semibold text-green-600 dark:text-green-400">localStorage</td>
                  <td className="p-3">PDFRápido</td>
                  <td className="p-3">Salva a preferência de tema (claro/escuro) escolhida pelo usuário.</td>
                  <td className="p-3">Persistente</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">pdfrapido_cookie_consent</td>
                  <td className="p-3 font-semibold text-green-600 dark:text-green-400">localStorage</td>
                  <td className="p-3">PDFRápido</td>
                  <td className="p-3">Armazena o registro de aceite ou recusa dos cookies no banner.</td>
                  <td className="p-3">Persistente</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">pdfrapido_rating_*</td>
                  <td className="p-3 font-semibold text-green-600 dark:text-green-400">localStorage</td>
                  <td className="p-3">PDFRápido</td>
                  <td className="p-3">Armazena a nota de avaliação em estrelas dada às ferramentas localmente.</td>
                  <td className="p-3">Persistente</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">__gads, __gpi</td>
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Cookie terceiros</td>
                  <td className="p-3">Google AdSense</td>
                  <td className="p-3">Veiculação de publicidade com suporte ao Google Consent Mode v2.</td>
                  <td className="p-3">13 meses</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">_ga, _ga_*</td>
                  <td className="p-3 font-semibold text-purple-600 dark:text-purple-400">Cookie terceiros</td>
                  <td className="p-3">Google Analytics 4</td>
                  <td className="p-3">Medição agregada de visitas ao site (apenas se a env GA4 estiver configurada).</td>
                  <td className="p-3">2 anos</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">3. Suporte ao Google Consent Mode v2</h2>
          <p>
            Nosso site implementa o <strong>Google Consent Mode v2</strong>. Isso significa que, por padrão, o carregamento de cookies de rastreamento de anúncios e métricas fica bloqueado no estado <code>denied</code> até que você dê seu consentimento explícito no banner de privacidade.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8">4. Como Alterar ou Revogar suas Preferências</h2>
          <p>
            Você pode alterar suas preferências de cookies a qualquer momento limpando os dados de navegação do seu browser ou ajustando as configurações diretamente na página de <a href="/politica-de-privacidade" className="text-brand-600 dark:text-brand-400 hover:underline">Política de Privacidade</a> ou no banner de consentimento.
          </p>
          <p>
            Para gerenciar anúncios personalizados veiculados pelo Google, você também pode acessar o portal oficial: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Configurações de Anúncios do Google</a>.
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-10">
            Última atualização e revisão técnica: 28 de agosto de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
