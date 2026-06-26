import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Termos de Uso | PDFRápido',
  description: 'Leia os termos de uso do site PDFRápido. Entenda as regras, limites e termos de serviço.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/termos-de-uso',
  },
};

export default function TermosUso() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Termos de Uso</h1>
        
        <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-6">
          <p>
            Bem-vindo ao <strong>PDFRápido</strong>! Ao acessar o nosso website em <a href="https://pdfrapido.com.br" className="text-brand-600 hover:underline">pdfrapido.com.br</a>, você concorda em cumprir e estar vinculado aos seguintes termos de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar os serviços fornecidos pelo PDFRápido, você declara que leu, compreendeu e concorda em cumprir integralmente as regras aqui descritas. Estes termos aplicam-se a todos os visitantes, usuários e outros que acessam ou usam o serviço.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Descrição do Serviço</h2>
          <p>
            O PDFRápido oferece ferramentas gratuitas baseadas na web para manipulação de arquivos PDF e outros formatos compatíveis (como compressão de PDF, conversão de PDF para Word, PDF para imagens JPG, união de PDFs, divisão de PDFs e geração de PDF a partir de imagens).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>O serviço é fornecido gratuitamente e sem a necessidade de cadastro.</li>
            <li>Nós nos reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento, sem aviso prévio.</li>
            <li>Existe um limite de tamanho de 25MB por envio de arquivo.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Uso Permitido e Responsabilidade do Usuário</h2>
          <p>
            Você concorda em usar o site apenas para fins legítimos e de acordo com a legislação vigente. Você é o único responsável pelos arquivos que envia e processa na plataforma.
          </p>
          <p>
            Você concorda em <strong>não</strong> utilizar o serviço para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enviar qualquer material protegido por direitos autorais sem a devida autorização do proprietário legal.</li>
            <li>Processar arquivos que contenham códigos maliciosos, vírus, cavalos de troia ou qualquer outro software prejudicial à infraestrutura do site ou a terceiros.</li>
            <li>Tentar violar as medidas de segurança do site ou acessar áreas restritas do servidor de processamento.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Limitação de Responsabilidade</h2>
          <p>
            O PDFRápido é fornecido &quot;no estado em que se encontra&quot; e &quot;conforme disponível&quot;, sem garantias de qualquer tipo, expressas ou implícitas. Embora utilizemos ferramentas modernas de segurança e proteção de rede:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Não garantimos que o serviço será ininterrupto, livre de erros ou totalmente seguro.</li>
            <li>Não nos responsabilizamos por qualquer perda de dados decorrente do upload de arquivos ou falhas na conversão dos mesmos. É responsabilidade do usuário manter cópias originais de seus documentos.</li>
            <li>Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso de nossas ferramentas.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Alterações nos Termos</h2>
          <p>
            Podemos revisar estes termos de uso a qualquer momento, atualizando esta publicação. Ao continuar a usar o site após a publicação de alterações, você concorda em cumprir e estar vinculado aos termos atualizados.
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
