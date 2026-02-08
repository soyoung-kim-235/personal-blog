"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  currentCategory?: string | null;
}

export default function CategoryFilter({
  categories,
  currentCategory = null,
}: CategoryFilterProps) {
  const pathname = usePathname();

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/posts"
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          !currentCategory
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        전체
      </Link>
      {categories.map((c) => {
        const isActive =
          currentCategory?.toLowerCase() === c.toLowerCase();
        return (
          <Link
            key={c}
            href={`/category/${encodeURIComponent(c)}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            {c}
          </Link>
        );
      })}
    </div>
  );
}
