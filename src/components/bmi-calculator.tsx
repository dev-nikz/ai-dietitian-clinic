"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

type Result = { bmi: number; category: string; note: string };

function computeBmi(heightCm: number, weightKg: number): Result {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = "Normal range";
  let note = "Your numbers are in a healthy range — a maintenance plan can help you stay there.";
  if (bmi < 18.5) {
    category = "Underweight";
    note = "A structured plan can help you gain weight the healthy way, without empty calories.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    note = "A personalized plan usually shows results within the first few weeks.";
  } else if (bmi >= 30) {
    category = "Obese range";
    note = "A clinical plan — not a crash diet — is the safer and more durable path here.";
  }
  return { bmi: Math.round(bmi * 10) / 10, category, note };
}

export function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setResult(null);
      return;
    }
    setResult(computeBmi(h, w));
  }

  return (
    <section id="calculator" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Free tool</span>
          <h2 className="mt-3 font-display font-semibold text-3xl md:text-4xl">Check where you stand in 10 seconds.</h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            A quick BMI check — not a diagnosis, just a starting point before your first consultation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-2xl border border-line bg-surface-2 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6"
          >
            <label className="text-sm">
              <span className="mb-1.5 block font-medium text-ink-soft">Height (cm)</span>
              <input
                type="number"
                inputMode="decimal"
                min={80}
                max={230}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="165"
                className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-ink focus:outline-none"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1.5 block font-medium text-ink-soft">Weight (kg)</span>
              <input
                type="number"
                inputMode="decimal"
                min={30}
                max={250}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="68"
                className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-ink focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              Calculate
            </button>
          </form>

          <div className="mt-4 min-h-[4.5rem] rounded-xl bg-accent-soft px-5 py-4 text-sm text-ink" aria-live="polite">
            {result ? (
              <>
                <span className="font-mono text-base font-semibold text-accent-ink">
                  BMI {result.bmi} — {result.category}
                </span>
                <p className="mt-1 text-ink-soft">{result.note}</p>
              </>
            ) : (
              <span className="text-ink-faint">Enter your height and weight to see your result.</span>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
