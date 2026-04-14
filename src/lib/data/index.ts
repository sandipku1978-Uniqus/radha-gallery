import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { paintings as mockPaintings, type Painting as MockPainting } from './paintings';
import { collections as mockCollections, type Collection as MockCollection } from './collections';
import { artistProfile as mockArtistProfile, type ArtistProfile as MockArtistProfile } from './artist';
import { faqs as mockFaqs, type FAQ } from './faqs';

// Extended types that support Sanity images alongside gradient fallbacks
export interface Painting {
  id: string;
  title: string;
  slug: string;
  description: string;
  medium: string;
  dimensions: string;
  year: number;
  collectionSlug: string;
  price: number | null;
  status: 'available' | 'sold' | 'not-for-sale' | 'inquire';
  featured: boolean;
  sortOrder: number;
  gradient: string;
  aspectRatio: string;
  tags: string[];
  colors: string[];
  imageUrl?: string;         // Sanity CDN URL when available
  imageAlt?: string;
  protectImage?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  gradient: string;
  sortOrder: number;
  coverImageUrl?: string;    // Sanity CDN URL when available
}

export interface ArtistProfile {
  name: string;
  tagline: string;
  bio: string;
  processDescription: string;
  location: string;
  email: string;
  instagram: string;
  gradient: string;
  photoUrl?: string;         // Sanity CDN URL when available
}

export type { FAQ };

// ---------------------------------------------------------------------------
// GROQ queries
// ---------------------------------------------------------------------------

const PAINTINGS_QUERY = `*[_type == "painting" && archived != true] | order(sortOrder asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  medium,
  dimensions,
  year,
  "collectionSlug": collection->slug.current,
  price,
  status,
  featured,
  sortOrder,
  tags,
  colors,
  image,
  protectImage
}`;

const COLLECTIONS_QUERY = `*[_type == "collection"] | order(sortOrder asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  sortOrder
}`;

const ARTIST_QUERY = `*[_type == "artistProfile"][0] {
  name,
  tagline,
  bio,
  processDescription,
  location,
  email,
  instagram,
  photo
}`;

const FAQS_QUERY = `*[_type == "faq"] {
  _id,
  question,
  answer,
  category
}`;

// ---------------------------------------------------------------------------
// Sanity → app type mappers
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapSanityPainting(p: any): Painting {
  const imageUrl = p.image ? urlFor(p.image).width(1200).quality(85).url() : undefined;
  const colors = p.colors?.length ? p.colors : ['#999', '#888', '#777', '#666'];
  return {
    id: p._id,
    title: p.title,
    slug: p.slug,
    description: p.description || '',
    medium: p.medium,
    dimensions: p.dimensions,
    year: p.year,
    collectionSlug: p.collectionSlug || '',
    price: p.price ?? null,
    status: p.status || 'available',
    featured: p.featured ?? false,
    sortOrder: p.sortOrder ?? 999,
    gradient: colors.length >= 2
      ? `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 50%, ${colors[colors.length - 1]} 100%)`
      : 'linear-gradient(135deg, #999 0%, #666 100%)',
    aspectRatio: '3/4',
    tags: p.tags || [],
    colors,
    imageUrl,
    imageAlt: p.image?.alt || p.title,
    protectImage: p.protectImage ?? true,
  };
}

function mapSanityCollection(c: any): Collection & { paintingCount?: number } {
  return {
    id: c._id,
    title: c.title,
    slug: c.slug,
    description: c.description || '',
    gradient: 'linear-gradient(135deg, #999 0%, #666 100%)',
    sortOrder: c.sortOrder ?? 999,
    coverImageUrl: c.coverImage ? urlFor(c.coverImage).width(800).quality(80).url() : undefined,
  };
}

function mapSanityArtist(a: any): ArtistProfile {
  return {
    name: a.name,
    tagline: a.tagline || '',
    bio: a.bio || '',
    processDescription: a.processDescription || '',
    location: a.location || '',
    email: a.email || '',
    instagram: a.instagram || '',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6E4E 50%, #C4A882 100%)',
    photoUrl: a.photo ? urlFor(a.photo).width(600).quality(85).url() : undefined,
  };
}

