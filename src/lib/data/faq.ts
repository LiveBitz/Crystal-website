import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type FaqRow = Omit<FaqItem, "active"> & { active: number };

function mapRow(row: FaqRow): FaqItem {
  return { ...row, active: toBool(row.active) };
}

export async function listFaqItems(opts: { activeOnly?: boolean } = {}): Promise<FaqItem[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM FaqItem WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM FaqItem ORDER BY "order" ASC`;
  const rows = await d1Query<FaqRow>(sql);
  return rows.map(mapRow);
}

export async function getFaqItemById(id: string): Promise<FaqItem | null> {
  const row = await d1QueryFirst<FaqRow>(`SELECT * FROM FaqItem WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

type FaqInput = { question: string; answer: string; order: number; active: boolean };

export async function createFaqItemRow(data: FaqInput): Promise<void> {
  await d1Exec(
    `INSERT INTO FaqItem (id, question, answer, "order", active) VALUES (?, ?, ?, ?, ?)`,
    [d1Id(), data.question, data.answer, data.order, fromBool(data.active)],
  );
}

export async function updateFaqItemRow(id: string, data: FaqInput): Promise<void> {
  await d1Exec(
    `UPDATE FaqItem SET question = ?, answer = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [data.question, data.answer, data.order, fromBool(data.active), id],
  );
}

export async function deleteFaqItemRow(id: string): Promise<void> {
  await d1Exec(`DELETE FROM FaqItem WHERE id = ?`, [id]);
}

export async function countFaqItems(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM FaqItem`);
  return row?.c ?? 0;
}
