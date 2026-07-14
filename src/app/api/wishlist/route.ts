import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { prisma } from "@/lib/db";

export async function GET() {
  const { data: session } = await auth.getSession();
  if (!session?.user) return NextResponse.json({ wishlist: [] });

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    select: { productId: true },
  });

  return NextResponse.json({ wishlist: items.map(i => i.productId) });
}

export async function POST(req: Request) {
  const { data: session } = await auth.getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { productId, action } = await req.json(); // action is 'add' or 'remove'
    const userId = session.user.id;

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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
