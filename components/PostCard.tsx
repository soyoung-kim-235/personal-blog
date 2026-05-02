import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostCardProps } from "@/lib/types";

import Image from "next/image";

export default function PostCard({
  title,
  description,
  date,
  category,
  slug,
  cover,
}: PostCardProps) {
  return (
    <article className="group relative border-b border-brand-border pb-12 last:border-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 order-2 md:order-1">
          <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
            <span className="text-brand-accent">{category[0]}</span>
            <span className="h-1 w-1 rounded-full bg-brand-border" />
            <span className="text-brand-text-sec">{formatDate(date)}</span>
          </div>
          
          <Link href={`/posts/${slug}`} className="block group">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-brand-text transition-colors group-hover:text-brand-accent md:text-3xl">
              {title}
            </h2>
            <p className="mt-4 line-clamp-2 text-lg leading-relaxed text-brand-text-sec/70">
              {description}
            </p>
          </Link>
        </div>

        {cover && (
          <Link href={`/posts/${slug}`} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-brand-bg-sec order-1 md:order-2 md:w-48 md:shrink-0 lg:w-56">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
