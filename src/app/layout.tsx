import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import { MotionConfig } from "motion/react";
import { getSiteContent } from "@/lib/site-config";
import "./globals.css";

const site = getSiteContent();

export const metadata: Metadata = {
  title: `${site.brandName} — ${site.tagline}`,
  description: site.heroLead,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-ink bg-bg">
        {/* MVP is light-only by decision - reducedMotion still respects the
            user's OS setting so restrained motion never becomes a problem. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
