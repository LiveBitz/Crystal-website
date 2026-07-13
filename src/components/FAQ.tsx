import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { prisma } from "@/lib/db";

export default async function FAQ() {
  const items = await prisma.faqItem.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </Reveal>

        {items.length > 0 ? (
          <FaqAccordion items={items} />
        ) : (
          <p className="mt-12 text-center text-sm text-foreground/50">No questions yet.</p>
        )}
      </div>
    </section>
  );
}
