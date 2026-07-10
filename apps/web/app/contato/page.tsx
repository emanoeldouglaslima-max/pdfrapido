import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Fale Conosco | PDFRápido',
  description: 'Entre em contato com a equipe do PDFRápido. Tire suas dúvidas, envie sugestões ou solicite suporte técnico.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/contato',
  },
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-hero-gradient py-16 px-4">
        {/* Orbs de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-brand-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Fale{' '}
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                Conosco
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Dúvidas, sugestões, críticas ou problemas técnicos? Envie sua mensagem, responderemos o mais rápido possível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Informações de suporte */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">✉️</div>
                <h3 className="font-bold text-gray-900 mb-1">E-mail Direto</h3>
                <p className="text-xs text-gray-400 mb-3">Ideal para propostas de parcerias ou suporte.</p>
                <a href="mailto:contato@pdfrapido.com.br" className="text-sm font-semibold text-brand-600 hover:underline">
                  contato@pdfrapido.com.br
                </a>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">🛡️</div>
                <h3 className="font-bold text-gray-900 mb-1">Privacidade de Dados</h3>
                <p className="text-xs text-gray-400 mb-3">Questões relacionadas à LGPD ou remoção imediata.</p>
                <a href="/politica-de-privacidade" className="text-sm font-semibold text-brand-600 hover:underline">
                  Ver nossa Política
                </a>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">🕒</div>
                <h3 className="font-bold text-gray-900 mb-1">Tempo de Resposta</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Respondemos a todas as mensagens enviadas em até <strong>24 horas úteis</strong>.
                </p>
              </div>
            </div>

            {/* Formulário de contato */}
            <div className="md:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-brand-100/20">
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-700"
                  >
                    <option value="suporte">Dúvida / Suporte Técnico</option>
                    <option value="sugestao">Sugestão de Ferramenta</option>
                    <option value="reclamacao">Reclamação ou Erro</option>
                    <option value="parceria">Comercial / Parceria</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Descreva sua dúvida ou sugestão em detalhes..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
