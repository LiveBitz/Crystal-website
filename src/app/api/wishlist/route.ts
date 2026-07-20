import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { addWishlistItem, listWishlistProductIds, removeWishlistItem } from "@/lib/data/wishlist";

export async function GET() {
  const { data: session } = await auth.getSession();
  if (!session?.user) return NextResponse.json({ wishlist: [] });

  const wishlist = await listWishlistProductIds(session.user.id);
  return NextResponse.json({ wishlist });
}

export async function POST(req: Request) {
  const { data: session } = await auth.getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { productId, action } = await req.json(); // action is 'add' or 'remove'
    const userId = session.user.id;

    if (action === "add") {
      await addWishlistItem(userId, productId);
    } else {
      await removeWishlistItem(userId, productId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
