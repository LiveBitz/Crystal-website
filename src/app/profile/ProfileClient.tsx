"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Loader2, LogOut, CheckCircle2, Package } from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  priceAtTime: number;
  product: { name: string; imageUrl: string | null };
};

type Order = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  items: OrderItem[];
};

export default function ProfileClient({ user, orders = [] }: { user: any, orders: Order[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleLogout() {
    setLogoutLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setSuccess(true);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update profile");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <Reveal y={20} duration={0.8}>
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-foreground/60">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center gap-2 rounded-full border border-sage-200 bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-sage-50 disabled:opacity-50"
          >
            {logoutLoading ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            Sign out
          </button>
        </div>

        <div className="grid gap-10">
          <div className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">Shipping Details</h2>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="addressLine1">
                    Address Line 1
                  </label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    defaultValue={user.addressLine1 || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="123 Main St"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="addressLine2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    defaultValue={user.addressLine2 || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Apt 4B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    defaultValue={user.city || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="state">
                    State / Province
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    defaultValue={user.state || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="postalCode">
                    ZIP / Postal Code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    defaultValue={user.postalCode || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="10001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground" htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    defaultValue={user.country || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="United States"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={user.phone || ""}
                    className="mt-2 block w-full rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-md disabled:opacity-70 disabled:hover:shadow-none"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                </button>
                
                {success && (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                    <CheckCircle2 size={18} /> Saved
                  </span>
                )}
                {error && (
                  <span className="text-sm font-medium text-red-500">{error}</span>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Package className="text-primary" size={24} />
              <h2 className="font-serif text-xl font-semibold text-foreground">Order History</h2>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl bg-sage-50 py-12 text-center">
                <Package className="mb-3 text-foreground/30" size={48} />
                <p className="text-sm font-medium text-foreground/60">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="overflow-hidden rounded-xl border border-sage-200 bg-sage-50">
                    <div className="border-b border-sage-200 bg-white px-5 py-4 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                          Order Placed
                        </p>
                        <p className="font-medium text-primary">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                          Total
                        </p>
                        <p className="font-medium text-primary">Rs. {order.totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                          order.status === 'DELIVERED' ? 'bg-[#25D366]/10 text-[#128C7E]' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-sage-200 px-5 py-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            {item.product.imageUrl ? (
                              <img src={item.product.imageUrl} alt={item.product.name} className="h-12 w-12 rounded-md object-cover" />
                            ) : (
                              <div className="h-12 w-12 rounded-md bg-sage-200" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                              <p className="text-xs text-foreground/60">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            Rs. {(item.priceAtTime * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
