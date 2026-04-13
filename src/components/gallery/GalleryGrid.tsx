'use client';

import { useState, useMemo } from 'react';
import type { Painting, Collection } from '@/lib/data';
import { PaintingCard } from './PaintingCard';
import { FilterChips } from './FilterChips';

type FilterType = 'all' | string;

export function GalleryGrid({
  paintings,
  collections,
}: {
  paintings: Painting[];
  collections: (Collection & { paintingCount: number })[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters = useMemo(() => {
    const items: { value: string; label: string }[] = [{ value: 'all', label: 'All Works' }];
    collections.forEach((c) => {
      items.push({ value: c.slug, label: `${c.title} (${c.paintingCount})` });
    });
    return items;
  }, [collections]);

  const filteredPaintings = useMemo(() => {
    if (activeFilter === 'all') return paintings;
    return paintings.filter((p) => p.collectionSlug === activeFilter);
  }, [paintings, activeFilter]);

  return (
    <>
      <FilterChips filters={filters} active={activeFilter} onSelect={setActiveFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
        {filteredPaintings.map((painting, i) => (
          <div
            key={painting.id}
            className={`animate-fade-in-up ${
              i === 0 || i === 4 ? 'lg:row-span-2' : ''
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <PaintingCard painting={painting} />
          </div>
        ))}
      </div>

      {filteredPaintings.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-[var(--color-text-light)]">No paintings found in this collection.</p>
        </div>
      )}
    </>
  );
}
