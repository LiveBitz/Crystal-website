import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ArticleForm from "../ArticleForm";
import { updateArticle } from "../actions";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Article</h1>
      <ArticleForm action={updateArticle.bind(null, id)} defaultValues={article} />
    </div>
  );
}
