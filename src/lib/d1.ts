// Thin client for Cloudflare D1's REST API. D1 has no connection string like
// Postgres — its native "binding" access only works from inside a Cloudflare
// Worker, so from a Vercel-hosted app we talk to it over HTTP instead.
// https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID!;
const API_TOKEN = process.env.CLOUDFLARE_D1_API_TOKEN!;

const BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}`;

type D1Error = { code: number; message: string };

type D1QueryResult<T> = {
  success: boolean;
  results: T[];
  meta: {
    changes: number;
    last_row_id: number;
    rows_read: number;
    rows_written: number;
  };
};

type D1ApiResponse<T> = {
  success: boolean;
  errors: D1Error[];
  result: D1QueryResult<T>[];
};

type Statement = { sql: string; params?: unknown[] };

async function post<T>(body: { sql: string; params?: unknown[] } | { batch: Statement[] }) {
  const res = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = (await res.json()) as D1ApiResponse<T>;
  if (!res.ok || !json.success) {
    const message = json.errors?.[0]?.message || `D1 query failed with status ${res.status}`;
    throw new Error(message);
  }

  return json.result;
}

/** Run a single SQL statement and return its result rows. */
export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await post<T>({ sql, params });
  return result[0]?.results ?? [];
}

/** Run a single SQL statement and return just the first row, or null. */
export async function d1QueryFirst<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await d1Query<T>(sql, params);
  return rows[0] ?? null;
}

/** Run a write statement (INSERT/UPDATE/DELETE) and return how many rows changed. */
export async function d1Exec(sql: string, params: unknown[] = []): Promise<number> {
  const result = await post({ sql, params });
  return result[0]?.meta.changes ?? 0;
}

/** Run multiple statements atomically in one round trip. */
export async function d1Batch(statements: Statement[]): Promise<void> {
  if (statements.length === 0) return;
  await post({ batch: statements });
}

/** Generate a new opaque string id for a row, matching the shape of existing cuids. */
export function d1Id(): string {
  return crypto.randomUUID();
}

/** SQLite has no native boolean — stored as 0/1, this converts back. */
export function toBool(value: unknown): boolean {
  return value === 1 || value === true;
}

/** Convert a JS boolean to the 0/1 SQLite expects. */
export function fromBool(value: boolean): number {
  return value ? 1 : 0;
}
