'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: Connect to Buttondown/ConvertKit/Mailchimp
    console.log('Newsletter signup:', email);
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="border-t border-[var(--color-border)] mt-12 pt-10">
      <div className="max-w-md mx-auto text-center">
        <h4 className="font-display text-xl font-light text-[var(--color-text)] mb-2 italic">
          Stay in Touch
        </h4>
        <p className="font-body text-sm text-[var(--color-text-light)] mb-6">
          Get notified when new paintings are available and receive studio updates.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-available)" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="font-body text-sm text-[var(--color-available)]">
              Welcome! You&apos;ll hear from us soon.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 font-body text-sm px-4 py-3 bg-white border border-[var(--color-border)] rounded-full text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-light)]/60"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="font-body text-xs font-medium tracking-[0.1em] uppercase px-6 py-3 bg-[var(--color-accent)] text-white rounded-full transition-all hover:bg-[var(--color-dark)] cursor-pointer"
            >
              Join
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="font-body text-xs text-[var(--color-sold)] mt-2">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
