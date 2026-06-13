import { Marquee } from "@/components/ui/Marquee";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { Reveal } from "@/components/ui/Reveal";

const WORDS = [
  "Pure Veg",
  "Global Flavours",
  "Hand-Crafted",
  "Desi Soul",
  "Modern Nomad",
];

export function PureVegStrip() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-surface sm:py-28">
      <Marquee speedSeconds={32} className="opacity-90">
        {WORDS.map((w) => (
          <span key={w} className="flex items-center">
            <span className="px-6 font-display text-3xl italic text-surface/85 sm:text-4xl">
              {w}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      <Reveal className="mx-auto mt-14 max-w-3xl px-5 text-center">
        <PureVegBadge className="mb-6 justify-center text-surface/70" />
        <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Not a single plate breaks the promise.{" "}
          <span className="italic text-accent">100% vegetarian.</span> Always.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-surface/65 text-pretty sm:text-lg">
          Every dish — from vada pav fondue to Burmese khow suey — is pure veg,
          freshly made, and built to travel the world without leaving it.
        </p>
      </Reveal>

      <Marquee speedSeconds={36} reverse className="mt-14 opacity-90">
        {WORDS.map((w) => (
          <span key={w} className="flex items-center">
            <span className="px-6 font-display text-3xl italic text-surface/85 sm:text-4xl">
              {w}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
