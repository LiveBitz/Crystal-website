import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id as string },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
