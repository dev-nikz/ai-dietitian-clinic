"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
} as const;

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
} as const;

// The glow tracks one shared pointer position across the whole page (by
// design — it reads like a single light source sweeping over every card,
// not a per-card effect). The original snippet gave every <GlowCard>
// instance its own `document.addEventListener("pointermove", ...)`, so a
// grid of N cards meant N identical listeners all writing the same values
// on every mouse move. Here a single listener is shared (ref-counted so it
// detaches once the last card unmounts) and writes to the :root element;
// every card's `--x`/`--y`/`--xp`/`--yp` then come from ordinary CSS
// custom-property inheritance instead of a per-instance write.
let pointerListenerCount = 0;
function handleSharedPointerMove(e: PointerEvent) {
  const root = document.documentElement.style;
  root.setProperty("--x", e.clientX.toFixed(2));
  root.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
  root.setProperty("--y", e.clientY.toFixed(2));
  root.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
}
function useSharedPointerTracking() {
  useEffect(() => {
    pointerListenerCount += 1;
    if (pointerListenerCount === 1) {
      document.addEventListener("pointermove", handleSharedPointerMove);
    }
    return () => {
      pointerListenerCount -= 1;
      if (pointerListenerCount === 0) {
        document.removeEventListener("pointermove", handleSharedPointerMove);
      }
    };
  }, []);
}

// Typed CSS custom properties the glow reads/writes, so the inline style
// object below stays type-checked instead of needing an `as any` cast.
type GlowStyle = CSSProperties & {
  "--base"?: number;
  "--spread"?: number;
  "--radius"?: string;
  "--border"?: string;
  "--backdrop"?: string;
  "--backup-border"?: string;
  "--size"?: string;
  "--outer"?: string;
  "--border-size"?: string;
  "--spotlight-size"?: string;
  "--hue"?: string;
};

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useSharedPointerTracking();

  const { base, spread } = glowColorMap[glowColor];
  const sizeClasses = customSize ? "" : sizeMap[size];

  const style: GlowStyle = {
    "--base": base,
    "--spread": spread,
    "--radius": "14",
    "--border": "3",
    "--backdrop": "hsl(0 0% 60% / 0.12)",
    "--backup-border": "var(--backdrop)",
    "--size": "200",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={style}
      className={[
        sizeClasses,
        !customSize ? "aspect-[3/4]" : "",
        "rounded-2xl relative grid grid-rows-[1fr_auto] shadow-[0_1rem_2rem_-1rem_black] p-4 gap-4 backdrop-blur-[5px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div data-glow />
      {children}
    </div>
  );
}
