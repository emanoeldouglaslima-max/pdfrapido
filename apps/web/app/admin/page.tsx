'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock de Artigos existentes no Blog
const MOCK_ARTICLES = [
  { id: 1, title: 'Como Comprimir PDF para o WhatsApp sem Perder Qualidade', category: 'WhatsApp', date: '10/07/2026', views: '1,420', status: 'Publicado' },
  { id: 2, title: 'Como Converter PDF em Word no Celular de Forma Gratuita', category: 'Conversor', date: '09/07/2026', views: '980', status: 'Publicado' },
  { id: 3, title: 'Segurança e Privacidade: É seguro enviar documentos para sites?', category: 'Segurança', date: '08/07/2026', views: '2,110', status: 'Publicado' },
  { id: 4, title: 'Como Juntar Vários PDFs em um Só para Concursos e Petições', category: 'Organização', date: '07/07/2026', views: '3,400', status: 'Publicado' },
];

// Mock de Comentários recebidos
const MOCK_COMMENTS = [
  { id: 1, author: 'Carlos Ramos', email: 'carlos@email.com', article: 'Comprimir PDF para WhatsApp', content: 'Muito útil! Consegui enviar uma planilha de 45MB encolhida.', date: '13/07/2026', status: 'Pendente' },
  { id: 2, author: 'Dr. Roberto Santos', email: 'roberto@adv.com.br', article: 'Juntar PDFs para Concursos', content: 'Salvou minha petição no PJe. O sistema do tribunal aceitou certinho.', date: '12/07/2026', status: 'Aprovado' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'artigos' | 'seo' | 'comentarios' | 'config'>('artigos');
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('WhatsApp');

  // Adicionar Artigo Simulado
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newArt = {
      id: articles.length + 1,
      title: newTitle,
      category: newCategory,
      date: new Date().toLocaleDateString('pt-BR'),
      views: '0',
      status: 'Rascunho',
    };
    setArticles([newArt, ...articles]);
    setNewTitle('');
  };

  // Aprovar Comentário Simulado
  const handleApproveComment = (id: number) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'Aprovado' } : c))
    );
  };

  // Remover Comentário Simulado
  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800">
      {/* Barra Lateral / Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl">⚙️</span>
            <span className="font-extrabold text-lg tracking-tight">
              PDFRápido <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full font-bold ml-1">Painel Admin</span>
            </span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('artigos')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'artigos' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              📝 Artigos e Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'seo' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              🔍 Otimização SEO
            </button>
            <button
              onClick={() => setActiveTab('comentarios')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'comentarios' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              💬 Moderar Comentários
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'config' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              🌐 Integrações & API
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <Link
            href="/"
            className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1.5"
          >
            ↩️ Voltar para o Site
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-6 md:p-10 max-w-5xl">
        {/* Top Header do Painel */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Painel de Administração</h1>
            <p className="text-xs text-gray-400 mt-1">Gerencie artigos, monitoramento de robôs e conformidade AdSense</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-sm text-green-600">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            AdSense: Pronto para Receber Código
          </div>
        </header>

        {/* Módulo 1: Artigos */}
        {activeTab === 'artigos' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-base">Escrever Novo Artigo</h3>
              <form onSubmit={handleAddArticle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Título do Post</label>
                    <input
                      type="text"
                      placeholder="Ex: Como Reduzir PDF no Windows 11..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Conversor">Conversor</option>
                      <option value="Segurança">Segurança</option>
                      <option value="Organização">Organização</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  ➕ Salvar Artigo
                </button>
              </form>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">Artigos de Blog Ativos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                  <thead className="bg-gray-50 text-xs text-gray-400 font-bold uppercase border-b border-gray-150">
                    <tr>
                      <th className="px-6 py-4">Título</th>
                      <th className="px-6 py-4">Categoria</th>
                      <th className="px-6 py-4">Visualizações</th>
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{art.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                            {art.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">👀 {art.views}</td>
                        <td className="px-6 py-4">{art.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            art.status === 'Publicado' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {art.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Módulo 2: Otimização SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Métricas Globais e XML Sitemap</h3>
              <p className="text-xs text-gray-400">Verifique a situação de indexação e estrutura técnica das páginas do site.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <span className="text-2xl">📁</span>
                <h4 className="font-bold text-gray-900 text-sm mt-2 mb-1">Rotas Indexáveis</h4>
                <p className="text-xs text-gray-500">24 páginas ativas declaradas no sitemap.</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <span className="text-2xl">🤖</span>
                <h4 className="font-bold text-gray-900 text-sm mt-2 mb-1">Robots.txt</h4>
                <p className="text-xs text-green-600 font-semibold">Ativo e rastreável</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <span className="text-2xl">🔗</span>
                <h4 className="font-bold text-gray-900 text-sm mt-2 mb-1">Canonicals</h4>
                <p className="text-xs text-green-600 font-semibold">100% Otimizados (sem Punycode)</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">Controle de Schema.org (JSON-LD)</h4>
              <p className="text-xs text-gray-500">
                A aplicação injeta dados estruturados automaticamente em cada tipo de página para auxiliar a leitura semântica dos robôs do AdSense:
              </p>
              <ul className="list-disc pl-5 text-xs text-gray-500 space-y-1">
                <li><strong>Home Page:</strong> WebSite Schema</li>
                <li><strong>Páginas de Ferramentas:</strong> SoftwareApplication Schema + FAQPage</li>
                <li><strong>Artigos de Blog:</strong> BlogPosting Schema</li>
              </ul>
            </div>
          </div>
        )}

        {/* Módulo 3: Moderação de Comentários */}
        {activeTab === 'comentarios' && (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Moderação de Comentários</h3>
              <p className="text-xs text-gray-400 mt-1">Aprove ou rejeite depoimentos e comentários de usuários nos artigos do blog.</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {comments.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400">Nenhum comentário pendente no momento.</div>
              ) : (
                comments.map((comm) => (
                  <div key={comm.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{comm.author}</span>
                        <span className="text-xs text-gray-400">({comm.email})</span>
                        <span className="text-[10px] text-gray-400 font-semibold">• {comm.date}</span>
                      </div>
                      <p className="text-xs text-gray-400">Artigo: <span className="font-semibold">{comm.article}</span></p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">&quot;{comm.content}&quot;</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {comm.status === 'Pendente' ? (
                        <>
                          <button
                            onClick={() => handleApproveComment(comm.id)}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm active:scale-[0.98] transition-all"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comm.id)}
                            className="border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs px-3.5 py-1.5 rounded-xl active:scale-[0.98] transition-all"
                          >
                            Rejeitar
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 flex items-center gap-1">
                          ✓ Aprovado
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Módulo 4: Configurações Gerais */}
        {activeTab === 'config' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Tags de Monitoramento e Ferramentas do Google</h3>
              <p className="text-xs text-gray-400">Gerencie a conexão do site com scripts externos sem mexer na estrutura do código principal.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Google AdSense (ID de Editor)</label>
                <input
                  type="text"
                  disabled
                  value="ca-pub-8269194570705692"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">ID do Google Analytics 4 (GA_ID)</label>
                  <input
                    type="text"
                    placeholder="Placeholders de variável (.env): NEXT_PUBLIC_GA_ID"
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Microsoft Clarity Project ID</label>
                  <input
                    type="text"
                    placeholder="Placeholders de variável (.env): NEXT_PUBLIC_CLARITY_ID"
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
