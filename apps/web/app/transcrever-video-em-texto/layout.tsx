import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transcrever Vídeo e Áudio em Texto Online Grátis — PDFRápido',
  description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo, resumos estruturados e exporte em PDF ou Word (.docx). Rápido, seguro e gratuito.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/transcrever-video-em-texto',
  },
  openGraph: {
    title: 'Transcrever Vídeo e Áudio em Texto Online Grátis — PDFRápido',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo, resumos estruturados e exporte em PDF ou Word (.docx). Rápido, seguro e gratuito.',
    url: 'https://pdfrapido.com.br/transcrever-video-em-texto',
    type: 'website',
    images: [
      {
        url: 'https://pdfrapido.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Transcrever Vídeo em Texto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pdfrapido',
    title: 'Transcrever Vídeo e Áudio em Texto Online Grátis — PDFRápido',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo com exportação em PDF e Word.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  }
};

export default function TranscreverVideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
