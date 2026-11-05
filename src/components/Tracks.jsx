import { useLang } from '../context/LangContext.jsx';
import { TRACKS } from '../data/content.js';
import { pick } from '../lib/i18n.js';
import Field from './Field.jsx';
import { Arrow } from './Icons.jsx';

export default function Tracks() {
  const { lang } = useLang();
  return (
    <section className="section" id="curriculum">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">02 — {pick(TRACKS.eyebrow, lang)}</span>
          <span className="label">69 + 22 / 1,563</span>
        </div>

        <div className="sec-head reveal">
          <h2 className="h-section">{pick(TRACKS.title, lang)}</h2>
          <p className="lede">{pick(TRACKS.lede, lang)}</p>
        </div>

        <div className="track-grid">
          {TRACKS.cards.map((card, i) => (
            <div className="plate-wrap reveal" key={card.id} style={{ '--d': i * 70 + 'ms' }}>
              <span className="plate" aria-hidden="true" />
              <a
                className={'card card--' + card.tone}
                href={card.href}
                style={{ textDecoration: 'none' }}
              >
                <Field mode={card.mode} seed={card.seed} className="card-canvas" cell={8} />
                <span className="card-top">
                  <span>{pick(card.kicker, lang)}</span>
                  <span>0{i + 1}</span>
                </span>
                <span className="card-arrow"><Arrow size={14} /></span>
                <span className="card-body">
                  <span className="card-title" style={{ display: 'block' }}>{pick(card.title, lang)}</span>
                  <span className="card-text" style={{ display: 'block' }}>{pick(card.copy, lang)}</span>
                  <span className="card-stats">
                    {card.stats.map((s, j) => (
                      <span key={j}>{s.n} {pick(s.label, lang)}</span>
                    ))}
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
