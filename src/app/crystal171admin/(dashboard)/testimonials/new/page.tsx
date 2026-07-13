import TestimonialForm from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
