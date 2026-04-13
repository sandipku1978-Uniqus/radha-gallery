'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-[var(--nav-height)] flex items-center justify-between px-6 sm:px-10 md:px-16 bg-[var(--color-bg)]/92 backdrop-blur-[20px] border-b border-[var(--color-border)] z-50 transition-gallery"
        role="banner"
      >
        <Link
          href="/"
          className="font-display text-2xl font-light tracking-[0.08em] text-[var(--color-text)] no-underline"
          aria-label="Radha Khetan Art Gallery — Home"
        >
          Radha Khetan
        </Link>

        <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
          <ul className="flex gap-8 list-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link font-body text-[0.82rem] font-normal tracking-[0.12em] uppercase no-underline transition-colors duration-300 ${
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-light)] hover:text-[var(--color-text)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
        >
          <span className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-gallery" />
          <span className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-gallery" />
          <span className="block w-6 h-[1.5px] bg-[var(--color-text)] transition-gallery" />
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
