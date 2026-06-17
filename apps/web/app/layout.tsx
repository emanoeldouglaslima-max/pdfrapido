import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrápido.com.br';
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PDFRápido — Ferramentas de PDF Online Grátis',
    template: '%s | PDFRápido',
  },
  description:
    'Comprima, converta, junte e divida PDFs online de forma gratuita. Sem cadastro, sem limite, funciona no celular. Ferramentas de PDF rápidas e seguras.',
  keywords: [
    'converter pdf', 'comprimir pdf', 'pdf online grátis',
    'pdf para word', 'pdf para jpg', 'juntar pdf', 'dividir pdf',
  ],
  authors: [{ name: 'PDFRápido' }],
  creator: 'PDFRápido',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PDFRápido',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pdfrápido',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        {/* Schema.org global */}
        <Script
          id="schema-org-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'PDFRápido',
              url: SITE_URL,
              description: 'Ferramentas de PDF online grátis para brasileiros',
              inLanguage: 'pt-BR',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
