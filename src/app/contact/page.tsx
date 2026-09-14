import { PageShell } from "@/components/page-shell";
import { getSiteContent } from "@/lib/site-config";
import { InstagramIcon, WhatsappIcon, FacebookIcon } from "@/components/icons";

export default function ContactPage() {
  const site = getSiteContent();
  const hasWhatsapp = site.whatsappNumber.length > 0;

  return (
    <PageShell eyebrow="Get in touch" title="Contact Us">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-4 text-[15px] text-ink-soft">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">Address</p>
            <p className="mt-1">{site.address}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">Phone</p>
            <p className="mt-1">{site.phoneDisplay}</p>
          </div>
          {site.email && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">Email</p>
              <p className="mt-1">{site.email}</p>
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">Reach out directly</p>
          <div className="mt-3 flex flex-col gap-3">
            {hasWhatsapp ? (
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 w-fit"
              >
                <WhatsappIcon className="h-4.5 w-4.5" />
                Message on WhatsApp
              </a>
            ) : (
              <span className="w-fit rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-faint">
                WhatsApp — connects in pitch demo
              </span>
            )}
            <div className="flex gap-3">
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:border-accent-ink hover:text-accent-ink"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
              )}
              {site.facebookUrl && (
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:border-accent-ink hover:text-accent-ink"
                >
                  <FacebookIcon className="h-4.5 w-4.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
