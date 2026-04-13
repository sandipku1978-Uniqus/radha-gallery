import { paintings, type Painting } from './paintings';
import { collections, type Collection } from './collections';
import { artistProfile, type ArtistProfile } from './artist';
import { faqs, type FAQ } from './faqs';

export type { Painting, Collection, ArtistProfile, FAQ };

// These query functions mirror future Sanity GROQ queries.
// When Sanity is connected, only this file needs to change.

export function getAllPaintings(): Painting[] {
  return paintings
    .filter((p) => !('archived' in p))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPaintingBySlug(slug: string): Painting | undefined {
  return paintings.find((p) => p.slug === slug);
}

export function getFeaturedPaintings(): Painting[] {
  return paintings
    .filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAvailablePaintings(): Painting[] {
  return paintings
    .filter((p) => p.status === 'available')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPaintingsByCollection(collectionSlug: string): Painting[] {
  return paintings
    .filter((p) => p.collectionSlug === collectionSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllCollections(): (Collection & { paintingCount: number })[] {
  return collections
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      paintingCount: paintings.filter((p) => p.collectionSlug === c.slug).length,
    }));
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getArtistProfile(): ArtistProfile {
  return artistProfile;
}

export function getAllFAQs(): FAQ[] {
  return faqs;
}

export function getCollectionTitle(slug: string): string {
  return collections.find((c) => c.slug === slug)?.title ?? slug;
}
