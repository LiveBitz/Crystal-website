import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import DeleteForm from "@/components/admin/DeleteForm";
import { deleteArticle } from "./actions";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">Articles</h1>
          <p className="mt-1 text-sm text-foreground/60">The &ldquo;Our Recent Article&rdquo; section.</p>
        </div>
        <Link
          href="/crystal171admin/articles/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Article
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-sage-200 bg-white">
        {articles.length === 0 ? (
          <p className="p-6 text-sm text-foreground/60">No articles yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sage-200 text-xs uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-5 py-3">Article</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-sage-100">
                        {article.imageUrl && (
                          <Image
                            src={article.imageUrl}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-foreground/70">{article.author}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        article.active
                          ? "bg-primary/10 text-primary"
                          : "bg-sage-100 text-foreground/50"
                      }`}
                    >
                      {article.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/crystal171admin/articles/${article.id}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteForm action={deleteArticle.bind(null, article.id)} />
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
