"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { HeroFallback } from "./HeroFallback";
import type { DonutColors } from "./DonutModel";
import type { Quality } from "./HeroScene";
import { Button } from "@/components/ui/Button";
import { PureVegBadge } from "@/components/ui/PureVegBadge";

// Canvas is loaded only in the browser, only when needed.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

// Hero donut palette — strawberry glaze, caramel dough, playful sprinkles.
const HERO_DONUT: DonutColors = {
  dough: "#cf9266",
  glaze: "#ef89a6",
  sprinkles: ["#ffffff", "#e0a100", "#5cc1b0", "#ef6f9b", "#f4c44d"],
};

// TODO: set to "/models/donut.glb" (or a sizzler/shake/arancini) to swap the model.
const MODEL_URL: string | undefined = undefined;

export function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0); // shared with the canvas render loop
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const [quality, setQuality] = useState<Quality>("high");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const set = () => setQuality(mq.matches ? "low" : "high");
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  // Copy beats (cross-fade through scroll)
  const aOpacity = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.32], [1, 1, 1, 0]);
  const aY = useTransform(scrollYProgress, [0, 0.32], [0, -36]);
  const bOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.56, 0.64], [0, 1, 1, 0]);
  const bY = useTransform(scrollYProgress, [0.3, 0.64], [36, -36]);
  const cOpacity = useTransform(scrollYProgress, [0.62, 0.74, 1], [0, 1, 1]);
  const cY = useTransform(scrollYProgress, [0.62, 0.78], [36, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f6e6c8", "#f4dcc6", "#fffdf8"],
  );

  const showCanvas = mounted && webgl === true && !reduced;

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* hue-shifting backdrop */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: bg }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 40%, var(--halo), transparent 72%)",
          }}
        />

        {/* 3D hero or static fallback */}
        {showCanvas ? (
          <HeroCanvas
            progressRef={progressRef}
            colors={HERO_DONUT}
            modelUrl={MODEL_URL}
            quality={quality}
            reducedMotion={reduced}
          />
        ) : (
          <HeroFallback colors={HERO_DONUT} />
        )}

        {/* drag-to-spin affordance */}
        {showCanvas && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 text-xs uppercase tracking-[0.22em] text-ink/55"
          >
            ✶ drag to spin
          </motion.div>
        )}

        {/* copy beats — anchored to lower third so the donut breathes above */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] px-5">
          {/* Beat A */}
          <motion.div
            style={{ opacity: aOpacity, y: aY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center"
          >
            <PureVegBadge className="mb-5 text-ink-soft" />
            <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Food for the{" "}
              <span className="italic text-accent">modern nomad</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-ink-soft text-pretty sm:text-lg">
              Global flavours. Pure veg. One restless bird.
            </p>
          </motion.div>

          {/* Beat B */}
          <motion.div
            style={{ opacity: bOpacity, y: bY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center"
          >
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl">
              Born in Indore.{" "}
              <span className="italic text-accent">Built to wander.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base text-ink-soft text-pretty sm:text-lg">
              A well-travelled, pure-veg kitchen — global comfort food with a
              desi soul.
            </p>
          </motion.div>

          {/* Beat C */}
          <motion.div
            style={{ opacity: cOpacity, y: cY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center"
          >
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl">
              Three cities.{" "}
              <span className="italic text-accent">One restless bird.</span>
            </h2>
            <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button href="/#locations" size="lg">
                Find your Godwit
              </Button>
              <Button href="/menu" size="lg" variant="outline">
                See the menu
              </Button>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/25 p-1">
            <motion.span
              className="h-1.5 w-1 rounded-full bg-ink/50"
              animate={reduced ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
