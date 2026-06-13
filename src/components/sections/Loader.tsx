"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeGodwit } from "@/lib/motion";

/*
  First-paint loader — the godwit mark draws itself in, the wordmark
  rises, then the curtain lifts to reveal the hero. Shows once per tab
  session. Honours reduced motion (brief, no drawing).
*/
export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("godwit-loaded");
    if (seen) {
      setDone(true);
      return;
    }
    const t = setTimeout(
      () => {
        setDone(true);
        try {
          sessionStorage.setItem("godwit-loaded", "1");
        } catch {}
      },
      reduce ? 200 : 1500,
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: easeGodwit }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.svg
              viewBox="0 0 100 60"
              className="h-12 w-24 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <motion.path
                d="M6 40 C 28 10, 42 12, 50 30 C 58 12, 72 10, 94 40"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: easeGodwit }}
              />
            </motion.svg>
            <motion.span
              className="font-display text-2xl font-semibold tracking-tight text-ink"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: easeGodwit }}
            >
              Godwit
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
