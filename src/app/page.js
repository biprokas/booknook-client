
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HomeFeatures from "@/components/home/HomeFeatures";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HomeFeatures />
    </>
  );
}
