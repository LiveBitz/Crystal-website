import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { totalAmount, items, address } = await req.json();

    if (totalAmount === undefined || typeof totalAmount !== "number" || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { data: session } = await auth.getSession();
    const userId = session?.user?.id ?? null;

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        ...address,
        items: {
          create: items.map((item: { productId: string; quantity: number; priceAtTime: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime
          }))
        }
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order logging error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
