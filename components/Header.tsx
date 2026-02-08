"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/posts", label: "전체 글" },
];

interface HeaderProps {
  categories?: string[];
  children?: ReactNode;
}

export default function Header({ categories = [] }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-neutral-900 dark:text-white"
        >
          블로그
        </Link>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="rounded p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav
          className={`absolute right-4 top-full mt-1 flex flex-col gap-1 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 md:static md:mt-0 md:flex-row md:gap-6 md:border-0 md:bg-transparent md:py-0 md:shadow-none ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:px-0 md:py-0 md:hover:bg-transparent"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {categories.length > 0 && (
            <div className="border-t border-neutral-200 px-4 pt-2 dark:border-neutral-700 md:border-t-0 md:px-0 md:pt-0">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 md:mr-2 md:inline">
                카테고리
              </span>
              <div className="mt-1 flex flex-wrap gap-1 md:mt-0 md:inline-flex">
                {categories.slice(0, 6).map((c) => (
                  <Link
                    key={c}
                    href={`/category/${encodeURIComponent(c)}`}
                    className="rounded bg-neutral-100 px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
