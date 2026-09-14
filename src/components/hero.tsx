"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { getSiteContent } from "@/lib/site-config";
import { mediaSrc } from "@/lib/media";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const site = getSiteContent();

  return (
    <section className="relative overflow-hidden">
      {/* soft sunlight wash behind the hero only - fades to white fast, so
          the page still reads as "white background" at a glance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent-soft/70 to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-block rounded-full bg-sage-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-sage"
          >
            {site.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl"
          >
            Evidence, not <em className="text-accent-ink">guesswork.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-soft"
          >
            {site.heroLead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#book"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              Book a consultation
            </a>
            <a
              href="#ask"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              Ask a question
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-12 grid grid-cols-2 gap-y-5 gap-x-8 border-t border-line pt-6 sm:grid-cols-4"
          >
            {site.credentials.map((c) => (
              <div key={c.label}>
                <dt className="font-mono text-xl font-semibold text-accent-ink">
                  {c.value}
                </dt>
                <dd className="mt-1 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
                  {c.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-sage-soft"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface-2 shadow-[0_10px_28px_rgba(23,37,31,0.08)]">
            <Image
              src={mediaSrc("headshot")}
              alt={site.brandName}
              fill
              sizes="(min-width: 768px) 384px, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
