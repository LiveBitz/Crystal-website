"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Variant = { size: string; price: string; originalPrice: string };

export default function VariantsEditor({
  defaultVariants = [],
}: {
  defaultVariants?: { size: string; price: number; originalPrice: number | null }[];
}) {
  const [rows, setRows] = useState<Variant[]>(
    defaultVariants.length > 0
      ? defaultVariants.map((v) => ({
          size: v.size,
          price: String(v.price),
          originalPrice: v.originalPrice !== null ? String(v.originalPrice) : "",
        }))
      : [],
  );

  const addRow = () => setRows((prev) => [...prev, { size: "", price: "", originalPrice: "" }]);
  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));
  const updateRow = (index: number, field: keyof Variant, value: string) =>
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));

  return (
    <div>
      <label className="text-sm font-medium text-foreground">Size variants (mm)</label>
      <p className="mt-1 text-xs text-foreground/50">
        Add a size variant if this product comes in different bead sizes at different prices.
        Leave empty for a single-price product.
      </p>

      {rows.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
              <div>
                {i === 0 && (
                  <label className="text-xs font-medium text-foreground/60">Size</label>
                )}
                <input
                  name="variantSize"
                  value={row.size}
                  onChange={(e) => updateRow(i, "size", e.target.value)}
                  placeholder="e.g. 2mm"
                  className="mt-1 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                {i === 0 && (
                  <label className="text-xs font-medium text-foreground/60">Price (₹)</label>
                )}
                <input
                  name="variantPrice"
                  type="number"
                  value={row.price}
                  onChange={(e) => updateRow(i, "price", e.target.value)}
                  placeholder="999"
                  className="mt-1 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                {i === 0 && (
                  <label className="text-xs font-medium text-foreground/60">
                    Original price (₹)
                  </label>
                )}
                <input
                  name="variantOriginalPrice"
                  type="number"
                  value={row.originalPrice}
                  onChange={(e) => updateRow(i, "originalPrice", e.target.value)}
                  placeholder="Optional"
                  className="mt-1 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeRow(i)}
                aria-label="Remove size variant"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <Plus size={16} />
        Add size variant
      </button>
    </div>
  );
}
