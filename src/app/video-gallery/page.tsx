import { PageShell } from "@/components/page-shell";

const videos = [
  { id: "bVNFvBY76jw", title: "Fit Rahe India — Episode 14" },
  { id: "_Zl27GyenNw", title: "Fit Rahe India — Episode 11" },
  { id: "pzCgMuYO6XY", title: "Fit Rahe India — Episode 9" },
  { id: "DG3khVWaNDQ", title: "Fit Rahe India — Episode 15" },
  { id: "3TNqoVEjjTw", title: "Fit Rahe India — Episode 10" },
  { id: "gUF4Wd40TkE", title: "Fit Rahe India — Episode 12" },
];

export default function VideoGalleryPage() {
  return (
    <PageShell
      eyebrow="Media"
      title="Video Gallery"
      lead="Appearances on Fit Rahe India, talking nutrition, weight management, and healthy living."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {videos.map((v) => (
          <div key={v.id} className="overflow-hidden rounded-2xl border border-line bg-surface-2">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="px-4 py-3 text-sm font-medium text-ink-soft">{v.title}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
