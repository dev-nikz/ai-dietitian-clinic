import { PageShell } from "@/components/page-shell";

export default function OnlinePaymentPage() {
  return (
    <PageShell eyebrow="Payments" title="Online Payment">
      <p className="rounded-2xl border border-line bg-surface-2 p-6 text-sm text-ink-soft">
        Online payment connects here once a payment gateway is set up for the clinic — for now, consultations
        are settled directly.
      </p>
    </PageShell>
  );
}
