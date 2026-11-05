import { useLang } from '../context/LangContext.jsx';
import { FOOTER, SITE } from '../data/content.js';
import { pick } from '../lib/i18n.js';

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <div className="footer-word">{SITE.name}</div>
            <div className="footer-sub">{pick(FOOTER.tagline, lang)}</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <span className="label">{pick(FOOTER.appLabel, lang)}</span>
              {FOOTER.links.map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {pick(l.label, lang)}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <span className="label">{pick(FOOTER.sectionsLabel, lang)}</span>
              <a href="#method">{lang === 'zh' ? '方法' : 'Method'}</a>
              <a href="#curriculum">{lang === 'zh' ? '课程' : 'Curriculum'}</a>
              <a href="#gallery">{lang === 'zh' ? '影像' : 'Gallery'}</a>
              <a href="#download">{lang === 'zh' ? '下载' : 'Download'}</a>
            </div>
            <div className="footer-col">
              <span className="label">{pick(FOOTER.contactLabel, lang)}</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span className="footer-note">{pick(FOOTER.contactNote, lang)}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} AscentRoam</span>
          <span>{pick(FOOTER.imprint, lang)}</span>
          <a href="#top" className="link">{pick(FOOTER.top, lang)} ↑</a>
        </div>
      </div>
    </footer>
  );
}
