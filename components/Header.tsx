"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";
import Search from "./Search";

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
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-brand-text"
        >
          <div className="h-6 w-6 rounded-lg bg-brand-accent transition-transform group-hover:rotate-12" />
          <span className="uppercase tracking-widest">SOYOUNG</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex gap-10">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-bold uppercase tracking-widest text-brand-text-sec transition-colors hover:text-brand-accent"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="h-4 w-px bg-brand-border" />
          <Search />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Search />
          <ThemeToggle />
          <button
            type="button"
            aria-label="메뉴 열기"
            className="rounded-xl p-2 text-brand-text-sec hover:bg-brand-bg-sec"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full border-b border-brand-border bg-brand-bg p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 md:hidden">
            <div className="flex flex-col space-y-6">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-bold uppercase tracking-widest text-brand-text-sec hover:text-brand-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
