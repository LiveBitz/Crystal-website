import { d1Exec, d1Id, d1Query, d1QueryFirst, fromBool, toBool } from "@/lib/d1";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string;
  publishedAt: Date;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type ArticleRow = Omit<Article, "active" | "publishedAt"> & { active: number; publishedAt: string };

function mapRow(row: ArticleRow): Article {
  return { ...row, active: toBool(row.active), publishedAt: new Date(row.publishedAt) };
}

export async function listArticles(opts: { activeOnly?: boolean } = {}): Promise<Article[]> {
  const sql = opts.activeOnly
    ? `SELECT * FROM Article WHERE active = 1 ORDER BY "order" ASC`
    : `SELECT * FROM Article ORDER BY "order" ASC`;
  const rows = await d1Query<ArticleRow>(sql);
  return rows.map(mapRow);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const row = await d1QueryFirst<ArticleRow>(`SELECT * FROM Article WHERE id = ?`, [id]);
  return row ? mapRow(row) : null;
}

type ArticleInput = {
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string;
  order: number;
  active: boolean;
};

export async function createArticleRow(data: ArticleInput): Promise<void> {
  await d1Exec(
    `INSERT INTO Article (id, title, excerpt, imageUrl, author, "order", active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [d1Id(), data.title, data.excerpt, data.imageUrl, data.author, data.order, fromBool(data.active)],
  );
}

export async function updateArticleRow(id: string, data: ArticleInput): Promise<void> {
  await d1Exec(
    `UPDATE Article SET title = ?, excerpt = ?, imageUrl = ?, author = ?, "order" = ?, active = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [data.title, data.excerpt, data.imageUrl, data.author, data.order, fromBool(data.active), id],
  );
}

export async function deleteArticleRow(id: string): Promise<void> {
  await d1Exec(`DELETE FROM Article WHERE id = ?`, [id]);
}

export async function countArticles(): Promise<number> {
  const row = await d1QueryFirst<{ c: number }>(`SELECT COUNT(*) as c FROM Article`);
  return row?.c ?? 0;
}
