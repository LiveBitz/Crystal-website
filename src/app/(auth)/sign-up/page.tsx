"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create account");
      setLoading(false);
    }
  }

  return (
    <Reveal y={20} duration={0.8}>
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Join us to access exclusive collections
        </p>
      </div>

      <div className="mt-10">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 block w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              placeholder="Sarah Jenkins"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 block w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-2 block w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary transition-colors hover:text-gold">
            Sign in
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
