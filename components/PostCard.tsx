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
    <article className="group flex flex-col transition-all hover:-translate-y-1">
      <Link href={`/posts/${slug}`} className="relative aspect-[16/10] overflow-hidden rounded-lg bg-brand-warm/20">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl opacity-20">
            📄
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col py-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {category.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-soft px-3 py-1 text-[9px] font-black uppercase tracking-widest text-brand-accent"
            >
              {c}
            </span>
          ))}
        </div>
        
        <Link href={`/posts/${slug}`}>
          <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-tight tracking-tight text-brand-text transition-colors group-hover:text-brand-accent">
            {title}
          </h2>
        </Link>
        
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-brand-text-sec">
          {description}
        </p>
        
        <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text-sec/60">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>•</span>
          <span>Article</span>
        </div>
      </div>
    </article>
  );
}
