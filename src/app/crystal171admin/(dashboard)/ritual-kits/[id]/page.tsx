import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "../ProductForm";
import { updateRitualKit } from "../actions";

export default async function EditRitualKitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Edit Ritual Kit</h1>
      <ProductForm action={updateRitualKit.bind(null, id)} defaultValues={product} />
    </div>
  );
}
