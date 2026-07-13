"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_PATH, ADMIN_SESSION_COOKIE, hashAdminPassword } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";
  const next = formData.get("next")?.toString() || "/crystal171admin";

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    redirect(`/crystal171admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const token = await hashAdminPassword(password);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ADMIN_COOKIE_PATH,
    maxAge: 60 * 60 * 8,
  });

  redirect(next);
}
