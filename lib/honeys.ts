import fs from 'fs';
import path from 'path';

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
  
  const honeys = filenames
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Honey;
    });

  // Sortowanie produktów zgodnie z tablicą customOrder
  return honeys.sort((a, b) => {
    const indexA = customOrder.indexOf(a.slug);
    const indexB = customOrder.indexOf(b.slug);

    // Jeśli miodu nie ma na liście, wrzuć go na koniec
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

// Pobieranie pojedynczego miodu po slug
export function getHoneyBySlug(slug: string): Honey | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Honey;
  } catch (error) {
    return null;
  }
}