'use client';

import { useState } from 'react';

interface RatingWidgetProps {
  toolName: string;
}

export default function RatingWidget({ toolName }: RatingWidgetProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    setSubmitted(true);
    try {
      // Armazena localmente o feedback do usuário neste dispositivo
      localStorage.setItem(`pdfrapido_rating_${toolName}`, value.toString());
    } catch {}
  };

  return (
    <div className="my-8 bg-gradient-to-br from-brand-50/60 to-indigo-50/60 dark:from-gray-900 dark:to-gray-800/80 border border-brand-100 dark:border-gray-700/60 rounded-3xl p-6 md:p-8 text-center shadow-sm">
      <h4 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
        Essa ferramenta foi útil para você?
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Deixe sua avaliação pessoal sobre o {toolName}.
      </p>

      {!submitted ? (
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
              className="p-1 transition-transform hover:scale-125 focus:outline-none"
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  (hovered !== null ? star <= hovered : rating !== null && star <= rating)
                    ? 'text-yellow-400 fill-current drop-shadow-sm'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm animate-fade-in">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Obrigado pelo seu feedback! ({rating}/5 estrelas)
        </div>
      )}
    </div>
  );
}
