import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-bg-sec">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-12 sm:flex-row sm:items-center">
          <div className="space-y-4">
            <p className="text-xl font-bold tracking-tight text-brand-text">
              SOYOUNG <span className="text-brand-accent">KIM</span>
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-sec/60">
              © {year} ALL RIGHTS RESERVED.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-12 gap-y-6">
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-widest text-brand-text-sec transition-colors hover:text-brand-accent"
            >
              HOME
            </Link>
            <Link
              href="/posts"
              className="text-[10px] font-black uppercase tracking-widest text-brand-text-sec transition-colors hover:text-brand-accent"
            >
              POSTS
            </Link>
            <Link
              href="/portfolio"
              className="text-[10px] font-black uppercase tracking-widest text-brand-text-sec transition-colors hover:text-brand-accent"
            >
              PORTFOLIO
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
