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
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-200/80 transition-all hover:shadow-md"
            >
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}