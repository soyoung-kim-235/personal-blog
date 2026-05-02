import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

export default async function HomePage() {
  let allPosts: Awaited<ReturnType<typeof getPosts>> = [];
  let error: string | null = null;

  try {
    allPosts = await getPosts();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Notion 조회 실패";
    if (msg.includes("NOTION_API_KEY") || msg.includes("NOTION_DATABASE_ID")) {
      error = "env";
    } else {
      error = msg;
    }
  }

  const posts = allPosts.slice(0, 5);

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
          설정이 필요해요
        </h2>
        {error === "env" ? (
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-amber-700 dark:text-amber-300">
            <li>
              터미널에서 프로젝트 폴더로 이동한 뒤 <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">npm install</code> 실행
            </li>
            <li>
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">.env.local</code> 파일을 만들고 아래 두 줄 입력 (값은 본인 걸로 변경):
              <pre className="mt-2 overflow-x-auto rounded bg-neutral-100 p-3 text-left text-xs dark:bg-neutral-800">
                {`NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=3016e63cef5e80ea912fd9cf391bf333`}
              </pre>
            </li>
            <li>
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">npm run dev</code> 실행
            </li>
            <li>브라우저에서 http://localhost:3000 새로고침</li>
          </ol>
        ) : (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
            {error}
          </p>
        )}
      </div>
    );
  }

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Featured Hero Post */}
      {featuredPost && (
        <section className="mb-24">
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="group relative block aspect-[21/9] w-full overflow-hidden rounded-lg bg-brand-bg-sec"
          >
            {featuredPost.cover && (
              <>
                <Image
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
              </>
            )}
            <div className="absolute bottom-0 left-0 p-8 sm:p-12">
              <div className="mb-4 flex gap-3">
                {featuredPost.category.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-brand-accent px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-bg"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
                {featuredPost.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-brand-text-sec line-clamp-2">
                {featuredPost.description}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="mb-12 mt-20">
        <h2 className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
          Latest Insights
        </h2>
        <h3 className="text-3xl font-bold tracking-tight text-brand-text sm:text-4xl">
          새로운 생각들
        </h3>
      </section>

      <section className="flex flex-col gap-4">
        {gridPosts.length === 0 ? (
          <p className="rounded-2xl border border-brand-border bg-brand-bg-sec py-24 text-center text-lg font-medium text-brand-text-sec">
            아직 다른 글이 없습니다.
          </p>
        ) : (
          gridPosts.map((post) => (
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

      {allPosts.length > 5 && (
        <div className="mt-16 border-t border-brand-border pt-12 text-center">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-accent transition-all hover:gap-4"
          >
            VIEW ALL POSTS
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
