import { useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { GALLERY } from '../data/content.js';
import { PHOTOS as IMAGES } from '../data/gallery.js';
import { pick } from '../lib/i18n.js';
import Field from './Field.jsx';

function Item({ photo, index }) {
  const { lang } = useLang();
  const [lines, setLines] = useState(false);
  return (
    <div className="gal-item">
      <div className={'gal-media' + (lines ? ' lines' : '')} style={{ aspectRatio: photo.tall ? '3 / 4' : '4 / 3' }}>
        <img
          src={photo.src}
          alt={pick(photo.alt, lang)}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Field src={photo.src} mode="photo" className="" cell={7} />
        <button
          className="gal-toggle"
          type="button"
          onClick={() => setLines((v) => !v)}
          aria-pressed={lines}
        >
          {lines ? pick(GALLERY.photoLabel, lang) : pick(GALLERY.linesLabel, lang)}
        </button>
      </div>
      <div className="gal-cap">
        <span className="gal-name">{pick(photo.title, lang)}</span>
        <span className="gal-alt">{photo.meta}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { lang } = useLang();
  return (
    <section className="section" id="gallery">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">07 — {pick(GALLERY.eyebrow, lang)}</span>
          <span className="label">{pick(GALLERY.meta, lang)}</span>
        </div>

        <div className="gallery-head reveal">
          <h2 className="h-section">{pick(GALLERY.title, lang)}</h2>
          <div>
            <p className="lede">{pick(GALLERY.lede, lang)}</p>
            <div className="label" style={{ marginTop: 16 }}>
              {pick(GALLERY.photoLabel, lang)} ↔ {pick(GALLERY.linesLabel, lang)} · 60 × 4
            </div>
          </div>
        </div>

        <div className="gal">
          {IMAGES.map((photo, i) => (
            <Item photo={photo} index={i} key={photo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
