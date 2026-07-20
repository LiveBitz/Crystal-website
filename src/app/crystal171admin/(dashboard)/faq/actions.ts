"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaqItemRow, deleteFaqItemRow, updateFaqItemRow } from "@/lib/data/faq";

function readForm(formData: FormData) {
  return {
    question: formData.get("question")?.toString() ?? "",
    answer: formData.get("answer")?.toString() ?? "",
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createFaqItem(formData: FormData) {
  const data = readForm(formData);
  if (!data.question || !data.answer) throw new Error("Question and answer are required");
  await createFaqItemRow(data);
  revalidatePath("/crystal171admin/faq");
  revalidatePath("/");
  redirect("/crystal171admin/faq");
}

export async function updateFaqItem(id: string, formData: FormData) {
  const data = readForm(formData);
  await updateFaqItemRow(id, data);
  revalidatePath("/crystal171admin/faq");
  revalidatePath("/");
  redirect("/crystal171admin/faq");
}

export async function deleteFaqItem(id: string) {
  await deleteFaqItemRow(id);
  revalidatePath("/crystal171admin/faq");
  revalidatePath("/");
}
