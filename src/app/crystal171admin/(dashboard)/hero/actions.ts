"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createHeroSlideRow, deleteHeroSlideRow, updateHeroSlideRow } from "@/lib/data/hero";

function readForm(formData: FormData) {
  return {
    imageUrl: formData.get("imageUrl")?.toString() ?? "",
    mobileImageUrl: formData.get("mobileImageUrl")?.toString() || null,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createHeroSlide(formData: FormData) {
  const data = readForm(formData);
  if (!data.imageUrl) throw new Error("Image is required");
  await createHeroSlideRow(data);
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
  redirect("/crystal171admin/hero");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const data = readForm(formData);
  await updateHeroSlideRow(id, data);
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
  redirect("/crystal171admin/hero");
}

export async function deleteHeroSlide(id: string) {
  await deleteHeroSlideRow(id);
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
}
