'use client';

export default function ComparisonTable() {
  const FEATURES = [
    { feature: 'Preço', pdfrapido: '100% Grátis', others: 'Pago ou Grátis Limitado' },
    { feature: 'Necessidade de Cadastro', pdfrapido: 'Nenhuma (Zero conta)', others: 'Exige Nome/E-mail' },
    { feature: 'Privacidade & LGPD', pdfrapido: 'Exclusão Automática (30 min)', others: 'Mantém arquivos ou indeterminado' },
    { feature: 'Limite Diário de Arquivos', pdfrapido: 'Ilimitado', others: '2 a 3 arquivos/dia' },
    { feature: 'Compatível com WhatsApp & PJe', pdfrapido: 'Sim (Otimizado)', others: 'Gera arquivos pesados' },
    { feature: 'Funciona no Celular sem App', pdfrapido: 'Sim (100% Responsivo)', others: 'Exige download de App' },
    { feature: 'Marca d’Água nos PDFs', pdfrapido: 'Sem Marca d’Água', others: 'Insere marca d’água na versão grátis' },
  ];

  return (
    <div className="my-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          ⚡ Comparativo de Recursos
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
          Por que o PDFRápido é a melhor escolha?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Veja como nossa plataforma se compara com outros editores e conversores tradicionais do mercado.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-400 dark:text-gray-400 font-bold">
              <th className="py-4 px-4">Recurso / Funcionalidade</th>
              <th className="py-4 px-4 text-center bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 rounded-t-2xl">
                ⚡ PDFRápido
              </th>
              <th className="py-4 px-4 text-center">Outros Conversores</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {FEATURES.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-gray-800 dark:text-gray-200">
                  {item.feature}
                </td>
                <td className="py-3.5 px-4 text-center font-bold text-green-600 dark:text-green-400 bg-brand-50/40 dark:bg-brand-950/20">
                  <span className="inline-flex items-center gap-1">
                    ✓ {item.pdfrapido}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center text-gray-500 dark:text-gray-400">
                  {item.others}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
