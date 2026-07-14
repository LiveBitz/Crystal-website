import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/db";
import { formatProduct } from "@/lib/products";
import { chunk } from "@/lib/utils";
import { auth } from "@/lib/neonAuth";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";

const getCategoryBySlug = cache((slug: string) =>
  prisma.category.findUnique({
    where: { slug, active: true },
    include: {
      products: {
        where: { active: true },
        orderBy: [{ section: "asc" }, { order: "asc" }],
      },
    },
  }),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const title = `Shop for ${category.name} | ${SITE_NAME}`;
  const description = `Handpicked crystal bracelets curated for ${category.name.toLowerCase()} — genuine gemstones, energised and ready to wear.`;
  const url = absoluteUrl(`/shop/${category.slug}`);
  const images = category.imageUrl
    ? [{ url: category.imageUrl, width: 1200, height: 1200, alt: category.name }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: category.imageUrl ? [category.imageUrl] : undefined },
  };
}

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const pages = chunk(category.products.map(formatProduct), 4);
  const { data: session } = await auth.getSession();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: category.name, item: absoluteUrl(`/shop/${category.slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TopBar />
      <Header isLoggedIn={!!session?.user} />
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
