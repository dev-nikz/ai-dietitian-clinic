import { ScrollReveal } from "./scroll-reveal";
import { getSiteContent } from "@/lib/site-config";

export function About() {
  const site = getSiteContent();
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Why the credentials matter</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Evidence-based, not opinion-based.</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            {site.aboutBio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ul className="grid gap-3 rounded-2xl border border-line bg-surface-2 p-6">
            {site.aboutHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