function mapSanityFaq(f: any): FAQ {
  return {
    id: f._id,
    question: f.question,
    answer: f.answer,
    category: f.category || 'general',
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Data fetchers — Sanity first, mock fallback
// ---------------------------------------------------------------------------

export async function getAllPaintings(): Promise<Painting[]> {
  try {
    const data = await client.fetch(PAINTINGS_QUERY);
    if (data?.length) return data.map(mapSanityPainting);
  } catch (e) {
    console.warn('Sanity fetch failed for paintings, using mock data', e);
  }
  return mockPaintings
    .filter((p) => !('archived' in p))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPaintingBySlug(slug: string): Promise<Painting | undefined> {
  try {
    const query = `*[_type == "painting" && slug.current == $slug && archived != true][0] {
      _id, title, "slug": slug.current, description, medium, dimensions, year,
      "collectionSlug": collection->slug.current, price, status, featured,
      sortOrder, tags, colors, image, protectImage
    }`;
    const data = await client.fetch(query, { slug });
    if (data) return mapSanityPainting(data);
  } catch (e) {
    console.warn('Sanity fetch failed for painting slug, using mock data', e);
  }
  return mockPaintings.find((p) => p.slug === slug);
}

export async function getFeaturedPaintings(): Promise<Painting[]> {
  try {
    const query = `*[_type == "painting" && featured == true && archived != true] | order(sortOrder asc) {
      _id, title, "slug": slug.current, description, medium, dimensions, year,
      "collectionSlug": collection->slug.current, price, status, featured,
      sortOrder, tags, colors, image, protectImage
    }`;
    const data = await client.fetch(query);
    if (data?.length) return data.map(mapSanityPainting);
  } catch (e) {
    console.warn('Sanity fetch failed for featured paintings, using mock data', e);
  }
  return mockPaintings
    .filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAvailablePaintings(): Promise<Painting[]> {
  try {
    const query = `*[_type == "painting" && status == "available" && archived != true] | order(sortOrder asc) {
      _id, title, "slug": slug.current, description, medium, dimensions, year,
      "collectionSlug": collection->slug.current, price, status, featured,
      sortOrder, tags, colors, image, protectImage
    }`;
    const data = await client.fetch(query);
    if (data?.length) return data.map(mapSanityPainting);
  } catch (e) {
    console.warn('Sanity fetch failed for available paintings, using mock data', e);
  }
  return mockPaintings
    .filter((p) => p.status === 'available')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPaintingsByCollection(collectionSlug: string): Promise<Painting[]> {
  try {
    const query = `*[_type == "painting" && collection->slug.current == $collectionSlug && archived != true] | order(sortOrder asc) {
      _id, title, "slug": slug.current, description, medium, dimensions, year,
      "collectionSlug": collection->slug.current, price, status, featured,
      sortOrder, tags, colors, image, protectImage
    }`;
    const data = await client.fetch(query, { collectionSlug });
    if (data?.length) return data.map(mapSanityPainting);
  } catch (e) {
    console.warn('Sanity fetch failed for collection paintings, using mock data', e);
  }
  return mockPaintings
    .filter((p) => p.collectionSlug === collectionSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllCollections(): Promise<(Collection & { paintingCount: number })[]> {
  try {
    const collQuery = `*[_type == "collection"] | order(sortOrder asc) {
      _id, title, "slug": slug.current, description, coverImage, sortOrder,
      "paintingCount": count(*[_type == "painting" && collection._ref == ^._id && archived != true])
    }`;
    const data = await client.fetch(collQuery);
    if (data?.length) {
      return data.map((c: any) => ({ ...mapSanityCollection(c), paintingCount: c.paintingCount || 0 }));
    }
  } catch (e) {
    console.warn('Sanity fetch failed for collections, using mock data', e);
  }
  return mockCollections
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      paintingCount: mockPaintings.filter((p) => p.collectionSlug === c.slug).length,
    }));
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  try {
    const query = `*[_type == "collection" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, description, coverImage, sortOrder
    }`;
    const data = await client.fetch(query, { slug });
    if (data) return mapSanityCollection(data);
  } catch (e) {
    console.warn('Sanity fetch failed for collection slug, using mock data', e);
  }
  return mockCollections.find((c) => c.slug === slug);
}

export async function getArtistProfile(): Promise<ArtistProfile> {
  try {
    const data = await client.fetch(ARTIST_QUERY);
    if (data) return mapSanityArtist(data);
  } catch (e) {
    console.warn('Sanity fetch failed for artist profile, using mock data', e);
  }
  return mockArtistProfile;
}

export async function getAllFAQs(): Promise<FAQ[]> {
  try {
    const data = await client.fetch(FAQS_QUERY);
    if (data?.length) return data.map(mapSanityFaq);
  } catch (e) {
    console.warn('Sanity fetch failed for FAQs, using mock data', e);
  }
  return mockFaqs;
}

export async function getCollectionTitle(slug: string): Promise<string> {
  const col = await getCollectionBySlug(slug);
  return col?.title ?? slug;
}
