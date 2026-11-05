import { useEffect } from 'react';
import { LangContext } from './context/LangContext.jsx';
import { useLanguage } from './hooks/useLanguage.js';
import { useTheme } from './hooks/useTheme.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Method from './components/Method.jsx';
import Tracks from './components/Tracks.jsx';
import Practice from './components/Practice.jsx';
import AppShowcase from './components/AppShowcase.jsx';
import Notes from './components/Notes.jsx';
import Badges from './components/Badges.jsx';
import Interlude from './components/Interlude.jsx';
import Gallery from './components/Gallery.jsx';
import Languages from './components/Languages.jsx';
import Safety from './components/Safety.jsx';
import Download from './components/Download.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const { lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-8% 0px -6% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <a className="skip-link" href="#main">
        {lang === 'zh' ? '跳到主要内容' : 'Skip to content'}
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav theme={theme} onTheme={toggle} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Method />
        <Tracks />
        <Practice />
        <AppShowcase />
        <Notes />
        <Badges />
        <Interlude />
        <Gallery />
        <Languages />
        <Safety />
        <Download />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
