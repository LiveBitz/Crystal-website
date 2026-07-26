import type { Metadata } from "next";
import {
  Coins,
  Feather,
  Gem,
  HandHeart,
  Hash,
  Home as HomeIcon,
  MessageCircle,
  Moon,
  Wand2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Moumita Giri, founder of Crystalenii: Tarot Grand Master, Reiki Grand Master, Angel Healer, Numerology Grand Master, and Vastu Consultant.",
};

const credentials = [
  { icon: Moon, label: "Tarot Grand Master" },
  { icon: HandHeart, label: "Reiki Grand Master" },
  { icon: Feather, label: "Angel Healer" },
  { icon: Hash, label: "Numerology Grand Master" },
  { icon: Coins, label: "Money Reiki Healer" },
  { icon: Gem, label: "Crystal Expert" },
  { icon: Wand2, label: "Spell Caster" },
  { icon: HomeIcon, label: "Vastu Consultant" },
];

export default function AboutUsPage() {
  const whatsappNumber = process.env.WHATSAPP_NUMBER ?? "";
  const whatsappHref = whatsappNumber
    ? buildWhatsAppLink(
        whatsappNumber,
        "Hi Moumita! I'd love to know more about your healing services.",
      )
    : undefined;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sage-50 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          {/* Intro */}
          <div className="text-center">
            <p className="font-serif text-sm font-semibold tracking-[0.3em] text-gold uppercase">
              ✦ Meet Your Guide ✦
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Moumita Giri
            </h1>
            <p className="mt-3 text-sm font-medium text-foreground/60 sm:text-base">
              Founder of Crystalenii · Multi-Disciplinary Spiritual Healer
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              Every piece at Crystalenii is chosen and energised under Moumita&apos;s personal
              guidance. Trained across tarot, reiki, numerology, and Vastu, she brings years of
              dedicated study and practice to every bracelet and ritual kit, so what reaches you
              isn&apos;t just a beautiful accessory, but something intentionally aligned to
              support you.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <h2 className="text-center font-serif text-xl font-bold text-primary sm:text-2xl">
              Credentials &amp; Expertise
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
              {credentials.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-sage-200 bg-sage-50 px-4 py-6 text-center transition-colors hover:border-gold-light/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-gold-light">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust pillars */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-sage-200 bg-white p-6 text-center">
              <p className="font-serif text-lg font-bold text-primary">Genuine Practice</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Every reading, healing, and recommendation comes from real, hands-on training,
                not guesswork.
              </p>
            </div>
            <div className="rounded-2xl border border-sage-200 bg-white p-6 text-center">
              <p className="font-serif text-lg font-bold text-primary">Personal Attention</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Every crystal is hand-selected and energised, nothing is mass-produced or
                generic.
              </p>
            </div>
            <div className="rounded-2xl border border-sage-200 bg-white p-6 text-center">
              <p className="font-serif text-lg font-bold text-primary">Always Reachable</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Questions before or after your order? You can reach Moumita and the team directly,
                anytime.
              </p>
            </div>
          </div>

          {/* CTA */}
          {whatsappHref && (
            <div className="mt-12 text-center">
              <p className="text-sm text-foreground/60">
                Have a question about a ritual, a reading, or which crystal is right for you?
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gold-light transition-colors hover:bg-primary-dark"
              >
                <MessageCircle size={16} />
                Chat with Moumita
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
