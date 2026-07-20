import { listProducts } from "@/lib/data/products";
import CategoryForm from "../CategoryForm";
import { createCategory } from "../actions";

export default async function NewCategoryPage() {
  const allProducts = await listProducts({ activeOnly: true });

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Category</h1>
      <CategoryForm action={createCategory} allProducts={allProducts} />
    </div>
  );
}
