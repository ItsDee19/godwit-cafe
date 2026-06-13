/*
  Shared motion language for Motion (Framer Motion).
  Confident, weighty easing — no bouncy springs on big elements.
*/

import type { Variants } from "motion/react";

// Signature easing (matches --ease-godwit in globals.css)
export const easeGodwit: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeGodwitIn: [number, number, number, number] = [0.7, 0, 0.84, 0];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeGodwit },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: easeGodwit } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeGodwit },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

/** Default in-view config: reveal once, when ~25% visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
