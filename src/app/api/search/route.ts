import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { formatProduct } from "@/lib/products";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const rows = await prisma.product.findMany({
    where: {
      active: true,
      name: { contains: q, mode: "insensitive" },
    },
    orderBy: { order: "asc" },
    take: 8,
  });

  return NextResponse.json({ results: rows.map(formatProduct) });
}
