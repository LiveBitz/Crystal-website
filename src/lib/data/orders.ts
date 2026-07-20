import { d1Batch, d1Exec, d1Id, d1Query } from "@/lib/d1";

export type OrderItemWithProduct = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtTime: number;
  product: { name: string; imageUrl: string | null };
};

export type OrderRow = {
  id: string;
  userId: string | null;
  totalAmount: number;
  status: string;
  name: string | null;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderWithItems = OrderRow & { items: OrderItemWithProduct[] };

async function attachItems(orders: OrderRow[]): Promise<OrderWithItems[]> {
  if (orders.length === 0) return [];
  const ids = orders.map((o) => o.id);
  const placeholders = ids.map(() => "?").join(", ");
  const itemRows = await d1Query<{
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    priceAtTime: number;
    productName: string;
    productImageUrl: string | null;
  }>(
    `SELECT oi.id, oi.orderId, oi.productId, oi.quantity, oi.priceAtTime,
            p.name as productName, p.imageUrl as productImageUrl
     FROM OrderItem oi JOIN Product p ON p.id = oi.productId
     WHERE oi.orderId IN (${placeholders})`,
    ids,
  );

  const byOrder = new Map<string, OrderItemWithProduct[]>();
  for (const row of itemRows) {
    const item: OrderItemWithProduct = {
      id: row.id,
      orderId: row.orderId,
      productId: row.productId,
      quantity: row.quantity,
      priceAtTime: row.priceAtTime,
      product: { name: row.productName, imageUrl: row.productImageUrl },
    };
    const list = byOrder.get(row.orderId) ?? [];
    list.push(item);
    byOrder.set(row.orderId, list);
  }

  return orders.map((o) => ({ ...o, items: byOrder.get(o.id) ?? [] }));
}

export async function listOrders(opts: { q?: string } = {}): Promise<OrderWithItems[]> {
  let sql = `SELECT * FROM "Order"`;
  const params: unknown[] = [];
  if (opts.q) {
    sql += ` WHERE name LIKE ? COLLATE NOCASE OR phone LIKE ? COLLATE NOCASE OR id LIKE ? COLLATE NOCASE`;
    params.push(`%${opts.q}%`, `%${opts.q}%`, `%${opts.q}%`);
  }
  sql += ` ORDER BY createdAt DESC`;
  const rows = await d1Query<OrderRow>(sql, params);
  return attachItems(rows);
}

export async function listOrdersForUser(userId: string): Promise<OrderWithItems[]> {
  const rows = await d1Query<OrderRow>(
    `SELECT * FROM "Order" WHERE userId = ? ORDER BY createdAt DESC`,
    [userId],
  );
  return attachItems(rows);
}

export async function listOrdersForChart(): Promise<
  { id: string; totalAmount: number; createdAt: string }[]
> {
  return d1Query(`SELECT id, totalAmount, createdAt FROM "Order" ORDER BY createdAt ASC`);
}

export async function updateOrderStatusRow(id: string, status: string): Promise<void> {
  await d1Exec(
    `UPDATE "Order" SET status = ?, updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`,
    [status, id],
  );
}

export type CreateOrderInput = {
  userId: string | null;
  totalAmount: number;
  name?: string | null;
  phone?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  items: { productId: string; quantity: number; priceAtTime: number }[];
};

export async function createOrderRow(data: CreateOrderInput): Promise<string> {
  const id = d1Id();
  await d1Batch([
    {
      sql: `INSERT INTO "Order"
              (id, userId, totalAmount, status, name, phone, addressLine1, addressLine2, city, state, postalCode, country)
            VALUES (?, ?, ?, 'PENDING', ?, ?, ?, ?, ?, ?, ?, ?)`,
      params: [
        id, data.userId, data.totalAmount,
        data.name ?? null, data.phone ?? null, data.addressLine1 ?? null, data.addressLine2 ?? null,
        data.city ?? null, data.state ?? null, data.postalCode ?? null, data.country ?? null,
      ],
    },
    ...data.items.map((item) => ({
      sql: `INSERT INTO OrderItem (id, orderId, productId, quantity, priceAtTime) VALUES (?, ?, ?, ?, ?)`,
      params: [d1Id(), id, item.productId, item.quantity, item.priceAtTime],
    })),
  ]);
  return id;
}
