import { BadgeCheck, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductActions from "@/components/ProductActions";
import Reveal from "@/components/Reveal";
import TopBar from "@/components/TopBar";
import TrustBadges from "@/components/TrustBadges";
import { formatProduct, getProductBySlug } from "@/lib/products";
import { auth } from "@/lib/neonAuth";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const row = await getProductBySlug(slug);
  if (!row) return {};

  const title = `${row.name} | ${SITE_NAME}`;
  const description =
    row.description?.slice(0, 160) ||
    `Shop the ${row.name} — a genuine, handpicked crystal bracelet from ${SITE_NAME}.`;
  const url = absoluteUrl(`/product/${row.slug}`);
  const images = row.imageUrl ? [{ url: row.imageUrl, width: 1200, height: 1200, alt: row.name }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: row.imageUrl ? [row.imageUrl] : undefined },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const row = await getProductBySlug(slug);
  if (!row) notFound();

  const product = formatProduct(row);

  const { data: session } = await auth.getSession();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: row.name,
    description: row.description || undefined,
    image: row.imageUrl ? [row.imageUrl] : undefined,
    sku: row.id,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${row.slug}`),
      priceCurrency: "INR",
      price: row.price,
      availability: row.active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      row.reviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: row.rating,
            reviewCount: row.reviews,
          }
        : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: row.name, item: absoluteUrl(`/product/${row.slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TopBar />
      <Header isLoggedIn={!!session?.user} />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-foreground/50 sm:text-sm">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-primary">
              Shop
            </Link>
            <span>/</span>
            <span className="truncate text-foreground/70">{product.name}</span>
          </nav>

          <Reveal className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-sage-200 bg-sage-100">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                  className="object-cover"
                />
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5">
              <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < product.rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/60">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-primary">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-foreground/40 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <ProductActions
                product={product}
                whatsappNumber={process.env.WHATSAPP_NUMBER ?? ""}
              />

              {/* Authenticity guarantee */}
              <div className="flex items-start gap-3 rounded-lg border border-sage-200 bg-sage-50 p-4">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Certified Authentic</p>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    Lab-verified and energised before dispatch
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <ShieldCheck size={16} className="shrink-0 text-primary" />
                Secure checkout · Direct WhatsApp support
              </div>

              {product.description && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                    About this crystal
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Trust badges */}
          <div className="mt-14 border-t border-sage-200 pt-10 sm:mt-16">
            <TrustBadges />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
