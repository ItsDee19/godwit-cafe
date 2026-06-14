"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MediaFrame } from "@/components/ui/Media";
import { outletList } from "@/lib/outlets";
import type { OutletId } from "@/lib/themes";
import { cn } from "@/lib/cn";
import { easeGodwit } from "@/lib/motion";

type Filter = "all" | OutletId;

const dishes = outletList.flatMap((o) =>
  o.signatureDishes.map((d, i) => ({
    ...d,
    city: o.city,
    id: o.id,
    key: `${o.id}-${i}`,
  })),
);

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All outlets" },
  ...outletList.map((o) => ({ id: o.id as Filter, label: o.city })),
];

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? dishes : dishes.filter((d) => d.id === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                active
                  ? "border-ink bg-ink text-surface"
                  : "border-line bg-surface text-ink-soft hover:border-ink/40 hover:text-ink",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((dish) => (
            <motion.article
              key={dish.key}
              layout
              data-theme={dish.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: easeGodwit }}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <MediaFrame
                  photo={dish.photo}
                  ratio="4 / 5"
                  rounded="rounded-2xl"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur">
                  {dish.city}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg leading-snug tracking-tight">
                {dish.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">
                {dish.blurb}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
