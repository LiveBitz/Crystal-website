import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function updateOrderStatus(orderId: string, formData: FormData) {
  "use server";
  const status = formData.get("status") as string;
  if (!status) return;

  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  revalidatePath("/crystal171admin/orders");
  revalidatePath("/profile");
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  const statusOptions = ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Manage customer orders and update shipping statuses.
      </p>

      <div className="mt-8 space-y-6">
        {orders.length === 0 ? (
          <p className="text-foreground/60">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold text-primary">Order #{order.id.slice(-6).toUpperCase()}</h3>
                  <p className="text-sm text-foreground/60">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>

                  <form action={updateOrderStatus.bind(null, order.id)} className="flex items-center gap-2">
                    <select 
                      name="status" 
                      defaultValue={order.status}
                      className="rounded-lg border border-sage-200 bg-sage-50 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-gold-light hover:bg-primary-dark">
                      Update
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground/50">Shipping Details</h4>
                  <div className="rounded-xl bg-sage-50 p-4 text-sm text-foreground">
                    <p className="font-semibold">{order.name || "N/A"}</p>
                    <p>{order.phone}</p>
                    <p>{order.addressLine1}</p>
                    {order.addressLine2 && <p>{order.addressLine2}</p>}
                    <p>{order.city}, {order.state} {order.postalCode}</p>
                    <p>{order.country}</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground/50">Order Items</h4>
                  <div className="space-y-3 rounded-xl bg-sage-50 p-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-foreground/80">{item.quantity}x {item.product.name}</span>
                        <span className="font-medium">Rs. {(item.priceAtTime * item.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                    <div className="mt-2 border-t border-sage-200 pt-2 flex justify-between font-bold text-primary">
                      <span>Total</span>
                      <span>Rs. {order.totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
