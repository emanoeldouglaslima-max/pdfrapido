import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Saiba como e por que utilizamos cookies em nossa plataforma. O PDFRápido preza pela transparência e privacidade.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/cookies',
  },
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Política de Cookies</h1>
        
        <div className="prose prose-gray max-w-none text-sm text-gray-600 leading-relaxed space-y-6">
          <p>
            No <strong>PDFRápido</strong>, acessível em <a href="https://pdfrapido.com.br" className="text-brand-600 hover:underline">pdfrapido.com.br</a>, acreditamos em ser claros e abertos sobre como coletamos e usamos dados relacionados a você. No espírito de transparência, esta política fornece informações detalhadas sobre como e quando usamos cookies em nosso site.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Como o PDFRápido utiliza Cookies?</h2>
          <p>
            Nós utilizamos cookies por vários motivos detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa deles ou não, caso sejam usados para fornecer um serviço que você utiliza.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Tipos de Cookies que Utilizamos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cookies Necessários:</strong> Estes cookies são essenciais para que você possa navegar pelo site e usar seus recursos. Sem esses cookies, os serviços que você solicitou (como processamento de arquivos) não podem ser fornecidos.
            </li>
            <li>
              <strong>Cookies de Desempenho e Estatísticas:</strong> Coletam informações sobre como os visitantes utilizam o site, por exemplo, quais páginas são acessadas com mais frequência. Esses dados nos ajudam a otimizar o site e facilitar a navegação.
            </li>
            <li>
              <strong>Cookies de Funcionalidade:</strong> Permitem que o site se lembre de escolhas que você faz (como suas preferências de ferramentas ou configurações) e forneça recursos mais aprimorados e personalizados.
            </li>
            <li>
              <strong>Cookies de Publicidade (Google AdSense):</strong> O Google, como fornecedor terceirizado, utiliza cookies para veicular anúncios em nosso site. Com o cookie DART, o Google e seus parceiros podem veicular anúncios para os usuários com base nas visitas a este e a outros sites na Internet.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Como gerenciar ou bloquear Cookies?</h2>
          <p>
            Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do seu navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de certas funcionalidades e recursos deste site.
          </p>
          <p>
            Para optar por não participar da veiculação de anúncios personalizados do Google AdSense, você pode acessar a página de <a href="https://settings.google.com/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Configurações de Anúncios do Google</a> ou desativar o uso de cookies de publicidade personalizada de terceiros visitando <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">aboutads.info</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Mais Informações</h2>
          <p>
            Esperamos que esta política tenha esclarecido suas dúvidas. Se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>
          <p>
            Para qualquer esclarecimento adicional, sinta-se à vontade para entrar em contato conosco através da nossa página de <a href="/contato" className="text-brand-600 hover:underline">Contato</a>.
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
