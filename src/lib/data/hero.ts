import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";

export type HeroSlide = {
  id: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type HeroSlideRow = Omit<HeroSlide, "active"> & { active: number };

function mapRow(row: HeroSlideRow): HeroSlide {
  return { ...row, active: toBool(row.active) };
}

export async function listHeroSlides(opts: { activeOnly?: boolean } = {}): Promise<HeroSlide[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM HeroSlide WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM HeroSlide ORDER BY "order" ASC`;
  const rows = await d1Query<HeroSlideRow>(sql);
  return rows.map(mapRow);
}

export async function getHeroSlideById(id: string): Promise<HeroSlide | null> {
  const row = await d1QueryFirst<HeroSlideRow>(`SELECT * FROM HeroSlide WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

type HeroSlideInput = {
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
  active: boolean;
};

export async function createHeroSlideRow(data: HeroSlideInput): Promise<void> {
  await d1Exec(
    `INSERT INTO HeroSlide (id, imageUrl, mobileImageUrl, "order", active) VALUES (?, ?, ?, ?, ?)`,
    [d1Id(), data.imageUrl, data.mobileImageUrl, data.order, fromBool(data.active)],
  );
}

export async function updateHeroSlideRow(id: string, data: HeroSlideInput): Promise<void> {
  await d1Exec(
    `UPDATE HeroSlide SET imageUrl = ?, mobileImageUrl = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [data.imageUrl, data.mobileImageUrl, data.order, fromBool(data.active), id],
  );
}

export async function deleteHeroSlideRow(id: string): Promise<void> {
  await d1Exec(`DELETE FROM HeroSlide WHERE id = ?`, [id]);
}

export async function countHeroSlides(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM HeroSlide`);
  return row?.c ?? 0;
}
