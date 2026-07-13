import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Only allow updating specific fields
    const { phone, addressLine1, addressLine2, city, state, postalCode, country } = data;

    await prisma.user.update({
      where: { id: payload.id as string },
      data: { phone, addressLine1, addressLine2, city, state, postalCode, country },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
