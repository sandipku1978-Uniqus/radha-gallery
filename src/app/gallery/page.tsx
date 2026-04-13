import type { Metadata } from 'next';
import { getAllPaintings, getAllCollections } from '@/lib/data';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse the complete collection of original paintings by Radha Khetan. Abstract landscapes, nature studies, and mixed media works.',
};

export default function GalleryPage() {
  const paintings = getAllPaintings();
  const collections = getAllCollections();

  return (
    <section className="pt-[var(--nav-height)] py-12 md:py-16 lg:py-24 px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-12">
        <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
          The Collection
        </p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)]">
          Gallery
        </h1>
      </div>

      <GalleryGrid paintings={paintings} collections={collections} />
    </section>
  );
}
