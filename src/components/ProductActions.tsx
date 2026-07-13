"use client";

import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";

export default function ProductActions({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const configured = whatsappNumber.trim().length > 0;
  const { addItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const contactHref = configured
    ? buildWhatsAppLink(
        whatsappNumber,
        `Hi! I'm interested in the ${product.name} (${product.price}). Could you share more details?`,
      )
    : undefined;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      router.push("/sign-up");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    setLoading(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Quantity
        </p>
        <div className="mt-1.5 flex w-fit items-center rounded-md border border-sage-200">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-sage-100"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-sage-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={contactHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!configured}
          className={`flex flex-1 items-center justify-center rounded-md border border-primary py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition-colors ${
            configured
              ? "hover:bg-primary hover:text-gold-light"
              : "pointer-events-none opacity-50"
          }`}
        >
          Contact Us
        </a>
        <button
          onClick={handleAddToCart}
          disabled={loading || added || !configured}
          className={`flex-1 flex items-center justify-center gap-2 rounded-md py-3.5 text-center text-sm font-semibold uppercase tracking-wide transition-colors ${
            !configured ? "pointer-events-none opacity-50 bg-primary text-gold-light" :
            added ? "bg-[#b87a88] text-white hover:bg-[#b87a88]" : "bg-primary text-gold-light hover:bg-primary-dark"
          }`}
        >
          {loading ? (
            "Adding..."
          ) : added ? (
            <>
              <Check size={18} className="animate-in zoom-in duration-300" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {!configured && (
        <p className="text-xs text-foreground/50">
          WhatsApp ordering isn&apos;t set up yet — add WHATSAPP_NUMBER in .env to enable these
          buttons.
        </p>
      )}
    </div>
  );
}
