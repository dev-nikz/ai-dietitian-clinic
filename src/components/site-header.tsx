import Link from "next/link";
import { getSiteContent } from "@/lib/site-config";

export function SiteHeader() {
  const site = getSiteContent();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl">
          {site.brandName}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="#services" className="hover:text-ink">Services</a>
          <a href="#about" className="hover:text-ink">About</a>
          <a href="#ask" className="hover:text-ink">Ask AI</a>
        </nav>
        <a
          href="#book"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
        >
          Book a consultation
        </a>
      </div>
    </header>
  );
}
