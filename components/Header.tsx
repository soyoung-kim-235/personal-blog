"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/posts", label: "전체 글" },
  { href: "/portfolio", label: "포트폴리오" },
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex gap-6">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
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
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full border-b border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {categories.length > 0 && (
                <div className="pt-4">
                  <span className="mb-2 block text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    카테고리
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 8).map((c) => (
                      <Link
                        key={c}
                        href={`/category/${encodeURIComponent(c)}`}
                        className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                        onClick={() => setMenuOpen(false)}
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
