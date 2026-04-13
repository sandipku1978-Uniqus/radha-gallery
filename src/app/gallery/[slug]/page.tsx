import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPaintingBySlug, getAllPaintings, getCollectionTitle } from '@/lib/data';
import { Lightbox } from '@/components/gallery/Lightbox';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const painting = getPaintingBySlug(slug);
  if (!painting) return { title: 'Painting Not Found' };

  return {
    title: painting.title,
    description: painting.description.slice(0, 160),
    openGraph: {
      title: `${painting.title} — Radha Khetan`,
      description: painting.description.slice(0, 160),
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  return getAllPaintings().map((p) => ({ slug: p.slug }));
}

export default async function PaintingPage({ params }: Props) {
  const { slug } = await params;
  const painting = getPaintingBySlug(slug);

  if (!painting) notFound();

  const collectionTitle = getCollectionTitle(painting.collectionSlug);

  return (
    <section className="pt-[var(--nav-height)]">
      <div className="px-6 sm:px-10 md:px-16 py-8">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-body text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-accent)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>
      </div>

      <Lightbox painting={painting} collectionTitle={collectionTitle} />
    </section>
  );
}
