import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await auth.signUp.email({ name, email, password });
  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 400 },
    );
  }

  // Create the local profile row immediately so features that need to know
  // "does an account exist for this email" (e.g. forgot-password) have a
  // reliable source of truth, instead of waiting for a lazy upsert on first
  // checkout/profile visit.
  const { data: session } = await auth.getSession();
  if (session?.user) {
    await prisma.userProfile.upsert({
      where: { id: session.user.id },
      update: {},
      create: { id: session.user.id, name: session.user.name, email: session.user.email },
    });
  }

  return NextResponse.json({ success: true });
}
