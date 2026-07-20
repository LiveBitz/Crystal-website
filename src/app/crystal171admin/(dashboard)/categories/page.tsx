import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { listCategories } from "@/lib/data/categories";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Shop By Purpose</h1>
          <p className="mt-1 text-sm text-foreground/60">
            The category tiles row on the homepage.
          </p>
        </div>
        <Link
          href="/crystal171admin/categories/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Category
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sage-200 bg-white">
        {categories.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No categories yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sage-100">
                        {category.imageUrl && (
                          <Image
                            src={category.imageUrl}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">{category.order}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        category.active
                          ? "bg-primary/10 text-primary"
                          : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {category.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/categories/${category.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteCategory.bind(null, category.id)} />
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
