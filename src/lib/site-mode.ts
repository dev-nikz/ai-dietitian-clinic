// Single switch for the whole "generic portfolio vs. real client pitch" system.
// Set NEXT_PUBLIC_SITE_MODE=pitch in a local, gitignored .env.local to preview
// real content/images locally. Public builds always default to "portfolio".
export type SiteMode = "portfolio" | "pitch";

export const siteMode: SiteMode =
  process.env.NEXT_PUBLIC_SITE_MODE === "pitch" ? "pitch" : "portfolio";

export const isPitchMode = siteMode === "pitch";
