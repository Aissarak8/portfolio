import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { getReply, assistantConfig } from '../lib/assistantEngine';

// Turn emails and URLs in plain text into clickable links; keep line breaks.
function renderText(text) {
  const pattern = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
  return text.split('\n').map((line, li) => (
    <span key={li} className="block">
      {line.split(pattern).map((part, i) => {
        if (!part) return null;
        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noreferrer"
              className="text-brand-500 underline"
            >
              {part.replace(/^https?:\/\//, '')}
            </a>
          );
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
          return (
            <a key={i} href={`mailto:${part}`} className="text-brand-500 underline">
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  ));
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: assistantConfig.greeting,
      suggestions: assistantConfig.defaultSuggestions,
    },
  ]);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const timer = useRef(null);

  // Scroll to newest message.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  // Focus input + Esc-to-close when open.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (raw) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    // Small, realistic delay — purely cosmetic, no network.
    timer.current = setTimeout(() => {
      const reply = getReply(text);
      setMessages((m) => [...m, { role: 'bot', text: reply.text, suggestions: reply.suggestions }]);
      setTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, type: 'spring' }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open chat assistant'}
        aria-expanded={open}
        className="from-brand-500 to-accent-500 shadow-brand-500/40 fixed right-5 bottom-5 z-[80] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br text-white shadow-xl transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="c"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="bg-accent-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-accent-500 relative inline-flex h-4 w-4 items-center justify-center rounded-full">
              <Sparkles size={9} />
            </span>
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Chat assistant"
            className="glass dark:bg-ink-900 fixed right-5 bottom-24 z-[80] flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="from-brand-500 to-accent-500 flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r px-4 py-3 text-white dark:border-white/10">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                <Bot size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{assistantConfig.name}</p>
                <p className="flex items-center gap-1 text-xs opacity-90">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300" /> Online · local, private
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1 hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-brand-500 rounded-br-sm text-white'
                        : 'rounded-bl-sm bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-200'
                    }`}
                  >
                    {renderText(m.text)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 dark:bg-white/5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick replies from the latest bot message */}
              {!typing &&
                messages[messages.length - 1]?.role === 'bot' &&
                messages[messages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {messages[messages.length - 1].suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="border-brand-500/30 text-brand-500 hover:bg-brand-500/10 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-gray-200 p-3 dark:border-white/10"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Aissa…"
                aria-label="Message the assistant"
                className="focus:ring-brand-500/40 flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 dark:bg-white/5"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="from-brand-500 to-accent-500 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
