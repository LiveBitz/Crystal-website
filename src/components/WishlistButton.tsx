"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useWishlist } from "@/lib/wishlistStore";

export default function WishlistButton({ productId, imageUrl }: { productId: string, imageUrl?: string | null }) {
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
    const icon = target.querySelector('svg');
    
    // Spawn flower particles if adding to wishlist
    if (!previousState) {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        // Elegant minimal flower SVG
        particle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#d94a6a" stroke="#d94a6a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 3.183-7.682A4.5 4.5 0 1 1 22.864 3 4.5 4.5 0 1 1 18.318 10.5M12 7.5v13M12 7.5a4.5 4.5 0 1 0-3.183-7.682A4.5 4.5 0 1 0 1.136 3 4.5 4.5 0 1 0 5.682 10.5M12 11.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 0 1-4.5-4.5Z"/></svg>`;
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '20';
        target.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 25 + Math.random() * 25;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 15;

        gsap.to(particle, {
          x: tx,
          y: ty,
          rotation: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0.5 + Math.random() * 0.8,
          duration: 0.8 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => {
            particle.remove();
          }
        });
      }

      // Fly-to-navbar animation for product image
      if (imageUrl) {
        const navWishlistIcon = document.getElementById('nav-wishlist-icon');
        if (navWishlistIcon) {
          const startRect = target.getBoundingClientRect();
          const endRect = navWishlistIcon.getBoundingClientRect();
          
          const flyingImage = document.createElement('img');
          flyingImage.src = imageUrl;
          flyingImage.style.position = 'fixed';
          flyingImage.style.left = `${startRect.left}px`;
          flyingImage.style.top = `${startRect.top}px`;
          flyingImage.style.width = '40px';
          flyingImage.style.height = '40px';
          flyingImage.style.objectFit = 'cover';
          flyingImage.style.borderRadius = '50%';
          flyingImage.style.zIndex = '9999';
          flyingImage.style.pointerEvents = 'none';
          flyingImage.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          document.body.appendChild(flyingImage);

          // Fly in an arc to the navbar
          gsap.to(flyingImage, {
            x: endRect.left - startRect.left,
            y: endRect.top - startRect.top,
            scale: 0.4,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              flyingImage.remove();
              gsap.fromTo(navWishlistIcon, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            }
          });
        }
      }
    }

    // Smooth, premium button press
    gsap.fromTo(
      target,
      { scale: 0.95 },
      { scale: 1, duration: 0.4, ease: "power3.out" }
    );

    // Subtle, elegant icon pulse
    if (icon) {
      gsap.fromTo(
        icon,
        { scale: 0.8 },
        { scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }

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
          isActive ? "fill-[#d94a6a] text-[#d94a6a]" : "text-foreground/40 hover:text-[#d94a6a]"
        }`}
      />
    </button>
  );
}
