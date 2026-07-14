import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const existing = await prisma.userProfile.findUnique({ where: { email } });
  if (!existing) {
    return NextResponse.json(
      { error: "No account found with that email address." },
      { status: 404 },
    );
  }

  const redirectTo = `${new URL(req.url).origin}/reset-password`;

  try {
    await auth.requestPasswordReset({ email, redirectTo });
  } catch (error) {
    console.error("Password reset request failed:", error);
    return NextResponse.json(
      { error: "Something went wrong sending the reset email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
