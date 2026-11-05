import { useLang } from '../context/LangContext.jsx';
import { NOTES } from '../data/content.js';
import { pick } from '../lib/i18n.js';

export default function Notes() {
  const { lang } = useLang();
  return (
    <section className="section" id="notes">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">05 — {pick(NOTES.eyebrow, lang)}</span>
          <span className="label">{pick(NOTES.meta, lang)}</span>
        </div>

        <div className="notes-grid">
          <div className="reveal">
            <h2 className="h-section">{pick(NOTES.title, lang)}</h2>
            <p className="lede" style={{ marginTop: 22 }}>{pick(NOTES.lede, lang)}</p>
            <div className="cats">
              {NOTES.categories.map((c, i) => (
                <span className="cat" key={i}>{pick(c, lang)}</span>
              ))}
            </div>
            <blockquote className="quote-card">
              <p>{pick(NOTES.quote, lang)}</p>
              <cite>{pick(NOTES.quoteNote, lang)}</cite>
            </blockquote>
          </div>

          <div className="reveal" style={{ '--d': '90ms' }}>
            {NOTES.samples.map((s, i) => (
              <div className="note-row" key={i}>
                <span className="note-idx">0{i + 1}</span>
                <span>
                  <span className="note-title" style={{ display: 'block' }}>{pick(s.title, lang)}</span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: 6,
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                      maxWidth: 460,
                    }}
                  >
                    {pick(s.excerpt, lang)}
                  </span>
                </span>
                <span className="note-cat">{pick(s.cat, lang)}</span>
              </div>
            ))}
            <div className="label" style={{ marginTop: 18 }}>{lang === 'zh' ? '按学习轨道过滤' : 'Filtered by your track'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
