import ProductForm from "../ProductForm";
import { createRitualKit } from "../actions";

export default function NewRitualKitPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Ritual Kit</h1>
      <ProductForm action={createRitualKit} />
    </div>
  );
}
