import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";

export async function POST() {
  await auth.signOut();
  return NextResponse.json({ success: true });
}
