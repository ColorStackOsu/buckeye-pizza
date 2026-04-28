"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const dropdownRef = useRef<HTMLLIElement>(null);

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

  // Close mobile menu on route change (resize to desktop)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-light-gray shadow-[0_2.5px_4.5px_rgba(0,0,0,0.1)] border-b border-black/[0.06] rounded-b-lg"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-3 md:px-10 py-2">
        {/* Logo */}
        <Link href="/" aria-label="ColorStackOSU Home">
          <Image
            src="/images/Logo Horizontal.png"
            alt="ColorStackOSU Logo"
            width={200}
            height={56}
            className="h-14 w-auto"
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
          <span
            className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href} className="mx-4">
              <Link
                href={link.href}
                className="text-black text-[0.95rem] font-semibold hover:text-primary-red transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* About Us dropdown */}
          <li ref={dropdownRef} className="mx-4 relative">
            <button
              type="button"
              className="text-black text-[0.95rem] font-semibold hover:text-primary-red transition-colors flex items-center gap-1"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              About Us
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                        className="block px-4 py-2 text-sm text-dark hover:bg-bg-white hover:text-primary-red transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {subLink.label}
                      </a>
                    ) : (
                      <Link
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-dark hover:bg-bg-white hover:text-primary-red transition-colors"
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

      {/* Mobile menu */}
      <div
        id="navbarCollapse"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-black text-lg font-semibold hover:text-primary-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Mobile About Us section */}
          <li>
            <button
              type="button"
              className="text-black text-lg font-semibold hover:text-primary-red transition-colors flex items-center gap-1"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              About Us
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              <ul className="flex flex-col items-center gap-2 mt-2 list-none p-0">
                {aboutSubLinks.map((subLink) => (
                  <li key={subLink.href}>
                    {subLink.external ? (
                      <a
                        href={subLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark/70 text-base hover:text-primary-red transition-colors"
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
                        className="text-dark/70 text-base hover:text-primary-red transition-colors"
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
    </nav>
  );
}
