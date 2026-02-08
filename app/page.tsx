import Link from "next/link";
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

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          최근 글
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Notion에서 관리하는 블로그입니다.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-1">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-400">
            아직 등록된 글이 없습니다. Notion Database에 Public 글을 추가해 보세요.
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

      {allPosts.length > 5 && (
        <div className="mt-10 text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            전체 보기 ({allPosts.length}개)
          </Link>
        </div>
      )}
    </div>
  );
}
