"use client";

import { ChevronLeft, ChevronRight, Flower2, ShieldCheck, Scale, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

type Banner = { id: string; imageUrl: string };

const highlights = [
  { icon: Flower2, label: "Attract Wealth & Prosperity" },
  { icon: ShieldCheck, label: "Powerful Protection" },
  { icon: Scale, label: "Energy Balance & Well-being" },
  { icon: Sun, label: "Cleanse, Charge & Rejuvenate" },
];

export default function ComboCarousel({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + banners.length) % banners.length);
  const next = () => setActive((i) => (i + 1) % banners.length);

  const current = banners[active];

  return (
    <>
      <Reveal
        className="relative mt-12 overflow-hidden rounded-2xl border border-gold-light/40 sm:mt-16"
        delay={0.1}
      >
        <div className="relative aspect-[16/9] w-full bg-sage-100 sm:aspect-[21/9]">
          {current?.imageUrl && (
            <Image
              src={current.imageUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
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

        {/* Highlights bar */}
        <div className="grid grid-cols-2 gap-4 bg-primary px-6 py-5 sm:grid-cols-4 sm:gap-6 sm:px-10">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="shrink-0 text-gold-light" size={22} strokeWidth={1.5} />
              <p className="text-xs font-semibold leading-tight text-gold-light sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
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
