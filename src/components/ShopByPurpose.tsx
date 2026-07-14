import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import { prisma } from "@/lib/db";

export default async function ShopByPurpose() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="bg-sage-50 py-16 sm:py-20 relative overflow-hidden">
      {/* Global Energy Particles (Screen-wide) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-80 text-xl sm:text-2xl">
        {/* Left Side Sources */}
        <div className="energy-absorb-left absolute top-[15%] left-0 drop-shadow-sm" style={{ animationDelay: '0s' }}>🌸</div>
        <div className="energy-absorb-left absolute top-[35%] left-0 drop-shadow-sm" style={{ animationDelay: '2.5s' }}>🌺</div>
        <div className="energy-absorb-left absolute top-[55%] left-0 drop-shadow-sm" style={{ animationDelay: '1.2s' }}>🌸</div>
        <div className="energy-absorb-left absolute top-[70%] left-0 drop-shadow-sm" style={{ animationDelay: '3.8s' }}>🌷</div>
        <div className="energy-absorb-left absolute top-[85%] left-0 drop-shadow-sm" style={{ animationDelay: '0.5s' }}>🌺</div>
        <div className="energy-absorb-left absolute top-[45%] left-0 drop-shadow-sm" style={{ animationDelay: '4.2s' }}>🌸</div>

        {/* Right Side Sources */}
        <div className="energy-absorb-right absolute top-[20%] right-0 drop-shadow-sm" style={{ animationDelay: '0.8s' }}>🌺</div>
        <div className="energy-absorb-right absolute top-[40%] right-0 drop-shadow-sm" style={{ animationDelay: '3.2s' }}>🌸</div>
        <div className="energy-absorb-right absolute top-[60%] right-0 drop-shadow-sm" style={{ animationDelay: '1.5s' }}>🌸</div>
        <div className="energy-absorb-right absolute top-[80%] right-0 drop-shadow-sm" style={{ animationDelay: '2.1s' }}>🌷</div>
        <div className="energy-absorb-right absolute top-[30%] right-0 drop-shadow-sm" style={{ animationDelay: '4.7s' }}>🌸</div>
        <div className="energy-absorb-right absolute top-[75%] right-0 drop-shadow-sm" style={{ animationDelay: '0.3s' }}>🌺</div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Shop By <span className="text-primary relative inline-block">Purpose
              <span className="animate-butterfly absolute -top-4 -right-5 text-2xl z-20 pointer-events-none drop-shadow-md opacity-0">
                <span className="animate-butterfly-flap inline-block">🦋</span>
              </span>
              <span className="animate-butterfly-hi absolute -top-8 -right-6 text-[11px] font-sans font-medium text-primary bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm pointer-events-none opacity-0 border border-sage-200 z-30 tracking-wide">Hi!</span>
            </span>
          </h2>
        </Reveal>

        {categories.length > 0 ? (
          <RevealGroup className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:grid-cols-6 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="group relative flex flex-col items-center gap-3 text-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-sage-200 bg-white transition-all duration-500 group-hover:shadow-lg group-hover:border-primary/20">
                  {category.imageUrl && (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(min-width: 640px) 150px, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-primary">{category.name}</p>
              </Link>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No categories yet.</p>
        )}
      </div>
    </section>
  );
}
