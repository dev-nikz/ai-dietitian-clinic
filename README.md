# AI Dietitian Clinic — MVP

A motion-forward, AI-integrated marketing site concept for an independent
dietitian/nutrition practice. Built as a portfolio MVP: the goal is a site
that visibly out-designs the current crop of India-based dietitian websites
(mostly dated WordPress templates with carousel sliders) while staying fast
enough that the animation never costs Core Web Vitals.

This project is a generic concept build — no real client name, branding, or
patient data is used anywhere in the code, content, or commit history.

## Stack

- **Next.js 15** (App Router, TypeScript, src/ layout)
- **Tailwind CSS v4** for styling
- **Motion** (`motion/react`, formerly Framer Motion) for scroll-triggered
  reveals and micro-interactions
- **GSAP + ScrollTrigger** for anything Motion can't do cleanly (pinned
  sections, staggered hero sequences)
- **Lenis** for smooth/inertia scroll
- **next/image** for automatic WebP/AVIF + lazy loading

## Design priorities (in order)

1. **Perceived visual quality** — the whole point of the rebuild is to look
   dramatically better than the competitive set it's benchmarked against.
2. **Performance discipline** — animate only `transform`/`opacity` (GPU-safe,
   never triggers layout), lazy-load GSAP/Lenis off the critical path, and
   respect `prefers-reduced-motion`. A beautiful site with a bad LCP/INP
   score defeats its own purpose (bounce rate).
3. **SEO / GEO readiness** — proper metadata, schema (Person/LocalBusiness/
   Service), and content structured for both classic search and AI-answer
   engines (ChatGPT, Perplexity, Google AI Overviews).

## Feature scope

| Feature | Status |
|---|---|
| Modern responsive layout, motion/scroll design | In progress |
| AI chat widget (scripted demo; swappable for a real backend) | Planned |
| Interactive diet/BMI-risk calculator (lead magnet) | Planned |
| WhatsApp booking deep link | Planned |
| WhatsApp auto-confirmation (both sides) | Requires a real business's Meta
  Business verification + BSP — not buildable in a generic demo |
| "Book on Practo" CTA | Visual only until connected to a real Practo Ray
  account |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.
