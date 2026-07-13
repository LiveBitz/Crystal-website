import Image from "next/image";
import Reveal from "@/components/Reveal";

const reasons = [
  { label: "Natural AAA Quality Crystals", image: "/icon-natural-crystals.png" },
  { label: "Verified Lab Certificate", image: "/icon-lab-certificate.png" },
  { label: "Cleansed and Energised", image: "/icon-cleansed-energised.png" },
  { label: "Luxury Packaging", image: "/icon-luxury-packaging.png" },
];

// Repeated 4x (two identical halves of two copies each) so the `.marquee-track`
// loop (0% → -50%) stays seamless while giving the eye more content per cycle —
// with only 4 unique icons, a single repeat felt like a hard restart.
const row = [...reasons, ...reasons, ...reasons, ...reasons];

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-sage-50 py-14 sm:py-20">
      <Reveal className="text-center">
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl">
          Why Choose <span className="text-primary">Crystalenii</span>?
        </h2>
      </Reveal>

      {/* Edge fade so cards don't hard-cut at the viewport edge */}
      <div
        className="relative mt-10 sm:mt-16"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track flex w-max gap-10 sm:gap-16"
          style={{ animationDuration: "38s" }}
        >
          {row.map(({ label, image }, i) => (
            <div key={`${label}-${i}`} className="flex w-32 shrink-0 flex-col items-center gap-3 text-center sm:w-44">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-primary/30 sm:h-28 sm:w-28">
                <Image src={image} alt={label} fill sizes="(min-width: 640px) 112px, 64px" />
              </div>
              <p className="text-sm font-bold leading-snug text-foreground sm:text-base">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
