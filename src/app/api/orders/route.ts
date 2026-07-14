import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { totalAmount, items, address } = await req.json();

    if (totalAmount === undefined || typeof totalAmount !== "number" || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    let userId = null;
    if (token) {
      const payload = await verifyJwt(token);
      if (payload && payload.id) {
        userId = payload.id as string;
      }
    }

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
