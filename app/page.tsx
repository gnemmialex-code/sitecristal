import Navbar from "@/components/Navbar";
import SideMarquee from "@/components/SideMarquee";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Presentation from "@/components/Presentation";
import Gallery from "@/components/Gallery";
import PhotoGallery from "@/components/PhotoGallery";
import Reviews from "@/components/Reviews";
import Menu from "@/components/Menu";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SideMarquee side="left" />
      <SideMarquee side="right" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Presentation />
        <Gallery />
        <PhotoGallery />
        <Reviews />
        <Menu />
        <Location />
      </main>
      <Footer />
    </>
  );
}
