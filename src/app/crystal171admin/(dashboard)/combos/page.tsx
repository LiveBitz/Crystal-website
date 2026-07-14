import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteComboBanner } from "./actions";

export default async function CombosPage() {
  const combos = await prisma.comboBanner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Combo Banners</h1>
          <p className="mt-1 text-sm text-foreground/60">
            The &ldquo;Our Combo Products&rdquo; banner carousel.
          </p>
        </div>
        <Link
          href="/crystal171admin/combos/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Banner
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sage-200 bg-white">
        {combos.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No combo banners yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Banner</th>
                <th className="px-5 py-3">Mobile image</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {combos.map((combo) => (
                <tr key={combo.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-sage-100">
                        <Image
                          src={combo.imageUrl}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-foreground">{combo.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {combo.mobileImageUrl ? (
                      <div className="relative h-10 w-14 overflow-hidden rounded-md bg-sage-100">
                        <Image
                          src={combo.mobileImageUrl}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-foreground/40">Uses desktop image</span>
                    )}
                  </td>
                  <td className="px-5 py-3">{combo.order}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        combo.active
                          ? "bg-primary/10 text-primary"
                          : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {combo.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/combos/${combo.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteComboBanner.bind(null, combo.id)} />
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
