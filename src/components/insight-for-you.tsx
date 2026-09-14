import { ScrollReveal } from "./scroll-reveal";

// Mirrors the reference site's video-insight strip — short clips on specific
// nutrition topics, each pointing at a real "Fit Rahe India" TV appearance
// (see /video-gallery for the full set with real episode titles).
const clips = [
  {
    id: "bVNFvBY76jw",
    title: "Fit Rahe India — Episode 14",
    note: "Protein sources for muscle gain, vegetarian and non-vegetarian both.",
  },
  {
    id: "_Zl27GyenNw",
    title: "Fit Rahe India — Episode 11",
    note: "What to eat before and after a gym session, and why timing matters.",
  },
  {
    id: "pzCgMuYO6XY",
    title: "Fit Rahe India — Episode 9",
    note: "Building a diet around strength training and muscle recovery.",
  },
  {
    id: "DG3khVWaNDQ",
    title: "Fit Rahe India — Episode 15",
    note: "Pre- and post-workout nutrition for people training regularly.",
  },
  {
    id: "3TNqoVEjjTw",
    title: "Fit Rahe India — Episode 10",
    note: "Eating on a working schedule — why skipping meals backfires.",
  },
  {
    id: "gUF4Wd40TkE",
    title: "Fit Rahe India — Episode 12",
    note: "Core health and a flatter stomach — the role of salt and water intake.",
  },
];

export function InsightForYou() {
  return (
    <section id="insight" className="scroll-mt-24 border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Insight for you</span>
          <h2 className="mt-3 max-w-xl font-display font-semibold text-3xl md:text-4xl">
            Short, specific answers — not generic diet advice.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip, i) => (
            <ScrollReveal key={clip.id} delay={Math.min(i * 0.06, 0.3)}>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${clip.id}`}
                    title={clip.title}
                    loading="lazy"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-ink-soft">{clip.note}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
