import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { NAV } from '../data/content.js';
import { pick } from '../lib/i18n.js';
import { Arrow, BrandMark, Close, Menu, Moon, Sun } from './Icons.jsx';

export default function Nav({ theme, onTheme }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top" aria-label="AscentRoam">
          <BrandMark />
          <span className="brand-word">AscentRoam</span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {NAV.map((item) => (
            <a className="nav-link" key={item.href} href={item.href}>
              {pick(item.label, lang)}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="lang-btn"
            type="button"
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={onTheme}
            aria-label={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-solid nav-cta" href="#download">
            {lang === 'zh' ? '下载' : 'Download'}
            <Arrow />
          </a>
          <button
            className="icon-btn burger"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Menu'}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <span className="progress" style={{ width: pct + '%' }} />
      {open && (
        <div className="mobile-menu" id="site-menu">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {pick(item.label, lang)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
