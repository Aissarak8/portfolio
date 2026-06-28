import { motion } from 'framer-motion';

/** Full-screen loading animation shown on first paint. */
export default function Loader() {
  return (
    <motion.div
      className="dark:bg-ink-950 fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="from-brand-500 to-accent-500 h-16 w-16 rounded-2xl bg-gradient-to-br"
          animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ['30%', '50%', '30%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.p
          className="font-mono text-sm tracking-widest text-gray-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          loading<span className="text-brand-500">.</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
