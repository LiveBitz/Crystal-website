"use client";

import {
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Package,
  HelpCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/crystal171admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/crystal171admin/orders", label: "Orders", icon: Package },
  { href: "/crystal171admin/hero", label: "Hero Banners", icon: Images },
  { href: "/crystal171admin/products", label: "Products", icon: ShoppingBag },
  { href: "/crystal171admin/categories", label: "Shop By Purpose", icon: ShoppingBag },
  { href: "/crystal171admin/combos", label: "Combo Banners", icon: Sparkles },
  { href: "/crystal171admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/crystal171admin/articles", label: "Articles", icon: Newspaper },
  { href: "/crystal171admin/faq", label: "FAQ", icon: HelpCircle },
];

export default function Sidebar({
  onLogout,
}: {
  onLogout: (formData: FormData) => void | Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sage-200 bg-white">
      <div className="border-b border-sage-200 px-5 py-5">
        <p className="font-serif text-lg font-bold text-primary">Crystalenii</p>
        <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          Admin Panel
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-gold-light"
                  : "text-foreground/80 hover:bg-sage-100 hover:text-primary"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sage-200 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-100 hover:text-primary"
        >
          <ExternalLink size={18} />
          View Website
        </a>

        <form action={onLogout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-100 hover:text-primary"
          >
            <LogOut size={18} />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
