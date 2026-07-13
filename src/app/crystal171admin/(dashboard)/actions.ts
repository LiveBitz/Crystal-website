"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_PATH, ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ADMIN_SESSION_COOKIE, path: ADMIN_COOKIE_PATH });
  redirect("/crystal171admin/login");
}
