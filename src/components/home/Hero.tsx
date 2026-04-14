import Link from 'next/link';
import type { Painting, ArtistProfile } from '@/lib/data';

export function Hero({ painting, artist }: { painting: Painting; artist: ArtistProfile }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 pt-[var(--nav-height)]">
      {/* Painting — constrained height so it doesn't blow up the fold */}
      <div className="relative overflow-hidden bg-[var(--color-cream)] flex items-center justify-center p-10 md:p-12">
        <div
          className="w-[70%] max-w-[360px] max-h-[60vh] rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.15)] animate-hero-image overflow-hidden"
          style={{
            aspectRatio: painting.aspectRatio,
            background: painting.gradient,
          }}
        >
          {painting.imageUrl ? (
            <img
              src={painting.imageUrl}
              alt={painting.imageAlt || painting.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" role="img" aria-label={painting.title} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-8 md:px-12 lg:px-20 py-12 md:py-16 animate-hero-content">
        <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-6">
          Original Paintings
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] text-[var(--color-text)] mb-6">
          Art by{' '}
          <em className="italic text-[var(--color-accent)]">{artist.name.split(' ')[0]}</em>
        </h1>

        <p className="font-body text-base font-light text-[var(--color-text-light)] max-w-[420px] mb-10 leading-[1.7]">
          {artist.tagline}. Exploring the intersection of abstract expression and the natural world
          through color, texture, and emotion.
        </p>

        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 font-body text-[0.82rem] font-normal tracking-[0.15em] uppercase text-[var(--color-text)] no-underline py-4 border-b border-[var(--color-accent)] transition-gallery hover:text-[var(--color-accent)] hover:gap-5 self-start"
        >
          Explore the Gallery
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
