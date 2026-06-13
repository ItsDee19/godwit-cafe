import { Loader } from "@/components/sections/Loader";
import { HeroExperience } from "@/components/three/HeroExperience";
import { BrandStory } from "@/components/sections/BrandStory";
import { SignatureMarquee } from "@/components/sections/SignatureMarquee";
import { PureVegStrip } from "@/components/sections/PureVegStrip";
import { LocationSelector } from "@/components/sections/LocationSelector";
import { Social } from "@/components/sections/Social";

export default function Home() {
  return (
    <>
      <Loader />
      <HeroExperience />
      <BrandStory />
      <SignatureMarquee />
      <PureVegStrip />
      <LocationSelector />
      <Social />
    </>
  );
}
