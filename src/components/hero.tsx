"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { getSiteContent } from "@/lib/site-config";
import { mediaSrc } from "@/lib/media";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const site = getSiteContent();
  const heroBgSrc = mediaSrc("heroBackground");

  return (
    <section className="relative overflow-hidden">
      {heroBgSrc ? (
        <>
          {/* Real clinic-interior photo as a full-bleed background, scrimmed
              so the text column stays legible on every breakpoint. */}
          <div className="absolute inset-0 -z-20">
            <Image
              src={heroBgSrc}
              alt={`Inside ${site.brandName}`}
              fill
              sizes="100vw"
              priority
              className="object-cover object-[32%_38%]"
            />
          </div>
          {/* Desktop: solid on the left where the text sits, fading into the
              photo on the right. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-bg from-35% via-bg/90 via-55% to-bg/10 md:block"
          />
          {/* Mobile/tablet: the grid stacks, so scrim top-to-bottom instead. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/92 via-45% to-bg/40 md:hidden"
          />
          {/* Dr. Neha's portrait, floating on top of the background photo —
              same framed-card treatment the site used before the photo
              background was added. Hidden on the smallest phones so it
              doesn't crowd the CTAs; visible from sm: up. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="absolute bottom-6 right-6 z-10 hidden aspect-[4/5] w-32 sm:block sm:w-40 md:bottom-12 md:right-12 md:w-56"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-bg bg-surface-2 shadow-[0_10px_28px_rgba(23,37,31,0.18)]">
              <Image
                src={mediaSrc("headshot")}
                alt={site.brandName}
                fill
                sizes="(min-width: 768px) 224px, 128px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </>
      ) : (
        // Portfolio mode: no real photo, keep the original soft sunlight wash.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent-soft/70 to-transparent"
        />
      )}

      <div
        className={`relative mx-auto max-w-6xl gap-12 px-6 py-20 md:py-28 ${
          heroBgSrc ? "" : "grid md:grid-cols-2 md:items-center"
        }`}
      >
        <div className={heroBgSrc ? "max-w-xl" : ""}>
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
            className="mt-5 font-display font-bold text-5xl leading-[1.05] md:text-6xl"
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

        {!heroBgSrc && (
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
        )}
      </div>
    </section>
  );
}
