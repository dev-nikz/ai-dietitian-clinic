import { PageShell } from "@/components/page-shell";

export default function PatientStoriesPage() {
  return (
    <PageShell eyebrow="Results" title="Patient Stories">
      <p className="rounded-2xl border border-line bg-surface-2 p-6 text-sm text-ink-soft">
        Real patient stories carry real names and personal health details, so this section is intentionally
        left empty in the demo — it goes live only with each patient&apos;s own consent to be featured.
      </p>
    </PageShell>
  );
}
