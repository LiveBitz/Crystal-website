import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CategoryForm from "../CategoryForm";
import { updateCategory } from "../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Category</h1>
      <CategoryForm action={updateCategory.bind(null, id)} defaultValues={category} />
    </div>
  );
}
