import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/db";
import { formatProduct } from "@/lib/products";
import { chunk } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default async function WishlistPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/sign-up");
  }

  const payload = await verifyJwt(token);
  if (!payload || !payload.id) {
    redirect("/sign-up");
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: payload.id as string },
    orderBy: { createdAt: "desc" },
  });

  const productIds = items.map(item => item.productId);
  const productsResult = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      active: true,
    }
  });

  // Sort products based on when they were wishlisted (newest first)
  const products = items
    .map(item => productsResult.find(p => p.id === item.productId))
    .filter(Boolean) as typeof productsResult;

  const pages = chunk(products.map(formatProduct), 4);

  return (
    <>
      <TopBar />
      <Header isLoggedIn={true} />
      <main className="min-h-screen bg-sage-50 pb-20 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal className="text-center">
            <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Your <span className="text-primary">Wishlist</span>
            </h1>
          </Reveal>

          {pages.length > 0 ? (
            <div className="mt-8">
              <ProductGrid pages={pages} />
            </div>
          ) : (
            <Reveal y={10} delay={0.1}>
              <div className="mt-16 text-center">
                <p className="mb-6 text-foreground/60">Your wishlist is currently empty.</p>
                <a href="/" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold tracking-wide text-gold-light transition-all hover:bg-primary-dark hover:shadow-md">
                  Explore Products
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
