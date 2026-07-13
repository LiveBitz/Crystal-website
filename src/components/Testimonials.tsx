import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/db";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  product: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[280px] shrink-0 rounded-2xl border border-sage-200 bg-white p-5 shadow-sm sm:w-[340px] sm:p-6">
      <Quote className="text-primary/30" size={20} fill="currentColor" />
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/70">{t.quote}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-serif text-sm font-bold text-gold-light">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
          <p className="truncate text-xs text-foreground/50">{t.product}</p>
        </div>
      </div>
    </div>
  );
}

// Minimum number of cards per marquee half — with only 1–2 real testimonials,
// duplicating just once barely gives the eye anything to flow through, so we
// pad by repeating the list until it hits this floor before duplicating it
// again for the seamless `.marquee-track` loop (0% → -50%).
const MIN_CARDS = 6;

// Two infinite marquee rows — top row drifts left, bottom row drifts right.
// Reuses the `.marquee-track` keyframe (see globals.css) for both rows;
// the second row just runs the same animation in reverse.
export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  const half =
    testimonials.length > 0
      ? Array.from(
          { length: Math.max(MIN_CARDS, testimonials.length) },
          (_, i) => testimonials[i % testimonials.length],
        )
      : [];
  const row = [...half, ...half];

  return (
    <section className="relative overflow-hidden bg-sage-50 py-16 sm:py-20">
      <Reveal className="mb-8 px-5 text-center sm:mb-10">
        <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Customer <span className="text-primary">Testimonials</span>
        </h2>
        <p className="mt-2 text-sm text-foreground/60 sm:text-base">
          Real stories from real customers.
        </p>
      </Reveal>

      {testimonials.length === 0 ? (
        <p className="text-center text-sm text-foreground/50">No testimonials yet.</p>
      ) : (
        <div
          className="relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="marquee-track mb-4 flex w-max gap-4 sm:mb-5 sm:gap-5"
            style={{ animationDuration: "40s" }}
          >
            {row.map((t, i) => (
              <TestimonialCard key={`row1-${t.id}-${i}`} t={t} />
            ))}
          </div>
          <div
            className="marquee-track flex w-max gap-4 sm:gap-5"
            style={{ animationDirection: "reverse", animationDuration: "40s" }}
          >
            {row.map((t, i) => (
              <TestimonialCard key={`row2-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
