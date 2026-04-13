import Link from 'next/link';
import type { Painting } from '@/lib/data';
import { PaintingCard } from '@/components/gallery/PaintingCard';

export function FeaturedWorks({ paintings }: { paintings: Painting[] }) {
  return (
    <section className="py-10 md:py-16 lg:py-20 px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="text-center mb-6 md:mb-10 lg:mb-12">
        <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
          Selected Works
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)]">
          Featured Paintings
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {paintings.slice(0, 4).map((painting, i) => (
          <div
            key={painting.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <PaintingCard painting={painting} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-body text-[0.82rem] font-normal tracking-[0.12em] uppercase text-[var(--color-accent)] no-underline border-b border-[var(--color-accent)] pb-1 transition-gallery hover:gap-4"
        >
          View All Paintings
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
