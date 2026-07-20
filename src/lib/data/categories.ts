import { d1Batch, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";
import { mapProductRow, type ProductRow, type RawProductRow } from "@/lib/data/products";

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type CategoryRow = Omit<Category, "active"> & { active: number };

function mapRow(row: CategoryRow): Category {
  return { ...row, active: toBool(row.active) };
}

export async function listCategories(opts: { activeOnly?: boolean } = {}): Promise<Category[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM Category WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM Category ORDER BY "order" ASC`;
  const rows = await d1Query<CategoryRow>(sql);
  return rows.map(mapRow);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const row = await d1QueryFirst<CategoryRow>(`SELECT * FROM Category WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const row = await d1QueryFirst<CategoryRow>(
    `SELECT * FROM Category WHERE slug = ? AND active = 1`,
    [slug],
  );
  return row ? mapRow(row) : null;
}

export async function categorySlugExists(slug: string): Promise<boolean> {
  const row = await d1QueryFirst<{ id: string }>(`SELECT id FROM Category WHERE slug = ?`, [slug]);
  return row !== null;
}

export async function countCategories(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM Category`);
  return row?.c ?? 0;
}

export async function getProductIdsForCategory(categoryId: string): Promise<string[]> {
  const rows = await d1Query<{ productId: string }>(
    `SELECT productId FROM ProductCategory WHERE categoryId = ?`,
    [categoryId],
  );
  return rows.map((r) => r.productId);
}

export async function getActiveProductsForCategory(categoryId: string): Promise<ProductRow[]> {
  const rows = await d1Query<RawProductRow>(
    `SELECT p.* FROM Product p
     JOIN ProductCategory pc ON pc.productId = p.id
     WHERE pc.categoryId = ? AND p.active = 1
     ORDER BY p.section ASC, p."order" ASC`,
    [categoryId],
  );
  return rows.map(mapProductRow);
}

type CategoryInput = {
  name: string;
  imageUrl: string | null;
  order: number;
  active: boolean;
  productIds: string[];
};

export async function createCategoryRow(data: CategoryInput & { slug: string }): Promise<void> {
  const id = d1Id();
  await d1Batch([
    {
      sql: `INSERT INTO Category (id, name, slug, imageUrl, "order", active) VALUES (?, ?, ?, ?, ?, ?)`,
      params: [id, data.name, data.slug, data.imageUrl, data.order, fromBool(data.active)],
    },
    ...data.productIds.map((productId) => ({
      sql: `INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?)`,
      params: [productId, id],
    })),
  ]);
}

export async function updateCategoryRow(id: string, data: CategoryInput): Promise<Category | null> {
  await d1Batch([
    {
      sql: `UPDATE Category SET name = ?, imageUrl = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
      params: [data.name, data.imageUrl, data.order, fromBool(data.active), id],
    },
    { sql: `DELETE FROM ProductCategory WHERE categoryId = ?`, params: [id] },
    ...data.productIds.map((productId) => ({
      sql: `INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?)`,
      params: [productId, id],
    })),
  ]);
  return getCategoryById(id);
}

export async function deleteCategoryRow(id: string): Promise<Category | null> {
  const existing = await getCategoryById(id);
  if (!existing) return null;
  await d1Batch([
    { sql: `DELETE FROM ProductCategory WHERE categoryId = ?`, params: [id] },
    { sql: `DELETE FROM Category WHERE id = ?`, params: [id] },
  ]);
  return existing;
}
