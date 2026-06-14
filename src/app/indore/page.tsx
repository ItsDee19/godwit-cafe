import type { Metadata } from "next";
import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Indore — The Flagship",
  description:
    "Godwit Cafe Indore — where it all began. The city's beloved pure-veg fusion flagship: vada pav fondue, Lotus Biscoff shakes, sizzlers and more.",
};

export default async function IndorePage() {
  const place = await getPlaceData("indore");
  return <OutletPage outlet={outlets.indore} place={place} />;
}
