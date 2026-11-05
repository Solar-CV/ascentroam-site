import { useLang } from '../context/LangContext.jsx';
import { DOWNLOAD, SITE } from '../data/content.js';
import { IMG } from '../data/images.js';
import { pick } from '../lib/i18n.js';
import Field from './Field.jsx';
import { Arrow } from './Icons.jsx';

export default function Download() {
  const { lang } = useLang();
  return (
    <section className="download" id="download">
      <Field src={IMG.broadPeak} mode="photo" animate className="download-canvas" cell={10} />
      <div className="download-wash" />
      <div className="shell">
        <div className="download-inner">
          <span className="label">10 — {pick(DOWNLOAD.eyebrow, lang)}</span>
          <h2 className="download-title">{pick(DOWNLOAD.title, lang)}</h2>
          <p className="download-lede">{pick(DOWNLOAD.lede, lang)}</p>

          <div className="download-actions">
            <a className="btn btn-solid" href={SITE.releases} target="_blank" rel="noreferrer">
              {pick(DOWNLOAD.primary, lang)}
              <Arrow />
            </a>
            <a className="btn" href={SITE.repo} target="_blank" rel="noreferrer">
              {pick(DOWNLOAD.secondary, lang)}
            </a>
          </div>

          <div className="download-specs">
            {DOWNLOAD.specs.map((s) => (
              <div className="download-spec" key={s.k.en}>
                <span className="label">{pick(s.k, lang)}</span>
                <b>{pick(s.v, lang)}</b>
              </div>
            ))}
          </div>

          <div className="label" style={{ marginTop: 26 }}>{pick(DOWNLOAD.note, lang)}</div>
        </div>
      </div>
    </section>
  );
}
