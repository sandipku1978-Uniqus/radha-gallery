import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getArtistProfile } from '@/lib/data';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Radha Khetan. Inquire about paintings, commissions, studio visits, or collaborations.',
};

export default function ContactPage() {
  const artist = getArtistProfile();

  return (
    <section className="pt-[var(--nav-height)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-16 lg:py-20 mt-8">
        <div className="text-center mb-16">
          <p className="font-body text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text)] mb-4">
            Contact
          </h1>
          <p className="font-body text-base text-[var(--color-text-light)] max-w-lg mx-auto">
            Interested in a painting, a commission, or a studio visit? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          <Suspense fallback={<div className="h-96" />}>
            <ContactForm />
          </Suspense>

          <div className="space-y-8">
            <div>
              <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2">
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
              <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2">
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
            <div>
              <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2">
                Studio Visits
              </h3>
              <p className="font-body text-sm text-[var(--color-text-light)] leading-relaxed">
                Based in San Jose, California. Studio visits available by appointment. Include &ldquo;Studio Visit&rdquo; in your message to schedule.
              </p>
            </div>
            <div>
              <h3 className="font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2">
                Response Time
              </h3>
              <p className="font-body text-sm text-[var(--color-text-light)] leading-relaxed">
                I typically respond within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
