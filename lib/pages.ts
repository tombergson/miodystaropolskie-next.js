import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const pagesDirectory = path.join(process.cwd(), 'content/pages');

export interface PageData {
  slug: string;
  title: string;
  contentHtml: string;
  oldUrl?: string;
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Konwersja Markdown na HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title || 'Strona',
      contentHtml,
      oldUrl: matterResult.data.oldUrl,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPages(): { slug: string }[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }
  const filenames = fs.readdirSync(pagesDirectory);
  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ''),
    }));
}