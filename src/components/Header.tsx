"use client";

import gsap from "gsap";
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "Ritual Kits", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact us", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

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

  const closeSearch = () => setSearchOpen(false);

  return (
    <header ref={headerRef} className="border-b border-sage-200 bg-sage-50">
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-8">
        {searchOpen ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center gap-2 rounded-md border border-primary/40 bg-white px-3 py-2 focus-within:border-primary"
          >
            <Search size={18} className="shrink-0 text-primary/60" />
            <input
              ref={searchInputRef}
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

            <a href="#" className="flex items-center gap-3 lg:mr-8">
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
            </a>

            <nav className="hidden flex-1 items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1 text-[15px] font-medium text-foreground/90 transition-colors hover:text-primary"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </a>
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
              <button aria-label="Wishlist" className="text-primary transition-opacity hover:opacity-70">
                <Heart size={20} />
              </button>
              <button
                aria-label="Account"
                className="hidden text-primary transition-opacity hover:opacity-70 sm:inline-flex"
              >
                <User size={20} />
              </button>
              <button aria-label="Cart" className="text-primary transition-opacity hover:opacity-70">
                <ShoppingCart size={20} />
              </button>
            </div>
          </>
        )}
      </div>

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
          <a href="#" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image src="/logo.jpeg" alt="Crystalenii" fill sizes="28px" className="object-cover" />
            </span>
            <span className="font-serif text-lg font-bold text-primary">Crystalenii</span>
          </a>
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
              {link.hasDropdown && <ChevronDown size={18} />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
