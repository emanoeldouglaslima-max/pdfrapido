/**
 * Converte strings com acentos, espaços e caracteres especiais em slugs limpos e compatíveis com URLs.
 * Exemplo: "Segurança" -> "seguranca", "PDF/A" -> "pdf-a", "Google Docs" -> "google-docs"
 */
export function slugify(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
