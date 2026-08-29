import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transcrever Vídeo em Texto Online Grátis | PDFRápido',
  description: 'Converta vídeos (MP4, WEBM, MOV) e áudios em texto limpo com exportação em PDF e Word. Rápido, seguro, 100% gratuito e sem cadastro.',
  keywords: 'transcrever vídeo,vídeo para texto,converter áudio em texto,áudio para pdf,transcrever áudio mp3,converter vídeo em word',
  alternates: {
    canonical: 'https://pdfrapido.com.br/transcrever-video-em-texto',
  },
  openGraph: {
    title: 'Transcrever Vídeo em Texto Online Grátis | PDFRápido',
    description: 'Converta vídeos e áudios em texto limpo com exportação em PDF e Word.',
    url: 'https://pdfrapido.com.br/transcrever-video-em-texto',
    siteName: 'PDFRápido',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://pdfrapido.com.br/og-image.png', width: 1200, height: 630, alt: 'Transcrever Vídeo em Texto' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transcrever Vídeo em Texto Online Grátis | PDFRápido',
    description: 'Converta vídeos e áudios em texto com alta precisão no PDFRápido.',
    images: ['https://pdfrapido.com.br/og-image.png'],
  },
};

export default function TranscreverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
