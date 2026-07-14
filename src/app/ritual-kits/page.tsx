import { prisma } from "@/lib/db";
import ProductGrid from "@/components/ProductGrid";
import { chunk } from "@/lib/utils";
import { formatProduct } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RitualKitsPage() {
  const kits = await prisma.product.findMany({
    where: { isRitualKit: true, active: true },
    orderBy: { order: "asc" },
  });
  
  const pages = chunk(kits.map(formatProduct), 4);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary sm:text-5xl">
            Ritual Kits
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/80">
            Curated collections of crystals, tools, and instructions designed to help you manifest your intentions and create powerful rituals.
          </p>
        </div>

        {pages.length > 0 ? (
          <ProductGrid pages={pages} />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white text-center">
            <p className="text-foreground/60">No Ritual Kits are available at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </>
  );
}
