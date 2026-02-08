import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostCardProps } from "@/lib/types";

export default function PostCard({
  title,
  description,
  date,
  category,
  slug,
  tags = [],
}: PostCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h2>
        {date && (
          <time
            dateTime={date}
            className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400"
          >
            {formatDate(date)}
          </time>
        )}
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
        )}
      </Link>
      <div className="mt-3 flex flex-wrap gap-2">
        {category.map((c) => (
          <Link
            key={c}
            href={`/category/${encodeURIComponent(c)}`}
            className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
          >
            {c}
          </Link>
        ))}
        {tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-md bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
