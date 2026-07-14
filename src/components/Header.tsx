"use client";

import gsap from "gsap";
import { Menu, Search, ShoppingCart, X, User, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlistStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop By Purpose", href: "/#shop-by-purpose" },
  { label: "Combo", href: "/#combo-products" },
  { label: "Ritual Kits", href: "/ritual-kits" },
  { label: "About Us", href: "/" },
  { label: "Contact us", href: "/" },
];

export default function Header({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  
  const { items, setIsOpen } = useCart();
  const { items: wishlistItems, setItems: setWishlistItems } = useWishlist();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setMounted(true));
    if (isLoggedIn) {
      fetch("/api/wishlist")
        .then(res => res.json())
        .then(data => {
          if (data.wishlist) setWishlistItems(data.wishlist);
        })
        .catch(console.error);
    }
  }, [isLoggedIn, setWishlistItems]);
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Debounced live search as the user types.
  useEffect(() => {
    const trimmed = query.trim();

    const id = setTimeout(async () => {
      if (trimmed.length < 2) {
        setResults([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const json = await res.json();
        setResults(json.results ?? []);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.15, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
        gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
      } else {
        gsap.to(sidebarRef.current, { x: "-100%", duration: 0.35, ease: "power3.in" });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, pointerEvents: "none" });
      }
    });
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((v) => !v);
  };

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 border-b border-sage-200/50 bg-sage-50/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-8">
        {searchOpen ? (
          <div className="w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center gap-2 rounded-md border border-primary/40 bg-white px-3 py-2 focus-within:border-primary"
            >
              <Search size={18} className="shrink-0 text-primary/60" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search for bracelets, crystals, ritual kits..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-sage-100"
              >
                <X size={18} />
              </button>
            </form>

            {/* Live results */}
            {query.trim().length >= 2 && (
              <div className="animate-dropdown absolute inset-x-0 top-full z-30 border-t border-sage-200 bg-white shadow-lg">
                <div className="mx-auto max-h-[70vh] max-w-7xl overflow-y-auto px-4 py-3 sm:px-8">
                  {searching ? (
                    <p className="py-6 text-center text-sm text-foreground/50">Searching…</p>
                  ) : results.length === 0 ? (
                    <p className="py-6 text-center text-sm text-foreground/50">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <ul className="flex flex-col divide-y divide-sage-100">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 py-2.5 transition-colors hover:bg-sage-50"
                          >
                            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-sage-100">
                              {product.imageUrl && (
                                <Image
                                  src={product.imageUrl}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-foreground">
                                {product.name}
                              </span>
                              <span className="text-sm font-semibold text-primary">
                                {product.price}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-ml-1.5 flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-sage-100 active:bg-sage-200 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center gap-3 lg:mr-8">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image src="/logo.jpeg" alt="Crystalenii" fill sizes="36px" className="object-cover" />
              </span>
              <div className="leading-tight">
                <span className="font-serif text-xl font-bold tracking-wide text-primary sm:text-2xl">
                  Crystalenii
                </span>
                <p className="hidden text-[10px] font-medium tracking-[0.2em] text-primary-light uppercase sm:block">
                  Ancient Wisdom, Modern Living
                </p>
              </div>
            </Link>

            <nav className="hidden flex-1 items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link-wrapper flex items-center gap-1 text-[15px] font-medium text-foreground/85 transition-colors hover:text-primary py-4 relative"
                >
                  <span className="flower-hover">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-4 sm:gap-5">
              <button
                onClick={openSearch}
                aria-label="Open search"
                className="text-primary transition-opacity hover:opacity-70"
              >
                <Search size={20} />
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleAuthAction}
                    aria-label="Account"
                    className="text-primary transition-opacity hover:opacity-70"
                    title="Account"
                  >
                    <User size={20} />
                  </button>
                  <Link id="nav-wishlist-icon" href="/wishlist" aria-label="Wishlist" className="relative text-primary transition-opacity hover:opacity-70">
                    <Heart size={20} />
                    {mounted && wishlistCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Cart"
                    className="relative text-primary transition-opacity hover:opacity-70"
                  >
                    <ShoppingCart size={20} />
                    {mounted && cartCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gold-light transition-colors hover:bg-primary-dark sm:px-5 sm:text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      </header>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeMenu}
        className="fixed inset-0 z-40 bg-black/40 opacity-0 pointer-events-none lg:hidden"
      />

      {/* Off-canvas sidebar */}
      <div
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm -translate-x-full flex-col bg-sage-50 shadow-xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-sage-200 px-5 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image src="/logo.jpeg" alt="Crystalenii" fill sizes="28px" className="object-cover" />
            </span>
            <span className="font-serif text-lg font-bold text-primary">Crystalenii</span>
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-sage-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between rounded-md px-3 py-3.5 text-base font-medium text-foreground/90 transition-colors hover:bg-sage-100 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <CartDrawer isLoggedIn={!!isLoggedIn} />
    </>
  );
}
