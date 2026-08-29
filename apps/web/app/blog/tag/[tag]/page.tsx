import type { Metadata } from 'next';
import BlogListingPage from '../../page';
import { slugify } from '../../../../lib/slugify';

interface TagPageProps {
  params: { tag: string };
  searchParams: { q?: string };
}

const RAW_TAGS = [
  'compressao',
  'conversao',
  'celular',
  'word',
  'excel',
  'lgpd',
  'privacidade',
  'concursos',
  'peticoes',
  'assinatura',
  'pdf-a',
  'seguranca',
  'organizacao',
  'transcricao',
  'audio',
  'google-docs',
  'gov-br',
];

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const slug = slugify(params.tag);
  return {
    title: `Artigos marcados com #${slug} | Blog PDFRápido`,
    description: `Veja todas as dicas, guias práticos e tutoriais marcados com a tag #${slug} no Blog do PDFRápido.`,
    alternates: {
      canonical: `https://pdfrapido.com.br/blog/tag/${slug}`,
    },
  };
}

export default function TagPage({ params, searchParams }: TagPageProps) {
  const slug = slugify(params.tag);
  const mergedSearchParams = {
    ...searchParams,
    tag: slug,
  };

  return <BlogListingPage searchParams={mergedSearchParams} />;
}

export async function generateStaticParams() {
  return RAW_TAGS.map((tag) => ({ tag }));
}
