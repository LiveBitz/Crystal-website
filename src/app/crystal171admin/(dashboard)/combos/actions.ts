"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

function readForm(formData: FormData) {
  return {
    title: formData.get("title")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() ?? "",
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createComboBanner(formData: FormData) {
  const data = readForm(formData);
  if (!data.title || !data.imageUrl) throw new Error("Title and image are required");
  await prisma.comboBanner.create({ data });
  revalidatePath("/crystal171admin/combos");
  revalidatePath("/");
  redirect("/crystal171admin/combos");
}

export async function updateComboBanner(id: string, formData: FormData) {
  const data = readForm(formData);
  await prisma.comboBanner.update({ where: { id }, data });
  revalidatePath("/crystal171admin/combos");
  revalidatePath("/");
  redirect("/crystal171admin/combos");
}

export async function deleteComboBanner(id: string) {
  await prisma.comboBanner.delete({ where: { id } });
  revalidatePath("/crystal171admin/combos");
  revalidatePath("/");
}
