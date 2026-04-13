import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCollections } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated collections of original paintings by Radha Khetan — Abstract Landscapes, Nature Studies, and Mixed Media.',
};

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <section className="pt-[var(--nav-height)]">
      <div className="py-12 md:py-16 lg:py-24 px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-8">
          <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
            Curated Series
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)]">
            Collections
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {collections.map((collection, i) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block no-underline animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-full aspect-[4/5] rounded-sm mb-6 transition-gallery group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                style={{ background: collection.gradient }}
                role="img"
                aria-label={collection.title}
              />
              <h2 className="font-display text-xl font-light text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {collection.title}
              </h2>
              <p className="font-body text-sm text-[var(--color-text-light)] leading-relaxed mb-2 line-clamp-2">
                {collection.description}
              </p>
              <span className="font-body text-xs tracking-[0.1em] uppercase text-[var(--color-accent)]">
                {collection.paintingCount} {collection.paintingCount === 1 ? 'painting' : 'paintings'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
