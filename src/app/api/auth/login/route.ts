import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { comparePasswords, signJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!prisma.user) {
      return NextResponse.json({ error: "Database client outdated. Please restart your Next.js dev server (npm run dev)." }, { status: 500 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "No account found with this email. Please create one." }, { status: 401 });
    }

    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
    }

    const token = await signJwt({ id: user.id, email: user.email, name: user.name });

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
