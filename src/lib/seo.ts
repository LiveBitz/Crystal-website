export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://crystalenii.com";
export const SITE_NAME = "Crystalenii";
export const SITE_DESCRIPTION =
  "Handpicked, genuine crystal bracelets and ritual kits curated by purpose — wealth, love, protection, healing, and focus. Ancient wisdom, modern living.";
export const INSTAGRAM_URL = "https://www.instagram.com/crystalenii/";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
