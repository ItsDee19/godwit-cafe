import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { MediaFrame } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { outletList } from "@/lib/outlets";
import type { Photo } from "@/lib/outlets";
import type { OutletId } from "@/lib/themes";

interface FeaturedDish {
  name: string;
  tag?: string;
  photo: Photo;
  city: string;
  id: OutletId;
}

// Curated cross-outlet highlights — three signatures per city.
const featured: FeaturedDish[] = outletList.flatMap((o) =>
  o.signatureDishes.slice(0, 3).map((d) => ({
    name: d.name,
    tag: d.tag,
    photo: d.photo,
    city: o.city,
    id: o.id,
  })),
);

const rowA = featured.filter((_, i) => i % 2 === 0);
const rowB = featured.filter((_, i) => i % 2 === 1);

function DishCard({ dish }: { dish: FeaturedDish }) {
  return (
    <div data-theme={dish.id} className="w-60 shrink-0 px-3 sm:w-64">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
        <MediaFrame photo={dish.photo} ratio="4 / 5" rounded="rounded-none" />
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {dish.city}
            </span>
            {dish.tag && (
              <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] uppercase tracking-wide text-ink-soft">
                {dish.tag}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-display text-lg leading-snug tracking-tight">
            {dish.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function SignatureMarquee() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            overline="Signature fusion"
            title="Dishes worth the migration"
            intro="A taste of the cross-outlet greatest hits — street food reimagined, continents on one plate, all pure veg."
          />
        </Reveal>
      </Container>

      <div className="mt-14 flex flex-col gap-5">
        <Marquee speedSeconds={46}>
          {rowA.map((d, i) => (
            <DishCard key={`${d.id}-${d.name}-${i}`} dish={d} />
          ))}
        </Marquee>
        <Marquee speedSeconds={52} reverse>
          {rowB.map((d, i) => (
            <DishCard key={`${d.id}-${d.name}-${i}`} dish={d} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
