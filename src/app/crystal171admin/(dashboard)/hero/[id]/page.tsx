import { notFound } from "next/navigation";
import { getHeroSlideById } from "@/lib/data/hero";
import HeroForm from "../HeroForm";
import { updateHeroSlide } from "../actions";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getHeroSlideById(id);
  if (!slide) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Hero Banner</h1>
      <HeroForm action={updateHeroSlide.bind(null, id)} defaultValues={slide} />
    </div>
  );
}
