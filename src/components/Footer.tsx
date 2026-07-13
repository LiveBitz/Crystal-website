import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import RevealGroup from "@/components/RevealGroup";

const quickLinks = ["Home", "Shop", "Ritual Kits", "About Us", "Blog", "Contact us"];
const customerCare = [
  "FAQs",
  "Shipping Policy",
  "Returns & Refunds",
  "Privacy Policy",
  "Terms & Conditions",
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M14 9h3V5.5h-3A3.5 3.5 0 0 0 10.5 9v2.5H8V15h2.5v6H14v-6h2.5l.5-3.5h-3V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/crystalenii/" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-sage-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-16">
        <RevealGroup
          y={20}
          stagger={0.12}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-light/40">
                <Image src="/logo.jpeg" alt="Crystalenii" fill sizes="32px" className="object-cover" />
              </span>
              <span className="font-serif text-xl font-bold text-sage-50">Crystalenii</span>
            </div>
            <p className="text-sm leading-relaxed text-sage-100/80">
              Ancient wisdom, modern living. Handcrafted crystal jewelry for protection, balance,
              and everyday energy.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sage-50 transition-colors hover:bg-gold hover:text-primary"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-serif text-base font-bold text-gold-light">Quick Links</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-sage-100/80 transition-colors hover:text-gold-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <p className="font-serif text-base font-bold text-gold-light">Customer Care</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {customerCare.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-sage-100/80 transition-colors hover:text-gold-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-serif text-base font-bold text-gold-light">Stay Connected</p>
            <ul className="flex flex-col gap-2.5 text-sm text-sage-100/80">
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-gold-light" />
                <span>support@crystalenii.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-gold-light" />
                <span>+91 00000 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-gold-light" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </RevealGroup>
      </div>

      <div className="border-t border-sage-100/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-sage-100/70 sm:flex-row sm:gap-2 sm:px-8">
          <p>© {new Date().getFullYear()} Crystalenii. All rights reserved.</p>
          <p>Ancient Wisdom, Modern Living</p>
          <a
            href="https://scalisite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold-light/30 bg-primary-light/40 px-4 py-1.5 text-xs font-medium text-sage-100/80 shadow-sm transition-colors hover:border-gold-light/60 hover:bg-primary-light/60 hover:text-gold-light"
          >
            Built by <span className="font-semibold text-gold-light">Scalisite</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
