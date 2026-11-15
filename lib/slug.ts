// Slug trafia do ścieżki pliku: dopuszczamy tylko litery, cyfry, "-" i "_"
const SLUG_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

export function isSafeSlug(slug: string): boolean {
  return slug.length <= 100 && SLUG_PATTERN.test(slug);
}