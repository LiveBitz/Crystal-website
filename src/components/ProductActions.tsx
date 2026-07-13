"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function ProductActions({
  productName,
  price,
  whatsappNumber,
}: {
  productName: string;
  price: string;
  whatsappNumber: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const configured = whatsappNumber.trim().length > 0;

  const contactHref = configured
    ? buildWhatsAppLink(
        whatsappNumber,
        `Hi! I'm interested in the ${productName} (${price}). Could you share more details?`,
      )
    : undefined;

  const buyHref = configured
    ? buildWhatsAppLink(
        whatsappNumber,
        `Hi! I'd like to buy the ${productName} (${price}) x${quantity}. Please help me complete this order.`,
      )
    : undefined;

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
        <a
          href={buyHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!configured}
          className={`flex-1 rounded-md bg-primary py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-gold-light transition-colors ${
            configured ? "hover:bg-primary-dark" : "pointer-events-none opacity-50"
          }`}
        >
          Buy It Now
        </a>
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
