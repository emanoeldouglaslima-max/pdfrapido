import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o PDFRápido, nosso compromisso com a facilidade, velocidade e segurança no processamento de arquivos PDF para o público brasileiro.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/sobre',
  },
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-hero-gradient py-16 px-4">
        {/* Orbs de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 bg-brand-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Sobre o{' '}
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                PDFRápido
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Facilitando a edição e conversão de documentos de forma simples, rápida e 100% gratuita para todos os brasileiros.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-brand-100/20 space-y-8 text-gray-600 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🚀</span> Nossa Missão
              </h2>
              <p>
                O <strong>PDFRápido</strong> nasceu com um objetivo muito claro: eliminar a burocracia na hora de lidar com documentos digitais. Sabemos que tarefas simples, como comprimir um PDF para enviar por e-mail ou converter um arquivo para edição, muitas vezes exigem instalações complexas, cadastros demorados ou assinaturas caras.
              </p>
              <p>
                Acreditamos que a tecnologia deve ser acessível e direta. Por isso, oferecemos uma suíte completa de ferramentas que rodam diretamente pelo seu navegador de forma 100% gratuita, sem limites artificiais e sem a necessidade de criar uma conta.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🛡️</span> Segurança e Privacidade Absoluta
              </h2>
              <p>
                Tratamos os seus arquivos com a seriedade que eles merecem. Todos os documentos enviados para nossas ferramentas passam por conexões criptografadas (HTTPS/SSL), garantindo que ninguém no caminho possa interceptar seus dados.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">⏱️ Exclusão em 30 Minutos</h3>
                  <p className="text-xs text-gray-500">Qualquer arquivo enviado ou processado é excluído de forma automática e permanente dos nossos servidores após 30 minutos.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">🚫 Sem Análise de Dados</h3>
                  <p className="text-xs text-gray-500">Não abrimos, lemos, guardamos, analisamos ou vendemos os dados de seus arquivos em hipótese alguma.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>💻</span> Tecnologia e Inovação
              </h2>
              <p>
                Nossa infraestrutura foi desenhada para oferecer o melhor desempenho possível. Ao contrário de plataformas que travam o processamento no seu navegador, nossa API processa arquivos na nuvem usando filas otimizadas. Isso nos permite manter o site incrivelmente leve para dispositivos móveis (smartphones e tablets) ao mesmo tempo que entregamos alta velocidade.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🇧🇷</span> Feito por Brasileiros para Brasileiros
              </h2>
              <p>
                Todo o nosso site e canais de suporte são construídos nativamente em português (Brasil). Nosso compressor e conversores são ajustados com base nos formatos e necessidades reais dos usuários brasileiros (como limites de envio do WhatsApp, editores de concursos públicos e padrões de petição jurídica).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
