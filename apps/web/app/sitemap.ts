// app/sitemap.ts
import { MetadataRoute } from 'next';
import { TOOLS } from './constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrapido.com.br';

const BLOG_SLUGS = [
  'como-comprimir-pdf-para-whatsapp',
  'como-converter-pdf-em-word-no-celular',
  'seguranca-de-arquivos-pdf-online',
  'como-juntar-pdf-concursos-peticoes',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = TOOLS.map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogArticles = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolPages,
    // Páginas institucionais
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogArticles,
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
