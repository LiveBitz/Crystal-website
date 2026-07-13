"use client";

import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import RevealGroup from "@/components/RevealGroup";

export default function ProductGrid({ pages }: { pages: Product[][] }) {
  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const next = () => setPage((p) => (p + 1) % pages.length);

  return (
    <>
      <RevealGroup className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mt-16 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {pages[page].map((product) => (
          <div
            key={product.id}
            className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-sage-200 bg-white shadow-sm sm:w-auto sm:shrink"
          >
            <div className="relative aspect-square w-full bg-sage-100">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover"
                />
              )}
              <button
                aria-label="Add to wishlist"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-gold-light shadow-md transition hover:bg-primary-dark"
              >
                <Heart size={16} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < product.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
                <span className="ml-1 text-xs text-foreground/60">({product.reviews})</span>
              </div>

              <p className="text-sm font-medium text-foreground">{product.name}</p>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg font-bold text-primary">{product.price}</span>
                <span className="text-sm text-foreground/40 line-through">
                  {product.originalPrice}
                </span>
              </div>

              <button className="mt-auto rounded-md bg-primary py-2.5 text-xs font-semibold tracking-wide text-gold-light uppercase transition hover:bg-primary-dark">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </RevealGroup>

      {pages.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous products"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-gold-light shadow-md transition hover:bg-primary-dark"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-foreground/70">
            {page + 1}/{pages.length}
          </span>
          <button
            onClick={next}
            aria-label="Next products"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-gold-light shadow-md transition hover:bg-primary-dark"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
