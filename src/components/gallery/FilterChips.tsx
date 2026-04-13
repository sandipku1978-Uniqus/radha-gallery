'use client';

export function FilterChips({
  filters,
  active,
  onSelect,
}: {
  filters: { value: string; label: string }[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mb-12 flex-wrap" role="group" aria-label="Filter paintings">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onSelect(filter.value)}
          className={`font-body text-[0.78rem] font-normal tracking-[0.08em] uppercase px-5 py-2 rounded-full border transition-gallery cursor-pointer ${
            active === filter.value
              ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]'
              : 'bg-transparent text-[var(--color-text-light)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
          }`}
          aria-pressed={active === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
