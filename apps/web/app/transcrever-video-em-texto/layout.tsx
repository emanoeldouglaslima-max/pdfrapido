import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transcrever Vídeo em Texto Online Grátis — Gerar Legendas SRT',
  description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto e legendas SRT online com inteligência artificial. Sem cadastro, com limite de arquivo informado antes do envio.',
  alternates: {
    canonical: 'https://pdfrapido.com.br/transcrever-video-em-texto',
  },
  openGraph: {
    title: 'Transcrever Vídeo em Texto Online Grátis — Gerar Legendas SRT',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto e legendas SRT online com inteligência artificial. Sem cadastro, com limite de arquivo informado antes do envio.',
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
    title: 'Transcrever Vídeo em Texto Online Grátis — Gerar Legendas SRT',
    description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto e legendas SRT online com inteligência artificial.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  }
};

export default function TranscreverVideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
