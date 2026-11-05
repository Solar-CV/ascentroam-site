import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage.js';
import { useTheme } from '../hooks/useTheme.js';
import { ACCOUNT_DELETION } from '../data/account.js';
import { PRIVACY } from '../data/privacy.js';
import { SITE } from '../data/content.js';
import { pick } from '../lib/i18n.js';
import { BrandMark, Moon, Sun } from '../components/Icons.jsx';

function Block({ block, lang }) {
  if (block.kind === 'h3') {
    return <h3 className="policy-h3">{pick(block.text, lang)}</h3>;
  }
  if (block.kind === 'ul') {
    return (
      <ul>
        {block.items.map((item, index) => (
          <li key={index}>{pick(item, lang)}</li>
        ))}
      </ul>
    );
  }
  if (block.kind === 'mail') {
    return (
      <p className="policy-mail">
        <a href={'mailto:' + ACCOUNT_DELETION.contactEmail}>{ACCOUNT_DELETION.contactEmail}</a>
      </p>
    );
  }
  return <p>{pick(block.text, lang)}</p>;
}

export default function Privacy() {
  const { lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const t = PRIVACY;
  const zh = lang === 'zh';

  useEffect(() => {
    document.title = zh ? '隐私政策 — AscentRoam' : 'Privacy policy — AscentRoam';
  }, [zh]);

  return (
    <div className="del-page policy-page">
      <a className="skip-link" href="#main">{zh ? '跳到主要内容' : 'Skip to content'}</a>
      <div className="grain" aria-hidden="true" />

      <header className="del-header">
        <div className="shell del-header-inner">
          <a className="brand" href="./" aria-label="AscentRoam">
            <BrandMark />
            <span className="brand-word">AscentRoam</span>
          </a>
          <div className="del-actions">
            <a className="del-back label" href="./">
              ← {pick(t.footer.home, lang)}
            </a>
            <button
              className="lang-btn"
              type="button"
              onClick={() => setLang(zh ? 'en' : 'zh')}
              aria-label={zh ? 'Switch to English' : '切换到中文'}
            >
              {zh ? 'EN' : '中'}
            </button>
            <button
              className="icon-btn"
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Light theme' : 'Dark theme'}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="del-main">
        <section className="shell policy-hero" aria-labelledby="policy-title">
          <div className="policy-hero-copy">
            <span className="label">{pick(t.kicker, lang)}</span>
            <h1 className="policy-title" id="policy-title">{pick(t.title, lang)}</h1>
            <p className="policy-lede">{pick(t.lede, lang)}</p>
            <p className="policy-updated label">{pick(t.updated, lang)}</p>
          </div>
          <aside className="policy-summary" aria-label={pick(t.summaryLabel, lang)}>
            <span className="label">{pick(t.summaryLabel, lang)}</span>
            <p>{pick(t.summary, lang)}</p>
          </aside>
        </section>

        <div className="shell policy-body">
          <nav className="policy-toc" aria-label={pick(t.tocLabel, lang)}>
            <span className="label">{pick(t.tocLabel, lang)}</span>
            {t.sections.map((section) => (
              <a key={section.id} href={'#' + section.id}>
                <span>{section.num}</span>
                <span>{pick(section.title, lang)}</span>
              </a>
            ))}
          </nav>

          <article className="policy-doc" aria-label={pick(t.docLabel, lang)}>
            <p className="policy-intro">{pick(t.intro, lang)}</p>

            {t.sections.map((section) => (
              <section className="policy-section" id={section.id} key={section.id}>
                <div className="policy-section-head">
                  <span className="policy-num">{section.num}</span>
                  <h2 className="policy-h2">{pick(section.title, lang)}</h2>
                </div>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} lang={lang} />
                ))}
                {section.id === 'rights' && (
                  <p className="policy-linkline">
                    {zh ? '网页删除入口：' : 'Web deletion entry: '}
                    <a href="delete-account.html">{pick(t.footer.delete, lang)}</a>
                  </p>
                )}
              </section>
            ))}

            <p className="policy-doc-note">{pick(t.docNote, lang)}</p>
          </article>
        </div>
      </main>

      <footer className="del-footer">
        <div className="shell del-footer-inner">
          <span>© {new Date().getFullYear()} AscentRoam</span>
          <div className="del-footer-links">
            <a href="delete-account.html">{pick(t.footer.delete, lang)}</a>
            <a href={SITE.repo} target="_blank" rel="noreferrer">{pick(t.footer.source, lang)}</a>
            <a href="./">{pick(t.footer.home, lang)}</a>
            <a href="#top">{pick(t.footer.backTop, lang)} ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
