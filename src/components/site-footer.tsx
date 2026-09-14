import { getSiteContent } from "@/lib/site-config";
import { isPitchMode } from "@/lib/site-mode";

export function SiteFooter() {
  const site = getSiteContent();
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <span className="font-display text-lg text-ink">{site.brandName}</span>
          <p className="mt-2 max-w-xs text-sm text-ink-faint">{site.tagline}</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-ink-soft">
          <span className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-faint">Explore</span>
          <a href="#services" className="hover:text-ink">Services</a>
          <a href="#about" className="hover:text-ink">About</a>
          <a href="#ask" className="hover:text-ink">Ask AI</a>
          <a href="#calculator" className="hover:text-ink">BMI check</a>
          <a href="#book" className="hover:text-ink">Book a consultation</a>
        </nav>

        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <span className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-faint">Contact</span>
          <span>{site.address}</span>
          <span>{site.phoneDisplay}</span>
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
