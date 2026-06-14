import type { Metadata } from "next";
import { outlets, type Outlet } from "./outlets";
import type { OutletId } from "./themes";
import type { PlaceData } from "./places";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://godwit.cafe";

// Approximate opening hours for schema (// TODO: confirm exact per outlet).
const HOURS: Record<OutletId, { opens: string; closes: string }> = {
  indore: { opens: "12:00", closes: "23:59" },
  raipur: { opens: "12:00", closes: "23:59" },
  nagpur: { opens: "12:00", closes: "23:00" },
};

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Restaurant / LocalBusiness structured data for an outlet page. */
export function restaurantJsonLd(outlet: Outlet, place: PlaceData) {
  const h = HOURS[outlet.id];
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/${outlet.id}#restaurant`,
    name: outlet.name,
    description: outlet.about,
    url: `${SITE_URL}/${outlet.id}`,
    servesCuisine: [
      "Vegetarian",
      "Global Fusion",
      "Indian",
      "Continental",
      "Italian",
      "Oriental",
    ],
    priceRange: "₹₹",
    ...(outlet.phone ? { telephone: outlet.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: outlet.address,
      addressLocality: outlet.city,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: outlet.geo.lat,
      longitude: outlet.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ALL_DAYS,
        opens: h.opens,
        closes: h.closes,
      },
    ],
    ...(place.totalRatings > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: place.rating,
            reviewCount: place.totalRatings,
          },
        }
      : {}),
  };
}

/** Brand-level Organization data for the site. */
export function brandJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Godwit Cafe",
    url: SITE_URL,
    description:
      "Pure-veg global-fusion café — food for the modern nomad. Indore, Raipur & Nagpur.",
    sameAs: ["https://www.instagram.com/godwitcafe/"],
  };
}

/** Per-outlet page metadata (title, description, canonical, OG). */
export function outletMetadata(id: OutletId): Metadata {
  const o = outlets[id];
  const title = `${o.city} — ${o.positioning}`;
  const description = `Godwit Cafe ${o.city}: ${o.about.slice(0, 150)}`;
  return {
    title,
    description,
    alternates: { canonical: `/${id}` },
    openGraph: {
      title: `${title} · Godwit Cafe`,
      description,
      url: `/${id}`,
      // TODO: add /public/og/{id}.jpg
      images: [`/og/${id}.jpg`],
    },
  };
}
