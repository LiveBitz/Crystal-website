import FaqForm from "../FaqForm";
import { createFaqItem } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Question</h1>
      <FaqForm action={createFaqItem} />
    </div>
  );
}
