import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { MenuExplorer } from "@/components/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Godwit Cafe's pure-veg global-fusion menu — filter signature dishes by outlet across Indore, Raipur and Nagpur.",
};

export default function MenuPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center">
          <PureVegBadge className="text-ink-soft" />
          <SectionHeading
            as="h1"
            align="center"
            overline="The menu"
            title={
              <>
                Global flavours,{" "}
                <span className="italic text-accent">one restless menu.</span>
              </>
            }
            intro="A taste of what each perch is plating up. Pick an outlet to narrow it down — every dish is 100% vegetarian."
          />
        </div>

        <div className="mt-12">
          <MenuExplorer />
        </div>
      </Container>
    </div>
  );
}
