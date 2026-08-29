// app/sitemap.ts
import { MetadataRoute } from 'next';
import { TOOLS } from './constants';

import { SITE_URL } from '../lib/siteUrl';

const BLOG_SLUGS = [
  'como-transcrever-audio-de-reunioes-e-aulas',
  'como-organizar-documentos-pdf-para-declaracao-imposto-de-renda',
  'guia-completo-assinatura-eletronica-gov-br',
  'como-converter-pdf-para-excel-guia-pratico',
  'como-proteger-pdf-com-senha-forte',
  'como-extrair-texto-de-pdf-e-documentos-digitalizados',
  'melhores-praticas-para-digitalizar-documentos-com-celular',
  'como-otimizar-pdf-para-concursos-e-vestibulares',
  'como-converter-video-mp4-em-texto-e-legendas',
  'como-mesclar-contratos-e-anexos-em-um-unico-pdf',
  'como-converter-documentos-google-docs-para-pdf',
  'como-assinar-pdf-certificado-digital',
  'diferenca-pdfa-pdf-comum',
  'como-recuperar-e-consertar-pdf-corrompido',
  'remover-senha-de-pdf',
  'converter-png-para-pdf-celular',
  'extrair-paginas-de-pdf',
  'como-reduzir-tamanho-pdf-windows',
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
    // Páginas institucionais de alta transparência exigidas pelo AdSense
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogArticles,
  ];
}
