"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/Media";
import { BirdMark } from "@/components/ui/BirdMark";
import { outletList, type Outlet } from "@/lib/outlets";
import { themes } from "@/lib/themes";
import { easeGodwit } from "@/lib/motion";

export function LocationSelector() {
  const router = useRouter();
  const [wipe, setWipe] = useState<{ id: string; color: string } | null>(null);

  const select = (id: string, color: string) => {
    // prefetch + start the wipe; navigation fires when it covers the screen
    router.prefetch(`/${id}`);
    setWipe({ id, color });
  };

  return (
    <Section id="locations" className="bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            overline="Choose your Godwit"
            title={
              <>
                Three cities.{" "}
                <span className="italic text-accent">One restless bird.</span>
              </>
            }
            intro="Same brand DNA, three distinct moods. Pick a perch and step inside."
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {outletList.map((o) => (
            <CityCard key={o.id} outlet={o} onSelect={select} />
          ))}
        </Reveal>
      </Container>

      <AnimatePresence>
        {wipe && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center"
            style={{ backgroundColor: wipe.color }}
            initial={{ clipPath: "circle(0% at 50% 62%)" }}
            animate={{ clipPath: "circle(150% at 50% 62%)" }}
            transition={{ duration: 0.7, ease: easeGodwit }}
            onAnimationComplete={() => router.push(`/${wipe.id}`)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <BirdMark className="h-12 w-24 text-white/90" decorative />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function CityCard({
  outlet,
  onSelect,
}: {
  outlet: Outlet;
  onSelect: (id: string, color: string) => void;
}) {
  const accent = themes[outlet.id].accent;
  const hero = outlet.signatureDishes[0];

  return (
    <a
      href={`/${outlet.id}`}
      data-theme={outlet.id}
      onClick={(e) => {
        // let modified clicks (new tab) behave normally
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onSelect(outlet.id, accent);
      }}
      className="group relative block overflow-hidden rounded-3xl border border-line bg-paper p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-godwit)] hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-lift"
    >
      {/* accent top rule grows on hover */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-bright transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {outlet.positioning}
        </span>
        <span className="text-sm text-ink-soft">{outlet.area}</span>
      </div>

      <h3 className="mt-3 font-display text-4xl tracking-tight">
        {outlet.city}
      </h3>

      <div className="relative mt-5 overflow-hidden rounded-2xl">
        <MediaFrame
          photo={hero.photo}
          ratio="4 / 3"
          rounded="rounded-2xl"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to top, ${accent}33, transparent 60%)`,
          }}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {hero.name}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-ink-soft">{outlet.hours}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-[gap] group-hover:gap-2">
          Explore <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}
