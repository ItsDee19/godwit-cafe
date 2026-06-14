import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { Outlet } from "@/lib/outlets";
import type { PlaceData } from "@/lib/places";

export function MapHours({
  outlet,
  place,
}: {
  outlet: Outlet;
  place: PlaceData;
}) {
  const key = process.env.NEXT_PUBLIC_MAPS_EMBED_KEY;
  const address = place.formattedAddress || outlet.address;
  const phone = place.formattedPhone || outlet.phone;
  const hours = place.openingHours;

  const q = outlet.mapsPlaceId ? `place_id:${outlet.mapsPlaceId}` : address;
  const embedSrc = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(q)}`
    : null;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    address,
  )}${outlet.mapsPlaceId ? `&destination_place_id=${outlet.mapsPlaceId}` : ""}`;

  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-line">
            {embedSrc ? (
              <iframe
                title={`Map to Godwit Cafe ${outlet.city}`}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <a
                href={outlet.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 grid place-items-center bg-grain p-6 text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--halo), var(--surface) 70%)",
                }}
              >
                <span className="flex flex-col items-center gap-2 text-ink/60">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.4 12 21 12 21z" />
                    <circle cx="12" cy="10.7" r="2.3" />
                  </svg>
                  <span className="font-display text-base text-ink/75">
                    View on Google Maps
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink/45">
                    Add NEXT_PUBLIC_MAPS_EMBED_KEY for a live map
                  </span>
                </span>
              </a>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              overline="Find us"
              title={`Godwit ${outlet.city}`}
            />

            <div className="flex flex-col gap-4 text-ink-soft">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                  Address
                </p>
                <p className="mt-1 text-ink">{address}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                  Hours
                </p>
                {hours && hours.length ? (
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {hours.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-ink">{outlet.hours}</p>
                )}
              </div>

              {phone && (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink/45">
                    Phone
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="mt-1 inline-block text-ink hover:text-accent"
                  >
                    {phone}
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={directions}>Get directions</Button>
              {phone && (
                <Button href={`tel:${phone.replace(/\s+/g, "")}`} variant="outline">
                  Call outlet
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
