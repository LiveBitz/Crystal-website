"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Loader2, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
    }
  }

  if (sent) {
    return (
      <Reveal y={20} duration={0.8}>
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck size={28} />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-bold tracking-tight text-foreground">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            If an account exists for that email, we&apos;ve sent a link to reset your password.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            Back to sign in
          </Link>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal y={20} duration={0.8}>
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </div>

      <div className="mt-10">
        <form onSubmit={onSubmit} className="space-y-5">
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

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Send reset link"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/60">
          Remembered it after all?{" "}
          <Link href="/login" className="font-semibold text-primary transition-colors hover:text-gold">
            Sign in
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
