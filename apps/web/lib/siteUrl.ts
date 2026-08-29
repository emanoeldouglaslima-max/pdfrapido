/**
 * Garantia absoluta da URL canônica oficial do site.
 * Impede que variáveis de ambiente temporárias da Vercel (*.vercel.app)
 * ou locais (localhost) contaminem os esquemas Schema.org, Sitemap e Meta Tags.
 */
export const SITE_URL = (() => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  if (
    !envUrl ||
    envUrl.includes('localhost') ||
    envUrl.includes('vercel.app') ||
    envUrl.includes('xn--') ||
    envUrl.includes('pdfrápido')
  ) {
    return 'https://pdfrapido.com.br';
  }
  return envUrl.replace(/\/$/, '');
})();
