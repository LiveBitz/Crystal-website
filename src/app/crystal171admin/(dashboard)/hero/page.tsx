import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteHeroSlide } from "./actions";

export default async function HeroSlidesPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Hero Banners</h1>
          <p className="mt-1 text-sm text-foreground/60">
            The full-bleed banner carousel at the top of the homepage.
          </p>
        </div>
        <Link
          href="/crystal171admin/hero/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Banner
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-sage-200 bg-white">
        {slides.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No hero banners yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Mobile image</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {slides.map((slide) => (
                <tr key={slide.id}>
                  <td className="px-5 py-3">
                    <div className="relative h-12 w-20 overflow-hidden rounded-md bg-sage-100">
                      <Image src={slide.imageUrl} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {slide.mobileImageUrl ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-sage-100">
                        <Image
                          src={slide.mobileImageUrl}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-foreground/40">Uses desktop image</span>
                    )}
                  </td>
                  <td className="px-5 py-3">{slide.order}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        slide.active ? "bg-primary/10 text-primary" : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {slide.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/hero/${slide.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteHeroSlide.bind(null, slide.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
