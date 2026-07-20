import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  product: string;
  rating: number;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type TestimonialRow = Omit<Testimonial, "active"> & { active: number };

function mapRow(row: TestimonialRow): Testimonial {
  return { ...row, active: toBool(row.active) };
}

export async function listTestimonials(opts: { activeOnly?: boolean } = {}): Promise<Testimonial[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM Testimonial WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM Testimonial ORDER BY "order" ASC`;
  const rows = await d1Query<TestimonialRow>(sql);
  return rows.map(mapRow);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const row = await d1QueryFirst<TestimonialRow>(`SELECT * FROM Testimonial WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

type TestimonialInput = {
  name: string;
  quote: string;
  product: string;
  rating: number;
  order: number;
  active: boolean;
};

export async function createTestimonialRow(data: TestimonialInput): Promise<void> {
  await d1Exec(
    `INSERT INTO Testimonial (id, name, quote, product, rating, "order", active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [d1Id(), data.name, data.quote, data.product, data.rating, data.order, fromBool(data.active)],
  );
}

export async function updateTestimonialRow(id: string, data: TestimonialInput): Promise<void> {
  await d1Exec(
    `UPDATE Testimonial SET name = ?, quote = ?, product = ?, rating = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [data.name, data.quote, data.product, data.rating, data.order, fromBool(data.active), id],
  );
}

export async function deleteTestimonialRow(id: string): Promise<void> {
  await d1Exec(`DELETE FROM Testimonial WHERE id = ?`, [id]);
}

export async function countTestimonials(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM Testimonial`);
  return row?.c ?? 0;
}
