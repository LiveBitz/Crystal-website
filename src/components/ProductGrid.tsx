"use client";

import { ChevronLeft, ChevronRight, ShoppingBag, Star, ShoppingCart, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import RevealGroup from "@/components/RevealGroup";
import WishlistButton from "@/components/WishlistButton";
import { useCart } from "@/lib/cart";

export default function ProductGrid({ pages }: { pages: Product[][] }) {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const { addItem } = useCart();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [bursts, setBursts] = useState<Record<string, number[]>>({});
  const burstIdRef = useRef(0);

  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const next = () => setPage((p) => (p + 1) % pages.length);

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoadingIds(prev => [...prev, product.id]);
    
    // Check if user is logged in
    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      router.push("/sign-up");
      return;
    }

    addItem(product);
    
    setLoadingIds(prev => prev.filter(id => id !== product.id));
    setAddedIds(prev => [...prev, product.id]);
    
    // Trigger magic burst
    const burstId = ++burstIdRef.current;
    setBursts(prev => ({ ...prev, [product.id]: [...(prev[product.id] || []), burstId] }));
    setTimeout(() => {
      setBursts(prev => ({ ...prev, [product.id]: prev[product.id].filter(id => id !== burstId) }));
    }, 1000);
    
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 2500);
  };

  return (
    <>
      <RevealGroup
        animationKey={page}
        y={16}
        stagger={0.06}
        duration={0.7}
        className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mt-16 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {pages[page].map((product) => (
          <div key={product.id} className="flex w-[78%] shrink-0 snap-start flex-col sm:w-auto sm:shrink">
            <Link
              href={`/product/${product.slug}`}
              className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-light/60 hover:shadow-[0_12px_28px_rgba(58,31,61,0.14)]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-sage-100">
                <WishlistButton productId={product.id} imageUrl={product.imageUrl} />
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

              <div className="relative w-full">
                {bursts[product.id]?.map((id) => (
                  <div key={id} className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                    <span className="absolute animate-magic-burst-1 text-lg">💎</span>
                    <span className="absolute animate-magic-burst-2 text-xl" style={{ animationDelay: '0.05s' }}>✨</span>
                    <span className="absolute animate-magic-burst-3 text-lg" style={{ animationDelay: '0.1s' }}>💖</span>
                    <span className="absolute animate-magic-burst-4 text-sm" style={{ animationDelay: '0.15s' }}>✨</span>
                    <span className="absolute animate-magic-burst-5 text-sm" style={{ animationDelay: '0.08s' }}>💎</span>
                  </div>
                ))}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={loadingIds.includes(product.id) || addedIds.includes(product.id)}
                  className={`w-full mt-2 flex overflow-hidden items-center justify-center gap-2 rounded-lg py-3 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 disabled:opacity-100 ${
                    addedIds.includes(product.id) 
                      ? "bg-[#b87a88] hover:bg-[#b87a88]" 
                      : "bg-primary hover:bg-primary-dark disabled:opacity-70"
                  }`}
                >
                  {loadingIds.includes(product.id) ? (
                    <>Adding...</>
                  ) : addedIds.includes(product.id) ? (
                    <div className="relative flex w-full items-center justify-center min-h-[16px]">
                      <div className="absolute premium-cart-drive">
                        <ShoppingCart size={18} className="text-white" />
                      </div>
                      <div className="absolute premium-gem-collect">
                        <Gem size={10} className="text-white" />
                      </div>
                      <span className="absolute premium-text-reveal text-xs font-bold uppercase tracking-wide text-white">
                        Added
                      </span>
                    </div>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
            </Link>
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
