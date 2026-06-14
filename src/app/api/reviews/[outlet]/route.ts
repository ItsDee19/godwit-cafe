import { NextResponse } from "next/server";
import { getPlaceData } from "@/lib/places";
import { outletIds, type OutletId } from "@/lib/themes";

/*
  Proxy for live Google Places data — keeps GOOGLE_PLACES_API_KEY server-only.
  The outlet pages call getPlaceData() directly during SSR; this route exists
  for client-side refresh and as the documented public endpoint.
  Cached for 1 hour (the underlying Google fetch is ISR-cached in lib/places).
*/
export const revalidate = 3600;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ outlet: string }> },
) {
  const { outlet } = await params; // Next 16: params is async

  if (!outletIds.includes(outlet as OutletId)) {
    return NextResponse.json({ error: "Unknown outlet" }, { status: 404 });
  }

  const data = await getPlaceData(outlet as OutletId);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
