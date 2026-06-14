import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/Media";
import type { Outlet } from "@/lib/outlets";

export function Vibe({ outlet }: { outlet: Outlet }) {
  const chips = [
    "Pure veg",
    "Global fusion",
    outlet.costForTwo ?? "Premium-cosy",
    "Dine-in & delivery",
  ];

  return (
    <Section className="bg-paper">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              The vibe
            </span>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Step inside {outlet.city}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty">
              {outlet.about}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <MediaFrame
              photo={outlet.gallery[1] ?? outlet.gallery[0]}
              ratio="5 / 4"
              rounded="rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="shadow-lift"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
