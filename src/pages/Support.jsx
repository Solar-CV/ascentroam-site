import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage.js';
import { useTheme } from '../hooks/useTheme.js';
import { SUPPORT } from '../data/support.js';
import { SITE } from '../data/content.js';
import { ACCOUNT_DELETION } from '../data/account.js';
import { pick } from '../lib/i18n.js';
import { Arrow, BrandMark, Moon, Sun } from '../components/Icons.jsx';

function Block({ block, lang }) {
  if (block.kind === 'mail') {
    return (
      <p className="policy-mail">
        <a href={'mailto:' + ACCOUNT_DELETION.contactEmail}>{ACCOUNT_DELETION.contactEmail}</a>
      </p>
    );
  }
  return <p>{pick(block.text, lang)}</p>;
}

export default function Support() {
  const { lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const t = SUPPORT;
  const zh = lang === 'zh';

  useEffect(() => {
    document.title = zh ? '赞助 · 无偿 — AscentRoam' : 'Support · voluntary — AscentRoam';
  }, [zh]);

  return (
    <div className="del-page support-page">
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
        <section className="shell policy-hero" aria-labelledby="support-title">
          <div className="policy-hero-copy">
            <span className="label">{pick(t.kicker, lang)}</span>
            <h1 className="policy-title" id="support-title">{pick(t.title, lang)}</h1>
            <p className="policy-lede">{pick(t.lede, lang)}</p>
            <p className="policy-updated label">{pick(t.updated, lang)}</p>
          </div>
          <aside className="policy-summary" aria-label={pick(t.summaryLabel, lang)}>
            <span className="label">{pick(t.summaryLabel, lang)}</span>
            <p>{pick(t.summary, lang)}</p>
          </aside>
        </section>

        <div className="shell support-body">
          <ul className="support-pledge">
            {t.pledge.map((item) => (
              <li key={pick(item, lang)}>{pick(item, lang)}</li>
            ))}
          </ul>

          <section className="support-block" aria-labelledby="support-channels">
            <div className="support-block-head">
              <span className="label" id="support-channels">{pick(t.channelsLabel, lang)}</span>
              <p className="support-block-note">{pick(t.channelsNote, lang)}</p>
            </div>

            <div className="support-channels">
              {t.channels.map((c) => (
                <article className="support-channel" key={c.id}>
                  <div className="support-channel-top">
                    <span className="support-channel-num">{c.num}</span>
                    <span className="label">{pick(c.sub, lang)}</span>
                  </div>
                  <h2 className="support-channel-name">{c.name}</h2>
                  <dl className="support-channel-rows">
                    {c.rows.map((row) => (
                      <div className="support-channel-row" key={pick(row.k, lang)}>
                        <dt>{pick(row.k, lang)}</dt>
                        <dd>{pick(row.v, lang)}</dd>
                      </div>
                    ))}
                  </dl>
                  <a className="btn" href={c.url} target="_blank" rel="noreferrer">
                    {pick(c.cta, lang)}
                    <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="support-block" aria-labelledby="support-ledger">
            <div className="support-block-head">
              <span className="label" id="support-ledger">{pick(t.ledgerLabel, lang)}</span>
            </div>

            <div className="support-ledger">
              <div className="support-ledger-head" aria-hidden="true">
                {t.ledgerHead.map((h) => (
                  <span className="label" key={pick(h, lang)}>{pick(h, lang)}</span>
                ))}
              </div>
              <dl className="support-ledger-body">
                {t.ledger.map((row) => (
                  <div className="support-ledger-row" key={pick(row.claim, lang)}>
                    <dt>{pick(row.claim, lang)}</dt>
                    <dd>{pick(row.reality, lang)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <article className="support-doc policy-doc">
            {t.sections.map((section) => (
              <section className="policy-section" id={section.id} key={section.id}>
                <div className="policy-section-head">
                  <span className="policy-num">{section.num}</span>
                  <h2 className="policy-h2">{pick(section.title, lang)}</h2>
                </div>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} lang={lang} />
                ))}
              </section>
            ))}

            <blockquote className="support-quote">
              <p>{pick(t.quote, lang)}</p>
              <footer>{pick(t.quoteFrom, lang)}</footer>
            </blockquote>

            <p className="policy-doc-note">{pick(t.docNote, lang)}</p>
          </article>
        </div>
      </main>

      <footer className="del-footer">
        <div className="shell del-footer-inner">
          <span>© {new Date().getFullYear()} AscentRoam</span>
          <div className="del-footer-links">
            <a href={SITE.privacy}>{pick(t.footer.privacy, lang)}</a>
            <a href="delete-account.html">{pick(t.footer.delete, lang)}</a>
            <a href={SITE.repo} target="_blank" rel="noreferrer">{pick(t.footer.source, lang)}</a>
            <a href="#top">{pick(t.footer.backTop, lang)} ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
