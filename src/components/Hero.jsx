import { useLang } from '../context/LangContext.jsx';
import { HERO, SITE } from '../data/content.js';
import { IMG } from '../data/images.js';
import { pick } from '../lib/i18n.js';
import Field from './Field.jsx';
import WordField from './WordField.jsx';
import { Arrow } from './Icons.jsx';

function Accented({ line, accent }) {
  const i = line.indexOf(accent);
  if (i < 0) return line;
  return (
    <>
      {line.slice(0, i)}
      <em>{accent}</em>
      {line.slice(i + accent.length)}
    </>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const meta = [
    HERO.meta[0][lang],
    'Android 8.0+',
    'arm64',
    lang === 'zh' ? `约 ${SITE.size}` : SITE.size,
  ];

  return (
    <section className="hero hero--stage" id="top">
      <div
        className="hero-underlay"
        aria-hidden="true"
        style={{ backgroundImage: `url(${IMG.everestCenter})` }}
      />
      <Field
        src={IMG.everestCenter}
        mode="photo"
        animate
        lens
        columns={96}
        cellAspect={1}
        focusX={0.5}
        focusY={0.58}
        className="hero-canvas"
      />
      <div className="hero-wash" />

      <div className="hero-wordmark" aria-hidden="true">
        <WordField />
      </div>

      <div className="shell hero-stage">
        <div className="hero-top">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span className="label">{pick(HERO.eyebrow, lang)}</span>
          </div>
        </div>

        <h1 className="h-display hero-title">
          {pick(HERO.titleLine1, lang)}
          <br />
          <Accented line={pick(HERO.titleLine2, lang)} accent={pick(HERO.accent, lang)} />
        </h1>

        <p className="lede hero-lede">{pick(HERO.lede, lang)}</p>

        <div className="hero-actions">
          <a className="btn btn-solid" href="#download">
            {pick(HERO.primary, lang)}
            <Arrow />
          </a>
          <a className="btn btn-line" href="#app">
            {pick(HERO.secondary, lang)}
          </a>
        </div>

        <div className="hero-meta">
          {meta.map((m, i) => (
            <span key={m}>
              {i > 0 && <i />}
              {m}
            </span>
          ))}
        </div>
      </div>

      <a className="scroll-cue hero-scroll" href="#method" aria-label={lang === 'zh' ? '向下滑动，继续' : 'Scroll to continue'}>
        <span className="bar" />
        {lang === 'zh' ? '向下滑动，继续' : 'Scroll to continue'}
      </a>
    </section>
  );
}
