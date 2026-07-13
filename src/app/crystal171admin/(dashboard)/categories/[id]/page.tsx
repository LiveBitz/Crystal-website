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

  const [category, allProducts] = await Promise.all([
    prisma.category.findUnique({
      where: { id },
      include: { products: { select: { id: true } } },
    }),
    prisma.product.findMany({
      where: { active: true },
      orderBy: [{ section: "asc" }, { order: "asc" }],
      select: { id: true, name: true, imageUrl: true, section: true },
    }),
  ]);

  if (!category) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Category</h1>
      <CategoryForm
        action={updateCategory.bind(null, id)}
        defaultValues={category}
        allProducts={allProducts}
        selectedProductIds={category.products.map((p) => p.id)}
      />
    </div>
  );
}
