import { notFound } from "next/navigation";
import { getHoneyBySlug, getAllHoneys } from "@/lib/honeys";
import Link from "next/link";
import Image from "next/image";

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
  const honey = getHoneyBySlug(slug);

  if (!honey) {
    notFound();
  }

  const imageSrc = honey.images && honey.images.length > 0
    ? honey.images[0]
    : "/images/placeholder.jpg";

  const cleanTitle = honey.title;

  // Usuwamy znaczniki <img ... /> z HTML, żeby uniknąć duplikacji zdjęć
  const sanitizedContentHtml = honey.contentHtml.replace(/<img[^>]*>/gi, "");

  return (
    <main className="min-h-screen py-20 px-6 bg-cream">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/#miody"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do oferty
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
          
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-8 text-center">
            {cleanTitle}
          </h1>

          {/* Elegancki, wyeksponowany obrazek u góry */}
          {imageSrc && (
            <div className="relative w-full h-80 md:h-96 mb-10 bg-stone-50 rounded-2xl p-6 flex items-center justify-center border border-stone-100 overflow-hidden shadow-inner">
              <Image
                src={imageSrc}
                alt={cleanTitle}
                width={300}
                height={380}
                style={{ height: "100%", width: "auto" }}
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          )}

          {/* Oczyszczona treść HTML z zachowanymi akapitami i interlinią */}
          <div 
            className="prose prose-stone max-w-none 
                       leading-relaxed
                       text-stone-700
                       prose-p:mb-6 prose-p:leading-relaxed
                       prose-headings:font-playfair prose-headings:text-stone-900 prose-headings:mt-8 prose-headings:mb-4
                       prose-a:text-amber-700 hover:prose-a:text-amber-800"
            dangerouslySetInnerHTML={{ __html: sanitizedContentHtml }} 
          />
          
        </article>
      </div>
    </main>
  );
}