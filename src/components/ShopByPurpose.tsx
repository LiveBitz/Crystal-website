import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import { prisma } from "@/lib/db";

export default async function ShopByPurpose() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Shop By <span className="text-primary">Purpose</span>
          </h2>
        </Reveal>

        {categories.length > 0 ? (
          <RevealGroup className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:grid-cols-6 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-sage-200 bg-white transition-shadow group-hover:shadow-md">
                  {category.imageUrl && (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(min-width: 640px) 150px, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-primary">{category.name}</p>
              </Link>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No categories yet.</p>
        )}
      </div>
    </section>
  );
}
