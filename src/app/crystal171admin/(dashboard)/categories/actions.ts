"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  categorySlugExists,
  createCategoryRow,
  deleteCategoryRow,
  updateCategoryRow,
} from "@/lib/data/categories";
import { generateUniqueSlug } from "@/lib/slug";

function readForm(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || null,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    productIds: formData.getAll("productIds").map((v) => v.toString()),
  };
}

export async function createCategory(formData: FormData) {
  const data = readForm(formData);
  if (!data.name) throw new Error("Name is required");

  const slug = await generateUniqueSlug(data.name, categorySlugExists);

  await createCategoryRow({ ...data, slug });

  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  redirect("/crystal171admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const data = readForm(formData);

  const category = await updateCategoryRow(id, data);

  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  if (category) revalidatePath(`/shop/${category.slug}`);
  redirect("/crystal171admin/categories");
}

export async function deleteCategory(id: string) {
  const category = await deleteCategoryRow(id);
  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  if (category) revalidatePath(`/shop/${category.slug}`);
}
