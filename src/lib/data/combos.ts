import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";

export type ComboBanner = {
  id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type ComboBannerRow = Omit<ComboBanner, "active"> & { active: number };

function mapRow(row: ComboBannerRow): ComboBanner {
  return { ...row, active: toBool(row.active) };
}

export async function listComboBanners(opts: { activeOnly?: boolean } = {}): Promise<ComboBanner[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM ComboBanner WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM ComboBanner ORDER BY "order" ASC`;
  const rows = await d1Query<ComboBannerRow>(sql);
  return rows.map(mapRow);
}

export async function getComboBannerById(id: string): Promise<ComboBanner | null> {
  const row = await d1QueryFirst<ComboBannerRow>(`SELECT * FROM ComboBanner WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

type ComboBannerInput = {
  title: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
  active: boolean;
};

export async function createComboBannerRow(data: ComboBannerInput): Promise<void> {
  await d1Exec(
    `INSERT INTO ComboBanner (id, title, imageUrl, mobileImageUrl, "order", active) VALUES (?, ?, ?, ?, ?, ?)`,
    [d1Id(), data.title, data.imageUrl, data.mobileImageUrl, data.order, fromBool(data.active)],
  );
}

export async function updateComboBannerRow(id: string, data: ComboBannerInput): Promise<void> {
  await d1Exec(
    `UPDATE ComboBanner SET title = ?, imageUrl = ?, mobileImageUrl = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [data.title, data.imageUrl, data.mobileImageUrl, data.order, fromBool(data.active), id],
  );
}

export async function deleteComboBannerRow(id: string): Promise<void> {
  await d1Exec(`DELETE FROM ComboBanner WHERE id = ?`, [id]);
}

export async function countComboBanners(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM ComboBanner`);
  return row?.c ?? 0;
}
