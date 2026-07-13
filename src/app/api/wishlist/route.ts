import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return NextResponse.json({ wishlist: [] });

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) return NextResponse.json({ wishlist: [] });

  const items = await prisma.wishlistItem.findMany({
    where: { userId: payload.id as string },
    select: { productId: true },
  });

  return NextResponse.json({ wishlist: items.map(i => i.productId) });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  try {
    const { productId, action } = await req.json(); // action is 'add' or 'remove'
    const userId = payload.id as string;

    if (action === "add") {
      await prisma.wishlistItem.upsert({
        where: { userId_productId: { userId, productId } },
        update: {},
        create: { userId, productId },
      });
    } else {
      await prisma.wishlistItem.deleteMany({
        where: { userId, productId },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
