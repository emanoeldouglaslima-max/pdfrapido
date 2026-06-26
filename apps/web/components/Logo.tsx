'use client';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Ícone SVG da Logo com gradiente e glow */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 via-indigo-500 to-violet-500 shadow-lg shadow-brand-300/40 transition-all duration-300 hover:scale-105 hover:shadow-brand-400/50">
        {/* Raio (representando velocidade/rápido) */}
        <svg
          className="w-5 h-5 text-white drop-shadow-sm"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        {/* Etiqueta "PDF" */}
        <span className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border-2 border-white shadow-sm">
          PDF
        </span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xl font-extrabold tracking-tight leading-none text-gray-900">
          PDF<span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Rápido</span>
        </span>
        <span className="text-[10px] text-gray-400 font-bold tracking-widest mt-0.5">
          ONLINE & GRÁTIS
        </span>
      </div>
    </div>
  );
}
