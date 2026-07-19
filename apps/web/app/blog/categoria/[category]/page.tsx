import type { Metadata } from 'next';
import BlogListingPage from '../../page';

interface CategoryPageProps {
  params: { category: string };
  searchParams: { q?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const capCategory = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `Artigos em ${capCategory}`,
    description: `Confira todos os tutoriais, dicas e artigos relacionados à categoria ${capCategory} no Blog do PDFRápido.`,
    alternates: {
      canonical: `https://pdfrapido.com.br/blog/categoria/${params.category}`,
    },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const mergedSearchParams = {
    ...searchParams,
    categoria: params.category,
  };

  return <BlogListingPage searchParams={mergedSearchParams} />;
}

// Para SSG: pré-compilar todas as categorias em tempo de build
export async function generateStaticParams() {
  return [
    { category: 'whatsapp' },
    { category: 'conversor' },
    { category: 'segurança' },
    { category: 'organização' }
  ];
}
