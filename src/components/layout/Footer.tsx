import Link from 'next/link';
import { NewsletterSignup } from './NewsletterSignup';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-cream)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-light tracking-[0.05em] mb-4">
              Radha Khetan
            </h3>
            <p className="font-body text-sm text-[var(--color-text-light)] leading-relaxed max-w-[280px]">
              Abstract & nature-inspired original paintings from San Jose, California.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-light)] mb-4">
              Explore
            </h4>
            <ul className="space-y-2 list-none">
              {[
                { href: '/gallery', label: 'Gallery' },
                { href: '/collections', label: 'Collections' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About the Artist' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-light)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2 list-none">
              <li>
                <a
                  href="https://instagram.com/palletenpaint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Instagram (@palletenpaint)
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@radhakhetan.art"
                  className="font-body text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  hello@radhakhetan.art
                </a>
              </li>
            </ul>
          </div>
        </div>

        <NewsletterSignup />

        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
          <p className="font-body text-xs text-[var(--color-text-light)] tracking-[0.05em]">
            &copy; {new Date().getFullYear()} Radha Khetan. All rights reserved. All artwork images are protected.
          </p>
        </div>
      </div>
    </footer>
  );
}
