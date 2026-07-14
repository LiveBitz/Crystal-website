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
      <Reveal className="px-4 text-center sm:px-8">
        <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl flex items-center justify-center gap-1 sm:gap-2 mt-10">
          <span className="relative inline-block whitespace-nowrap">
            Our Combo
            <span className="animate-bird-left absolute -top-4 sm:-top-5 -left-1 sm:-left-3 text-xl sm:text-2xl z-20 pointer-events-none drop-shadow-md opacity-0">
              <span className="animate-bee-buzz-reverse inline-block">🦢</span>
            </span>
            <span className="animate-bird-speech-left absolute bottom-full mb-6 sm:mb-8 -left-4 sm:-left-12 w-40 sm:w-48 text-[10px] sm:text-[11px] font-sans font-medium text-primary bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-2xl rounded-bl-none shadow-md pointer-events-none opacity-0 border border-sage-200 z-30 leading-snug text-left tracking-wide whitespace-normal">
              These combos are perfectly paired! So much value! ✨
            </span>
          </span>
          <span className="text-primary relative inline-block whitespace-nowrap">
            Products
            <span className="animate-bird-right absolute -top-4 sm:-top-5 -right-1 sm:-right-3 text-xl sm:text-2xl z-20 pointer-events-none drop-shadow-md opacity-0">
              <span className="animate-bee-buzz inline-block">🦢</span>
            </span>
            <span className="animate-bird-speech-right absolute bottom-full mb-6 sm:mb-8 -right-4 sm:-right-12 w-40 sm:w-48 text-[10px] sm:text-[11px] font-sans font-medium text-primary bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-2xl rounded-br-none shadow-md pointer-events-none opacity-0 border border-sage-200 z-30 leading-snug text-left tracking-wide whitespace-normal">
              I know! The energy works together flawlessly. 💖
            </span>
          </span>
        </h2>
      </Reveal>

      {banners.length > 0 ? (
        <>
          <ComboCarousel banners={banners} />
          <p className="mt-4 px-4 text-center font-serif text-sm font-semibold tracking-[0.25em] text-primary uppercase sm:px-8">
            ✦ Everything You Need For A Powerful Energy Transformation ✦
          </p>
        </>
      ) : (
        <p className="mt-12 px-4 text-center text-sm text-foreground/50 sm:px-8">
          No combo banners yet.
        </p>
      )}
    </section>
  );
}
