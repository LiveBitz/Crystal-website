import { prisma } from "@/lib/db";
import HeroCarousel from "@/components/HeroCarousel";

export default async function Hero() {
  const slides = await prisma.heroSlide.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return <HeroCarousel slides={slides.map((s) => ({ id: s.id, imageUrl: s.imageUrl }))} />;
}
