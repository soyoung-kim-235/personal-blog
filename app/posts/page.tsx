import { getPosts, getCategories } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "전체 글",
  description: "블로그에 올린 모든 글 목록",
};

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        전체 글
      </h1>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        총 {posts.length}개의 글
      </p>

      <div className="mt-6">
        <CategoryFilter categories={categories} currentCategory={null} />
      </div>

      <section className="mt-8 grid gap-6 sm:grid-cols-1">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-400">
            아직 등록된 글이 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description ?? ""}
              date={post.date}
              category={post.category}
              slug={post.slug}
              tags={post.tags}
            />
          ))
        )}
      </section>
    </div>
  );
}
