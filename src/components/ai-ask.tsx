"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

type Faq = { q: string; a: string; keywords: string[] };

// Scripted FAQ matcher — intentionally dependency-free for the MVP so it
// never touches Core Web Vitals. This is the same shape a real AI chat
// widget would use once wired to a hosted model post-signing; the UI and
// UX are identical either way, only the answer-generation swaps out.
const FAQS: Faq[] = [
  {
    q: "Do you help with PCOS?",
    a: "Yes — PCOS plans focus on insulin resistance and hormonal markers, usually coordinated with your gynaecologist.",
    keywords: ["pcos", "hormone", "hormonal"],
  },
  {
    q: "How does the first session work?",
    a: "The first session reviews your history and recent labs, then sets a plan you can actually follow — usually 45–60 minutes.",
    keywords: ["first", "session", "consultation", "start", "begin"],
  },
  {
    q: "Do you offer diabetes-friendly plans?",
    a: "Yes — structured meal plans for Type 2 diabetes and prediabetes, aimed at stable blood sugar without extreme restriction.",
    keywords: ["diabetes", "sugar", "glucose", "diabetic"],
  },
  {
    q: "Can I book on WhatsApp?",
    a: "Yes — use the WhatsApp button below to message directly and get a same-day slot confirmation.",
    keywords: ["whatsapp", "book", "appointment", "slot"],
  },
];

const FALLBACK =
  "Good question — that's best answered directly. Tap \"Book a consultation\" and ask there, or message on WhatsApp for a quick reply.";

export function AiAsk() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function ask(text: string) {
    const lower = text.toLowerCase();
    const match = FAQS.find((f) => f.keywords.some((k) => lower.includes(k)));
    setAnswer(match ? match.a : FALLBACK);
  }

  return (
    <section id="ask" className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">AI front desk</span>
          <h2 className="mt-3 font-display font-semibold text-3xl md:text-4xl">Ask a question, get an answer now.</h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Patients get an instant answer instead of waiting for a callback — and every unanswered
            question routes straight to WhatsApp.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8">
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {FAQS.map((f) => (
                <button
                  key={f.q}
                  type="button"
                  onClick={() => ask(f.q)}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
                >
                  {f.q}
                </button>
              ))}
            </div>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) ask(query);
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a question about diet, PCOS, diabetes…"
                className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-ink focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                Ask
              </button>
            </form>

            <div className="mt-4 min-h-[3.25rem] rounded-xl bg-sage-soft px-4 py-3 text-sm text-ink" aria-live="polite">
              {answer ?? "Try a question above, or type your own."}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
