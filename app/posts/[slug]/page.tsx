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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const blocks = await getPostBlocks(post.id);

  return (
    <article>
      <header className="mb-8">
        <Link
          href="/posts"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
        >
          ← 전체 글
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
          {post.title}
        </h1>
        {post.date && (
          <time
            dateTime={post.date}
            className="mt-2 block text-sm text-neutral-500 dark:text-neutral-400"
          >
            {formatDate(post.date)}
          </time>
        )}
        {(post.category.length > 0 || post.tags.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.category.map((c) => (
              <Link
                key={c}
                href={`/category/${encodeURIComponent(c)}`}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
              >
                {c}
              </Link>
            ))}
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {blocks.length > 0 ? (
          <NotionRenderer blocks={blocks} />
        ) : (
          <p className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-8 text-center text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-400">
            본문이 비어 있습니다. Notion에서 이 글 페이지를 열고, 컬럼이 아닌 <strong>페이지 안</strong>에 내용을 작성해 주세요.
          </p>
        )}
      </div>
      <Comments />
    </article>
  );
}
