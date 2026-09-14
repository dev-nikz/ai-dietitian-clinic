import { siteMode } from "./site-mode";
import { services } from "./site-config";

// Components should always import from here, never hardcode an image path.
// "portfolio" mode (default, public repo) serves the committed placeholder.
// "pitch" mode serves real client images from public/images/pitch/, which is
// gitignored at the repo root so real photos never enter git history.
const paths = {
  headshot: {
    portfolio: "/images/placeholder/headshot.svg",
    pitch: "/images/pitch/hero.png",
  },
  aboutPhoto: {
    portfolio: "/images/placeholder/headshot.svg",
    pitch: "/images/pitch/about.png",
  },
  logo: {
    portfolio: "", // no logo image in portfolio mode — header falls back to text wordmark
    pitch: "/images/pitch/logo.png",
  },
} as const;

export function mediaSrc(key: keyof typeof paths): string {
  return paths[key][siteMode];
}

// Per-service photography. Pitch mode only — these are the client's own
// licensed images, not free-to-redistribute assets, so the public/portfolio
// build never references them and the cards fall back to the gradient-only
// design instead.
const serviceSlugs = new Set(services.map((s) => s.slug));

export function serviceImageSrc(slug: string): string {
  if (siteMode !== "pitch" || !serviceSlugs.has(slug)) return "";
  return `/images/pitch/services/${slug}.jpg`;
}
