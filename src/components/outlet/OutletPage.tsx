import { OutletHero } from "./OutletHero";
import { Vibe } from "./Vibe";
import { SignatureDishes } from "./SignatureDishes";
import { Gallery } from "./Gallery";
import { ReviewsModule } from "@/components/reviews/ReviewsModule";
import { MapHours } from "./MapHours";
import { OrderCTAs } from "./OrderCTAs";
import { JsonLd } from "@/components/seo/JsonLd";
import { restaurantJsonLd } from "@/lib/seo";
import type { Outlet } from "@/lib/outlets";
import type { PlaceData } from "@/lib/places";

/**
 * Shared outlet-page template. Each city route (/indore, /raipur, /nagpur)
 * renders this with its outlet config + live/fallback place data. Theme is
 * applied globally via <html data-theme> (set by route in layout).
 */
export function OutletPage({
  outlet,
  place,
}: {
  outlet: Outlet;
  place: PlaceData;
}) {
  return (
    <>
      <JsonLd data={restaurantJsonLd(outlet, place)} />
      <OutletHero outlet={outlet} place={place} />
      <Vibe outlet={outlet} />
      <SignatureDishes outlet={outlet} />
      <Gallery outlet={outlet} />
      <ReviewsModule place={place} outlet={outlet} />
      <MapHours outlet={outlet} place={place} />
      <OrderCTAs outlet={outlet} />
    </>
  );
}
