import { useLang } from '../context/LangContext.jsx';
import { LANGUAGES } from '../data/content.js';
import { pick } from '../lib/i18n.js';

export default function Languages() {
  const { lang } = useLang();
  return (
    <section className="section" id="languages">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">08 — {pick(LANGUAGES.eyebrow, lang)}</span>
          <span className="label">{pick(LANGUAGES.meta, lang)}</span>
        </div>

        <div className="sec-head reveal">
          <h2 className="h-section">{pick(LANGUAGES.title, lang)}</h2>
          <p className="lede">{pick(LANGUAGES.body, lang)}</p>
        </div>

        <div className="lang-grid">
          {LANGUAGES.list.map((l, i) => (
            <div className="lang-item reveal" key={l.code} style={{ '--d': i * 35 + 'ms' }}>
              <div className="lang-native">{l.label}</div>
              <div className="lang-code">{l.code} · {l.latin}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
