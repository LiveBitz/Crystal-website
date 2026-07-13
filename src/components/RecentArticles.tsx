import Reveal from "@/components/Reveal";
import ArticleGrid, { type Article } from "@/components/ArticleGrid";
import { prisma } from "@/lib/db";
import { chunk } from "@/lib/utils";

export default async function RecentArticles() {
  const articles = await prisma.article.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  const formatted: Article[] = articles.map((a) => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    imageUrl: a.imageUrl,
    author: a.author,
    date: a.publishedAt.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const pages = chunk(formatted, 3);

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Our Recent <span className="text-primary">Article</span>
          </h2>
        </Reveal>

        {pages.length > 0 ? (
          <ArticleGrid pages={pages} />
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No articles yet.</p>
        )}
      </div>
    </section>
  );
}
