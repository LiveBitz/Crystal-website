"use client";

import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { id: string; imageUrl: string | null };

// Shortest wrap-aware direction between two slide indexes: 1 = forward (new
// slide enters from the right), -1 = backward (enters from the left).
function getDirection(from: number, to: number, length: number) {
  const diff = to - from;
  if (diff === 0) return 1;
  if (Math.abs(diff) === length - 1) return diff > 0 ? -1 : 1;
  return diff > 0 ? 1 : -1;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const displaySlides: Slide[] = slides.length > 0 ? slides : [{ id: "placeholder", imageUrl: null }];
  const [active, setActive] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveRef = useRef(0);

  const prev = () => setActive((i) => (i - 1 + displaySlides.length) % displaySlides.length);
  const next = () => setActive((i) => (i + 1) % displaySlides.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.3 });
      tl.fromTo(bannerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }).fromTo(
        offerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3",
      );
    });
    return () => ctx.revert();
  }, []);

  // Auto-advance through the slides.
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % displaySlides.length);
    }, 2500);
    return () => clearInterval(id);
  }, [displaySlides.length, active]);

  // Sleek crossfade + swipe between slides.
  useEffect(() => {
    const from = prevActiveRef.current;
    if (from === active) return;

    const dir = getDirection(from, active, displaySlides.length);
    const outEl = slideRefs.current[from];
    const inEl = slideRefs.current[active];

    const ctx = gsap.context(() => {
      gsap.to(outEl, { opacity: 0, xPercent: -dir * 6, duration: 0.6, ease: "power2.inOut" });
      gsap.fromTo(
        inEl,
        { opacity: 0, xPercent: dir * 6 },
        { opacity: 1, xPercent: 0, duration: 0.6, ease: "power2.inOut" },
      );
    });

    prevActiveRef.current = active;
    return () => ctx.revert();
  }, [active, displaySlides.length]);

  return (
    <section className="relative bg-gradient-to-b from-sage-100 via-sage-50 to-sage-100">
      {/* Banner image — full-bleed hero banner */}
      <div
        ref={bannerRef}
        className="relative aspect-[4/3] w-full max-h-[380px] overflow-hidden bg-sage-100/60 sm:aspect-[21/9] sm:max-h-[560px]"
      >
        {displaySlides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            )}
          </div>
        ))}

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white sm:left-8"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white sm:right-8"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {displaySlides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Limited time offer bar */}
      <div ref={offerRef} className="bg-primary py-3">
        <p className="text-center font-serif text-sm font-semibold tracking-[0.3em] text-gold-light uppercase">
          ✦ Limited Time Offer ✦
        </p>
      </div>
    </section>
  );
}
