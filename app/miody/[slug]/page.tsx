import { notFound } from "next/navigation";
import { getHoneyBySlug, getAllHoneys } from "@/lib/honeys";
import Link from "next/link";

// Generowanie statycznych ścieżek dla Next.js
export async function generateStaticParams() {
  const honeys = getAllHoneys();
  return honeys.map((honey) => ({
    slug: honey.slug,
  }));
}

export default async function HoneyPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const honey = await getHoneyBySlug(slug);

  if (!honey) {
    notFound();
  }

  const cleanTitle = honey.title;

  return (
    <main className="min-h-screen py-20 px-6 bg-cream">
      <div className="mx-auto max-w-3xl">
        {/* Przycisk powrotu do oferty */}
        <Link 
          href="/#miody"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do oferty
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
          
          {/* Tytuł strony */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-8 text-center">
            {cleanTitle}
          </h1>

          {/* Treść HTML z pliku Markdown (zawiera obrazki tam, gdzie je wstawisz) */}
          <div 
            className="prose prose-stone max-w-none 
                       leading-relaxed
                       text-stone-700
                       prose-img:mx-auto 
                       prose-img:block 
                       prose-img:mb-8 
                       prose-img:rounded-2xl 
                       prose-img:bg-stone-50 
                       prose-img:border 
                       prose-img:border-stone-100 
                       prose-img:shadow-inner 
                       prose-img:p-4
                       prose-p:mb-6 
                       prose-p:leading-relaxed
                       prose-headings:font-playfair 
                       prose-headings:text-stone-900 
                       prose-headings:mt-8 
                       prose-headings:mb-4
                       prose-a:text-amber-700 
                       hover:prose-a:text-amber-800"
            dangerouslySetInnerHTML={{ __html: honey.contentHtml }} 
          />
          
        </article>
      </div>
    </main>
  );
}