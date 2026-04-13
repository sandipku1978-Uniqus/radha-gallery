import Link from 'next/link';
import type { Painting } from '@/lib/data';
import { FavoriteButton } from './FavoriteButton';
import { ColorPalette } from './ColorPalette';

const statusStyles: Record<Painting['status'], { label: string; className: string }> = {
  available: { label: 'Available', className: 'bg-[var(--color-available)] text-white' },
  sold: { label: 'Sold', className: 'bg-[var(--color-sold)] text-white' },
  'not-for-sale': { label: 'Not for Sale', className: 'bg-[var(--color-text-light)] text-white' },
  inquire: { label: 'Inquire', className: 'bg-[var(--color-accent)] text-white' },
};

export function PaintingCard({ painting }: { painting: Painting }) {
  const status = statusStyles[painting.status];

  return (
    <Link
      href={`/gallery/${painting.slug}`}
      className="painting-card group block relative overflow-hidden rounded-sm bg-[var(--color-cream)] transition-gallery hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] no-underline"
    >
      {/* Painting image placeholder */}
      <div
        className="w-full min-h-[240px] sm:min-h-[300px] lg:min-h-[320px]"
        style={{
          aspectRatio: painting.aspectRatio,
          background: painting.gradient,
        }}
        role="img"
        aria-label={painting.title}
      />

      {/* Favorite button — top right */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <FavoriteButton slug={painting.slug} />
      </div>

      {/* Hover overlay */}
      <div className="painting-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
        <h3 className="font-display text-lg font-light text-white mb-1">
          {painting.title}
        </h3>
        <p className="font-body text-xs text-white/70 mb-2">
          {painting.medium} &middot; {painting.dimensions}
        </p>
        <div className="flex items-center justify-between mb-2">
          {painting.price ? (
            <span className="font-body text-sm text-white/90">
              ${painting.price.toLocaleString()}
            </span>
          ) : (
            <span className="font-body text-sm text-white/70 italic">Price on inquiry</span>
          )}
          <span className={`text-[0.65rem] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${status.className}`}>
            {status.label}
          </span>
        </div>
        <ColorPalette colors={painting.colors} />
      </div>
    </Link>
  );
}
