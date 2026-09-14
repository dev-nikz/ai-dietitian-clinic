import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Link href="/#services" className="text-sm font-medium text-ink-soft hover:text-accent-ink">
              ← All services
            </Link>
            <h1 className="mt-4 font-display font-bold text-4xl md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{service.detail.intro}</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <div className="space-y-10">
            {service.detail.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="font-display font-semibold text-xl">{sec.heading}</h2>
                {sec.body && <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{sec.body}</p>}
                {sec.bullets && (
                  <ul className="mt-2.5 space-y-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-surface-2 p-6">
            <p className="text-sm text-ink-soft">Ready to talk about {service.title.toLowerCase()}?</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/#enroll"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                Enroll now
              </Link>
              <Link
                href="/#book"
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
