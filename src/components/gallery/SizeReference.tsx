'use client';

/**
 * Shows painting dimensions alongside a person silhouette for scale reference.
 * Parses dimensions like "36 × 48 inches" into width/height.
 */
export function SizeReference({ dimensions }: { dimensions: string }) {
  const match = dimensions.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!match) return null;

  const widthIn = parseInt(match[1], 10);
  const heightIn = parseInt(match[2], 10);

  // Scale: 1 inch = 2px for the visualization
  const scale = 2;
  const paintingW = widthIn * scale;
  const paintingH = heightIn * scale;

  // Person silhouette is ~66 inches (5'6") = 132px
  const personH = 132;
  const containerH = Math.max(personH, paintingH) + 16;

  return (
    <div className="mt-6 p-4 bg-[var(--color-cream)] rounded-lg">
      <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-3">
        Size Reference
      </p>
      <div
        className="flex items-end justify-center gap-4"
        style={{ height: containerH }}
        aria-label={`Painting is ${widthIn} by ${heightIn} inches`}
      >
        {/* Person silhouette */}
        <div className="flex flex-col items-center opacity-40">
          <svg width="24" height={personH} viewBox="0 0 24 132" fill="var(--color-text-light)">
            {/* Head */}
            <circle cx="12" cy="8" r="6" />
            {/* Body */}
            <rect x="6" y="16" width="12" height="40" rx="4" />
            {/* Legs */}
            <rect x="6" y="58" width="5" height="50" rx="2" />
            <rect x="13" y="58" width="5" height="50" rx="2" />
            {/* Arms */}
            <rect x="0" y="20" width="5" height="35" rx="2" />
            <rect x="19" y="20" width="5" height="35" rx="2" />
          </svg>
          <span className="font-body text-[0.6rem] text-[var(--color-text-light)] mt-1">5&apos;6&quot;</span>
        </div>

        {/* Painting rectangle */}
        <div className="flex flex-col items-center">
          <div
            className="border-2 border-[var(--color-accent)]/30 rounded-sm bg-[var(--color-accent)]/5"
            style={{ width: paintingW, height: paintingH }}
          />
          <span className="font-body text-[0.6rem] text-[var(--color-accent)] mt-1">
            {widthIn}&quot; &times; {heightIn}&quot;
          </span>
        </div>
      </div>
    </div>
  );
}
