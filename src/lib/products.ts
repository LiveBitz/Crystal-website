import { cache } from "react";
import { getProductBySlugRaw, type ProductRow } from "@/lib/data/products";

export const getProductBySlug = cache((slug: string) => getProductBySlugRaw(slug));

export type ProductVariant = {
  size: string;
  price: string;
  priceRaw: number;
  originalPrice: string;
  originalPriceRaw: number | null;
  discountPercent: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string;
  originalPrice: string;
  discountPercent: number | null;
  rating: number;
  reviews: number;
  variants: ProductVariant[];
};

function formatRupees(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function discountBetween(price: number, originalPrice: number | null) {
  return originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : null;
}

export function formatProduct(p: ProductRow): Product {
  const variants: ProductVariant[] = p.variants.map((v) => ({
    size: v.size,
    price: formatRupees(v.price),
    priceRaw: v.price,
    originalPrice: v.originalPrice ? formatRupees(v.originalPrice) : "",
    originalPriceRaw: v.originalPrice,
    discountPercent: discountBetween(v.price, v.originalPrice),
  }));

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    price: formatRupees(p.price),
    originalPrice: p.originalPrice ? formatRupees(p.originalPrice) : "",
    discountPercent: discountBetween(p.price, p.originalPrice),
    rating: p.rating,
    reviews: p.reviews,
    variants,
  };
}
