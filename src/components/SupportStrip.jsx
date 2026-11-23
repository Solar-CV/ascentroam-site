import { useLang } from '../context/LangContext.jsx';
import { SUPPORT_TEASER } from '../data/support.js';
import { pick } from '../lib/i18n.js';
import { Arrow } from './Icons.jsx';

/**
 * 首页收尾的一条窄带。不是章节，所以没有编号，只有一条 hairline。
 * 目标是把人送到 /support，不在首页直接放支付链接。
 */
export default function SupportStrip() {
  const { lang } = useLang();

  return (
    <section className="support-strip" aria-labelledby="support-strip-label">
      <div className="shell support-strip-inner">
        <span className="label" id="support-strip-label">
          {pick(SUPPORT_TEASER.label, lang)}
        </span>
        <p className="support-strip-body">{pick(SUPPORT_TEASER.body, lang)}</p>
        <a className="link support-strip-cta" href="support.html">
          <span>{pick(SUPPORT_TEASER.cta, lang)}</span>
          <Arrow />
        </a>
      </div>
    </section>
  );
}
