import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import DeleteForm from "@/components/admin/DeleteForm";
import SearchBar from "@/components/admin/SearchBar";
import { deleteProduct } from "./actions";

const sectionLabel: Record<string, string> = {
  BESTSELLER: "Bestselling",
  NEW_ARRIVAL: "New Arrival",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const products = await prisma.product.findMany({
    where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
    orderBy: [{ section: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Products</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Feeds both the &ldquo;Bestselling Products&rdquo; and &ldquo;New Arrivals&rdquo; sections.
          </p>
        </div>
        <Link
          href="/crystal171admin/products/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="mt-6">
        <Suspense fallback={null}>
          <SearchBar placeholder="Search products by name..." />
        </Suspense>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-sage-200 bg-white">
        {products.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">
            {q ? `No products match "${q}".` : "No products yet."}
          </p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Section</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-sage-100">
                        {product.imageUrl && (
                          <Image
                            src={product.imageUrl}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-foreground/70">
                    {sectionLabel[product.section]}
                  </td>
                  <td className="px-5 py-3 text-foreground/70">₹{product.price}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        product.active
                          ? "bg-primary/10 text-primary"
                          : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {product.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/products/${product.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteProduct.bind(null, product.id)} />
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
