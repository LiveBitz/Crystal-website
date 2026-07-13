import type { Product as PrismaProduct } from "@prisma/client";

export type Product = {
  id: string;
  name: string;
  imageUrl: string | null;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
};

export function formatProduct(p: PrismaProduct): Product {
  return {
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl,
    price: `Rs. ${p.price.toLocaleString("en-IN")}`,
    originalPrice: p.originalPrice ? `Rs. ${p.originalPrice.toLocaleString("en-IN")}` : "",
    rating: p.rating,
    reviews: p.reviews,
  };
}
