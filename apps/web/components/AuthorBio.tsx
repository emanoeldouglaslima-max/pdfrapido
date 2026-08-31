import Link from 'next/link';

interface AuthorBioProps {
  authorName?: string;
  role?: string;
  date?: string;
}

export default function AuthorBio({
  authorName = 'Emanoel Douglas',
  role = 'Fundador & Engenheiro de Software',
  date,
}: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-150 dark:border-gray-800 space-y-6">
      {/* Selo de Verificação Editorial */}
      <div className="flex items-center gap-3 p-4 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 rounded-2xl text-xs text-emerald-850 dark:text-emerald-300">
        <span className="text-lg">🛡️</span>
        <p className="leading-relaxed">
          <strong>Conteúdo Verificado & Confiável:</strong> Este artigo foi redigido e revisado tecnicamente para garantir precisão nos procedimentos e segurança com base nas melhores práticas da LGPD.
        </p>
      </div>

      {/* Caixa do Autor */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
          ED
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{authorName}</h4>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
              {role}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Especialista em Engenharia de Software, arquitetura web e manipulação de documentos digitais. Desenvolve soluções focadas em privacidade de dados, alta performance e acessibilidade gratuita para o público brasileiro.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-brand-600 dark:text-brand-400 pt-1">
            <Link href="/sobre" className="hover:underline">Conheça nossa equipe</Link>
            <span>•</span>
            <Link href="/contato" className="hover:underline">Fale com o autor</Link>
            {date && (
              <>
                <span>•</span>
                <span className="text-gray-400 font-normal">Revisado em {date}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
