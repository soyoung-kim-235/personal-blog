"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FloatingSidebarProps {
  slug: string;
  title: string;
}

export default function FloatingSidebar({ slug, title }: FloatingSidebarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("URL이 복사되었습니다!");
    }
  };

  return (
    <div className="fixed left-[calc(50%-480px)] top-40 hidden flex-col items-center gap-4 xl:flex">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all hover:border-orange-600 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-900"
        title="맨 위로"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      
      <button
        onClick={handleShare}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all hover:border-orange-600 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-900"
        title="공유하기"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      <div className="h-10 w-px bg-neutral-200 dark:bg-neutral-800" />

      <Link
        href="/posts"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all hover:border-orange-600 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-900"
        title="목록으로"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Link>
    </div>
  );
}
