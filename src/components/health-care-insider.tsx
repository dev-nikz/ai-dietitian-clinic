import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { getSiteContent } from "@/lib/site-config";

// Mirrors the reference site's "Health Care Insider" testimonial strip in
// position and intent, but deliberately without the real names, photos and
// personal health figures that section carries there — that's other
// people's private data, not ours to redistribute on a demo site. See
// /patient-stories for the same call. Until real patients opt in, this
// shows the practice's own aggregate numbers instead.
export function HealthCareInsider() {
  const site = getSiteContent();
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Health care insider</span>
          <h2 className="mt-3 max-w-xl font-display font-semibold text-3xl md:text-4xl">
            Happy patients, healthy results.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            The real clinic&apos;s website features named patient stories with personal weight-loss figures. We&apos;re
            leaving those out here — that&apos;s each patient&apos;s private health data, not ours to publish without
            their consent. Here&apos;s what we can show instead.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.credentials.map((c) => (
              <div key={c.label} className="rounded-2xl border border-line bg-surface-2 p-6 text-center">
                <dt className="sr-only">{c.label}</dt>
                <dd className="font-display font-semibold text-3xl text-accent-ink">{c.value}</dd>
                <p className="mt-1.5 text-xs uppercase tracking-wide text-ink-soft">{c.label}</p>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <Link
            href="/patient-stories"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline"
          >
            Read our patient-story policy
            <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
