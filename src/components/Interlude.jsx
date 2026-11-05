import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { INTERLUDE } from '../data/app.js';
import { WIDE_IMG } from '../data/images.js';
import { pick } from '../lib/i18n.js';

const pad = (n) => String(n + 1).padStart(2, '0');

export default function Interlude() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [started, setStarted] = useState(false);
  const photos = INTERLUDE.photos;
  const running = (!reduced || started) && !manualPaused;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => {
      setActive((v) => (v + 1) % photos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [running, photos.length]);

  const toggleLabel = running
    ? lang === 'zh' ? '暂停' : 'Pause'
    : lang === 'zh' ? '播放' : 'Play';
  const toggleAria = running
    ? lang === 'zh' ? '暂停自动播放' : 'Pause autoplay'
    : reduced && !started
      ? lang === 'zh' ? '开始轮播' : 'Start slideshow'
      : lang === 'zh' ? '继续自动播放' : 'Resume autoplay';

  return (
    <section
      className="interlude"
      aria-label={pick(INTERLUDE.top, lang)}
    >
      <div className="interlude-media" aria-hidden="true">
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            className={'interlude-img' + (i === active ? ' on' : '')}
            src={WIDE_IMG[photo.src]}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <div className="interlude-veil" />
      </div>

      <div className="shell interlude-inner">
        <div className="interlude-top">
          <span className="label">{pick(INTERLUDE.top, lang)}</span>
          <span className="label interlude-index">
            {pad(active)} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>

        <div className="interlude-copy">
          <blockquote className="interlude-quote">{pick(INTERLUDE.quote, lang)}</blockquote>
          <p className="interlude-sub">{pick(INTERLUDE.sub, lang)}</p>
        </div>

        <div className="interlude-foot">
          <div className="interlude-caption" aria-live={manualPaused ? 'polite' : 'off'}>
            <span className="label">{pick(photos[active].caption, lang)}</span>
          </div>
          <div className="interlude-controls">
            <button
              type="button"
              className="interlude-toggle"
              onClick={() => {
                if (running) {
                  setManualPaused(true);
                  return;
                }
                if (reduced) setStarted(true);
                setManualPaused(false);
              }}
              aria-label={toggleAria}
            >
              {toggleLabel}
            </button>
            <div className="interlude-dots">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  className={'interlude-dot' + (i === active ? ' on' : '')}
                  aria-label={pick(photo.caption, lang)}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
