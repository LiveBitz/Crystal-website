import type { Product as PrismaProduct } from "@prisma/client";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
};

export function formatProduct(p: PrismaProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    price: `Rs. ${p.price.toLocaleString("en-IN")}`,
    originalPrice: p.originalPrice ? `Rs. ${p.originalPrice.toLocaleString("en-IN")}` : "",
    rating: p.rating,
    reviews: p.reviews,
  };
}
