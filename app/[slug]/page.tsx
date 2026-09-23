import { notFound } from "next/navigation";
import { getPageBySlug, getAllPages } from "@/lib/pages";
import Link from "next/link";

export async function generateStaticParams() {
  const pages = getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-6 bg-cream">
      <div className="mx-auto max-w-3xl">
        {/* Przycisk powrotu na stronę główną */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć na stronę główną
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-8">
            {pageData.title}
          </h1>

          <div 
            className="prose prose-stone max-w-none 
                       leading-relaxed
                       text-stone-700
                       prose-p:mb-6 prose-p:leading-relaxed
                       prose-headings:font-playfair prose-headings:text-stone-900 prose-headings:mt-8 prose-headings:mb-4
                       prose-a:text-amber-700 hover:prose-a:text-amber-800"
            dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} 
          />
        </article>
      </div>
    </main>
  );
}