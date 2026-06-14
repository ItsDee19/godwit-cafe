import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";
import type { Outlet } from "@/lib/outlets";

// Editorial layout: first tile spans larger.
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
];

export function Gallery({ outlet }: { outlet: Outlet }) {
  return (
    <Section className="bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            overline="The room"
            title="A look around"
            intro="Warm light, bold colour and corners made for lingering."
          />
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4"
        >
          {outlet.gallery.map((photo, i) => (
            <div
              key={i}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-surface",
                spans[i % spans.length],
              )}
            >
              <Media
                photo={photo}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
