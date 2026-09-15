// Single switch for the whole site. Defaults to "pitch" (the real client's
// content — see the CONTENT MODEL note in site-config.ts for why that's
// tracked in this public repo). Set NEXT_PUBLIC_SITE_MODE=portfolio to
// switch to the generic template content instead.
export type SiteMode = "portfolio" | "pitch";

export const siteMode: SiteMode =
  process.env.NEXT_PUBLIC_SITE_MODE === "portfolio" ? "portfolio" : "pitch";

export const isPitchMode = siteMode === "pitch";
