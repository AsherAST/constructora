"use client";

import Link from "next/link";
import { useState } from "react";
import { company } from "@/data/company";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900"
          onClick={() => setMenuOpen(false)}
        >
          {company.name}
        </Link>

        <div className="hidden gap-6 md:flex">
          {company.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          className="md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="menu-movil"
          data-testid="menu-movil"
          className="flex flex-col gap-4 border-t border-zinc-200 px-4 py-4 md:hidden"
        >
          {company.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
