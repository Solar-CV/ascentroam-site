import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { APP } from '../data/app.js';
import { APP_SHOT } from '../data/images.js';
import { pick } from '../lib/i18n.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n + 1).padStart(2, '0');

export default function AppShowcase() {
  const { lang } = useLang();
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const steps = APP.steps;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }
      const p = clamp(-el.getBoundingClientRect().top / total, 0, 1);
      const next = Math.min(steps.length - 1, Math.floor(p * steps.length + 1e-6));
      setActive((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps.length]);

  const jump = (i) => {
    const el = wrapRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top =
      window.scrollY +
      el.getBoundingClientRect().top +
      (Math.min(1, (i + 0.02) / steps.length)) * total;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    setActive(i);
  };

  return (
    <section className="inside" id="app" aria-labelledby="app-title">
      <div className="inside-wrap" ref={wrapRef} style={{ '--n': steps.length }}>
        <div className="inside-stage">
          <div className="inside-bg" aria-hidden="true">
            <span>04</span>
          </div>

          <div className="shell inside-shell">
            <div className="inside-rule">
              <span className="label">04 — {pick(APP.eyebrow, lang)}</span>
              <span className="label">{pick(APP.meta, lang)}</span>
            </div>

            <div className="inside-head">
              <h2 className="h-section" id="app-title">{pick(APP.title, lang)}</h2>
              <p className="lede">{pick(APP.lede, lang)}</p>
            </div>

            <div className="inside-main">
              <div className="inside-visual">
                <div className="inside-device">
                  <div className="inside-screen">
                    {steps.map((step, i) => (
                      <img
                        key={step.id}
                        className={'inside-shot' + (i === active ? ' on' : '')}
                        src={APP_SHOT(lang, step.id)}
                        alt={i === active ? pick(step.alt, lang) : ''}
                        loading="eager"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
                <div className="inside-device-meta">
                  <span className="label">{pick(APP.spec, lang)}</span>
                </div>
              </div>

              <div className="inside-copy">
                <div className="inside-counter" aria-hidden="true">
                  <span>{pad(active)}</span>
                  <i />
                  <span>{String(steps.length).padStart(2, '0')}</span>
                </div>

                <div className="inside-steps">
                  {steps.map((step, i) => (
                    <article
                      key={step.id}
                      className={'inside-step' + (i === active ? ' on' : '')}
                      aria-hidden={i !== active}
                    >
                      <p className="label inside-kicker">{pick(step.kicker, lang)}</p>
                      <h3 className="inside-title">{pick(step.title, lang)}</h3>
                      <p className="inside-text">{pick(step.body, lang)}</p>
                      <p className="label inside-step-meta">{pick(step.meta, lang)}</p>
                    </article>
                  ))}
                </div>

                <div className="inside-tabs" role="group" aria-label={pick(APP.stepsLabel, lang)}>
                  {steps.map((step, i) => (
                    <button
                      key={step.id}
                      type="button"
                      className={'inside-tab' + (i === active ? ' on' : '')}
                      aria-current={i === active ? 'step' : undefined}
                      onClick={() => jump(i)}
                    >
                      <span>{pad(i)}</span>
                      <em>{pick(step.name, lang)}</em>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={'inside-hint' + (active > 0 ? ' is-gone' : '')} aria-hidden="true">
            <span className="bar" />
            {lang === 'zh' ? '向下滑动，继续' : 'Scroll to continue'}
          </div>
        </div>
      </div>
    </section>
  );
}
