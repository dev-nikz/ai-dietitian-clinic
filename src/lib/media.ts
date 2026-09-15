import { siteMode } from "./site-mode";
import { services } from "./site-config";

// Components should always import from here, never hardcode an image path.
// Defaults to the real client's photography (pitch mode — see site-mode.ts);
// "portfolio" mode serves the generic committed placeholder instead.
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

// Per-service photography — real client photos, pitch mode only.
const serviceSlugs = new Set(services.map((s) => s.slug));

export function serviceImageSrc(slug: string): string {
  if (siteMode !== "pitch" || !serviceSlugs.has(slug)) return "";
  return `/images/pitch/services/${slug}.jpg`;
}
