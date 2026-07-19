import type { Metadata } from 'next';
import BlogListingPage from '../../page';

interface TagPageProps {
  params: { tag: string };
  searchParams: { q?: string };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const capTag = params.tag.charAt(0).toUpperCase() + params.tag.slice(1);
  return {
    title: `Artigos sobre #${capTag}`,
    description: `Veja todas as dicas, guias práticos e tutoriais marcados com a tag #${capTag} no Blog do PDFRápido.`,
    alternates: {
      canonical: `https://pdfrapido.com.br/blog/tag/${params.tag}`,
    },
  };
}

export default function TagPage({ params, searchParams }: TagPageProps) {
  const mergedSearchParams = {
    ...searchParams,
    tag: params.tag,
  };

  return <BlogListingPage searchParams={mergedSearchParams} />;
}

// Para SSG: pré-compilar todas as tags em tempo de build
export async function generateStaticParams() {
  return [
    { tag: 'compressão' },
    { tag: 'conversão' },
    { tag: 'celular' },
    { tag: 'word' },
    { tag: 'lgpd' },
    { tag: 'privacidade' },
    { tag: 'concursos' },
    { tag: 'petições' }
  ];
}
