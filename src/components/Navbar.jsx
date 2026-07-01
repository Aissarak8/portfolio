import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'blog', label: 'Blog', to: '/blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(links.filter((l) => !l.to).map((l) => l.id));
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigate to a route link, or scroll to a section (from any route).
  const go = (link) => {
    setOpen(false);
    if (link.to) return navigate(link.to);
    if (link.id === 'home' && !onHome) return navigate('/');
    if (onHome) {
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: link.id } });
    }
  };

  const isActive = (l) => (l.to ? location.pathname.startsWith(l.to) : active === l.id);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <button onClick={() => go({ id: 'home' })} className="flex items-center gap-2 font-bold">
          <span className="from-brand-500 to-accent-500 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white">
            AS
          </span>
          <span className="hidden sm:block">
            Aissa<span className="text-brand-500">.</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(l)
                    ? 'text-brand-500'
                    : 'hover:text-brand-500 text-gray-600 dark:text-gray-300'
                }`}
              >
                {l.label}
                {isActive(l) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-brand-500 absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/5"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 md:hidden dark:border-white/10"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden md:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l)}
                  className="hover:text-brand-500 block w-full px-8 py-3 text-left text-sm font-medium"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
