import Link from "next/link";
import { getSiteContent } from "@/lib/site-config";
import { isPitchMode } from "@/lib/site-mode";
import { InstagramIcon, WhatsappIcon, FacebookIcon } from "./icons";

export function SiteFooter() {
  const site = getSiteContent();
  const hasSocials = site.instagramUrl.length > 0 || site.whatsappNumber.length > 0 || site.facebookUrl.length > 0;

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display font-semibold text-lg text-ink">{site.brandName}</span>
          <p className="mt-2 max-w-xs text-sm text-ink-faint">{site.tagline}</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-ink-soft">
          <span className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-faint">Explore</span>
          <Link href="/#services" className="hover:text-ink">Services</Link>
          <Link href="/#about" className="hover:text-ink">About</Link>
          <Link href="/#ask" className="hover:text-ink">Ask AI</Link>
          <Link href="/#enroll" className="hover:text-ink">Enroll</Link>
          <Link href="/#book" className="hover:text-ink">Book a consultation</Link>
        </nav>

        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <span className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-faint">Contact</span>
          <span>{site.address}</span>
          <span>{site.phoneDisplay}</span>
          {site.email && <span>{site.email}</span>}
        </div>

        <div className="flex flex-col gap-3 text-sm text-ink-soft">
          <span className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-faint">Follow us, we&apos;re friendly</span>
          {hasSocials ? (
            <div className="flex items-center gap-3">
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
              )}
              {site.facebookUrl && (
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
                >
                  <FacebookIcon className="h-4.5 w-4.5" />
                </a>
              )}
              {site.whatsappNumber && (
                <a
                  href={`https://wa.me/${site.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
                >
                  <WhatsappIcon className="h-4.5 w-4.5" />
                </a>
              )}
            </div>
          ) : (
            <span className="text-ink-faint">Connects in pitch demo</span>
          )}
        </div>
      </div>

      <div className="border-t border-line px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</span>
          {!isPitchMode && (
            <span className="font-mono uppercase tracking-wide">
              Concept build — demo content, not a real clinic
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
