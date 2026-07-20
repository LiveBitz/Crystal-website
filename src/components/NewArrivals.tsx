import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { listProducts } from "@/lib/data/products";
import { formatProduct } from "@/lib/products";
import { chunk } from "@/lib/utils";

export default async function NewArrivals() {
  const products = await listProducts({ section: "NEW_ARRIVAL", activeOnly: true });
  const pages = chunk(products.map(formatProduct), 4);

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl flex items-center justify-center gap-1 sm:gap-2 mt-10">
            <span className="relative inline-block whitespace-nowrap">
              New
              <span className="animate-bird-left absolute -top-4 sm:-top-5 -left-1 sm:-left-3 text-xl sm:text-2xl z-20 pointer-events-none drop-shadow-md opacity-0">
                <span className="animate-bee-buzz-reverse inline-block">🐝</span>
              </span>
              <span className="animate-bird-speech-left absolute bottom-full mb-6 sm:mb-8 -left-4 sm:-left-12 w-40 sm:w-48 text-[10px] sm:text-[11px] font-sans font-medium text-primary bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-2xl rounded-bl-none shadow-md pointer-events-none opacity-0 border border-sage-200 z-30 leading-snug text-left tracking-wide whitespace-normal">
                Bzz... Have you seen these new arrivals? So fresh! 🍯
              </span>
            </span>
            <span className="text-primary relative inline-block whitespace-nowrap">
              Arrivals
              <span className="animate-bird-right absolute -top-4 sm:-top-5 -right-1 sm:-right-3 text-xl sm:text-2xl z-20 pointer-events-none drop-shadow-md opacity-0">
                <span className="animate-bee-buzz inline-block">🐝</span>
              </span>
              <span className="animate-bird-speech-right absolute bottom-full mb-6 sm:mb-8 -right-4 sm:-right-12 w-40 sm:w-48 text-[10px] sm:text-[11px] font-sans font-medium text-primary bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-2xl rounded-br-none shadow-md pointer-events-none opacity-0 border border-sage-200 z-30 leading-snug text-left tracking-wide whitespace-normal">
                Yes! They just arrived and the energy is buzzing! ✨
              </span>
            </span>
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
