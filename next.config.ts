import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The only local SVG this app serves through next/image is our own
    // static placeholder illustration (public/images/placeholder/headshot.svg)
    // — not user-uploaded content — so allowing the optimizer to handle SVG
    // is safe here. Without this, Next.js's image optimizer 400s on any SVG
    // request by default, which is exactly what broke the portfolio-mode
    // (public/default) build on Vercel: pitch mode was always used in local
    // dev (real PNGs via .env.local, which is gitignored), so this path was
    // never actually exercised until the public deploy defaulted to
    // portfolio mode and served the SVG placeholder instead.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
