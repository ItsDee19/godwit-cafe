import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";
import { outletMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const metadata = outletMetadata("raipur");

export default async function RaipurPage() {
  const place = await getPlaceData("raipur");
  return <OutletPage outlet={outlets.raipur} place={place} />;
}
