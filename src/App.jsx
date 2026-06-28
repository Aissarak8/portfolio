import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Terminal from './components/Terminal';
import Dashboard from './components/Dashboard';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Assistant from './components/Assistant';

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

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Certificates />
        <Dashboard />
        <Terminal />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Assistant />
    </>
  );
}
