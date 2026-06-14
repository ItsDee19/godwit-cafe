/*
  Google Places API (New) integration — SERVER ONLY.
  ---------------------------------------------------------------
  getPlaceData(id) returns live rating / reviews / hours when both
  GOOGLE_PLACES_API_KEY and the outlet's place_id are configured, and
  transparently falls back to the bundled snapshot JSON otherwise (or on
  any error). Responses are ISR-cached for 1 hour.

  NOTE: the Places API returns at most 5 reviews per place — the
  "Read all on Google" link in the UI covers the rest.
*/

import "server-only";
import type { OutletId } from "./themes";
import { outlets } from "./outlets";

import indoreFallback from "@/data/reviews-fallback/indore.json";
import raipurFallback from "@/data/reviews-fallback/raipur.json";
import nagpurFallback from "@/data/reviews-fallback/nagpur.json";

export interface Review {
  author: string;
  avatar?: string;
  rating: number;
  relativeTime: string;
  text: string;
}

export interface PlaceData {
  rating: number;
  totalRatings: number;
  reviews: Review[];
  formattedAddress?: string;
  formattedPhone?: string;
  openingHours?: string[];
  mapsUrl?: string;
  source: "live" | "fallback";
}

const fallbacks: Record<OutletId, { rating: number; totalRatings: number; reviews: Review[] }> = {
  indore: indoreFallback,
  raipur: raipurFallback,
  nagpur: nagpurFallback,
};

export function getFallback(id: OutletId): PlaceData {
  const f = fallbacks[id];
  return {
    rating: f.rating,
    totalRatings: f.totalRatings,
    reviews: f.reviews,
    source: "fallback",
  };
}

// Shape of the bits we read from the Places API (New) response.
interface PlacesNewResponse {
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  googleMapsUri?: string;
  currentOpeningHours?: { weekdayDescriptions?: string[] };
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; photoUri?: string };
  }>;
}

function normalize(data: PlacesNewResponse, id: OutletId): PlaceData {
  const fb = getFallback(id);
  const reviews: Review[] =
    data.reviews?.map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google user",
      avatar: r.authorAttribution?.photoUri,
      rating: r.rating ?? 0,
      relativeTime: r.relativePublishTimeDescription ?? "",
      text: r.text?.text ?? r.originalText?.text ?? "",
    })) ?? [];

  return {
    rating: data.rating ?? fb.rating,
    totalRatings: data.userRatingCount ?? fb.totalRatings,
    reviews: reviews.length ? reviews : fb.reviews,
    formattedAddress: data.formattedAddress,
    formattedPhone: data.nationalPhoneNumber,
    openingHours: data.currentOpeningHours?.weekdayDescriptions,
    mapsUrl: data.googleMapsUri,
    source: "live",
  };
}

const FIELD_MASK = [
  "id",
  "rating",
  "userRatingCount",
  "currentOpeningHours",
  "formattedAddress",
  "nationalPhoneNumber",
  "googleMapsUri",
  "reviews",
].join(",");

export async function getPlaceData(id: OutletId): Promise<PlaceData> {
  const outlet = outlets[id];
  const key = process.env.GOOGLE_PLACES_API_KEY;

  // No key or no place_id yet → bundled snapshot.
  if (!key || !outlet.mapsPlaceId) return getFallback(id);

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${outlet.mapsPlaceId}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        next: { revalidate: 3600 }, // ISR — refresh hourly
      },
    );
    if (!res.ok) return getFallback(id);
    const data = (await res.json()) as PlacesNewResponse;
    return normalize(data, id);
  } catch {
    return getFallback(id);
  }
}
