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
    <div className="flex flex-wrap items-center gap-2 py-4">
      <Link
        href="/posts"
        className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
          !currentCategory
            ? "bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20"
            : "bg-brand-bg-sec text-brand-text-sec hover:bg-brand-warm/20"
        }`}
      >
        ALL
      </Link>
      {categories.map((c) => {
        const isActive =
          currentCategory?.toLowerCase() === c.toLowerCase();
        return (
          <Link
            key={c}
            href={`/category/${encodeURIComponent(c)}`}
            className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              isActive
                ? "bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20"
                : "bg-brand-bg-sec text-brand-text-sec hover:bg-brand-warm/20"
            }`}
          >
            {c}
          </Link>
        );
      })}
    </div>
  );
}
