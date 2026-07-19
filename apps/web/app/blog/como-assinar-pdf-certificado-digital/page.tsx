import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'Como Assinar PDF com Certificado Digital ou Assinatura Eletrônica Grátis',
  description: 'Descubra como assinar documentos em formato PDF usando o certificado digital gratuito do Gov.br ou assinaturas eletrônicas seguras e com validade jurídica.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/blog/como-assinar-pdf-certificado-digital',
  },
};

export default function Artigo5Page() {
  return (
    <>
      {/* Schema.org dinâmico (BlogPosting) */}
      <Script
        id="schema-org-blogpost"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Como Assinar PDF com Certificado Digital ou Assinatura Eletrônica Grátis',
            description: 'Descubra como assinar documentos em formato PDF usando o certificado digital gratuito do Gov.br ou assinaturas eletrônicas seguras e com validade jurídica.',
            datePublished: '2026-07-15T12:00:00Z',
            dateModified: '2026-07-15T12:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'Equipe PDFRápido',
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
              '@id': 'https://pdfrapido.com.br/blog/como-assinar-pdf-certificado-digital',
            },
          }),
        }}
      />

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-brand-600">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600">Assinar PDF com Certificado Digital</span>
        </div>

        <article>
          {/* Header do Artigo */}
          <header className="mb-8 space-y-4">
            <span className="px-3 py-1 rounded-full font-bold text-xs bg-amber-100 text-amber-700">
              Segurança
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Como Assinar PDF com Certificado Digital ou Assinatura Eletrônica Grátis
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-b border-gray-100 pb-4">
              <span>Por Equipe PDFRápido</span>
              <span>•</span>
              <span>15 de julho de 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>
          </header>

          {/* === ADSENSE SLOT: Topo do Artigo (horizontal/responsivo) === */}
          {/* Descomentar após aprovação do Google AdSense:
          <div className="my-6 text-center">
            <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-8269194570705692" data-ad-slot="SLOT_ID_AQUI" data-ad-format="auto" data-full-width-responsive="true" />
          </div>
          */}

          {/* Corpo do Artigo */}
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg text-gray-700 font-medium">
              Assinar contratos, termos, procurações ou outros documentos em formato PDF tornou-se uma prática essencial. Mas você sabia que não precisa gastar dinheiro com certificados caros ou imprimir papéis para fazer isso com plena validade legal?
            </p>
            <p>
              Hoje em dia, a legislação brasileira reconhece diferentes tipos de assinaturas eletrônicas. Graças ao portal do Governo Federal (Gov.br) e a plataformas seguras, você consegue assinar qualquer documento PDF direto do seu computador ou celular, de graça, com a mesma validade de um reconhecimento de firma em cartório.
            </p>
            <p>
              Neste guia definitivo, vamos te ensinar o passo a passo completo para assinar seus PDFs com segurança usando o Gov.br e entender a diferença das assinaturas eletrônicas permitidas por lei.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Quais tipos de assinatura eletrônica existem no Brasil?</h2>
            <p>
              A Lei Federal nº 14.063/2020 classifica as assinaturas eletrônicas em três tipos principais. Conhecer a diferença ajuda a saber quando usar cada uma delas:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full text-left text-sm border-collapse border border-gray-200">
                <thead className="bg-gray-50 font-bold text-gray-700">
                  <tr>
                    <th className="p-3 border border-gray-200">Tipo de Assinatura</th>
                    <th className="p-3 border border-gray-200">Como Funciona</th>
                    <th className="p-3 border border-gray-200">Exemplo Prático</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-gray-600">
                  <tr>
                    <td className="p-3 border border-gray-200 font-semibold">Simples</td>
                    <td className="p-3 border border-gray-200">Identifica quem está assinando através de dados básicos associados (IP, e-mail).</td>
                    <td className="p-3 border border-gray-200">Aceitar termos de uso online ou assinar recibos comuns de entrega.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-semibold">Avançada</td>
                    <td className="p-3 border border-gray-200">Usa dados criptográficos confiáveis que garantem que o documento não foi alterado após a assinatura.</td>
                    <td className="p-3 border border-gray-200">Assinatura gratuita do Gov.br para contratos e declarações.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-semibold">Qualificada</td>
                    <td className="p-3 border border-gray-200">Utiliza um certificado digital padrão ICP-Brasil (Tokens físicos, e-CPF, e-CNPJ) comprado em certificadoras.</td>
                    <td className="p-3 border border-gray-200">Assinatura de juízes, médicos (receitas), ou grandes transações imobiliárias.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Como usar a Assinatura Eletrônica Grátis do Gov.br</h2>
            <p>
              A assinatura avançada disponibilizada pelo Governo Federal é totalmente gratuita para qualquer cidadão que possua uma conta Gov.br de nível **Prata** ou **Ouro**. Veja como assinar seu PDF em poucos minutos:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Acesse o portal oficial do **Assinador do Gov.br** (pesquise por &quot;Assinador Eletrônico Gov.br&quot;).</li>
              <li>Faça o login com o seu CPF e senha da conta Gov.br.</li>
              <li>Envie o seu documento PDF clicando em &quot;Escolher Arquivo&quot;.</li>
              <li>Na pré-visualização, clique na página onde deseja inserir a assinatura e posicione a caixa de assinatura arrastando com o cursor.</li>
              <li>Clique em &quot;Assinar&quot;. Você receberá um código de autorização via SMS ou aplicativo no celular. Insira o código para autorizar.</li>
              <li>Clique em &quot;Baixar arquivo assinado&quot;. O documento agora conterá uma validação digital infalsificável no rodapé.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cuidados essenciais ao assinar documentos digitais</h2>
            <p>
              Apesar de práticos, os documentos assinados digitalmente exigem cuidados extras para não expor seus dados pessoais:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Proteja seu login do Gov.br:</strong> Ative a autenticação de duas etapas na sua conta Gov.br. Com ela, ninguém poderá gerar assinaturas em seu nome sem a sua permissão no celular.</li>
              <li><strong>Não edite o PDF após assinar:</strong> Se você tentar alterar qualquer palavra, imagem ou página do PDF após ele ter sido assinado, a assinatura digital se tornará **inválida** automaticamente.</li>
              <li><strong>Verifique os limites de tamanho:</strong> O portal do Gov.br tem um limite máximo de tamanho de arquivo (geralmente de 100MB). Se o seu documento for muito grande, passe-o antes na nossa ferramenta de <Link href="/comprimir-pdf" className="text-brand-600 font-bold hover:underline">Comprimir PDF</Link>.</li>
            </ul>

            {/* Box de Ação (CTA) */}
            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-8 rounded-3xl text-center space-y-4 my-8">
              <h3 className="text-xl font-bold text-gray-900">Seu PDF está muito pesado para o assinador?</h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto">
                Reduza o tamanho do seu documento em segundos para caber no limite oficial do Gov.br, preservando as fontes legíveis.
              </p>
              <div className="pt-2">
                <Link
                  href="/comprimir-pdf"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Comprimir PDF Grátis
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Como verificar se uma assinatura em PDF é válida?</h2>
            <p>
              Se você recebeu um PDF assinado eletronicamente e quer ter certeza de que ele é autêntico e não foi alterado de forma fraudulenta, utilize o **Validador de Assinaturas do ITI (Instituto Nacional de Tecnologia da Informação)** ou o portal de conformidade de assinaturas. Basta carregar o arquivo e o sistema emitirá um laudo atestando se a assinatura está conforme os padrões nacionais de segurança.
            </p>
          </div>

          {/* === ADSENSE SLOT: Final do Artigo (horizontal/responsivo) === */}
          {/* Descomentar após aprovação do Google AdSense:
          <div className="my-8 text-center">
            <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-8269194570705692" data-ad-slot="SLOT_ID_AQUI" data-ad-format="auto" data-full-width-responsive="true" />
          </div>
          */}
        </article>
      </main>
      <Footer />
    </>
  );
}
