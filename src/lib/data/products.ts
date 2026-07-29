import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";
import { getVariantsForProduct, getVariantsForProducts, type ProductVariantRow } from "@/lib/data/productVariants";

export type ProductSection = "BESTSELLER" | "NEW_ARRIVAL";

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  section: ProductSection;
  order: number;
  active: boolean;
  isRitualKit: boolean;
  variants: ProductVariantRow[];
  createdAt: string;
  updatedAt: string;
};

type RawProductRow = Omit<ProductRow, "active" | "isRitualKit" | "variants"> & {
  active: number;
  isRitualKit: number;
};

function mapRow(row: RawProductRow, variants: ProductVariantRow[] = []): ProductRow {
  return { ...row, active: toBool(row.active), isRitualKit: toBool(row.isRitualKit), variants };
}

export async function listProducts(
  opts: {
    section?: ProductSection;
    activeOnly?: boolean;
    isRitualKit?: boolean;
    q?: string;
  } = {},
): Promise<ProductRow[]> {
  const where: string[] = [];
  const params: unknown[] = [];

  if (opts.section) {
    where.push("section = ?");
    params.push(opts.section);
  }
  if (opts.activeOnly) {
    where.push("active = 1");
  }
  if (opts.isRitualKit !== undefined) {
    where.push("isRitualKit = ?");
    params.push(fromBool(opts.isRitualKit));
  }
  if (opts.q) {
    where.push("name LIKE ? COLLATE NOCASE");
    params.push(`%${opts.q}%`);
  }

  const sql = `SELECT * FROM Product ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY section ASC, "order" ASC`;
  const rows = await d1Query<RawProductRow>(sql, params);
  const variantsByProduct = await getVariantsForProducts(rows.map((r) => r.id));
  return rows.map((row) => mapRow(row, variantsByProduct[row.id] ?? []));
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const row = await d1QueryFirst<RawProductRow>(`SELECT * FROM Product WHERE id = ?`, [id]);
  if (!row) return null;
  return mapRow(row, await getVariantsForProduct(id));
}

export async function getProductBySlugRaw(slug: string): Promise<ProductRow | null> {
  const row = await d1QueryFirst<RawProductRow>(
    `SELECT * FROM Product WHERE slug = ? AND active = 1`,
    [slug],
  );
  if (!row) return null;
  return mapRow(row, await getVariantsForProduct(row.id));
}

export async function productSlugExists(slug: string): Promise<boolean> {
  const row = await d1QueryFirst<{ id: string }>(`SELECT id FROM Product WHERE slug = ?`, [slug]);
  return row !== null;
}

export async function countProducts(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM Product`);
  return row?.c ?? 0;
}

export async function getActiveProductsByIds(ids: string[]): Promise<ProductRow[]> {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => "?").join(", ");
  const rows = await d1Query<RawProductRow>(
    `SELECT * FROM Product WHERE id IN (${placeholders}) AND active = 1 ORDER BY section ASC, "order" ASC`,
    ids,
  );
  const variantsByProduct = await getVariantsForProducts(rows.map((r) => r.id));
  return rows.map((row) => mapRow(row, variantsByProduct[row.id] ?? []));
}

export type ProductInput = {
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  section: ProductSection;
  order: number;
  active: boolean;
  isRitualKit?: boolean;
};

/** Returns the new product's id. */
export async function createProductRow(data: ProductInput & { slug: string }): Promise<string> {
  const id = d1Id();
  await d1Exec(
    `INSERT INTO Product
      (id, name, slug, description, imageUrl, price, originalPrice, rating, reviews, section, "order", active, isRitualKit)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.name,
      data.slug,
      data.description,
      data.imageUrl,
      data.price,
      data.originalPrice,
      data.rating,
      data.reviews,
      data.section,
      data.order,
      fromBool(data.active),
      fromBool(data.isRitualKit ?? false),
    ],
  );
  return id;
}

/** Partial update — only columns present in `data` are touched (mirrors Prisma's update semantics). */
export async function updateProductRow(id: string, data: ProductInput): Promise<ProductRow | null> {
  const sets: string[] = [
    "name = ?", "description = ?", "imageUrl = ?", "price = ?", "originalPrice = ?",
    "rating = ?", "reviews = ?", "section = ?", `"order" = ?`, "active = ?",
  ];
  const params: unknown[] = [
    data.name, data.description, data.imageUrl, data.price, data.originalPrice,
    data.rating, data.reviews, data.section, data.order, fromBool(data.active),
  ];

  if (data.isRitualKit !== undefined) {
    sets.push("isRitualKit = ?");
    params.push(fromBool(data.isRitualKit));
  }
  sets.push("updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now')");

  params.push(id);
  await d1Exec(`UPDATE Product SET ${sets.join(", ")} WHERE id = ?`, params);
  return getProductById(id);
}

/** Returns the deleted row (for revalidatePath on its slug), or null if it didn't exist. */
export async function deleteProductRow(id: string): Promise<ProductRow | null> {
  const existing = await getProductById(id);
  if (!existing) return null;
  await d1Exec(`DELETE FROM ProductCategory WHERE productId = ?`, [id]);
  await d1Exec(`DELETE FROM ProductVariant WHERE productId = ?`, [id]);
  await d1Exec(`DELETE FROM Product WHERE id = ?`, [id]);
  return existing;
}
