import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/Media";
import type { Outlet } from "@/lib/outlets";

export function SignatureDishes({ outlet }: { outlet: Outlet }) {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            overline="Signature plates"
            title={`What to order in ${outlet.city}`}
            intro="The dishes regulars come back for — street food reimagined, continents on a plate, all pure veg."
          />
        </Reveal>

        <Reveal
          stagger={0.06}
          className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {outlet.signatureDishes.map((dish) => (
            <article key={dish.name} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-2xl">
                <MediaFrame
                  photo={dish.photo}
                  ratio="4 / 5"
                  rounded="rounded-2xl"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                {dish.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur">
                    {dish.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-lg leading-snug tracking-tight">
                {dish.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">
                {dish.blurb}
              </p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
