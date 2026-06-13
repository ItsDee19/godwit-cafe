// NOTE: temporary home — full home sections assembled in Phase 4.
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroExperience } from "@/components/three/HeroExperience";
import { outletList } from "@/lib/outlets";

export default function Home() {
  return (
    <>
      <HeroExperience />

      {/* Locations preview (full selector built in Phase 4) */}
      <Section id="locations" className="bg-surface">
        <Container>
          <SectionHeading
            align="center"
            overline="Three perches"
            title="Choose your Godwit"
            intro="Same restless spirit, three distinct moods. Pick a city to step inside."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {outletList.map((o) => (
              <Link
                key={o.id}
                href={`/${o.id}`}
                data-theme={o.id}
                className="group flex flex-col gap-3 rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-accent">
                  {o.positioning}
                </span>
                <span className="font-display text-3xl tracking-tight">
                  {o.city}
                </span>
                <span className="text-sm text-ink-soft">{o.area}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:gap-2">
                  Explore <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
