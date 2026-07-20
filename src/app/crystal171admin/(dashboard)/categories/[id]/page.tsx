import { notFound } from "next/navigation";
import { getCategoryById, getProductIdsForCategory } from "@/lib/data/categories";
import { listProducts } from "@/lib/data/products";
import CategoryForm from "../CategoryForm";
import { updateCategory } from "../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, allProducts, selectedProductIds] = await Promise.all([
    getCategoryById(id),
    listProducts({ activeOnly: true }),
    getProductIdsForCategory(id),
  ]);

  if (!category) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Category</h1>
      <CategoryForm
        action={updateCategory.bind(null, id)}
        defaultValues={category}
        allProducts={allProducts}
        selectedProductIds={selectedProductIds}
      />
    </div>
  );
}
