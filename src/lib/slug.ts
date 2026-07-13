export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Generates a slug from `name`, appending -2, -3, ... on collision.
// `exists` should return whether a given slug is already taken (excluding
// the record currently being saved, if any).
export async function generateUniqueSlug(
  name: string,
  exists: (slug: string) => Promise<boolean>,
) {
  const base = slugify(name) || "item";
  let slug = base;
  let n = 2;
  while (await exists(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}
