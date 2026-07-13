import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/db";
import { formatProduct } from "@/lib/products";
import { chunk } from "@/lib/utils";

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug, active: true },
    include: {
      products: {
        where: { active: true },
        orderBy: [{ section: "asc" }, { order: "asc" }],
      },
    },
  });

  if (!category) notFound();

  const pages = chunk(category.products.map(formatProduct), 4);

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-sage-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <h1 className="mt-6 text-center font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Shop for <span className="text-primary">{category.name}</span>
            </h1>

            {pages.length > 0 ? (
              <ProductGrid pages={pages} />
            ) : (
              <p className="mt-12 text-center text-sm text-foreground/50">
                No products in this category yet — check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
