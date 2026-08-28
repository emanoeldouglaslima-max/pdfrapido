import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import CookieBanner from '../components/CookieBanner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrapido.com.br';
const SITE_URL = rawSiteUrl.includes('xn--') || rawSiteUrl.includes('pdfrápido') 
  ? 'https://pdfrapido.com.br' 
  : rawSiteUrl;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-8269194570705692';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PDFRápido — Ferramentas de PDF Online Grátis',
    template: '%s | PDFRápido',
  },
  description:
    'Comprima, converta, junte e divida PDFs online de forma gratuita. Sem cadastro, funciona no celular. Ferramentas de PDF rápidas e seguras para o público brasileiro.',
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
    site: '@pdfrapido',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'qbvGg16DhV-HWQVvqIQ8A--wpg9_xr3RhQqJsIvUs0U',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Correção #7: PWA manifest para "Adicionar à tela inicial" no celular
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Consent Mode v2 — Estado padrão (Bloqueia cookies de publicidade e analytics até consentimento) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
        {/* Dark/Light Mode Inicializador */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Google AdSense */}
        {ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Google Tag Manager (GTM) */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased transition-colors duration-300 min-h-screen flex flex-col justify-between`}>
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <CookieBanner />

        {/* Google Analytics 4 (GA4) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");
            `}
          </Script>
        )}

        {/* Schema.org global — WebSite e Organization com declarações de transparência AdSense */}
        <Script
          id="schema-org-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
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
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'PDFRápido',
                url: SITE_URL,
                logo: `${SITE_URL}/apple-touch-icon.png`,
                founder: {
                  '@type': 'Person',
                  name: 'Emanoel Douglas',
                },
                privacyPolicy: `${SITE_URL}/politica-de-privacidade`,
                termsOfService: `${SITE_URL}/termos-de-uso`,
                publishingPrinciples: `${SITE_URL}/aviso-legal`,
                knowsAbout: [
                  'Ferramentas de PDF',
                  'Compressão de Documentos',
                  'Conversão de Arquivos',
                  'Privacidade LGPD',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  email: 'emanoeldouglaslima@gmail.com',
                  url: `${SITE_URL}/contato`,
                  availableLanguage: ['Portuguese'],
                },
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
