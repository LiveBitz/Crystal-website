"use client";

import { useCart } from "@/lib/cart";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch since Zustand loads from localStorage
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const total = items.reduce((acc, item) => {
    const match = item.product.price.match(/[\d,]+(\.\d+)?/);
    const numPrice = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
    return acc + (numPrice * item.quantity);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[110] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-sage-100 px-6 py-4">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
            <ShoppingBag size={20} className="text-primary" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-foreground/50 transition-colors hover:bg-sage-100 hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-sage-50 p-4 text-primary">
                <ShoppingBag size={40} />
              </div>
              <p className="font-medium text-foreground">Your cart is empty</p>
              <p className="mt-1 text-sm text-foreground/50">Looks like you haven't added anything yet.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-sage-100 bg-sage-50">
                    {item.product.imageUrl && (
                      <Image 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="ml-2 text-foreground/40 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="mt-1 font-serif font-bold text-primary">{item.product.price}</p>
                    
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-sage-200">
                        <button 
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-sage-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-sage-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sage-100 bg-sage-50/50 p-6">
            <div className="mb-4 flex items-center justify-between text-lg font-bold text-foreground">
              <span>Subtotal</span>
              <span className="font-serif text-xl text-primary">Rs. {total.toLocaleString('en-IN')}</span>
            </div>
            {isLoggedIn ? (
              <Link 
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link 
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                Sign in to Checkout
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
