import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sage-50">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-[45%] lg:flex-none lg:px-20 xl:px-24 relative">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
        >
          <ArrowLeft size={16} /> Back to store
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
      
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-primary-dark">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-light opacity-90" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
            <h1 className="font-serif text-5xl font-bold tracking-tight text-gold-light">
              Crystalenii
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-sage-100/90">
              Transform your energy and elevate your life with our curated selection of premium crystals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
