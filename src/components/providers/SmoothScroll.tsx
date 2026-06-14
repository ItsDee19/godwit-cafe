"use client";

/*
  SmoothScroll
  ---------------------------------------------------------------
  Lenis (buttered smooth scroll) + GSAP ScrollTrigger sharing ONE clock:
  Lenis' RAF is driven by gsap.ticker (autoRaf disabled), and ScrollTrigger
  is updated on every Lenis scroll. This keeps 3D choreography (motion
  useScroll), 2D reveals (ScrollTrigger), and the page scroll perfectly
  in lockstep — no jitter, one scroll source.

  Also exposes a ref-based scroll-progress context the 3D hero reads inside
  its render loop (no React re-renders per frame).
*/

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Holder<T> = { current: T };

export interface ScrollState {
  progress: Holder<number>;
  velocity: Holder<number>;
  direction: Holder<number>;
}

const ScrollProgressContext = createContext<ScrollState | null>(null);

export function useScrollProgress(): ScrollState {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error("useScrollProgress must be used within <SmoothScroll>");
  }
  return ctx;
}

function ScrollReporter({ state }: { state: ScrollState }) {
  useLenis((lenis) => {
    state.progress.current = lenis.progress ?? 0;
    state.velocity.current = lenis.velocity ?? 0;
    state.direction.current = lenis.direction ?? 0;
    ScrollTrigger.update();
  });
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const state = useRef<ScrollState>({
    progress: { current: 0 },
    velocity: { current: 0 },
    direction: { current: 0 },
  }).current;
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ScrollProgressContext.Provider value={state}>
      <ReactLenis
        root
        ref={lenisRef}
        autoRaf={false}
        options={{
          // Snappier than the default — tracks the wheel closely so the page
          // never feels "stuck" behind heavy smoothing.
          lerp: 0.14,
          smoothWheel: true,
          wheelMultiplier: 1.2,
          touchMultiplier: 1.6,
          // Native touch scrolling on mobile — never fights vertical scroll.
          syncTouch: false,
        }}
      >
        <ScrollReporter state={state} />
        {children}
      </ReactLenis>
    </ScrollProgressContext.Provider>
  );
}
