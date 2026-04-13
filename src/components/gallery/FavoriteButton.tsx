'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'radha-gallery-favorites';

function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function toggleFavorite(slug: string): boolean {
  const favs = getFavorites();
  const index = favs.indexOf(slug);
  if (index >= 0) {
    favs.splice(index, 1);
  } else {
    favs.push(slug);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  return index < 0; // returns true if now favorited
}

export function FavoriteButton({
  slug,
  size = 'sm',
}: {
  slug: string;
  size?: 'sm' | 'lg';
}) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(getFavorites().includes(slug));
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFav = toggleFavorite(slug);
    setIsFav(nowFav);
  };

  const dim = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const iconSize = size === 'lg' ? 20 : 16;

  return (
    <button
      onClick={handleClick}
      className={`${dim} rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isFav
          ? 'bg-[var(--color-sold)]/10 text-[var(--color-sold)] scale-110'
          : 'bg-black/20 text-white hover:bg-black/40'
      }`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      title={isFav ? 'Saved to favorites' : 'Save to favorites'}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={isFav ? 0 : 2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
