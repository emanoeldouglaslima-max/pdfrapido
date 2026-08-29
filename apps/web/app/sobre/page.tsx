import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nós — Equipe e Missão Editorial | PDFRápido',
  description: 'Conheça o PDFRápido, nossa equipe editorial, infraestrutura tecnológica e o compromisso com a privacidade e utilidade gratuita de documentos para o Brasil.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/sobre',
  },
  openGraph: {
    title: 'Sobre Nós — Equipe e Missão Editorial | PDFRápido',
    description: 'Conheça o PDFRápido, nossa equipe editorial, infraestrutura tecnológica e o compromisso com a privacidade de documentos.',
    url: 'https://pdfrapido.com.br/sobre',
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://pdfrapido.com.br/og-image.png', width: 1200, height: 630, alt: 'Sobre o PDFRápido' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nós — Equipe e Missão Editorial | PDFRápido',
    description: 'Conheça o PDFRápido e nossa infraestrutura de documentos.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-hero-gradient py-16 px-4">
        {/* Orbs de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Sobre o{' '}
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 dark:from-brand-400 dark:to-violet-400 bg-clip-text text-transparent">
                PDFRápido
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Facilitando a edição, conversão e organização de documentos digitais com máxima velocidade, privacidade e utilidade 100% gratuita.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-brand-100/20 dark:shadow-none space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🚀</span> Quem Somos e Nossa Missão
              </h2>
              <p>
                O <strong>PDFRápido</strong> foi fundado com um propósito evidente: democratizar o acesso a ferramentas eficientes de manipulação de documentos digitais no Brasil. Em um cotidiano repleto de burocracias, formulários de concursos, petições jurídicas, trabalhos acadêmicos e envios no WhatsApp, tarefas simples como reduzir o peso de um PDF ou transformar um arquivo em Word editável não deveriam custar assinaturas caras ou exigir cadastros invasivos.
              </p>
              <p>
                Nossa missão é disponibilizar uma suíte completa de utilitários web leves, que funcionem com um único clique em computadores, notebooks, tablets e smartphones, sem qualquer instalação prévia.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>👨‍💻</span> Liderança Técnica e Equipe Editorial (E-E-A-T)
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
                  ED
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Emanoel Douglas — Fundador & Arquiteto de Software</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Especialista em Engenharia de Software, arquitetura web e processamento de dados na nuvem. Responsável pelo desenvolvimento contínuo da infraestrutura do PDFRápido, pela segurança no pipeline de documentos e pela curadoria técnica de todos os tutoriais publicados no nosso blog.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-semibold text-brand-600 dark:text-brand-400 pt-1">
                    <span>✉️ Contato: emanoeldouglaslima@gmail.com</span>
                    <span>•</span>
                    <Link href="/contato" className="hover:underline">Fale Conosco</Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📚</span> Diretrizes e Política Editorial
              </h2>
              <p>
                Todo o conteúdo publicado em nossos artigos e guias práticos é produzido com foco na resolução de problemas reais de usuários brasileiros:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Testes Reais:</strong> Cada procedimento (como assinar no Gov.br, comprimir para o WhatsApp ou converter DOCX) é testado em múltiplos navegadores e sistemas operacionais antes da publicação.</li>
                <li><strong>Linguagem Acessível:</strong> Explicamos termos técnicos de forma didática para estudantes, profissionais liberais e pessoas que não são da área de TI.</li>
                <li><strong>Atualização Constante:</strong> Nossos artigos passam por revisões periódicas para refletir as mudanças em portais governamentais, limites de aplicativos e novas versões de softwares.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🛡️</span> Compromisso com a Privacidade e Segurança (LGPD)
              </h2>
              <p>
                Tratamos os documentos dos nossos usuários com o mais rigoroso padrão de segurança da informação:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">⏱️ Exclusão Automática Imediata</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Os arquivos enviados para nossas ferramentas são processados em diretórios temporários na nuvem e excluídos permanentemente logo após o download ou em rotina automática a cada 30 minutos.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">🔒 Conexão Criptografada</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Todos os uploads e downloads trafegam por canais seguros com certificado SSL/TLS de 256 bits, impedindo a interceptação de dados por terceiros.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>💻</span> Infraestrutura e Transparência
              </h2>
              <p>
                Diferente de soluções pesadas que travam o navegador do usuário, o PDFRápido opera com uma arquitetura moderna dividida entre servidores de borda (Edge Network na Vercel) e instâncias de processamento dedicadas em nuvem no Render. Isso garante que mesmo em conexões móveis 3G/4G, a experiência seja fluida e ágil.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
