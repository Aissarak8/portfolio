import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import Home from './pages/Home';

// Code-split the case-study page so it's not in the initial bundle.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

/** Scrolls to top on route change (unless a section target is provided). */
function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, state]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Brief intro loader for a premium first impression.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <ScrollToTop />
      <Navbar />

      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center">
            <div className="border-brand-500/30 border-t-brand-500 h-10 w-10 animate-spin rounded-full border-2" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>

      <Footer />
      <Assistant />
    </>
  );
}
