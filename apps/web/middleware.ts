import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redireciona 301 permanentemente qualquer acesso vindo do subdomínio temporário vercel.app para o domínio oficial aprovado
  if (host.includes('vercel.app')) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://pdfrapido.com.br');
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match todas as rotas exceto arquivos estáticos e de mídia
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};
