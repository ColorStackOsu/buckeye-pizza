"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/execboard", label: "Meet Us" },
];

const aboutSubLinks = [
  { href: "/about#about-us", label: "About", external: false },
  { href: "/about#contact-us", label: "Contact Us", external: false },
  {
    href: "https://color-stack-test-bank.vercel.app/",
    label: "Test Bank",
    external: true,
  },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLLIElement[]>([]);
  const pathname = usePathname();

  // Scroll listener — gain frosted-glass backdrop past the hero
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // GSAP staggered slide-in animation for mobile menu links
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const links = mobileLinksRef.current.filter(Boolean);

    if (isMenuOpen) {
      // Animate overlay in
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      // Stagger links sliding in from right
      gsap.fromTo(
        links,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.1,
        },
      );
    } else {
      // Animate overlay out
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isMenuOpen]);

  // Helper to register mobile link refs
  const setMobileLinkRef = (el: HTMLLIElement | null, index: number) => {
    if (el) mobileLinksRef.current[index] = el;
  };

  // All mobile nav items (main links + About Us)
  const allMobileLinks = [
    ...navLinks,
    { href: "/about#about-us", label: "About Us" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 border-b border-black/10 shadow-sm"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-3 md:px-10 py-2">
          {/* Logo — white version over hero, dark version when scrolled */}
          <Link href="/" aria-label="ColorStackOSU Home">
            <Image
              src={
                isScrolled
                  ? "/images/Logo Horizontal.png"
                  : "/images/Logo Horizontal_White.png"
              }
              alt="ColorStackOSU Logo"
              width={200}
              height={56}
              className="h-14 w-auto transition-opacity duration-300"
              draggable={false}
              priority
            />
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarCollapse"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {/* Hamburger → X morph */}
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isScrolled || isMenuOpen ? "bg-brand-dark" : "bg-white"
              } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isScrolled || isMenuOpen ? "bg-brand-dark" : "bg-white"
              } ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isScrolled || isMenuOpen ? "bg-brand-dark" : "bg-white"
              } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="mx-4 flex flex-col items-center">
                  <Link
                    href={link.href}
                    className={`nav-link font-display text-overline uppercase tracking-widest transition-colors ${
                      isScrolled ? "text-brand-dark" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {/* Active-page red dot indicator */}
                  {isActive && (
                    <span
                      className="mt-1 w-1 h-1 rounded-full bg-brand-red"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}

            {/* About Us dropdown */}
            <li
              ref={dropdownRef}
              className="mx-4 relative flex flex-col items-center"
            >
              <button
                type="button"
                className={`nav-link font-display text-overline uppercase tracking-widest transition-colors flex items-center gap-1 ${
                  isScrolled ? "text-brand-dark" : "text-white"
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                About Us
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul
                  className="absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-black/10 py-1 z-[1000] list-none p-0"
                  aria-label="About Us submenu"
                >
                  {aboutSubLinks.map((subLink) => (
                    <li key={subLink.href}>
                      {subLink.external ? (
                        <a
                          href={subLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-red transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {subLink.label}
                        </a>
                      ) : (
                        <Link
                          href={subLink.href}
                          className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-red transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Full-screen mobile overlay menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="navbarCollapse"
          className="fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Close button (X) */}
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation"
          >
            <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-[3px]" />
            <span className="block w-6 h-0.5 bg-white -rotate-45 -translate-y-[3px]" />
          </button>

          {/* Logo in overlay */}
          <Link
            href="/"
            className="absolute top-4 left-4"
            aria-label="ColorStackOSU Home"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/images/Logo Horizontal.png"
              alt="ColorStackOSU Logo"
              width={160}
              height={45}
              className="h-11 w-auto brightness-0 invert"
              draggable={false}
            />
          </Link>

          {/* Stacked nav links */}
          <ul className="flex flex-col items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.href}
                  ref={(el) => setMobileLinkRef(el, index)}
                  className="flex flex-col items-center"
                >
                  <Link
                    href={link.href}
                    className={`font-display text-display uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-brand-red"
                        : "text-white hover:text-brand-red"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}

            {/* Mobile About Us section */}
            <li
              ref={(el) => setMobileLinkRef(el, navLinks.length)}
              className="flex flex-col items-center"
            >
              <button
                type="button"
                className="font-display text-display uppercase tracking-widest text-white hover:text-brand-red transition-colors flex items-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                About Us
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="flex flex-col items-center gap-3 mt-4 list-none p-0">
                  {aboutSubLinks.map((subLink) => (
                    <li key={subLink.href}>
                      {subLink.external ? (
                        <a
                          href={subLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-white/70 text-lg hover:text-brand-red transition-colors"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {subLink.label}
                        </a>
                      ) : (
                        <Link
                          href={subLink.href}
                          className="font-body text-white/70 text-lg hover:text-brand-red transition-colors"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {subLink.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
