// app/sitemap.ts
import { MetadataRoute } from 'next';
import { TOOLS } from './constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfrápido.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = TOOLS.map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolPages,
  ];
}
