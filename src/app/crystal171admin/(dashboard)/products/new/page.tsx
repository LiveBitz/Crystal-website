import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
