import CategoryForm from "../CategoryForm";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Category</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}
