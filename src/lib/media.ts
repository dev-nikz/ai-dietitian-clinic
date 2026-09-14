// Single source of truth for every image the site uses.
//
// Default ("portfolio") mode always serves the committed placeholder assets
// in public/images/placeholder - safe for the public GitHub repo.
//
// "pitch" mode (set NEXT_PUBLIC_SITE_MODE=pitch in a local, gitignored
// .env.local) serves real client assets from private/pitch-assets instead -
// that folder is gitignored at the repo root, so real photos never enter
// git history even by accident.
//
// Components should always import from here, never hardcode an image path.

type SiteMode = "portfolio" | "pitch";

const siteMode: SiteMode =
  process.env.NEXT_PUBLIC_SITE_MODE === "pitch" ? "pitch" : "portfolio";

// Next.js only serves /public at runtime, so "pitch" images must also live
// under public/ to be servable - see private/pitch-assets/README.md for the
// local workflow (copy real files into public/images/pitch/ locally, keep
// that folder gitignored, never commit it).
const paths = {
  headshot: {
    portfolio: "/images/placeholder/headshot.svg",
    pitch: "/images/pitch/headshot.jpg",
  },
} as const;

export function mediaSrc(key: keyof typeof paths): string {
  return paths[key][siteMode];
}

export const isPitchMode = siteMode === "pitch";
