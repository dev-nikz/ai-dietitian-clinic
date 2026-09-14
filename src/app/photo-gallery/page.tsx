import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { mediaSrc } from "@/lib/media";
import { isPitchMode } from "@/lib/site-mode";
import { getSiteContent } from "@/lib/site-config";

export default function PhotoGalleryPage() {
  const site = getSiteContent();
  const photos = [
    { key: "headshot" as const, label: "Clinic" },
    { key: "aboutPhoto" as const, label: "Profile" },
  ];

  return (
    <PageShell eyebrow="Media" title="Photo Gallery" lead="A few photos from the clinic.">
      {isPitchMode ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {photos.map((p) => (
            <div key={p.key} className="overflow-hidden rounded-2xl border border-line bg-surface-2">
              <div className="relative aspect-[4/5] w-full">
                <Image src={mediaSrc(p.key)} alt={`${site.brandName} — ${p.label}`} fill className="object-cover object-top" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-line bg-surface-2 p-6 text-sm text-ink-soft">
          This is a concept build — the full photo gallery populates with real clinic photos in pitch mode.
        </p>
      )}
    </PageShell>
  );
}
