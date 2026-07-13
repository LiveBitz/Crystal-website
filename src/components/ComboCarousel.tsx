"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

type Banner = { id: string; imageUrl: string; mobileImageUrl?: string | null };

export default function ComboCarousel({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + banners.length) % banners.length);
  const next = () => setActive((i) => (i + 1) % banners.length);

  const current = banners[active];

  return (
    <>
      <Reveal
        animationKey={active}
        className="relative mt-12 overflow-hidden rounded-2xl border border-gold-light/40 sm:mt-16"
        delay={0.1}
      >
        <div className="relative aspect-[4/3] w-full bg-sage-100 sm:aspect-[21/9]">
          {current?.imageUrl && (
            <picture>
              {current.mobileImageUrl && (
                <source media="(max-width: 639px)" srcSet={current.mobileImageUrl} />
              )}
              <Image
                src={current.imageUrl}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </picture>
          )}
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous combo"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white sm:left-8"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next combo"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white sm:right-8"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </Reveal>

      {banners.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              onClick={() => setActive(i)}
              aria-label={`Go to combo ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-primary" : "w-2 bg-primary/30"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
