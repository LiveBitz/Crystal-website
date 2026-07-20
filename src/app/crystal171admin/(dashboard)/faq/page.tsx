import Link from "next/link";
import { Plus } from "lucide-react";
import { listFaqItems } from "@/lib/data/faq";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteFaqItem } from "./actions";

export default async function FaqPage() {
  const items = await listFaqItems();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">FAQ</h1>
          <p className="mt-1 text-sm text-foreground/60">The frequently asked questions accordion.</p>
        </div>
        <Link
          href="/crystal171admin/faq/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Question
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sage-200 bg-white">
        {items.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No FAQ items yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Question</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="max-w-md px-5 py-3 font-medium text-foreground">
                    {item.question}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {item.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/faq/${item.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteFaqItem.bind(null, item.id)} />
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
