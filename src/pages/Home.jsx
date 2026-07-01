import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import LearningJourney from '../components/LearningJourney';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Dashboard from '../components/Dashboard';
import Terminal from '../components/Terminal';
import BlogTeaser from '../components/BlogTeaser';
import Contact from '../components/Contact';

/** The single-page homepage. Sections live here; routing lives in App. */
export default function Home() {
  const location = useLocation();

  // When navigating home from another route with a target section, scroll to it.
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (id) {
      // wait a frame for sections to mount
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      );
    }
  }, [location.state]);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <LearningJourney />
      <Services />
      <Projects />
      <Experience />
      <Dashboard />
      <Terminal />
      <BlogTeaser />
      <Contact />
    </main>
  );
}
