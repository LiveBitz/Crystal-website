import { d1Batch, d1Id, d1Query } from "@/lib/d1";

export type ProductVariantRow = {
  id: string;
  productId: string;
  size: string;
  price: number;
  originalPrice: number | null;
  order: number;
};

export async function getVariantsForProduct(productId: string): Promise<ProductVariantRow[]> {
  return d1Query<ProductVariantRow>(
    `SELECT * FROM ProductVariant WHERE productId = ? ORDER BY "order" ASC`,
    [productId],
  );
}

/** Batch-fetches variants for many products at once (avoids N+1 queries in list pages). */
export async function getVariantsForProducts(
  productIds: string[],
): Promise<Record<string, ProductVariantRow[]>> {
  if (productIds.length === 0) return {};
  const placeholders = productIds.map(() => "?").join(", ");
  const rows = await d1Query<ProductVariantRow>(
    `SELECT * FROM ProductVariant WHERE productId IN (${placeholders}) ORDER BY "order" ASC`,
    productIds,
  );
  const byProduct: Record<string, ProductVariantRow[]> = {};
  for (const row of rows) {
    (byProduct[row.productId] ??= []).push(row);
  }
  return byProduct;
}

export type VariantInput = { size: string; price: number; originalPrice: number | null };

/** Replaces all of a product's variants with the given list, atomically. */
export async function setProductVariants(
  productId: string,
  variants: VariantInput[],
): Promise<void> {
  await d1Batch([
    { sql: `DELETE FROM ProductVariant WHERE productId = ?`, params: [productId] },
    ...variants.map((v, i) => ({
      sql: `INSERT INTO ProductVariant (id, productId, size, price, originalPrice, "order") VALUES (?, ?, ?, ?, ?, ?)`,
      params: [d1Id(), productId, v.size, v.price, v.originalPrice, i],
    })),
  ]);
}
