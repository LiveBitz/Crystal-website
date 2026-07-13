"use client";

import gsap from "gsap";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RevealGroup from "@/components/RevealGroup";

export type FaqEntry = { id: string; question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === open) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [open]);

  return (
    <RevealGroup y={16} className="mt-12 divide-y divide-sage-200 sm:mt-16">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.id} className="py-5">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-foreground">{faq.question}</span>
              <Plus
                size={20}
                className={`shrink-0 text-primary transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            <div
              ref={(el) => {
                answerRefs.current[i] = el;
              }}
              className="h-0 overflow-hidden opacity-0"
            >
              <p className="pt-3 text-sm leading-relaxed text-foreground/70">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </RevealGroup>
  );
}
