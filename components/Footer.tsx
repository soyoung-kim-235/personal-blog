import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {year} 블로그. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              홈
            </Link>
            <Link
              href="/posts"
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              전체 글
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
