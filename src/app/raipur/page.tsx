import type { Metadata } from "next";
import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Raipur — The Explorer's Table",
  description:
    "Godwit Cafe Raipur at Magneto The Mall — a pure-veg fusion adventure: Mr. Mateos arancini, Burmese khow suey, KungFu rolls and zero-proof mocktails.",
};

export default async function RaipurPage() {
  const place = await getPlaceData("raipur");
  return <OutletPage outlet={outlets.raipur} place={place} />;
}
