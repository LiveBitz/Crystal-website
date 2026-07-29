"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProductRow, deleteProductRow, productSlugExists, updateProductRow } from "@/lib/data/products";
import { setProductVariants } from "@/lib/data/productVariants";
import { normalizeBeadSize } from "@/lib/beadSize";
import { generateUniqueSlug } from "@/lib/slug";
import type { ProductSection } from "@/lib/data/products";

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
    isRitualKit: true,
  };
}

function readVariants(formData: FormData) {
  const sizes = formData.getAll("variantSize").map((v) => v.toString());
  const prices = formData.getAll("variantPrice").map((v) => v.toString());
  const originalPrices = formData.getAll("variantOriginalPrice").map((v) => v.toString());

  return sizes
    .map((size, i) => ({
      size: normalizeBeadSize(size),
      price: prices[i] ? Number(prices[i]) : NaN,
      originalPrice: originalPrices[i] ? Number(originalPrices[i]) : null,
    }))
    .filter(
      (v): v is { size: string; price: number; originalPrice: number | null } =>
        v.size !== null && !Number.isNaN(v.price),
    );
}

export async function createRitualKit(formData: FormData) {
  const data = readForm(formData);
  if (!data.name) throw new Error("Name is required");

  const slug = await generateUniqueSlug(data.name, productSlugExists);

  const id = await createProductRow({ ...data, slug });
  await setProductVariants(id, readVariants(formData));
  revalidatePath("/crystal171admin/ritual-kits");
  revalidatePath("/ritual-kits");
  revalidatePath("/");
  redirect("/crystal171admin/ritual-kits");
}

export async function updateRitualKit(id: string, formData: FormData) {
  const data = readForm(formData);
  const product = await updateProductRow(id, data);
  await setProductVariants(id, readVariants(formData));
  revalidatePath("/crystal171admin/ritual-kits");
  revalidatePath("/ritual-kits");
  revalidatePath("/");
  if (product) revalidatePath(`/product/${product.slug}`);
  redirect("/crystal171admin/ritual-kits");
}

export async function deleteRitualKit(id: string) {
  const product = await deleteProductRow(id);
  revalidatePath("/crystal171admin/ritual-kits");
  revalidatePath("/ritual-kits");
  revalidatePath("/");
  if (product) revalidatePath(`/product/${product.slug}`);
}
