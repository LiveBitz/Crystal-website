import { Mail, MapPin, Phone, ShieldCheck, Truck, Leaf, Gem, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import Reveal from "@/components/Reveal";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/" },
  { label: "Ritual Kits", href: "/ritual-kits" },
  { label: "About Us", href: "/" },
  { label: "Contact Us", href: "/" },
];

const customerCare = [
  { label: "FAQs", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns & Refunds", href: "/returns-refunds" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

const trustFeatures = [
  { icon: Gem, title: "100% Authentic", desc: "Certified natural crystals" },
  { icon: Leaf, title: "Ethically Sourced", desc: "Sustainable & conscious" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted payments" },
  { icon: Truck, title: "Fast Shipping", desc: "Safe & tracked delivery" },
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
    <footer className="mt-12 bg-primary text-sage-100">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-8">
        
        {/* Minimal Trust Row */}
        <RevealGroup y={10} stagger={0.05} className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-4 border-b border-white/10 pb-8 text-white/80">
          {trustFeatures.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <feature.icon size={16} strokeWidth={1.5} className="text-[#b87a88]" />
              <span className="font-serif text-sm font-medium">{feature.title}</span>
            </div>
          ))}
        </RevealGroup>

        {/* Main Footer Links */}
        <RevealGroup y={15} stagger={0.1} className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-serif text-xl font-bold tracking-wide text-white">Crystalenii</span>
            <p className="text-xs leading-relaxed text-sage-100/60 max-w-xs">
              Ancient wisdom, modern living. Handcrafted crystal jewelry for protection, balance, and everyday positive energy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="group flex items-center justify-center text-sage-100/50 transition-colors hover:text-[#b87a88]"
                >
                  <Icon width={18} height={18} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-4">Explore</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-[13px] text-sage-100/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="flex flex-col gap-3">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-[13px] text-sage-100/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold text-white mb-1">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-sage-100/60">
              <li>
                <a href="mailto:support@crystalenii.com" className="transition-colors hover:text-white">support@crystalenii.com</a>
              </li>
              <li>
                <span className="transition-colors hover:text-white">+91 00000 00000</span>
              </li>
            </ul>
          </div>
        </RevealGroup>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 flex flex-col items-center justify-between gap-3 py-6 text-[11px] text-sage-100/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Crystalenii. All rights reserved.</p>
          <a
            href="https://scalisite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#b87a88]"
          >
            Built by <span className="font-medium text-white/70">Scalisite</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
