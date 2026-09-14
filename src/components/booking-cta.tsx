import { ScrollReveal } from "./scroll-reveal";
import { getSiteContent } from "@/lib/site-config";

export function BookingCta() {
  const site = getSiteContent();
  const hasWhatsapp = site.whatsappNumber.length > 0;
  const whatsappHref = hasWhatsapp
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
        `Hi ${site.brandName}, I'd like to book a consultation.`
      )}`
    : undefined;

  return (
    <section id="book" className="border-t border-line bg-ink text-bg">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-accent">Book a consultation</span>
          <h2 className="mt-3 max-w-xl font-display font-semibold text-3xl md:text-4xl">
            Message on WhatsApp, get a slot the same day.
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bg/70">
            Both sides get an instant WhatsApp confirmation the moment a slot is booked — no phone tag,
            no waiting on hold.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-9 flex flex-wrap items-center gap-4">
          {hasWhatsapp ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Book on WhatsApp
            </a>
          ) : (
            <span className="rounded-full border border-bg/25 px-7 py-3.5 text-sm font-semibold text-bg/60">
              Book on WhatsApp — connects in pitch demo
            </span>
          )}

          <span className="rounded-full border border-bg/25 px-5 py-3 text-xs font-mono uppercase tracking-wide text-bg/60">
            {site.practoConnected ? "Also on Practo" : "Practo listing — coming soon"}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-8 flex flex-col gap-1 text-sm text-bg/60">
          <span>{site.address}</span>
          <span>{site.phoneDisplay}</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
