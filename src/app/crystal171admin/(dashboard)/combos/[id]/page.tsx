import { notFound } from "next/navigation";
import { getComboBannerById } from "@/lib/data/combos";
import ComboForm from "../ComboForm";
import { updateComboBanner } from "../actions";

export default async function EditComboPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const combo = await getComboBannerById(id);
  if (!combo) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Combo Banner</h1>
      <ComboForm action={updateComboBanner.bind(null, id)} defaultValues={combo} />
    </div>
  );
}
