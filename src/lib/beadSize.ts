// Pure string helpers for the bead-size field — deliberately dependency-free
// so client components can import them without pulling in server-only code
// (e.g. the D1 client, which lives in @/lib/data/products).

// Admins can list multiple size variants for one product ("2mm, 4mm, 6mm").
// Each comma-separated part is normalized on its own so a bare number ("2")
// always ends up with the unit ("2mm") — customers should never have to
// guess what a number means.
export function normalizeBeadSize(value: string | null): string | null {
  if (!value) return null;
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (/mm\b/i.test(part) ? part : `${part}mm`));
  return parts.length > 0 ? parts.join(", ") : null;
}

/** Splits the stored comma-separated bead size string back into a list. */
export function parseBeadSizes(beadSize: string | null): string[] {
  if (!beadSize) return [];
  return beadSize
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}
