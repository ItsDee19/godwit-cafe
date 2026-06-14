import { OutletPage } from "@/components/outlet/OutletPage";
import { outlets } from "@/lib/outlets";
import { getPlaceData } from "@/lib/places";
import { outletMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const metadata = outletMetadata("indore");

export default async function IndorePage() {
  const place = await getPlaceData("indore");
  return <OutletPage outlet={outlets.indore} place={place} />;
}
