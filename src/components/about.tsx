import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { getSiteContent } from "@/lib/site-config";
import { mediaSrc } from "@/lib/media";

export function About() {
  const site = getSiteContent();
  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_0.8fr_0.9fr] md:py-24">
        <ScrollReveal className="md:col-span-2 md:col-start-1 md:row-start-1">
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Why the credentials matter</span>
          <h2 className="mt-3 font-display font-semibold text-3xl md:text-4xl">Evidence-based, not opinion-based.</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            {site.aboutBio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="md:col-start-3 md:row-span-2 md:row-start-1">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border border-line bg-surface-2">
            <Image
              src={mediaSrc("aboutPhoto")}
              alt={site.brandName}
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.14} className="md:col-span-2 md:col-start-1 md:row-start-2">
          <ul className="grid gap-3 rounded-2xl border border-line bg-surface-2 p-6 sm:grid-cols-2">
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
