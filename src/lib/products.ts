import { cache } from "react";
import { getProductBySlugRaw, type ProductRow } from "@/lib/data/products";

export const getProductBySlug = cache((slug: string) => getProductBySlugRaw(slug));

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
};

export function formatProduct(p: ProductRow): Product {
  const discountPercent =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    price: `Rs. ${p.price.toLocaleString("en-IN")}`,
    originalPrice: p.originalPrice ? `Rs. ${p.originalPrice.toLocaleString("en-IN")}` : "",
    discountPercent,
    rating: p.rating,
    reviews: p.reviews,
  };
}
