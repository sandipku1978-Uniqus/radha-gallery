import type { UIMessage } from 'ai';

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';

  const textContent = message.parts
    ?.filter((part): part is Extract<typeof part, { type: 'text' }> => part.type === 'text')
    .map((part) => part.text)
    .join('') || '';

  // Simple inline markdown: **bold**, *italic*, "Painting Title" links
  function renderFormattedText(text: string) {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|"[^"]+")/).filter(Boolean);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-medium text-[var(--color-text)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <span key={i} className="font-display italic text-[var(--color-accent)]">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2`}>
      {/* Assistant avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.1 0 2-.9 2-2 0-.49-.18-.96-.51-1.34-.3-.35-.49-.81-.49-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.64C23 5.78 18.04 2 12 2z"
              fill="white"
              fillOpacity="0.85"
            />
            <circle cx="7.5" cy="10.5" r="1.2" fill="#C75050" />
            <circle cx="10.5" cy="7" r="1.2" fill="#D4A574" />
            <circle cx="15" cy="7.5" r="1.2" fill="#4A7C5E" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-3 font-body text-[0.85rem] leading-[1.65] ${
          isUser
            ? 'bg-[var(--color-dark)] text-white rounded-2xl rounded-br-sm shadow-sm'
            : 'bg-white text-[var(--color-text)] rounded-2xl rounded-bl-sm border border-[var(--color-border)] shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
        }`}
      >
        {textContent.split('\n').map((line, i, arr) => (
          <span key={i}>
            {renderFormattedText(line)}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
