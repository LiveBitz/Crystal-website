import Image from "next/image";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";

const steps = [
  {
    number: 1,
    title: "Set Your Intention",
    description: "Get clear on what you want to invite.",
    image: "/p1.png",
  },
  {
    number: 2,
    title: "Wear Your Bracelet",
    description: "Let the energy support you everyday",
    image: "/p2.png",
  },
  {
    number: 3,
    title: "See The Shift",
    description: "Stay consistent. Watch your life transform",
    image: "/p3.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            How it <span className="text-primary">Works</span>
          </h2>
          <p className="mt-3 text-base text-foreground/70">
            A simple daily ritual for powerful results
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="absolute -left-2 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-gold-light shadow-md">
                {step.number}
              </span>

              <div className="flex items-center gap-4 overflow-hidden rounded-xl bg-white pl-8 pr-4 py-6">
                <div className="flex-1">
                  <p className="font-serif text-lg font-bold text-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-foreground/70">{step.description}</p>
                </div>

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-sage-200/60">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
