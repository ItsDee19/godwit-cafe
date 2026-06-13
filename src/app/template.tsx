"use client";

import { motion } from "motion/react";
import { easeGodwit } from "@/lib/motion";

// Gentle entrance for every route — complements the location-selector wipe
// when moving home ↔ outlet pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeGodwit }}
    >
      {children}
    </motion.div>
  );
}
