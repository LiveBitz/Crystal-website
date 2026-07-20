import { listHeroSlides } from "@/lib/data/hero";
import HeroCarousel from "@/components/HeroCarousel";

export default async function Hero() {
  const slides = await listHeroSlides({ activeOnly: true });

  return (
    <HeroCarousel
      slides={slides.map((s) => ({
        id: s.id,
        imageUrl: s.imageUrl,
        mobileImageUrl: s.mobileImageUrl,
      }))}
    />
  );
}
