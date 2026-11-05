import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage.js';
import { useTheme } from '../hooks/useTheme.js';
import { ACCOUNT, ACCOUNT_DELETION } from '../data/account.js';
import { SITE } from '../data/content.js';
import { pick } from '../lib/i18n.js';
import { Arrow, BrandMark, Moon, Sun } from '../components/Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function withEmail(text) {
  return text.replaceAll('support@ascentroam.com', ACCOUNT_DELETION.contactEmail);
}

export default function DeleteAccount() {
  const { lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [requestId, setRequestId] = useState('');

  const t = ACCOUNT;
  const f = t.form;
  const zh = lang === 'zh';
  const mailSubject = encodeURIComponent(zh ? '删除账号请求' : 'Account deletion request');
  const mailHref = 'mailto:' + ACCOUNT_DELETION.contactEmail + '?subject=' + mailSubject;

  useEffect(() => {
    document.title = zh ? '删除账号 — AscentRoam' : 'Delete your account — AscentRoam';
  }, [zh]);

  async function onSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(cleanEmail)) {
      setError(f.emailError[lang] || f.emailError.en);
      setStatus('error');
      return;
    }
    if (!confirmed) {
      setError(f.confirmError[lang] || f.confirmError.en);
      setStatus('error');
      return;
    }

    // A bot that fills the hidden field gets a quiet success and sends nothing.
    if (website.trim()) {
      setStatus('success');
      setRequestId('');
      return;
    }

    setStatus('sending');
    setError('');
    setRequestId('');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ACCOUNT_DELETION.requestTimeoutMs);
    try {
      const response = await fetch(ACCOUNT_DELETION.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        signal: controller.signal,
        body: JSON.stringify({
          // Formspree 用 _subject 决定通知邮件的标题。
          // 删除请求和 App 反馈共用同一个收件箱，标题必须一眼能分辨，
          // 否则很容易被当成普通反馈漏掉（而删除请求是有时限的）。
          _subject: 'AscentRoam · 账号删除请求 / Account deletion request',
          app: 'AscentRoam',
          source: 'web',
          page: 'delete-account',
          email: cleanEmail,
          identifier: identifier.trim(),
          note: note.trim(),
          confirm: true,
          locale: lang,
          requestedAt: new Date().toISOString(),
          website: website.trim(),
        }),
      });

      if (!response.ok) {
        const unavailable = response.status === 404 || response.status === 503;
        setError(withEmail(unavailable ? f.unavailable[lang] || f.unavailable.en : f.failed[lang] || f.failed.en));
        setStatus('error');
        return;
      }

      let data = null;
      try {
        data = await response.json();
      } catch (e) {}
      setRequestId(data && data.requestId ? String(data.requestId) : '');
      setStatus('success');
    } catch (err) {
      setError(withEmail(f.failed[lang] || f.failed.en));
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  }

  function reset() {
    setStatus('idle');
    setError('');
    setRequestId('');
    setConfirmed(false);
    setNote('');
  }

  return (
    <div className="del-page">
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
        <section className="shell del-hero" aria-labelledby="del-title">
          <div className="del-hero-copy">
            <span className="label">{pick(t.kicker, lang)}</span>
            <h1 className="del-title" id="del-title">{pick(t.title, lang)}</h1>
            <p className="del-lede">{pick(t.lede, lang)}</p>
            <p className="del-updated label">{pick(t.updated, lang)}</p>

            <div className="del-meta">
              {t.meta.map((row) => (
                <div className="del-meta-row" key={row.k.en}>
                  <span className="label">{pick(row.k, lang)}</span>
                  <div>
                    <div className="del-meta-v">{pick(row.v, lang)}</div>
                    {row.note && <div className="del-meta-note">{row.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="del-card">
            <div className="del-card-head">
              <span className="label">{pick(f.label, lang)}</span>
              <h2 className="del-card-title">{pick(f.title, lang)}</h2>
              <p className="del-card-lede">{pick(f.lede, lang)}</p>
            </div>

            {status === 'success' ? (
              <div className="del-success" role="status">
                <span className="label">{pick(f.successTitle, lang)}</span>
                <p>{pick(f.successBody, lang)}</p>
                {requestId && (
                  <p className="del-ref">
                    {pick(f.successRef, lang)} <b>{requestId}</b>
                  </p>
                )}
                <button className="btn btn-line del-submit" type="button" onClick={reset}>
                  {pick(f.successReset, lang)}
                </button>
              </div>
            ) : (
              <form className="del-form" onSubmit={onSubmit} noValidate aria-busy={status === 'sending'}>
                <div className="del-field">
                  <label htmlFor="del-email">{pick(f.email, lang)}</label>
                  <input
                    id="del-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck="false"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="del-email-hint"
                  />
                  <p className="del-hint" id="del-email-hint">{pick(f.emailHint, lang)}</p>
                </div>

                <div className="del-field">
                  <label htmlFor="del-identifier">{pick(f.identifier, lang)}</label>
                  <input
                    id="del-identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    maxLength={120}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    aria-describedby="del-identifier-hint"
                  />
                  <p className="del-hint" id="del-identifier-hint">{pick(f.identifierHint, lang)}</p>
                </div>

                <div className="del-field">
                  <label htmlFor="del-note">{pick(f.note, lang)}</label>
                  <textarea
                    id="del-note"
                    name="note"
                    rows={3}
                    maxLength={1000}
                    placeholder={pick(f.notePlaceholder, lang)}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <label className="del-check">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                  />
                  <span>{pick(f.confirm, lang)}</span>
                </label>

                <div className="del-hp" aria-hidden="true">
                  <label htmlFor="del-website">Website</label>
                  <input
                    id="del-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="del-status" role="alert">
                    {error}
                  </p>
                )}

                <button className="btn btn-solid del-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? pick(f.sending, lang) : pick(f.submit, lang)}
                  {status !== 'sending' && <Arrow />}
                </button>

                <p className="del-form-note">
                  {pick(f.privacy, lang)}{' '}
                  <a className="link" href={SITE.privacy}>
                    {pick(t.footer.privacy, lang)}
                  </a>
                </p>
                <p className="del-fallback">
                  {pick(f.mailFallback, lang)}{' '}
                  <a className="link" href={mailHref}>{ACCOUNT_DELETION.contactEmail}</a>
                </p>
              </form>
            )}
          </div>
        </section>

        <div className="shell del-body">
          <section className="del-section del-section-grid" aria-labelledby="del-app-title">
            <div>
              <span className="label">{pick(t.inApp.label, lang)}</span>
              <h2 className="del-h2" id="del-app-title">{pick(t.inApp.title, lang)}</h2>
              <p className="del-section-lede">{pick(t.inApp.lede, lang)}</p>
            </div>
            <div>
              <ol className="del-steps">
                {t.inApp.steps.map((step, i) => (
                  <li className="del-step" key={step.en}>
                    <span className="del-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{pick(step, lang)}</span>
                  </li>
                ))}
              </ol>
              <p className="del-note">{pick(t.inApp.note, lang)}</p>
            </div>
          </section>

          <section className="del-section" aria-labelledby="del-data-title">
            <span className="label">{pick(t.data.label, lang)}</span>
            <h2 className="del-h2" id="del-data-title">{pick(t.data.title, lang)}</h2>
            <p className="del-section-lede">{pick(t.data.lede, lang)}</p>

            <div className="del-split">
              <div className="del-list-card">
                <div className="del-list-title">
                  <span className="del-dot" aria-hidden="true" />
                  {pick(t.data.deletedTitle, lang)}
                </div>
                <ul className="del-list">
                  {t.data.deleted.map((item) => (
                    <li key={item.en}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>
              <div className="del-list-card del-list-card--keep">
                <div className="del-list-title">
                  <span className="del-dot" aria-hidden="true" />
                  {pick(t.data.keptTitle, lang)}
                </div>
                <ul className="del-list del-list--keep">
                  {t.data.kept.map((item) => (
                    <li key={item.en}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="del-note">{pick(t.data.backupNote, lang)}</p>
          </section>

          <div className="del-aside-grid">
            <section className="del-box" aria-labelledby="del-local-title">
              <span className="label">{pick(t.local.label, lang)}</span>
              <h3 className="del-h3" id="del-local-title">{pick(t.local.title, lang)}</h3>
              <p>{pick(t.local.body, lang)}</p>
            </section>
            <section className="del-box" aria-labelledby="del-none-title">
              <span className="label">{pick(t.noAccount.label, lang)}</span>
              <h3 className="del-h3" id="del-none-title">{pick(t.noAccount.title, lang)}</h3>
              <p>{pick(t.noAccount.body, lang)}</p>
            </section>
          </div>

          <section className="del-contact" aria-labelledby="del-contact-title">
            <div>
              <span className="label">{pick(t.contact.label, lang)}</span>
              <h2 className="del-h2" id="del-contact-title">{pick(t.contact.title, lang)}</h2>
              <p className="del-section-lede">{pick(t.contact.body, lang)}</p>
            </div>
            <a className="del-mail" href={mailHref}>{ACCOUNT_DELETION.contactEmail}</a>
          </section>
        </div>
      </main>

      <footer className="del-footer">
        <div className="shell del-footer-inner">
          <span>© {new Date().getFullYear()} AscentRoam</span>
          <div className="del-footer-links">
            <a href={SITE.privacy}>{pick(t.footer.privacy, lang)}</a>
            <a href={SITE.repo} target="_blank" rel="noreferrer">{pick(t.footer.source, lang)}</a>
            <a href="./">{pick(t.footer.home, lang)}</a>
            <a href="#top">{pick(t.footer.backTop, lang)} ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
