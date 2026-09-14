"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { getSiteContent, services } from "@/lib/site-config";

export function Enroll() {
  const site = getSiteContent();
  const hasWhatsapp = site.whatsappNumber.length > 0;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState(services[0]?.title ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasWhatsapp) return;
    const message = [
      `Hi ${site.brandName}, I'd like to enroll.`,
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      goal && `Interested in: ${goal}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="enroll" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <span className="font-mono text-xs uppercase tracking-wide text-sage">Get started</span>
          <h2 className="mt-3 font-display font-semibold text-3xl md:text-4xl">Enroll in a few seconds.</h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Tell us a bit about your goal and we&apos;ll pick it up straight on WhatsApp — no forms, no waiting for a callback.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-line bg-surface-2 p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1.5 block font-medium text-ink-soft">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-ink focus:outline-none"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1.5 block font-medium text-ink-soft">Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 …"
                  className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-ink focus:outline-none"
                />
              </label>
            </div>
            <label className="text-sm">
              <span className="mb-1.5 block font-medium text-ink-soft">What are you looking for?</span>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent-ink focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            {hasWhatsapp ? (
              <button
                type="submit"
                className="mt-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                Continue on WhatsApp
              </button>
            ) : (
              <span className="mt-1 rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-ink-faint">
                Enroll — connects to WhatsApp in pitch demo
              </span>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
