"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.7,
  animationKey,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  animationKey?: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
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
  }, [y, delay, duration, animationKey]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
