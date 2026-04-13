import type { Metadata } from 'next';
import Link from 'next/link';
import { getAvailablePaintings } from '@/lib/data';
import { PaintingCard } from '@/components/gallery/PaintingCard';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Purchase original paintings by Radha Khetan. Each painting is a unique, one-of-a-kind work of art.',
};

export default function ShopPage() {
  const paintings = getAvailablePaintings();

  return (
    <section className="pt-[var(--nav-height)]">
      <div className="py-12 md:py-16 lg:py-24 px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-8">
          <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
            Original Works
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)] mb-4">
            Shop
          </h1>
          <p className="font-body text-base text-[var(--color-text-light)] max-w-lg mx-auto">
            Each painting is a unique original. Click on any work to view details and purchase securely via Stripe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {paintings.map((painting, i) => (
            <div
              key={painting.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative">
                <PaintingCard painting={painting} />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-light text-[var(--color-text)]">
                      {painting.title}
                    </h3>
                    <p className="font-body text-xs text-[var(--color-text-light)]">
                      {painting.medium} &middot; {painting.dimensions}
                    </p>
                  </div>
                  <span className="font-body text-lg font-medium text-[var(--color-text)]">
                    ${painting.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {paintings.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-[var(--color-text-light)] mb-4">
              All paintings are currently sold. Check back soon for new works.
            </p>
            <Link
              href="/contact"
              className="font-body text-sm text-[var(--color-accent)] no-underline hover:underline"
            >
              Inquire about commissions
            </Link>
          </div>
        )}

        <div className="text-center mt-16 pt-12 border-t border-[var(--color-border)] max-w-2xl mx-auto">
          <h3 className="font-display text-xl font-light text-[var(--color-text)] mb-3">
            Looking for Something Specific?
          </h3>
          <p className="font-body text-sm text-[var(--color-text-light)] mb-6">
            Commission a custom painting tailored to your space, style, and vision.
          </p>
          <Link
            href="/contact"
            className="inline-block font-body text-sm font-normal tracking-[0.1em] uppercase py-3 px-8 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-sm no-underline transition-gallery hover:bg-[var(--color-accent)] hover:text-white"
          >
            Request a Commission
          </Link>
        </div>
      </div>
    </section>
  );
}
