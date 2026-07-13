export const ADMIN_SESSION_COOKIE = "crystalenii_admin_session";
// Must be "/" (not "/crystal171admin") so the cookie is also sent to
// /api/admin/upload, which the admin panel's image uploader depends on.
export const ADMIN_COOKIE_PATH = "/";

export async function hashAdminPassword(password: string) {
  const data = new TextEncoder().encode(`${password}:crystalenii-admin-salt`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminSession(token: string | undefined) {
  if (!token) return false;
  const expected = await hashAdminPassword(process.env.ADMIN_PASSWORD ?? "");
  return token === expected;
}
