"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealGroup({
  children,
  className,
  y = 24,
  stagger = 0.1,
  duration = 0.6,
  animationKey,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  animationKey?: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, stagger, duration, animationKey]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
