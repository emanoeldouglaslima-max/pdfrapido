import type { Metadata } from 'next';
import BlogListingPage from '../../page';
import { slugify } from '../../../../lib/slugify';

interface CategoryPageProps {
  params: { category: string };
  searchParams: { q?: string };
}

const CATEGORY_NAMES: Record<string, string> = {
  whatsapp: 'WhatsApp',
  conversor: 'Conversor',
  seguranca: 'Segurança',
  organizacao: 'Organização',
  produtividade: 'Produtividade',
  juridico: 'Jurídico',
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slug = slugify(params.category);
  const displayName = CATEGORY_NAMES[slug] || params.category;
  return {
    title: `Artigos na Categoria ${displayName} | Blog PDFRápido`,
    description: `Confira todos os tutoriais, dicas e guias práticos relacionados à categoria ${displayName} no Blog do PDFRápido.`,
    alternates: {
      canonical: `https://pdfrapido.com.br/blog/categoria/${slug}`,
    },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const slug = slugify(params.category);
  const mergedSearchParams = {
    ...searchParams,
    categoria: slug,
  };

  return <BlogListingPage searchParams={mergedSearchParams} />;
}

export async function generateStaticParams() {
  return [
    { category: 'whatsapp' },
    { category: 'conversor' },
    { category: 'seguranca' },
    { category: 'organizacao' },
    { category: 'produtividade' },
    { category: 'juridico' },
  ];
}
