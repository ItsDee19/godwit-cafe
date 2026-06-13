import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { outletList } from "@/lib/outlets";

/*
  Instagram teaser. Renders placeholder tiles for now.
  TODO: wire a real @godwitcafe feed/reels embed (Instagram Basic Display
  or a curated reels grid) — see README.
*/
const TILES = [
  "Latte art, top-down",
  "Vada pav fondue pull",
  "Neon cafe interior",
  "Biscoff shake pour",
  "Sizzler reveal",
  "Sprinkle close-up",
];

export function Social() {
  const instagram = outletList[0].instagram;

  return (
    <Section className="bg-paper">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              overline="@godwitcafe"
              title="Seen on the feed"
              intro="Reels, regulars and the daily specials — follow along for the latest from every perch."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={instagram} variant="outline">
              Follow @godwitcafe
            </Button>
          </Reveal>
        </div>

        <Reveal
          stagger={0.07}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {TILES.map((t) => (
            <a
              key={t}
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <PlaceholderImage
                label={t}
                hint="@godwitcafe"
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-surface opacity-0 transition group-hover:bg-ink/35 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.97.24 2.67.51.72.28 1.33.65 1.94 1.26.61.61.98 1.22 1.26 1.94.27.7.46 1.5.51 2.67.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.17-.24 1.97-.51 2.67a5.4 5.4 0 0 1-1.26 1.94 5.4 5.4 0 0 1-1.94 1.26c-.7.27-1.5.46-2.67.51-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.97-.24-2.67-.51a5.4 5.4 0 0 1-1.94-1.26 5.4 5.4 0 0 1-1.26-1.94c-.27-.7-.46-1.5-.51-2.67C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.24-1.97.51-2.67.28-.72.65-1.33 1.26-1.94A5.4 5.4 0 0 1 5.98 1.23c.7-.27 1.5-.46 2.67-.51C9.95 2.2 10.35 2.2 12 2.2Zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9Zm0 7.34a2.89 2.89 0 1 0 0-5.78 2.89 2.89 0 0 0 0 5.78Zm5.66-7.56a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0Z" />
                </svg>
              </span>
            </a>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
