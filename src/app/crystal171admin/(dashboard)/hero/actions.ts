"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

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
  await prisma.heroSlide.create({ data });
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
  redirect("/crystal171admin/hero");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const data = readForm(formData);
  await prisma.heroSlide.update({ where: { id }, data });
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
  redirect("/crystal171admin/hero");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/crystal171admin/hero");
  revalidatePath("/");
}
