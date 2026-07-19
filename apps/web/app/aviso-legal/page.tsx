import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Leia o aviso legal e as isenções de responsabilidade da plataforma PDFRápido.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/aviso-legal',
  },
};

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Aviso Legal</h1>
        
        <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-6">
          <p>
            Ao acessar e utilizar o site <strong>PDFRápido</strong> (pdfrapido.com.br), você concorda com os termos, declarações e isenções de responsabilidade contidos neste Aviso Legal.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. Isenção de Responsabilidade sobre Conteúdo</h2>
          <p>
            O PDFRápido envida todos os esforços razoáveis para garantir a disponibilidade e precisão de suas ferramentas online de processamento de documentos. No entanto, as ferramentas são fornecidas &quot;como estão&quot; e &quot;conforme disponíveis&quot;, sem quaisquer garantias expressas ou implícitas.
          </p>
          <p>
            Não garantimos que o funcionamento do site seja ininterrupto, livre de erros, vírus ou outros elementos nocivos. Não assumimos qualquer responsabilidade por eventuais perdas ou danos decorrentes do uso ou da impossibilidade de uso das nossas ferramentas.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Responsabilidade pelos Arquivos Enviados</h2>
          <p>
            Você é o único responsável pelos arquivos e documentos que envia, processa ou converte por meio do PDFRápido. É de sua responsabilidade garantir que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Você possui os direitos legais, autorizações e licenças necessárias para processar os arquivos enviados.</li>
            <li>Os arquivos não infringem direitos autorais, segredos comerciais, privacidade ou direitos de propriedade intelectual de terceiros.</li>
            <li>Os arquivos não contêm código malicioso, vírus, worms ou cavalos de troia.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Exclusão Automática de Arquivos</h2>
          <p>
            Conforme nossa <a href="/politica-de-privacidade" className="text-brand-600 hover:underline">Política de Privacidade</a>, todos os documentos enviados e seus downloads gerados são excluídos permanentemente e automaticamente de nossos servidores após 30 minutos do processamento. Por esta razão, o PDFRápido **não atua como um serviço de armazenamento ou backup**. Certifique-se de salvar suas próprias cópias antes e depois do uso de nossas ferramentas.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Links para Sites de Terceiros</h2>
          <p>
            Nosso site pode conter links para sites externos operados por terceiros (incluindo anunciantes parceiros como o Google AdSense). Esses links são fornecidos apenas para sua conveniência. O PDFRápido não tem controle sobre o conteúdo, políticas de privacidade ou práticas desses sites externos e não assume qualquer responsabilidade por eles.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Alterações no Aviso Legal</h2>
          <p>
            Reservamo-nos o direito de modificar este Aviso Legal a qualquer momento, sem aviso prévio. Recomendamos que você revise esta página periodicamente para se manter informado sobre as atualizações.
          </p>
          
          <p className="text-xs text-gray-400 mt-10">
            Última atualização: 14 de julho de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
