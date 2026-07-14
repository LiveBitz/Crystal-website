"use client";

import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, subDays, isWithinInterval, startOfDay, endOfDay, startOfYear } from "date-fns";

type Order = {
  id: string;
  totalAmount: number;
  createdAt: Date;
};

type SalesChartProps = {
  orders: Order[];
};

export default function SalesChart({ orders }: SalesChartProps) {
  const [filter, setFilter] = useState<"week" | "month" | "year" | "custom">("week");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const filteredData = useMemo(() => {
    let start: Date;
    let end: Date = new Date();

    if (filter === "week") {
      start = subDays(end, 6); // Last 7 days including today
    } else if (filter === "month") {
      start = subDays(end, 29); // Last 30 days
    } else if (filter === "year") {
      start = startOfYear(end);
    } else {
      start = new Date(startDate);
      end = new Date(endDate);
    }

    start = startOfDay(start);
    end = endOfDay(end);

    const validOrders = orders.filter(order => 
      isWithinInterval(new Date(order.createdAt), { start, end })
    );

    const grouped = validOrders.reduce((acc: Record<string, number>, order) => {
      const dateStr = format(new Date(order.createdAt), filter === "year" ? "MMM" : "MMM dd");
      acc[dateStr] = (acc[dateStr] || 0) + order.totalAmount;
      return acc;
    }, {});

    const data = [];
    if (filter === "year") {
      for (let m = 0; m < 12; m++) {
        const d = new Date(end.getFullYear(), m, 1);
        if (d > end) break;
        const dateStr = format(d, "MMM");
        data.push({ date: dateStr, sales: grouped[dateStr] || 0 });
      }
    } else {
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = format(d, "MMM dd");
        data.push({ date: dateStr, sales: grouped[dateStr] || 0 });
      }
    }
    return data;
  }, [orders, filter, startDate, endDate]);

  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);

  return (
    <div className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-serif text-xl font-bold text-primary">Sales Analytics</h2>
          <p className="text-sm text-foreground/60 mb-2">WhatsApp Initiated Orders</p>
          <div className="text-3xl font-bold text-primary">
            Rs. {totalSales.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex rounded-lg bg-sage-50 p-1">
            {(['week', 'month', 'year'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f ? "bg-white text-primary shadow-sm" : "text-foreground/60 hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setFilter('custom')}
              className={`rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                filter === 'custom' ? "bg-white text-primary shadow-sm" : "text-foreground/60 hover:text-primary"
              }`}
            >
              Custom
            </button>
          </div>

          {filter === 'custom' && (
            <div className="flex items-center gap-2 text-sm animate-in fade-in zoom-in-95 duration-200">
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)}
                className="rounded-md border border-sage-200 bg-white px-2 py-1.5 outline-none focus:border-primary text-xs font-medium text-primary"
              />
              <span className="text-foreground/40 text-xs font-bold">to</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)}
                className="rounded-md border border-sage-200 bg-white px-2 py-1.5 outline-none focus:border-primary text-xs font-medium text-primary"
              />
            </div>
          )}
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b98776" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#b98776" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#666', fontWeight: 500 }} 
              dy={10}
              minTickGap={20}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#666', fontWeight: 500 }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              width={60}
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3cdd6" opacity={0.5} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #f3cdd6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
              itemStyle={{ color: '#3a1f3d', fontWeight: 'bold' }}
              formatter={(value) => [`Rs. ${Number(value ?? 0).toLocaleString('en-IN')}`, 'Sales']}
              labelStyle={{ color: '#666', marginBottom: '4px', fontSize: '12px', fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#b98776" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              activeDot={{ r: 6, fill: "#3a1f3d", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
