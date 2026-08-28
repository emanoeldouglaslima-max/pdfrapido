/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build standalone para Docker/Cloud Run
  output: 'standalone',

  // Compressão brotli/gzip automática
  compress: true,

  // Headers de segurança e cache para assets estáticos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff2|png|jpg|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Redirects canônicos e aliases populares de busca (301)
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pdf-para-word',
        destination: '/converter-pdf-para-word',
        permanent: true,
      },
      {
        source: '/pdf-para-jpg',
        destination: '/converter-pdf-para-jpg',
        permanent: true,
      },
      {
        source: '/word-para-pdf',
        destination: '/converter-word-para-pdf',
        permanent: true,
      },
      {
        source: '/imagem-para-pdf',
        destination: '/converter-jpg-para-pdf',
        permanent: true,
      },
      {
        source: '/jpg-para-pdf',
        destination: '/converter-jpg-para-pdf',
        permanent: true,
      },
      {
        source: '/png-para-pdf',
        destination: '/converter-jpg-para-pdf',
        permanent: true,
      },
      {
        source: '/video-para-texto',
        destination: '/transcrever-video-em-texto',
        permanent: true,
      },
      {
        source: '/audio-para-texto',
        destination: '/transcrever-video-em-texto',
        permanent: true,
      },
      {
        source: '/transcrever-audio',
        destination: '/transcrever-video-em-texto',
        permanent: true,
      },
      // Aliases para páginas de políticas e transparência exigidas pelo AdSense
      {
        source: '/privacy',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      {
        source: '/privacidade',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/sobre',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/sobre',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contato',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contato',
        permanent: true,
      },
      {
        source: '/fale-conosco',
        destination: '/contato',
        permanent: true,
      },
      {
        source: '/disclaimer',
        destination: '/aviso-legal',
        permanent: true,
      },
      {
        source: '/isencao-de-responsabilidade',
        destination: '/aviso-legal',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/termos-de-uso',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/termos-de-uso',
        permanent: true,
      },
    ];
  },

  // Imagens externas permitidas
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // Variáveis de ambiente públicas
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },
};

module.exports = nextConfig;
