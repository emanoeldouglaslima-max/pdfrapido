import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthorBio from '../../../components/AuthorBio';

export const metadata: Metadata = {
  title: 'Como Proteger Arquivos PDF com Senha e Criptografia Forte',
  description: 'Aprenda a bloquear documentos PDF confidenciais com criptografia AES de 128/256 bits para impedir a abertura, cópia e impressão não autorizadas.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-proteger-pdf-com-senha-forte',
  },
  openGraph: {
    title: 'Como Proteger Arquivos PDF com Senha e Criptografia Forte',
    description: 'Aprenda a bloquear documentos PDF confidenciais com criptografia forte no computador e celular.',
    url: 'https://pdfrapido.com.br/blog/como-proteger-pdf-com-senha-forte',
    type: 'article',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function ArtigoProtegerPdfSenha() {
  return (
    <>
      <Script
        id="schema-artigo-proteger"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Proteger Arquivos PDF com Senha e Criptografia Forte',
            description: 'Guia de segurança para criptografar documentos sensíveis em PDF.',
            datePublished: '2026-07-30T10:00:00Z',
            dateModified: '2026-07-30T10:00:00Z',
            author: {
              '@type': 'Person',
              name: 'Emanoel Douglas',
            },
            publisher: {
              '@type': 'Organization',
              name: 'PDFRápido',
              logo: {
                '@type': 'ImageObject',
                url: 'https://pdfrapido.com.br/apple-icon.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://pdfrapido.com.br/blog/como-proteger-pdf-com-senha-forte',
            },
          }),
        }}
      />

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300">Proteger com Senha</span>
        </div>

        <article>
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
              Segurança & Criptografia
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Como Proteger Arquivos PDF com Senha e Criptografia Forte no Computador e Celular
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span>Por Emanoel Douglas</span>
              <span>•</span>
              <span>30 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Contratos comerciais, holerites, laudos médicos e documentos contábeis não podem ficar expostos a acessos indevidos. A aplicação de senhas com criptografia é a camada de segurança padrão recomendada pela Lei Geral de Proteção de Dados (LGPD) para o tráfego de informações confidenciais.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Tipos de Senhas em Arquivos PDF</h2>
            <p>
              O padrão de formato PDF da ISO 32000 suporta duas categorias principais de controle de acesso:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Senha de Abertura (User Password):</strong> Exigida sempre que o usuário tenta abrir e ler o conteúdo do documento em qualquer leitor.</li>
              <li><strong>Senha de Permissões (Owner Password):</strong> Permite que o documento seja aberto livremente para leitura, mas bloqueia a impressão, extração de texto e edição de formulários.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Como Bloquear seu PDF Gratuitamente</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Acesse a ferramenta <strong><Link href="/proteger-pdf" className="text-brand-600 dark:text-brand-400 underline">Proteger PDF com Senha</Link></strong> no PDFRápido.</li>
              <li>Arraste o arquivo PDF que deseja criptografar.</li>
              <li>Digite uma senha forte e utilize o <strong>ícone de olho</strong> para confirmar a digitação exata dos caracteres.</li>
              <li>Clique em <strong>&quot;Proteger PDF agora&quot;</strong>.</li>
              <li>Faça o download do PDF criptografado. A partir de agora, qualquer pessoa precisará da senha para abrir o arquivo.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Boas Práticas na Criação de Senhas</h2>
            <p>
              Evite usar datas de aniversário ou sequências óbvias como <code>123456</code>. Prefira combinações com pelo menos 10 caracteres contendo letras maiúsculas, minúsculas, números e símbolos (ex: <code>#Fatura2026!</code>).
            </p>
          </div>

          <AuthorBio authorName="Emanoel Douglas" role="Fundador & Engenheiro de Software" date="30 de julho de 2026" />
        </article>
      </main>
      <Footer />
    </>
  );
}
