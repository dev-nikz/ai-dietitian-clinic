import { PageShell } from "@/components/page-shell";

export default function NewsPage() {
  return (
    <PageShell eyebrow="Press" title="Our News">
      <p className="rounded-2xl border border-line bg-surface-2 p-6 text-sm text-ink-soft">
        Press mentions and media coverage will appear here — this section connects once real coverage is
        available to publish.
      </p>
    </PageShell>
  );
}
