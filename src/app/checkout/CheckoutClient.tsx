"use client";

import { useCart } from "@/lib/cart";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CheckoutUser = {
  name: string;
  email: string;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
};

export default function CheckoutClient({
  user,
  whatsappNumber,
}: {
  user: CheckoutUser;
  whatsappNumber: string;
}) {
  const { items, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-8 pt-20">
        <h1 className="font-serif text-3xl font-bold text-foreground">Your cart is empty</h1>
        <button 
          onClick={() => router.push("/")}
          className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const total = items.reduce((acc, item) => {
    const match = item.product.price.match(/[\d,]+(\.\d+)?/);
    const numPrice = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
    return acc + (numPrice * item.quantity);
  }, 0);

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const address = [
      formData.get("addressLine1"),
      formData.get("addressLine2"),
      formData.get("city"),
      formData.get("state"),
      formData.get("postalCode"),
      formData.get("country")
    ].filter(Boolean).join(", ");
    
    const phone = formData.get("phone");
    const name = formData.get("name");

    let message = `*New Order from ${name}*\n\n`;
    message += `*Shipping Details:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `*Order Items:*\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${item.product.price})\n`;
    });
    
    message += `\n*Total Amount:* Rs. ${total.toLocaleString('en-IN')}\n`;
    message += `\nPlease confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Prepare payload
    const orderItems = items.map(item => {
      const match = item.product.price.match(/[\d,]+(\.\d+)?/);
      const numPrice = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
      return {
        productId: item.product.id,
        quantity: item.quantity,
        priceAtTime: numPrice
      };
    });

    const shippingAddress = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      addressLine1: formData.get("addressLine1") as string,
      addressLine2: (formData.get("addressLine2") as string) || null,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
    };

    // Log the initiated order asynchronously
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: total, items: orderItems, address: shippingAddress })
    }).catch(console.error);
    
    clearCart();
    window.location.href = waUrl;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <h1 className="mb-10 font-serif text-3xl font-bold text-foreground text-center">Secure Checkout</h1>
      
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Shipping Form */}
        <div className="flex-1 rounded-2xl border border-sage-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">Shipping Details</h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Full Name</label>
                <input required name="name" type="text" defaultValue={user.name || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Address Line 1</label>
                <input required name="addressLine1" type="text" defaultValue={user.addressLine1 || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Address Line 2 <span className="text-foreground/40 font-normal normal-case tracking-normal">(Optional)</span></label>
                <input name="addressLine2" type="text" defaultValue={user.addressLine2 || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">City</label>
                <input required name="city" type="text" defaultValue={user.city || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">State</label>
                <input required name="state" type="text" defaultValue={user.state || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Postal Code</label>
                <input required name="postalCode" type="text" defaultValue={user.postalCode || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Country</label>
                <input required name="country" type="text" defaultValue={user.country || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70">Phone Number</label>
                <input required name="phone" type="tel" defaultValue={user.phone || ""} className="mt-1.5 block w-full rounded-lg border border-sage-200 bg-sage-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-colors" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0 rounded-2xl border border-sage-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">Order Summary</h2>
          <ul className="space-y-4 mb-6">
            {items.map(item => (
              <li key={item.product.id} className="flex gap-4 border-b border-sage-100 pb-4 last:border-0 last:pb-0">
                <div className="relative h-16 w-16 shrink-0 rounded-md border border-sage-100 bg-sage-50 overflow-hidden">
                  {item.product.imageUrl && <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />}
                </div>
                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-medium text-foreground">{item.product.name}</h3>
                  <p className="mt-1 text-xs text-foreground/60">Qty: {item.quantity}</p>
                  <p className="mt-1 font-semibold text-primary">{item.product.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-sage-200 pt-4 mb-6 flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span className="font-serif text-primary text-xl">Rs. {total.toLocaleString('en-IN')}</span>
          </div>
          <button 
            type="submit" 
            form="checkout-form"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-semibold tracking-wide text-sage-50 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
          >
            Place Order via WhatsApp
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
