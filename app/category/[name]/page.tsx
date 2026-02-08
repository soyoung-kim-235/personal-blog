import { notFound } from "next/navigation";
import { getPostsByCategory, getCategories } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name).normalize("NFC");
  return {
    title: `카테고리: ${decoded}`,
    description: `"${decoded}" 카테고리 글 목록`,
  };
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((name) => ({ name: encodeURIComponent(name) }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name).normalize("NFC");
  const [posts, categories] = await Promise.all([
    getPostsByCategory(categoryName),
    getCategories(),
  ]);

  const categoryExists = categories.some(
    (c) => c.toLowerCase() === categoryName.toLowerCase()
  );
  if (!categoryExists && posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        카테고리: {categoryName}
      </h1>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        총 {posts.length}개의 글
      </p>

      <div className="mt-6">
        <CategoryFilter
          categories={categories}
          currentCategory={categoryName}
        />
      </div>

      <section className="mt-8 grid gap-6 sm:grid-cols-1">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-400">
            이 카테고리에 아직 글이 없습니다.
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
