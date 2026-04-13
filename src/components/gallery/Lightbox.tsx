'use client';

import Link from 'next/link';
import type { Painting } from '@/lib/data';
import { ColorPalette } from './ColorPalette';
import { FavoriteButton } from './FavoriteButton';
import { SocialShare } from './SocialShare';
import { SizeReference } from './SizeReference';

const statusConfig: Record<Painting['status'], { label: string; color: string }> = {
  available: { label: 'Available', color: 'var(--color-available)' },
  sold: { label: 'Sold', color: 'var(--color-sold)' },
  'not-for-sale': { label: 'Not for Sale', color: 'var(--color-text-light)' },
  inquire: { label: 'Inquire', color: 'var(--color-accent)' },
};

export function Lightbox({
  painting,
  collectionTitle,
}: {
  painting: Painting;
  collectionTitle: string;
}) {
  const status = statusConfig[painting.status];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">
      {/* Image */}
      <div
        className="image-protected-wrapper flex items-center justify-center bg-[var(--color-cream)] p-6 sm:p-10 lg:p-16 min-h-[50vh] lg:min-h-[calc(100vh-var(--nav-height)-80px)]"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="image-protected w-full max-w-[500px] rounded-sm shadow-[0_16px_60px_rgba(0,0,0,0.12)]"
          style={{
            aspectRatio: painting.aspectRatio,
            background: painting.gradient,
          }}
          role="img"
          aria-label={painting.title}
        />
      </div>

      {/* Details panel */}
      <div className="p-6 sm:p-8 lg:p-12 lg:border-l lg:border-[var(--color-border)] overflow-y-auto">
        {/* Status + Favorite row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-block text-[0.65rem] font-medium tracking-[0.15em] uppercase px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: status.color }}
          >
            {status.label}
          </span>
          <FavoriteButton slug={painting.slug} size="lg" />
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-light text-[var(--color-text)] mb-2">
          {painting.title}
        </h1>

        <p className="font-body text-sm text-[var(--color-accent)] mb-6">
          {painting.year}
        </p>

        {/* Metadata */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] w-24">Medium</span>
            <span className="font-body text-sm text-[var(--color-text)]">{painting.medium}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] w-24">Size</span>
            <span className="font-body text-sm text-[var(--color-text)]">{painting.dimensions}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] w-24">Collection</span>
            <Link
              href={`/collections/${painting.collectionSlug}`}
              className="font-body text-sm text-[var(--color-accent)] no-underline hover:underline"
            >
              {collectionTitle}
            </Link>
          </div>
          {painting.price && (
            <div className="flex items-center gap-3">
              <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] w-24">Price</span>
              <span className="font-body text-lg font-medium text-[var(--color-text)]">
                ${painting.price.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] w-24">Palette</span>
            <ColorPalette colors={painting.colors} />
          </div>
        </div>

        <p className="font-body text-sm text-[var(--color-text-light)] leading-relaxed mb-6">
          {painting.description}
        </p>

        {/* Tags */}
        {painting.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {painting.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[0.7rem] tracking-[0.08em] uppercase px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-light)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mb-4">
          {painting.status === 'available' && (
            <Link
              href={`/shop?buy=${painting.slug}`}
              className="font-body text-sm font-medium tracking-[0.1em] uppercase text-center py-4 px-6 bg-[var(--color-dark)] text-white rounded-sm no-underline transition-gallery hover:bg-[var(--color-accent)]"
            >
              Purchase This Painting &mdash; ${painting.price?.toLocaleString()}
            </Link>
          )}
          {(painting.status === 'inquire' || painting.status === 'available') && (
            <Link
              href={`/contact?painting=${encodeURIComponent(painting.title)}`}
              className="font-body text-sm font-normal tracking-[0.1em] uppercase text-center py-4 px-6 border border-[var(--color-border)] text-[var(--color-text)] rounded-sm no-underline transition-gallery hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Inquire About This Painting
            </Link>
          )}
        </div>

        {/* Social sharing */}
        <SocialShare title={painting.title} slug={painting.slug} />

        {/* Size reference */}
        <SizeReference dimensions={painting.dimensions} />
      </div>
    </div>
  );
}
