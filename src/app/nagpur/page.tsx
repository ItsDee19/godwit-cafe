import type { Metadata } from "next";
import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nagpur — The New Arrival",
  description:
    "Godwit Cafe Nagpur in Civil Lines — the freshest, most aesthetic pure-veg multicuisine cafe in town. Loaded nachos, wood-fired pizza, Biscoff shakes.",
};

export default async function NagpurPage() {
  const place = await getPlaceData("nagpur");
  return <OutletPage outlet={outlets.nagpur} place={place} />;
}
