"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// The entire scroll-motion vocabulary for the MVP: fade + slight rise on
// first entry into view, nothing else. Transform/opacity only (GPU-safe,
// never triggers layout) - see the design notes for why this is deliberate.
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
