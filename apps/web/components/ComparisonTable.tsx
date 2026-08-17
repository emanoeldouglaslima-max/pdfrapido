'use client';

export default function ComparisonTable() {
  const ADVANTAGES = [
    {
      icon: '🚫',
      title: 'Sem cadastro necessário',
      desc: 'Use qualquer ferramenta sem criar conta, informar e-mail ou fazer login.',
    },
    {
      icon: '💰',
      title: 'Ferramentas gratuitas',
      desc: 'Todas as ferramentas podem ser usadas gratuitamente, sem planos pagos obrigatórios.',
    },
    {
      icon: '🇧🇷',
      title: 'Interface em português',
      desc: 'Toda a experiência foi pensada para o público brasileiro, com linguagem clara e acessível.',
    },
    {
      icon: '📱',
      title: 'Funciona no celular',
      desc: 'Site responsivo que funciona diretamente no navegador do celular, tablet ou computador.',
    },
    {
      icon: '📏',
      title: 'Limite de arquivo informado',
      desc: 'O limite de até 25 MB por arquivo é informado antes do envio, sem surpresas.',
    },
    {
      icon: '🗑️',
      title: 'Exclusão automática dos arquivos',
      desc: 'Seus arquivos são processados temporariamente e excluídos automaticamente de nossos servidores após o processamento.',
    },
  ];

  return (
    <div className="my-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          ✅ Vantagens
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
          Por que usar o PDFRápido?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Conheça os diferenciais que tornam o PDFRápido uma opção prática para o dia a dia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADVANTAGES.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 hover:border-brand-200 dark:hover:border-brand-700 transition-colors"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
