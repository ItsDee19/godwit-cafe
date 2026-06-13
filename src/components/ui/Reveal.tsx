"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/*
  Scroll reveal via GSAP ScrollTrigger (synced to Lenis in SmoothScroll).
  Set `stagger` to animate direct children in sequence. Honours reduced
  motion (renders final state instantly).
*/
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const targets: gsap.TweenTarget = stagger
        ? Array.from(el.children)
        : el;
      if (reduce) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger || 0,
          scrollTrigger: { trigger: el, start },
        },
      );
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
