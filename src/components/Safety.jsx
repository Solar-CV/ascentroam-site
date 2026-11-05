import { useLang } from '../context/LangContext.jsx';
import { SAFETY, SITE } from '../data/content.js';
import { pick } from '../lib/i18n.js';

export default function Safety() {
  const { lang } = useLang();
  return (
    <section className="section" id="limits">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">09 — {pick(SAFETY.eyebrow, lang)}</span>
          <span className="label">{pick(SAFETY.meta, lang)}</span>
        </div>

        <div className="safety-grid">
          <div className="reveal">
            <h2 className="h-section">{pick(SAFETY.title, lang)}</h2>
            <p className="lede" style={{ marginTop: 20 }}>{pick(SAFETY.lede, lang)}</p>
            <div style={{ marginTop: 30 }}>
              {SAFETY.limits.map((l) => (
                <div className="limit-row" key={l.n}>
                  <span className="limit-idx">{l.n}</span>
                  <div>
                    <div className="limit-title">{pick(l.title, lang)}</div>
                    <p className="limit-text">{pick(l.body, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="safety-aside reveal" style={{ '--d': '90ms' }}>
            <span className="label">{pick(SAFETY.asideTitle, lang)}</span>
            <p>{pick(SAFETY.aside, lang)}</p>
            <div className="safety-links">
              <a className="link label" href={SITE.privacy} style={{ letterSpacing: '0.1em' }}>
                {pick(SAFETY.privacy, lang)}
              </a>
              <a className="link label" href="delete-account.html" style={{ letterSpacing: '0.1em' }}>
                {pick(SAFETY.delete, lang)}
              </a>
              <a className="link label" href={SITE.repo} target="_blank" rel="noreferrer" style={{ letterSpacing: '0.1em' }}>
                GitHub
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
