import { PageShell } from "@/components/page-shell";

const publications = [
  {
    title:
      "Peripheral bone mineral density and its predictors in healthy school girls from two different socioeconomic groups in Delhi",
    journal: "Osteoporosis International",
    year: "2007",
    detail: "18: 375–383",
  },
  {
    title:
      "Vitamin D status of apparently healthy schoolgirls from two different socioeconomic strata in Delhi: relation to nutrition and lifestyle",
    journal: "British Journal of Nutrition",
    year: "2008",
    detail: "99: 876–882",
  },
  {
    title: "Impact of two regimens of vitamin D supplementation on Calcium–Vitamin D–PTH axis of school girls of Delhi",
    journal: "Indian Pediatrics",
    year: "2009",
    detail: "E-published December 15",
  },
  {
    title:
      "Vitamin D status in pregnant Indian women across trimesters and different seasons and its correlation with neonatal serum 25(OH)D levels",
    journal: "British Journal of Nutrition",
    year: "2011",
    detail: "17: 54–61",
  },
  {
    title: "Impact of physical activity and nutrition on bone mineral density in young healthy Indian females",
    journal: "Indian Journal of Medical Research",
    year: "2011",
    detail: "134: 307–311",
  },
];

export default function PublicationsPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Publications"
      lead="Peer-reviewed research on bone mineral density, Vitamin D status, and nutrition across the lifespan."
    >
      <ol className="space-y-6">
        {publications.map((pub, i) => (
          <li key={pub.title} className="rounded-2xl border border-line bg-surface-2 p-5">
            <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1.5 font-display font-semibold text-lg leading-snug">{pub.title}</p>
            <p className="mt-1.5 text-sm text-ink-soft">
              {pub.journal}, {pub.year} — {pub.detail}
            </p>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
