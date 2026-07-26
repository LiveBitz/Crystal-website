import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sage-50">
      <div className="relative flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
        >
          <ArrowLeft size={16} /> Back to store
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
