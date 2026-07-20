import { d1Exec, d1Id, d1Query } from "@/lib/d1";

export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};

export async function listWishlistItems(userId: string): Promise<WishlistItem[]> {
  return d1Query<WishlistItem>(
    `SELECT * FROM WishlistItem WHERE userId = ? ORDER BY createdAt DESC`,
    [userId],
  );
}

export async function listWishlistProductIds(userId: string): Promise<string[]> {
  const rows = await d1Query<{ productId: string }>(
    `SELECT productId FROM WishlistItem WHERE userId = ?`,
    [userId],
  );
  return rows.map((r) => r.productId);
}

export async function addWishlistItem(userId: string, productId: string): Promise<void> {
  await d1Exec(
    `INSERT INTO WishlistItem (id, userId, productId) VALUES (?, ?, ?)
     ON CONFLICT (userId, productId) DO NOTHING`,
    [d1Id(), userId, productId],
  );
}

export async function removeWishlistItem(userId: string, productId: string): Promise<void> {
  await d1Exec(`DELETE FROM WishlistItem WHERE userId = ? AND productId = ?`, [userId, productId]);
}
