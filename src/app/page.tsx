import ContactBlock, { SiteFooter } from "@/components/ContactBlock";
import About from "@/components/home/About";
import HomeHero from "@/components/home/HomeHero";
import SelectedWork from "@/components/home/SelectedWork";
import Trajectory from "@/components/home/Trajectory";

/* landmarks: header (nav + intro) · main · footer */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <main>
        <SelectedWork />
        <About />
        <Trajectory />
        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
