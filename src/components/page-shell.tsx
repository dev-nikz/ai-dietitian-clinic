import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <span className="font-mono text-xs uppercase tracking-wide text-sage">{eyebrow}</span>
            <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl">{title}</h1>
            {lead && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">{lead}</p>}
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">{children}</section>
      </main>
      <SiteFooter />
    </>
  );
}
