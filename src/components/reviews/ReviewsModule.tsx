import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "./StarRating";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/Button";
import type { PlaceData } from "@/lib/places";
import type { Outlet } from "@/lib/outlets";

export function ReviewsModule({
  place,
  outlet,
}: {
  place: PlaceData;
  outlet: Outlet;
}) {
  const mapsUrl = place.mapsUrl || outlet.mapsUrl;

  return (
    <Section className="bg-surface">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              What guests say
            </span>
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl leading-none tracking-tight">
                {place.rating.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1">
                <StarRating rating={place.rating} size={18} />
                <span className="text-sm text-ink-soft">
                  {place.totalRatings.toLocaleString("en-IN")} Google reviews
                </span>
              </div>
            </div>
          </div>

          <Button href={mapsUrl} variant="outline" size="sm">
            Read all on Google
          </Button>
        </Reveal>

        <div className="-mx-5 mt-10 sm:mx-0">
          <div className="flex snap-x gap-4 overflow-x-auto px-5 pb-3 no-scrollbar sm:px-0">
            {place.reviews.map((r, i) => (
              <ReviewCard key={`${r.author}-${i}`} review={r} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
