"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createArticleRow, deleteArticleRow, updateArticleRow } from "@/lib/data/articles";

function readForm(formData: FormData) {
  return {
    title: formData.get("title")?.toString() ?? "",
    excerpt: formData.get("excerpt")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || null,
    author: formData.get("author")?.toString() || "Crystalenii",
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createArticle(formData: FormData) {
  const data = readForm(formData);
  if (!data.title) throw new Error("Title is required");
  await createArticleRow(data);
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
  redirect("/crystal171admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const data = readForm(formData);
  await updateArticleRow(id, data);
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
  redirect("/crystal171admin/articles");
}

export async function deleteArticle(id: string) {
  await deleteArticleRow(id);
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
}
