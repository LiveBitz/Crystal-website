import { prisma } from "@/lib/db";
import CategoryForm from "../CategoryForm";
import { createCategory } from "../actions";

export default async function NewCategoryPage() {
  const allProducts = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ section: "asc" }, { order: "asc" }],
    select: { id: true, name: true, imageUrl: true, section: true },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Category</h1>
      <CategoryForm action={createCategory} allProducts={allProducts} />
    </div>
  );
}
