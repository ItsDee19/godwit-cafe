"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { HeroFallback } from "./HeroFallback";
import type { DonutColors } from "./DonutModel";
import type { Quality } from "./HeroScene";
import { Button } from "@/components/ui/Button";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { cn } from "@/lib/cn";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const HERO_DONUT: DonutColors = {
  dough: "#cf9266",
  glaze: "#ef89a6",
  sprinkles: ["#ffffff", "#e0a100", "#5cc1b0", "#ef6f9b", "#f4c44d"],
};

// TODO: set to "/models/donut.glb" (or a sizzler/shake/arancini) to swap the model.
const MODEL_URL: string | undefined = undefined;

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

export function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0); // continuous 0..1, read by the canvas loop
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const [quality, setQuality] = useState<Quality>("high");
  const [mounted, setMounted] = useState(false);
  // discrete UI state derived from scroll — guarantees a clean beat handoff
  const [phase, setPhase] = useState<0 | 1>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const set = () => setQuality(mq.matches ? "low" : "high");
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Drive everything from Lenis' scroll callback (reliable; same source the
  // canvas already uses). Section-local progress from the bounding rect.
  useLenis(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const total = sec.offsetHeight - window.innerHeight;
    const p = total > 0 ? clamp(-sec.getBoundingClientRect().top / total, 0, 1) : 0;
    progressRef.current = p;
    const nextPhase: 0 | 1 = p < 0.45 ? 0 : 1;
    setPhase((cur) => (cur === nextPhase ? cur : nextPhase));
    setScrolled((cur) => {
      const next = p > 0.05;
      return cur === next ? cur : next;
    });
  });

  const showCanvas = mounted && webgl === true && !reduced;

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* backdrop — warms at the top, lightens as you scroll */}
        <div
          aria-hidden
          className="absolute inset-0 transition-colors duration-1000 ease-[var(--ease-godwit)]"
          style={{ backgroundColor: scrolled ? "#fffdf8" : "#f6e6c8" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(54% 44% at 50% 34%, var(--halo), transparent 70%)",
          }}
        />

        {/* 3D hero or static fallback (upper area) */}
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

        {/* legibility scrim under the copy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
          style={{
            background:
              "linear-gradient(to top, var(--paper) 14%, color-mix(in oklab, var(--paper) 55%, transparent) 48%, transparent)",
          }}
        />

        {/* drag-to-spin affordance */}
        {showCanvas && (
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 text-xs uppercase tracking-[0.24em] text-ink/45 transition-opacity duration-500",
              scrolled ? "opacity-0" : "opacity-100",
            )}
          >
            ✶ drag to spin
          </div>
        )}

        {/* copy — lower band; exactly one beat visible at a time */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[13vh] px-5">
          {/* Beat 1 — Godwit Cafe */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex flex-col items-center text-center transition-all duration-700 ease-[var(--ease-godwit)]",
              phase === 0
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-8 opacity-0",
            )}
          >
            <PureVegBadge className="mb-5 text-ink-soft" />
            <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
              Godwit <span className="italic text-accent">Cafe</span>
            </h1>
            <p className="mt-5 text-base text-ink-soft text-pretty sm:text-lg">
              Food for the modern nomad.
            </p>
          </div>

          {/* Beat 2 — Present across three cities */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex flex-col items-center text-center transition-all duration-700 ease-[var(--ease-godwit)]",
              phase === 1
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-8 opacity-0",
            )}
          >
            <h2 className="font-display text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Present across{" "}
              <span className="italic text-accent">three cities</span>
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-ink-soft">
              Indore · Raipur · Nagpur
            </p>
            <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button href="/#locations" size="lg">
                Find your Godwit
              </Button>
              <Button href="/menu" size="lg" variant="outline">
                See the menu
              </Button>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft transition-opacity duration-500",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/25 p-1">
            <span
              className={cn(
                "h-1.5 w-1 rounded-full bg-ink/50",
                !reduced && "animate-bounce",
              )}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
