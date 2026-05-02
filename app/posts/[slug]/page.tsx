import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostBySlug,
  getPostBlocks,
  getPosts,
} from "@/lib/notion";
import { formatDate } from "@/lib/utils";
import NotionRenderer from "@/components/NotionRenderer";
import Comments from "@/components/Comments";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import PasswordGate from "@/components/PasswordGate";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "글을 찾을 수 없음" };
  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
    },
  };
}

import FloatingSidebar from "@/components/FloatingSidebar";
import Image from "next/image";

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Get all posts for bottom navigation (Prev/Next)
  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Password Protection
  if (post.password) {
    const cookieStore = await cookies();
    const hasAccess = cookieStore.get(`post-access-${slug}`)?.value === "true";

    if (!hasAccess) {
      return (
        <article className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/posts"
            className="text-sm font-bold text-neutral-400 hover:text-orange-600 transition-colors"
          >
            ← BACK TO LIST
          </Link>
          <PasswordGate slug={slug} title={post.title} />
        </article>
      );
    }
  }

  const blocks = await getPostBlocks(post.id);

  return (
    <div className="relative pb-32">
      <FloatingSidebar slug={slug} title={post.title} />
      
      {/* Editorial Hero Header */}
      <header className="relative mb-20 flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-brand-accent px-6 py-20 text-center">
        {post.cover && (
          <>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover opacity-40 transition-opacity duration-1000"
              priority
            />
          </>
        )}
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {post.category.map((c) => (
              <span
                key={c}
                className="rounded-full border border-brand-accent/20 bg-brand-bg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-accent"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.2] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-brand-soft/50" />
            <span className="text-brand-soft">SOYOUNG KIM</span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[720px] px-6">
        {post.description && (
          <section className="mb-20 border-y border-brand-border py-12">
            <h2 className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Insight Summary
            </h2>
            <p className="text-center text-xl font-medium leading-relaxed text-brand-text/80">
              {post.description}
            </p>
          </section>
        )}

        <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-accent prose-img:rounded-lg dark:prose-invert">
          {blocks.length > 0 ? (
            <NotionRenderer blocks={blocks} />
          ) : (
            <p className="rounded-lg border border-brand-border bg-brand-bg-sec py-16 text-center text-lg font-medium text-brand-text-sec">
              본문이 비어 있습니다.
            </p>
          )}
        </div>

        <footer className="mt-24 border-t border-brand-border pt-12">
          <Comments />
        </footer>
      </article>

      {/* Sticky Bottom Nav */}
      {(prevPost || nextPost) && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-border bg-brand-bg/90 py-5 backdrop-blur-xl transition-transform">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group flex flex-col items-start gap-1 max-w-[45%]"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">PREV</span>
                <span className="line-clamp-1 text-sm font-bold text-brand-text transition-colors group-hover:text-brand-accent">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            <div className="hidden h-8 w-px bg-brand-border sm:block" />

            {nextPost ? (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group flex flex-col items-end gap-1 text-right max-w-[45%]"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">NEXT</span>
                <span className="line-clamp-1 text-sm font-bold text-brand-text transition-colors group-hover:text-brand-accent">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </nav>
      )}
    </div>
  );
}
