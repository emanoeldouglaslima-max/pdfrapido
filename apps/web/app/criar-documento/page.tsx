import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdUnit from '../../components/AdUnit';
import { SITE_URL } from '../../lib/siteUrl';

export const metadata: Metadata = {
  title: 'Criar Documentos Personalizados em PDF — PDFRápido',
  description: 'Gere orçamentos, recibos, propostas, currículos e ordens de serviço profissionais em PDF gratuitamente online.',
  alternates: { canonical: `${SITE_URL}/criar-documento` },
};

const GENERATORS = [
  {
    id: 'gerar-orcamento',
    slug: 'gerar-orcamento',
    name: 'Gerador de Orçamento',
    description: 'Crie orçamentos comerciais completos com calculadores de desconto, impostos, tabela de itens e condições de pagamento em PDF.',
    icon: '💼',
    status: 'active',
    badge: '🔥 Destaque',
    category: 'Comercial',
  },
  {
    id: 'gerar-recibo',
    slug: 'gerar-recibo',
    name: 'Gerador de Recibo',
    description: 'Gere recibos de pagamento de prestação de serviços ou venda com assinatura do pagador e emitente.',
    icon: '🧾',
    status: 'coming_soon',
    badge: 'Em Breve',
    category: 'Financeiro',
  },
  {
    id: 'gerar-curriculo',
    slug: 'gerar-curriculo',
    name: 'Gerador de Currículo',
    description: 'Monte seu currículo profissional com modelo ATS pronto para salvar em PDF e enviar em vagas de emprego.',
    icon: '📄',
    status: 'coming_soon',
    badge: 'Em Breve',
    category: 'Carreira',
  },
  {
    id: 'gerar-proposta',
    slug: 'gerar-proposta',
    name: 'Gerador de Proposta Comercial',
    description: 'Elabore propostas formais de prestação de serviço com escopo, prazos, investimento e aceite.',
    icon: '📋',
    status: 'coming_soon',
    badge: 'Em Breve',
    category: 'Comercial',
  },
  {
    id: 'gerar-ordem-de-servico',
    slug: 'gerar-ordem-de-servico',
    name: 'Ordem de Serviço (OS)',
    description: 'Crie ordens de serviço para manutenção, suporte técnico, oficinas e entregas com controle de status.',
    icon: '🛠️',
    status: 'coming_soon',
    badge: 'Em Breve',
    category: 'Operacional',
  },
  {
    id: 'gerar-checklist',
    slug: 'gerar-checklist',
    name: 'Gerador de Checklist',
    description: 'Monte listas de tarefas e verificação de rotina imprimíveis em PDF.',
    icon: '✅',
    status: 'coming_soon',
    badge: 'Em Breve',
    category: 'Produtividade',
  },
];

export default function CriarDocumentoPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
            ✨ Geradores de Documentos
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Crie Documentos Profissionais em PDF
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Preencha os campos e baixe seu documento pronto para enviar via WhatsApp ou e-mail. Sem instalação e 100% gratuito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GENERATORS.map((gen) => {
            const isActive = gen.status === 'active';
            return (
              <div
                key={gen.id}
                className={`relative bg-white dark:bg-gray-900 border rounded-3xl p-6 transition-all duration-300 ${
                  isActive
                    ? 'border-brand-200 dark:border-brand-800 shadow-md hover:shadow-xl hover:-translate-y-1'
                    : 'border-gray-200 dark:border-gray-800 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{gen.icon}</span>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      isActive
                        ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {gen.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {gen.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {gen.description}
                </p>

                {isActive ? (
                  <Link
                    href={`/${gen.slug}`}
                    className="btn-primary w-full text-sm py-3 justify-center"
                  >
                    Criar {gen.name} Agora
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-semibold rounded-xl cursor-not-allowed"
                  >
                    Em Desenvolvimento
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <AdUnit
            slot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '0000000003'}
            format="auto"
            className="ad-slot-horizontal"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
