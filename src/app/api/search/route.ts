import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/lib/data/products";
import { formatProduct } from "@/lib/products";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const rows = (await listProducts({ activeOnly: true, q })).slice(0, 8);

  return NextResponse.json({ results: rows.map(formatProduct) });
}
