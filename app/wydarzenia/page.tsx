import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen py-20 px-6 bg-stone-50">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do strony głównej
        </Link>

        <h1 className="font-playfair text-4xl font-bold text-stone-900 mb-4">
          Wydarzenia z Pasieki
        </h1>
        <p className="text-stone-600 mb-12">
          Śledź nasze codzienne prace, dowiedz się, co słychać u pszczół i sprawdź nowości.
        </p>

        <div className="space-y-8">
          {posts.map((post) => {
            const thumbnail = post.images?.[0];

            return (
              <article
                key={post.slug}
                className="group flex flex-col gap-6 md:flex-row bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-200/80 transition-all hover:shadow-md"
              >
                {thumbnail && (
                  <Link
                    href={`/wydarzenia/${post.slug}`}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 md:w-56"
                  >
                    <Image
                      src={thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 224px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}

                <div className="flex-1">
                  <div className="text-xs font-mono text-amber-700 mb-2">
                    {post.date}
                  </div>
                  <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-3">
                    <Link href={`/wydarzenia/${post.slug}`} className="hover:text-amber-700 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/wydarzenia/${post.slug}`}
                    className="inline-block text-sm font-medium text-amber-700 hover:text-amber-800"
                  >
                    Czytaj dalej &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}