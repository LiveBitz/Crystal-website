"use client";

import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import RevealGroup from "@/components/RevealGroup";

export default function ProductGrid({ pages }: { pages: Product[][] }) {
  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const next = () => setPage((p) => (p + 1) % pages.length);

  // Decorative buttons that sit inside the card-link shouldn't trigger navigation.
  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <RevealGroup className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mt-16 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {pages[page].map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-light/60 hover:shadow-[0_12px_28px_rgba(58,31,61,0.14)] sm:w-auto sm:shrink"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-sage-100">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-5">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < product.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
                <span className="ml-1 text-xs text-foreground/50">({product.reviews})</span>
              </div>

              <p className="line-clamp-2 font-serif text-[15px] font-semibold leading-snug text-foreground">
                {product.name}
              </p>

              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="font-serif text-xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-foreground/40 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={stop}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-xs font-semibold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-primary-dark"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
            </div>
          </Link>
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
