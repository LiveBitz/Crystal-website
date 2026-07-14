"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CheckCircle2, Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to reset password.");
    }
  }

  if (!token) {
    return (
      <Reveal y={20} duration={0.8}>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Invalid reset link
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            This link is missing or malformed. Request a new one below.
          </p>
          <Link
            href="/forgot-password"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            Request a new link
          </Link>
        </div>
      </Reveal>
    );
  }

  if (done) {
    return (
      <Reveal y={20} duration={0.8}>
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-bold tracking-tight text-foreground">
            Password updated
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            Taking you to sign in...
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal y={20} duration={0.8}>
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Set a new password
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Choose a new password for your account.
        </p>
      </div>

      <div className="mt-10">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="password">
              New password
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

          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Reset password"}
          </button>
        </form>
      </div>
    </Reveal>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
