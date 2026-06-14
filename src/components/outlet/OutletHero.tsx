import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { MediaFrame } from "@/components/ui/Media";
import { StarRating } from "@/components/reviews/StarRating";
import { BirdMark } from "@/components/ui/BirdMark";
import type { Outlet } from "@/lib/outlets";
import type { PlaceData } from "@/lib/places";

export function OutletHero({
  outlet,
  place,
}: {
  outlet: Outlet;
  place: PlaceData;
}) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    outlet.address,
  )}`;

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 75% 20%, var(--halo), transparent 70%)",
        }}
      />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BirdMark className="h-4 w-7 text-accent" decorative />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {outlet.positioning} · {outlet.city}
              </span>
            </div>

            <h1 className="font-display text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {outlet.tagline}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <PureVegBadge />
              <span className="flex items-center gap-2">
                <StarRating rating={place.rating} size={16} />
                <span className="text-sm text-ink-soft">
                  {place.rating.toFixed(1)} ·{" "}
                  {place.totalRatings.toLocaleString("en-IN")} reviews
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="#order">Reserve or order</Button>
              <Button href={directions} variant="outline">
                Get directions
              </Button>
            </div>
          </div>

          <div className="relative">
            <MediaFrame
              photo={outlet.gallery[0]}
              ratio="4 / 3"
              rounded="rounded-3xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="shadow-lift"
            />
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-line bg-surface px-5 py-3 shadow-soft sm:block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Open today
              </span>
              <p className="font-display text-lg">{outlet.hours}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
