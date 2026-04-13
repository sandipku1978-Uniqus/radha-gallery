import type { Metadata } from 'next';
import { getArtistProfile } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About the Artist',
  description: 'Learn about Radha Khetan — a self-taught painter based in San Jose, California, creating abstract and nature-inspired original paintings.',
};

export default function AboutPage() {
  const artist = getArtistProfile();

  return (
    <section className="pt-[var(--nav-height)]">
      {/* Hero banner */}
      <div className="bg-[var(--color-cream)] py-20 px-6 sm:px-10 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
            The Artist
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text)] mb-4">
            {artist.name}
          </h1>
          <p className="font-body text-base text-[var(--color-text-light)] max-w-lg mx-auto">
            {artist.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          {/* Bio */}
          <div>
            <h2 className="font-display text-2xl font-light text-[var(--color-text)] mb-8">
              Artist Statement
            </h2>
            {artist.bio.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-[0.95rem] text-[var(--color-text-light)] leading-[1.8] mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Photo placeholder + info */}
          <div>
            <div
              className="w-full aspect-[3/4] rounded-sm mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              style={{ background: artist.gradient }}
              role="img"
              aria-label={`Photo of ${artist.name}`}
            />

            <div className="space-y-4">
              <div>
                <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-1">
                  Based in
                </h3>
                <p className="font-body text-sm text-[var(--color-text)]">{artist.location}</p>
              </div>
              <div>
                <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-1">
                  Email
                </h3>
                <a
                  href={`mailto:${artist.email}`}
                  className="font-body text-sm text-[var(--color-accent)] no-underline hover:underline"
                >
                  {artist.email}
                </a>
              </div>
              <div>
                <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-1">
                  Instagram
                </h3>
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[var(--color-accent)] no-underline hover:underline"
                >
                  @radhaart
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Process section */}
        <div className="mt-20 pt-16 border-t border-[var(--color-border)]">
          <h2 className="font-display text-2xl font-light text-[var(--color-text)] mb-8">
            The Process
          </h2>
          {artist.processDescription.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-[0.95rem] text-[var(--color-text-light)] leading-[1.8] mb-6 max-w-3xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
