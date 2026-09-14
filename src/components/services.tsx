import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { services } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">What we treat</span>
          <h2 className="mt-3 max-w-xl font-display font-semibold text-3xl md:text-4xl">
            Nutrition plans built for a specific condition, not a generic goal.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={Math.min(i * 0.06, 0.3)}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full rounded-2xl border border-line bg-gradient-to-br from-surface to-accent-soft/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-ink/40 hover:shadow-[0_16px_32px_rgba(23,37,31,0.1)]"
              >
                <h3 className="font-display font-semibold text-xl">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
