"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BirdMark } from "@/components/ui/BirdMark";

const CHIPS = ["Migratory", "Pure-Veg", "Hand-Crafted", "Global-Fusion"];

function FlyingBird() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const trigger = el.closest("[data-story]");
      gsap.fromTo(
        el,
        { xPercent: -10, yPercent: 30, rotate: -8 },
        {
          xPercent: 150,
          yPercent: -40,
          rotate: 6,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute right-0 top-10 hidden text-accent/30 lg:block"
    >
      <BirdMark className="h-10 w-20" decorative />
    </div>
  );
}

export function BrandStory() {
  return (
    <Section id="story" className="relative overflow-hidden bg-paper">
      <div data-story className="relative">
        <FlyingBird />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  The Godwit
                </span>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Named after a bird that{" "}
                  <span className="italic text-accent">refuses to stay put.</span>
                </h2>
                <BirdMark
                  variant="wade"
                  className="mt-8 h-16 w-16 text-ink/30"
                  decorative
                />
              </Reveal>
            </div>

            <div className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7">
              <Reveal stagger={0.12} className="flex flex-col gap-6">
                <p className="text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
                  The godwit is a migratory wader famous for marathon,
                  ocean-crossing flights — strength, endurance and a restless
                  hunger to explore, all in feathered form.
                </p>
                <p className="text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
                  We built a café in its image: for the modern-day nomad who is
                  always ready to explore new people, new places and{" "}
                  <span className="text-ink">new flavours.</span>
                </p>
                <p className="text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
                  A well-travelled chef, a pure-veg pantry and a desi soul —
                  global comfort food, born in Indore and carried onward to
                  Raipur and Nagpur.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="flex flex-wrap gap-2.5 pt-2">
                {CHIPS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft"
                  >
                    {c}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
