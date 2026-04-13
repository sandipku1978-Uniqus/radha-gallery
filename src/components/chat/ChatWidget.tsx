'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';

const suggestions = [
  'What paintings are available?',
  'Tell me about the artist',
  'How do commissions work?',
  'Recommend something for my living room',
];

function PaletteIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.1 0 2-.9 2-2 0-.49-.18-.96-.51-1.34-.3-.35-.49-.81-.49-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.64C23 5.78 18.04 2 12 2z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="7.5" cy="10.5" r="1.5" fill="#C75050" />
      <circle cx="10.5" cy="7" r="1.5" fill="#D4A574" />
      <circle cx="15" cy="7.5" r="1.5" fill="#4A7C5E" />
      <circle cx="17" cy="11" r="1.5" fill="#4A6D8C" />
    </svg>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat();

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* ── ARTISTIC FLOATING BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
        {!isOpen && <span className="chat-button-ring" />}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-[60px] h-[60px] rounded-full text-white flex items-center justify-center cursor-pointer ${
            isOpen
              ? 'bg-[var(--color-dark)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[var(--color-text-light)] transition-all duration-300'
              : 'chat-button-artistic'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Ask the gallery assistant'}
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <PaletteIcon />
          )}
        </button>

        {!isOpen && (
          <span className="hidden md:block absolute bottom-[72px] right-0 font-display text-sm italic text-[var(--color-accent)] whitespace-nowrap opacity-80 pointer-events-none">
            Ask me anything
          </span>
        )}
      </div>

      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-[100px] right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[calc(100vh-140px)] bg-[var(--color-bg)] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(232,230,225,0.6)] flex flex-col overflow-hidden"
          >
            {/* ── HEADER ── */}
            <div className="relative px-6 py-5 border-b border-[var(--color-border)]">
              {/* Subtle decorative line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-light)] to-transparent opacity-40" />

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] flex items-center justify-center shadow-[0_2px_8px_rgba(139,110,78,0.3)]">
                  <PaletteIcon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-[var(--color-text)] tracking-wide">
                    Gallery Assistant
                  </h3>
                  <p className="font-body text-[0.65rem] text-[var(--color-text-light)] tracking-[0.15em] uppercase">
                    Paintings &middot; Pricing &middot; Commissions
                  </p>
                </div>
              </div>
            </div>

            {/* ── MESSAGES ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 overscroll-contain">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  {/* Decorative brush stroke */}
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-light)] to-transparent" />

                  <p className="font-display text-xl text-[var(--color-text)] text-center italic font-light">
                    Welcome to the gallery.
                  </p>
                  <p className="font-body text-sm text-[var(--color-text-light)] text-center max-w-[260px] leading-relaxed">
                    I can help you discover paintings, learn about the artist, or guide you through a purchase.
                  </p>

                  <div className="w-12 h-[1px] bg-[var(--color-border)]" />

                  <div className="flex flex-wrap gap-2 justify-center mt-1">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="font-body text-[0.72rem] px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-cream)] transition-all duration-300 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent-light)] animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent-light)] animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                  <span className="font-body text-[0.65rem] text-[var(--color-text-light)] italic ml-1">
                    thinking...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── INPUT ── */}
            <div className="border-t border-[var(--color-border)] bg-[var(--color-cream)]/60 px-4 py-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about a painting..."
                  className="flex-1 font-body text-sm px-5 py-3 bg-white border border-[var(--color-border)] rounded-full text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(139,110,78,0.08)] transition-all duration-300 placeholder:text-[var(--color-text-light)]/60"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_16px_rgba(139,110,78,0.4)] hover:scale-105 disabled:opacity-30 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="translate-x-[1px]">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
