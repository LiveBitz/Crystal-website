"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slug";
import type { ProductSection } from "@prisma/client";

function readForm(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    description: formData.get("description")?.toString() || null,
    imageUrl: formData.get("imageUrl")?.toString() || null,
    price: Number(formData.get("price") ?? 0),
    originalPrice: formData.get("originalPrice")
      ? Number(formData.get("originalPrice"))
      : null,
    rating: Number(formData.get("rating") ?? 5),
    reviews: Number(formData.get("reviews") ?? 0),
    section: formData.get("section")?.toString() as ProductSection,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const data = readForm(formData);
  if (!data.name) throw new Error("Name is required");

  const slug = await generateUniqueSlug(data.name, async (candidate) => {
    const existing = await prisma.product.findUnique({ where: { slug: candidate } });
    return existing !== null;
  });

  await prisma.product.create({ data: { ...data, slug } });
  revalidatePath("/crystal171admin/products");
  revalidatePath("/");
  redirect("/crystal171admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = readForm(formData);
  const product = await prisma.product.update({ where: { id }, data });
  revalidatePath("/crystal171admin/products");
  revalidatePath("/");
  revalidatePath(`/product/${product.slug}`);
  redirect("/crystal171admin/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });
  revalidatePath("/crystal171admin/products");
  revalidatePath("/");
  revalidatePath(`/product/${product.slug}`);
}
