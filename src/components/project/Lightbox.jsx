import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER = `${import.meta.env.BASE_URL}placeholder.svg`;

/**
 * Accessible image lightbox with keyboard support (Esc, ←/→).
 * @param {object[]} images  [{ src, caption }]
 * @param {number|null} index  current open index, or null when closed
 */
export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const onKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (index === null) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onKey]);

  const img = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-label="Image viewer"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          <motion.figure
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-4xl"
          >
            <img
              src={img.src || PLACEHOLDER}
              alt={img.caption || 'Project screenshot'}
              className="max-h-[78vh] w-full rounded-xl object-contain"
            />
            {img.caption && (
              <figcaption className="mt-3 text-center text-sm text-gray-300">
                {img.caption}
              </figcaption>
            )}
          </motion.figure>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
