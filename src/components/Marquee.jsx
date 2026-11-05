import { useLang } from '../context/LangContext.jsx';
import { TICKER } from '../data/content.js';
import { pick } from '../lib/i18n.js';

export default function Marquee() {
  const { lang } = useLang();
  const items = [...TICKER, ...TICKER];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="sep" />
            <b>{pick(item, lang)}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
