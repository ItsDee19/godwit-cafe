"use client";

/*
  SmoothScroll
  ---------------------------------------------------------------
  Wraps the app in Lenis (buttered smooth scrolling) and exposes a
  ref-based scroll-progress context. The 3D hero reads progress.current
  inside its render loop (useFrame) — no React re-renders per frame.

  NOTE (Lenis + GSAP): when GSAP ScrollTrigger reveals are added, we
  switch ReactLenis to `autoRaf={false}` and drive lenis.raf() from
  gsap.ticker so both share one clock. For now Lenis runs its own RAF.
*/

import { ReactLenis, useLenis } from "lenis/react";
import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

type Holder<T> = { current: T };

export interface ScrollState {
  /** 0 → 1 progress through the whole scrollable page */
  progress: Holder<number>;
  /** current scroll velocity (px/frame-ish), signed */
  velocity: Holder<number>;
  /** 1 = scrolling down, -1 = up, 0 = idle */
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
  });
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const state = useRef<ScrollState>({
    progress: { current: 0 },
    velocity: { current: 0 },
    direction: { current: 0 },
  }).current;

  return (
    <ScrollProgressContext.Provider value={state}>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          // Use native touch scrolling on mobile — never fights vertical scroll.
          syncTouch: false,
        }}
      >
        <ScrollReporter state={state} />
        {children}
      </ReactLenis>
    </ScrollProgressContext.Provider>
  );
}
