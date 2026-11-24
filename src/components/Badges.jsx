import { useLang } from '../context/LangContext.jsx';
import { BADGES } from '../data/content.js';
import { BADGE } from '../data/images.js';
import { pick } from '../lib/i18n.js';

function Badge({ badge, index }) {
  const { lang } = useLang();
  const name = lang === 'zh' ? badge.zh : badge.en;

  return (
    <div className="badge-cell reveal" style={{ '--d': index * 40 + 'ms' }}>
      <div className="badge-box">
        <img src={BADGE(badge.file)} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="badge-name">
        {name}
        <em>{pick(badge.note, lang)}</em>
      </div>
    </div>
  );
}

export default function Badges() {
  const { lang } = useLang();
  return (
    <section className="section" id="record">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">06 — {pick(BADGES.eyebrow, lang)}</span>
          <span className="label">{pick(BADGES.meta, lang)}</span>
        </div>

        <div className="sec-head reveal">
          <h2 className="h-section">{pick(BADGES.title, lang)}</h2>
          <p className="lede">{pick(BADGES.lede, lang)}</p>
        </div>

        <div className="badge-grid">
          {BADGES.items.map((b, i) => (
            <Badge badge={b} index={i} key={b.file} />
          ))}
        </div>

        <div className="label" style={{ marginTop: 22 }}>{pick(BADGES.note, lang)}</div>
      </div>
    </section>
  );
}
