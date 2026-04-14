import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getPaintingsByCollection, getAllCollections } from '@/lib/data';
import { PaintingCard } from '@/components/gallery/PaintingCard';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: 'Collection Not Found' };

  return {
    title: collection.title,
    description: collection.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) notFound();

  const paintings = await getPaintingsByCollection(slug);

  return (
    <section className="pt-[var(--nav-height)]">
      <div className="bg-[var(--color-cream)] py-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 font-body text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-accent)] transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Collections
          </Link>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)] mb-4">
            {collection.title}
          </h1>
          <p className="font-body text-base text-[var(--color-text-light)] max-w-2xl leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="py-8 md:py-12 lg:py-16 px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {paintings.map((painting, i) => (
            <div
              key={painting.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <PaintingCard painting={painting} />
            </div>
          ))}
        </div>

        {paintings.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-[var(--color-text-light)]">
              No paintings in this collection yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
