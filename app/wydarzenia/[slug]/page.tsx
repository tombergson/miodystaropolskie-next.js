import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-6 bg-stone-50">
      <article className="mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
        <Link 
          href="/wydarzenia"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do listy wydarzeń
        </Link>

        <div className="text-xs font-mono text-amber-700 mb-2">
          {post.date}
        </div>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-6">
          {post.title}
        </h1>

        {post.images && post.images.length > 0 && (
          <div className="relative h-72 md:h-96 w-full mb-8 rounded-2xl overflow-hidden shadow-sm">
            <Image  
              src={post.images[0]} 
              alt={post.title} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}