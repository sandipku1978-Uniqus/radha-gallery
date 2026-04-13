'use client';

export function ColorPalette({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center gap-1.5" aria-label="Painting color palette">
      {colors.map((color, i) => (
        <span
          key={i}
          className="w-5 h-5 rounded-full border border-white/50 shadow-sm transition-transform hover:scale-125 cursor-default"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
}
