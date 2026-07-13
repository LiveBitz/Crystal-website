"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useWishlist } from "@/lib/wishlistStore";

export default function WishlistButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { items, addItem, removeItem } = useWishlist();
  
  const isActive = items.includes(productId);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const previousState = isActive;
    
    // Optimistic UI update
    if (isActive) removeItem(productId);
    else addItem(productId);

    const target = e.currentTarget as HTMLElement;
    gsap.fromTo(
      target,
      { scale: 0.8 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );

    const action = !previousState ? "add" : "remove";
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action }),
    });

    if (res.status === 401) {
      // Revert state on auth failure
      if (previousState) addItem(productId);
      else removeItem(productId);
      router.push("/sign-up");
      return;
    }

    if (!res.ok) {
      // Revert state on any other error
      if (previousState) addItem(productId);
      else removeItem(productId);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      aria-label="Toggle wishlist"
      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md active:scale-95"
    >
      <Heart
        size={16}
        className={`transition-colors duration-300 ${
          isActive ? "fill-red-500 text-red-500" : "text-foreground/40 hover:text-red-500"
        }`}
      />
    </button>
  );
}
