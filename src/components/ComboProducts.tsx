import Reveal from "@/components/Reveal";
import ComboCarousel from "@/components/ComboCarousel";
import { prisma } from "@/lib/db";

export default async function ComboProducts() {
  const banners = await prisma.comboBanner.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Our Combo <span className="text-primary">Products</span>
          </h2>
        </Reveal>

        {banners.length > 0 ? (
          <>
            <ComboCarousel banners={banners} />
            <p className="mt-4 text-center font-serif text-sm font-semibold tracking-[0.25em] text-primary uppercase">
              ✦ Everything You Need For A Powerful Energy Transformation ✦
            </p>
          </>
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No combo banners yet.</p>
        )}
      </div>
    </section>
  );
}
