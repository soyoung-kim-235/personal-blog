import { getPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const allPosts = await getPosts();
  
  const filteredPosts = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.category.some((c) => c.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-16">
        <h2 className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
          Search Results
        </h2>
        <h1 className="text-4xl font-bold tracking-tight text-brand-text sm:text-5xl">
          {query ? (
            <>
              Results for <span className="text-brand-accent">"{query}"</span>
            </>
          ) : (
            "What are you looking for?"
          )}
        </h1>
        <p className="mt-4 text-brand-text-sec">
          {query
            ? `총 ${filteredPosts.length}개의 결과를 찾았습니다.`
            : "검색어를 입력하여 원하는 글을 찾아보세요."}
        </p>
      </section>

      {query && (
        <section className="grid gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-brand-border bg-brand-bg-sec py-24 text-center">
              <p className="text-lg font-medium text-brand-text-sec">
                검색 결과가 없습니다. 다른 검색어를 입력해 보세요.
              </p>
              <Link
                href="/posts"
                className="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-brand-accent hover:underline"
              >
                전체 글 보러가기 →
              </Link>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description ?? ""}
                date={post.date}
                category={post.category}
                slug={post.slug}
                cover={post.cover}
              />
            ))
          )}
        </section>
      )}
    </div>
  );
}
