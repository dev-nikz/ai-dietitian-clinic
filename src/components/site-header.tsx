"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-config";
import { mediaSrc } from "@/lib/media";

// Primary items: visible in the desktop bar and at the top of the mobile menu.
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#ask", label: "Ask AI" },
  { href: "/#enroll", label: "Enroll" },
];

// Secondary items: mirrors the reference site's own burger menu, which
// carries these as mobile-only entries too. Kept out of the compact
// desktop bar to match that same structure.
const MORE_LINKS = [
  { href: "/patient-stories", label: "Patient Stories" },
  { href: "/photo-gallery", label: "Photo Gallery" },
  { href: "/video-gallery", label: "Video Gallery" },
  { href: "/news", label: "Our News" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact Us" },
  { href: "/online-payment", label: "Online Payment" },
];

export function SiteHeader() {
  const site = getSiteContent();
  const logoSrc = mediaSrc("logo");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {logoSrc ? (
            <Image src={logoSrc} alt={site.brandName} width={112} height={64} className="h-10 w-auto object-contain" priority />
          ) : (
            <span className="font-display font-semibold text-xl text-bg">{site.brandName}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wide text-bg/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-bg">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#book"
          className="hidden rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Book a consultation
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-bg md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-56px)] overflow-y-auto border-t border-bg/10 bg-ink px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wide text-bg/80">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 hover:bg-bg/10 hover:text-bg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-bg/10 pt-3">
            <nav className="flex flex-col gap-1 text-sm font-semibold uppercase tracking-wide text-bg/60">
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 hover:bg-bg/10 hover:text-bg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/#book"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-accent px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white"
          >
            Book a consultation
          </Link>
        </div>
      )}
    </header>
  );
}
