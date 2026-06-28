import { motion } from 'framer-motion';

/** Fade-up reveal on scroll. Wrap any block to animate it into view. */
export default function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.51, 1] }}
    >
      {children}
    </motion.div>
  );
}
