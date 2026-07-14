import { cache } from "react";
import type { Product as PrismaProduct } from "@prisma/client";
import { prisma } from "@/lib/db";

export const getProductBySlug = cache((slug: string) =>
  prisma.product.findUnique({ where: { slug, active: true } }),
);

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

export function formatProduct(p: PrismaProduct): Product {
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
