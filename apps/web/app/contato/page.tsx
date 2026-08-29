import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Fale Conosco — Suporte e Atendimento | PDFRápido',
  description: 'Entre em contato com a equipe do PDFRápido. Tire suas dúvidas, envie sugestões ou solicite suporte técnico sobre ferramentas de PDF.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/contato',
  },
  openGraph: {
    title: 'Fale Conosco — Suporte e Atendimento | PDFRápido',
    description: 'Entre em contato com a equipe do PDFRápido. Tire suas dúvidas, envie sugestões ou solicite suporte técnico.',
    url: 'https://pdfrapido.com.br/contato',
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://pdfrapido.com.br/og-image.png', width: 1200, height: 630, alt: 'Contato PDFRápido' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fale Conosco — Suporte e Atendimento | PDFRápido',
    description: 'Entre em contato com a equipe do PDFRápido para suporte e dúvidas.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-hero-gradient py-16 px-4">
        {/* Orbs de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Fale{' '}
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 dark:from-brand-400 dark:to-violet-400 bg-clip-text text-transparent">
                Conosco
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Dúvidas, sugestões, críticas ou problemas técnicos? Envie sua mensagem, responderemos o mais rápido possível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Informações de suporte */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">✉️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">E-mail Direto</h3>
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-3">Ideal para propostas de parcerias ou suporte.</p>
                <a href="mailto:emanoeldouglaslima@gmail.com" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  emanoeldouglaslima@gmail.com
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">🛡️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Privacidade de Dados</h3>
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-3">Questões relacionadas à LGPD ou remoção imediata.</p>
                <a href="/politica-de-privacidade" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Ver nossa Política
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">🕒</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Tempo de Resposta</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Respondemos a todas as mensagens enviadas em até <strong className="text-gray-900 dark:text-white">24 horas úteis</strong>.
                </p>
              </div>
            </div>

            {/* Formulário de contato */}
            <div className="md:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl shadow-brand-100/20 dark:shadow-none">
              <form action="https://formsubmit.co/emanoeldouglaslima@gmail.com" method="POST" className="space-y-5">
                {/* Formsubmit.co — campos ocultos de configuração */}
                <input type="hidden" name="_subject" value="[PDFRápido] Nova mensagem do site" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://pdfrapido.com.br/contato" />
                <input type="hidden" name="_template" value="table" />
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="assunto"
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-700 dark:text-gray-200"
                  >
                    <option value="Dúvida / Suporte Técnico">Dúvida / Suporte Técnico</option>
                    <option value="Sugestão de Ferramenta">Sugestão de Ferramenta</option>
                    <option value="Reclamação ou Erro">Reclamação ou Erro</option>
                    <option value="Comercial / Parceria">Comercial / Parceria</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="mensagem"
                    required
                    rows={4}
                    placeholder="Descreva sua dúvida ou sugestão em detalhes..."
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300 dark:placeholder-gray-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-brand-500/25 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
