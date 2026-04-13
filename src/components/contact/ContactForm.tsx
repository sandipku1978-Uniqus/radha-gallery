'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function ContactForm() {
  const searchParams = useSearchParams();
  const paintingTitle = searchParams.get('painting') || '';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: paintingTitle ? `Inquiry about "${paintingTitle}"` : '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-[var(--color-available)] mx-auto mb-6 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-light text-[var(--color-text)] mb-3">
          Message Sent
        </h3>
        <p className="font-body text-sm text-[var(--color-text-light)]">
          Thank you for reaching out. I&apos;ll get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className="w-full font-body text-sm px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            className="w-full font-body text-sm px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={formState.subject}
          onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
          className="w-full font-body text-sm px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="Painting inquiry, commission request, studio visit..."
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-body text-xs tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formState.message}
          onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
          className="w-full font-body text-sm px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors resize-y"
          placeholder="Tell me about what you're looking for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="font-body text-sm font-medium tracking-[0.1em] uppercase py-4 px-8 bg-[var(--color-dark)] text-white rounded-sm transition-gallery hover:bg-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="font-body text-sm text-[var(--color-sold)]">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
