"use client";

import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const messages = [
  "Free Shipping PAN India",
  "Handcrafted with Authentic Gemstones",
  "Energized & Blessed Before Dispatch",
];

export default function TopBar() {
  const [index, setIndex] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const prev = () => setIndex((i) => (i - 1 + messages.length) % messages.length);
  const next = () => setIndex((i) => (i + 1) % messages.length);

  // Entrance fade on load.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  // Continuous auto-rotation through the announcements.
  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, []);

  // Crossfade the message text whenever it changes.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={barRef}
      className="flex items-center justify-between gap-4 bg-primary px-4 py-2.5 text-sage-50 sm:px-8"
    >
      <button
        onClick={prev}
        aria-label="Previous announcement"
        className="rounded-full p-1 text-sage-100 transition-colors hover:bg-primary-light"
      >
        <ChevronLeft size={18} />
      </button>
      <p ref={textRef} className="text-center text-xs font-medium tracking-wide sm:text-sm">
        {messages[index]}
      </p>
      <button
        onClick={next}
        aria-label="Next announcement"
        className="rounded-full p-1 text-sage-100 transition-colors hover:bg-primary-light"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
