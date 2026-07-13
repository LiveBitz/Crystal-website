"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";

function readForm(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || null,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    productIds: formData.getAll("productIds").map((v) => v.toString()),
  };
}

// Ensures the slug is unique by appending -2, -3, ... on collision.
async function uniqueSlug(name: string, ignoreId?: string) {
  const base = slugify(name) || "category";
  let slug = base;
  let n = 2;
  while (
    await prisma.category.findFirst({
      where: { slug, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
    })
  ) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function createCategory(formData: FormData) {
  const { name, imageUrl, order, active, productIds } = readForm(formData);
  if (!name) throw new Error("Name is required");

  const slug = await uniqueSlug(name);

  await prisma.category.create({
    data: {
      name,
      slug,
      imageUrl,
      order,
      active,
      products: { connect: productIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  redirect("/crystal171admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const { name, imageUrl, order, active, productIds } = readForm(formData);

  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      imageUrl,
      order,
      active,
      products: { set: productIds.map((pid) => ({ id: pid })) },
    },
  });

  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  revalidatePath(`/shop/${category.slug}`);
  redirect("/crystal171admin/categories");
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.delete({ where: { id } });
  revalidatePath("/crystal171admin/categories");
  revalidatePath("/");
  revalidatePath(`/shop/${category.slug}`);
}
