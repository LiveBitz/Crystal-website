import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/db";
import { formatProduct } from "@/lib/products";
import { chunk } from "@/lib/utils";

export default async function NewArrivals() {
  const products = await prisma.product.findMany({
    where: { section: "NEW_ARRIVAL", active: true },
    orderBy: { order: "asc" },
  });
  const pages = chunk(products.map(formatProduct), 4);

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            New <span className="text-primary">Arrivals</span>
          </h2>
        </Reveal>

        {pages.length > 0 ? (
          <ProductGrid pages={pages} />
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No products yet.</p>
        )}
      </div>
    </section>
  );
}
