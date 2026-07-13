"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

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
  await prisma.article.create({ data });
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
  redirect("/crystal171admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const data = readForm(formData);
  await prisma.article.update({ where: { id }, data });
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
  redirect("/crystal171admin/articles");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/crystal171admin/articles");
  revalidatePath("/");
}
