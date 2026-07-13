"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

function readForm(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    quote: formData.get("quote")?.toString() ?? "",
    product: formData.get("product")?.toString() ?? "",
    rating: Number(formData.get("rating") ?? 5),
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createTestimonial(formData: FormData) {
  const data = readForm(formData);
  if (!data.name || !data.quote) throw new Error("Name and quote are required");
  await prisma.testimonial.create({ data });
  revalidatePath("/crystal171admin/testimonials");
  revalidatePath("/");
  redirect("/crystal171admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const data = readForm(formData);
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/crystal171admin/testimonials");
  revalidatePath("/");
  redirect("/crystal171admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/crystal171admin/testimonials");
  revalidatePath("/");
}
