import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { createOrderRow } from "@/lib/data/orders";

export async function POST(req: Request) {
  try {
    const { totalAmount, items, address } = await req.json();

    if (totalAmount === undefined || typeof totalAmount !== "number" || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { data: session } = await auth.getSession();
    const userId = session?.user?.id ?? null;

    const orderId = await createOrderRow({
      userId,
      totalAmount,
      ...address,
      items: items.map((item: { productId: string; quantity: number; priceAtTime: number }) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
      })),
    });

    return NextResponse.json({ success: true, order: { id: orderId } });
  } catch (error) {
    console.error("Order logging error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
