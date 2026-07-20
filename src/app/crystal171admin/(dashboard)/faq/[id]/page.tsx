import { notFound } from "next/navigation";
import { getFaqItemById } from "@/lib/data/faq";
import FaqForm from "../FaqForm";
import { updateFaqItem } from "../actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getFaqItemById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Question</h1>
      <FaqForm action={updateFaqItem.bind(null, id)} defaultValues={item} />
    </div>
  );
}
