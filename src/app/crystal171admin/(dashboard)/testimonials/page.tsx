import Link from "next/link";
import { Plus } from "lucide-react";
import { listTestimonials } from "@/lib/data/testimonials";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsPage() {
  const testimonials = await listTestimonials();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Testimonials</h1>
          <p className="mt-1 text-sm text-foreground/60">
            The scrolling customer testimonial marquee.
          </p>
        </div>
        <Link
          href="/crystal171admin/testimonials/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Testimonial
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sage-200 bg-white">
        {testimonials.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No testimonials yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Quote</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td className="px-5 py-3 font-medium text-foreground">{t.name}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-foreground/70">{t.quote}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        t.active ? "bg-primary/10 text-primary" : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {t.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/testimonials/${t.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteTestimonial.bind(null, t.id)} />
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
