import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation'; // <-- 1. Importujemy funkcję notFound

const contentDirectory = path.join(process.cwd(), 'content/honeys');

export interface Honey {
  slug: string;
  title: string;
  contentHtml: string;
  images: string[];
  oldUrl: string;
}

// Zdefiniowana kolejność wyświetlania miodów
const customOrder = [
  'miod-wielokwiatowy',
  'miod-spadziowy',
  'miod-lipowy',
  'miod-nawlociowy',
  'miod-akacjowy',
];

export function getAllHoneys(): Honey[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(contentDirectory);
  
  const honeys: Honey[] = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      const { data, content } = matter(fileContents);

      // Dla listy wystarczy synchroniczne przetworzenie treści
      const processedContent = remark().use(html).processSync(content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        title: data.title || '',
        contentHtml,
        images: data.images || (data.image ? [data.image] : []),
        oldUrl: data.oldUrl || `/${slug}/`,
      };
    });

  // Sortowanie produktów zgodnie z tablicą customOrder
  return honeys.sort((a, b) => {
    const indexA = customOrder.indexOf(a.slug);
    const indexB = customOrder.indexOf(b.slug);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

// Pobieranie pojedynczego miodu po slug
export async function getHoneyBySlug(slug: string): Promise<Honey> { // Zmieniono zwrot z | null na Honey, bo notFound() przerywa działanie
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      notFound(); // <-- 2. Jeśli plik nie istnieje, natychmiast pokazujemy stronę 404
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      contentHtml,
      images: data.images || (data.image ? [data.image] : []),
      oldUrl: data.oldUrl || `/${slug}/`,
    };
  } catch (error) {
    // Jeśli to nie był nasz błąd 404, a coś innego, też możemy wywołać notFound() lub rzucić błąd
    notFound();
  }
}