import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await auth.resetPassword({ token, newPassword });
  if (error) {
    return NextResponse.json(
      { error: error.message || "This reset link is invalid or has expired." },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true });
}
