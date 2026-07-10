import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Blog — Dicas, Guias e Tutoriais de PDF',
  description: 'Leia artigos completos sobre compressão de PDF, conversão para Word no celular, segurança de dados e organização de documentos digitais.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog',
  },
};

const ARTICLES = [
  {
    slug: 'como-comprimir-pdf-para-whatsapp',
    title: 'Como Comprimir PDF para o WhatsApp sem perder qualidade',
    description: 'O guia definitivo para enviar documentos pesados no WhatsApp respeitando os limites do app e mantendo o texto 100% nítido.',
    date: '07 de julho de 2026',
    readTime: '4 min de leitura',
    category: 'WhatsApp',
    emoji: '📲',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'como-converter-pdf-em-word-no-celular',
    title: 'Como Converter PDF em Word no Celular de forma Gratuita',
    description: 'Aprenda a transformar seus PDFs em arquivos do Word (.docx) editáveis diretamente pelo celular Android ou iPhone em poucos passos.',
    date: '06 de julho de 2026',
    readTime: '5 min de leitura',
    category: 'Conversor',
    emoji: '📄',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'seguranca-de-arquivos-pdf-online',
    title: 'Segurança e Privacidade: É seguro enviar documentos para sites de PDF?',
    description: 'Entenda como a criptografia SSL/HTTPS, as regras da LGPD e as políticas de exclusão protegem seus arquivos em ferramentas online.',
    date: '05 de julho de 2026',
    readTime: '6 min de leitura',
    category: 'Segurança',
    emoji: '🔒',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'bg-amber-100 text-amber-700',
  },
  {
    slug: 'como-juntar-pdf-concursos-peticoes',
    title: 'Como Juntar Vários PDFs em um Só Documento para Concursos e Petições',
    description: 'Dicas essenciais para organizar, ordenar e unificar seus arquivos PDF para editais de concursos públicos e portais jurídicos como o PJe.',
    date: '04 de julho de 2026',
    readTime: '5 min de leitura',
    category: 'Organização',
    emoji: '🔗',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'bg-purple-100 text-purple-700',
  },
];

export default function BlogListingPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-hero-gradient py-16 px-4">
        {/* Orbs de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-100 px-3.5 py-1.5 rounded-full shadow-sm">
              📰 Dicas e Tutoriais
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 leading-tight tracking-tight">
              Blog do{' '}
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                PDFRápido
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Guias passo a passo, boas práticas de segurança e dicas para gerenciar seus arquivos digitais com facilidade.
            </p>
          </div>

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                {/* Imagem Placeholder Decorativa (CSS Puro) */}
                <div className={`h-48 w-full bg-gradient-to-br ${article.bgGradient} flex items-center justify-center text-5xl relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02]`}>
                  <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{article.emoji}</span>
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${article.iconColor}`}>
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-xs font-bold text-brand-600 flex items-center gap-1 group-hover:underline"
                    >
                      Ler artigo completo
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
