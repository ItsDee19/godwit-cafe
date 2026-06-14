import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";
import { outletMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const metadata = outletMetadata("nagpur");

export default async function NagpurPage() {
  const place = await getPlaceData("nagpur");
  return <OutletPage outlet={outlets.nagpur} place={place} />;
}
