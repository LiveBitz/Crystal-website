import ComboForm from "../ComboForm";
import { createComboBanner } from "../actions";

export default function NewComboPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Combo Banner</h1>
      <ComboForm action={createComboBanner} />
    </div>
  );
}
