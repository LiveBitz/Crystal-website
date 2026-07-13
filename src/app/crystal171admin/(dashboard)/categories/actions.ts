"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

function readForm(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || null,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createCategory(formData: FormData) {
  const data = readForm(formData);
  if (!data.name) throw new Error("Name is required");
  await prisma.category.create({ data });
  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  redirect("/crystal171admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const data = readForm(formData);
  await prisma.category.update({ where: { id }, data });
  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  redirect("/crystal171admin/categories");
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
}
