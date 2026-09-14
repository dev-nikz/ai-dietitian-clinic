import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { GlowCard } from "./ui/spotlight-card";
import { services } from "@/lib/site-config";
import { serviceImageSrc } from "@/lib/media";

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
          {services.map((service, i) => {
            const image = serviceImageSrc(service.slug);
            return (
              <ScrollReveal key={service.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <GlowCard
                    glowColor="red"
                    customSize
                    className="h-full !p-3 bg-gradient-to-br from-surface to-accent-soft/40 group-hover:shadow-[0_16px_32px_rgba(23,37,31,0.1)]"
                  >
                    <div>
                      {image && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                          <Image
                            src={image}
                            alt={service.title}
                            fill
                            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="mt-4 font-display font-semibold text-xl">{service.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{service.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </span>
                  </GlowCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
