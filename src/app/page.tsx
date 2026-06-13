// NOTE: temporary home — replaced in Phase 4 (full home sections + 3D hero).
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { BirdMark } from "@/components/ui/BirdMark";
import { outletList } from "@/lib/outlets";

export default function Home() {
  return (
    <>
      {/* Hero placeholder (the 3D hero lands here in Phase 3) */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 38%, var(--halo), transparent 70%)",
          }}
        />
        <PureVegBadge className="mb-6 text-ink-soft" />
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-8xl">
          Food for the
          <br />
          <span className="italic text-accent">modern nomad</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft text-pretty">
          Global flavours. Pure veg. One restless bird — wandering from Indore
          to Raipur to Nagpur.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/#locations" size="lg">
            Find your Godwit
          </Button>
          <Button href="/menu" size="lg" variant="outline">
            See the menu
          </Button>
        </div>
        <BirdMark
          className="mt-16 h-6 w-12 animate-pulse text-accent/70"
          decorative
        />
      </section>

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
