import { ScrollReveal } from "./scroll-reveal";
import { services } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">What we treat</span>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">
            Nutrition plans built for a specific condition, not a generic goal.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-xl">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
