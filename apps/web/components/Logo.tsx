'use client';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Ícone SVG da Logo */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-md shadow-brand-100 transition-all duration-300 hover:scale-105">
        {/* Raio em degradê brilhante (representando velocidade/rápido) */}
        <svg
          className="w-5.5 h-5.5 text-white"
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
        {/* Uma pequena etiqueta indicando PDF */}
        <span className="absolute -bottom-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border border-white shadow-sm">
          PDF
        </span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xl font-extrabold tracking-tight leading-none text-gray-900">
          PDF<span className="text-brand-600">Rápido</span>
        </span>
        <span className="text-[10px] text-gray-400 font-bold tracking-wide mt-1">
          ONLINE & GRÁTIS
        </span>
      </div>
    </div>
  );
}
