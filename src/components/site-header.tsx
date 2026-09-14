"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { getSiteContent } from "@/lib/site-config";
import { mediaSrc } from "@/lib/media";

// Primary items: visible in the desktop bar and at the top of the mobile menu.
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#ask", label: "Ask AI" },
  { href: "/#enroll", label: "Enroll" },
];

// Secondary items: mirrors the reference site's own burger menu. Reachable
// from the burger icon on every breakpoint, not just mobile.
const MORE_LINKS = [
  { href: "/patient-stories", label: "Patient Stories" },
  { href: "/photo-gallery", label: "Photo Gallery" },
  { href: "/video-gallery", label: "Video Gallery" },
  { href: "/news", label: "Our News" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact Us" },
  { href: "/online-payment", label: "Online Payment" },
];

// Shared duration/easing so the icon morph and the panel it opens read as
// one motion, not two unrelated ones. Motion honors MotionConfig's
// reducedMotion="user" from the root layout automatically, so this respects
// prefers-reduced-motion for free — same as the rest of the site's animation.
const PANEL_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

export function SiteHeader() {
  const site = getSiteContent();
  const logoSrc = mediaSrc("logo");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
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

        <div className="flex items-center gap-2">
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-bg hover:bg-bg/10"
          >
            {/* Three-line hamburger that morphs into an X — each bar is its
                own element so it can rotate/translate/fade independently,
                instead of swapping two unrelated <path>s with a hard cut. */}
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                aria-hidden
                className={`h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden
                className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ease-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden
                className={`h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Desktop: burger opens a compact dropdown with the secondary links,
            since Services/About/Ask AI/Enroll + Book are already in the bar. */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="desktop-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={PANEL_TRANSITION}
              className="absolute right-6 top-full z-50 hidden w-64 origin-top-right overflow-hidden rounded-2xl border border-bg/10 bg-ink shadow-xl md:block"
            >
              <nav className="flex flex-col py-2 text-sm font-semibold uppercase tracking-wide text-bg/80">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 hover:bg-bg/10 hover:text-bg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: burger opens the full-screen stacked menu (primary + secondary + book). */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={PANEL_TRANSITION}
            className="overflow-hidden border-t border-bg/10 bg-ink md:hidden"
          >
            <div className="max-h-[calc(100vh-56px)] overflow-y-auto px-6 pb-6 pt-2">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
