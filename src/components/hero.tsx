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
              className="object-cover object-[68%_38%]"
            />
          </div>
          {/* Desktop: solid on the right where the portrait sits, fading into
              the photo on the left so the text column reads straight
              against it. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden bg-gradient-to-l from-bg from-35% via-bg/90 via-55% to-bg/10 md:block"
          />
          {/* Mobile/tablet: the grid stacks eyebrow+headline, then the
              portrait, then the rest of the copy — solid behind both text
              blocks, lighter behind the (self-framed) portrait in between. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/55 to-bg md:hidden"
          />
        </>
      ) : (
        // Portfolio mode: no real photo, keep the original soft sunlight wash.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent-soft/70 to-transparent"
        />
      )}

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        {/* Text column. On mobile this wrapper collapses (display:contents)
            so its two sub-blocks become direct grid items and can be
            ordered around the portrait; on desktop it's a normal column
            again and its children just flow top-to-bottom, unchanged. */}
        <div className="contents md:order-1 md:block">
          {/* Eyebrow + headline: on mobile these sit in their own block
              above the portrait (order-1); on desktop this wrapper also
              collapses, so they flow inline with the rest of the column. */}
          <div className="order-1 md:contents">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-sage shadow-[0_2px_10px_rgba(23,37,31,0.14)] ring-1 ring-sage/25"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
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
          </div>

          {/* Body copy, CTAs, credentials: on mobile these sit below the
              portrait (order-3); on desktop this wrapper collapses too. */}
          <div className="order-3 md:contents">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="max-w-md text-[15.5px] leading-relaxed text-ink-soft md:mt-5"
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
        </div>

        {/* Dr. Neha's portrait — full-size framed card, same treatment as
            production. Sits between the eyebrow/headline and the rest of
            the copy on mobile (order-2); right column on desktop
            (md:order-2, unchanged). */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="order-2 relative mx-auto aspect-[4/5] w-full max-w-sm md:order-2"
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
