import { useLang } from '../context/LangContext.jsx';
import { DOWNLOAD, SITE } from '../data/content.js';
import { IMG } from '../data/images.js';
import { pick } from '../lib/i18n.js';
import useLatestRelease from '../hooks/useLatestRelease.js';
import Field from './Field.jsx';
import { Arrow } from './Icons.jsx';

const megabytes = (bytes) => (bytes ? `${(bytes / 1048576).toFixed(1)} MB` : null);

export default function Download() {
  const { lang } = useLang();
  const release = useLatestRelease(SITE.releaseSource);

  const version = release.version || SITE.version;
  const size = megabytes(release.size) || SITE.size;
  const playLive = SITE.play.status === 'live';

  // API 拿不到最新版本时退回 SITE.apkFallback（当前版本的确定性直链），按钮始终可点
  const apkUrl = release.apk || SITE.apkFallback;
  const fileNote = release.status === 'loading' ? DOWNLOAD.apkPending : DOWNLOAD.apkNote;

  const specValue = (spec) => {
    if (spec.id === 'version') return `v${version}`;
    if (spec.id === 'size') return `≈ ${size}`;
    return pick(spec.v, lang);
  };

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
            {/* 1 · 直连最新 APK：地址解析自 GitHub Releases API，失败退回 SITE.apkFallback */}
            <a
              className="btn btn-solid"
              href={apkUrl}
              target="_blank"
              rel="noreferrer"
            >
              {pick(DOWNLOAD.apk, lang)}
              <span className="btn-tag">v{version}</span>
              <Arrow />
            </a>

            {/* 2 · Releases 页：历史版本、AAB、更新说明都在这里 */}
            <a className="btn" href={SITE.releases} target="_blank" rel="noreferrer">
              {pick(DOWNLOAD.releases, lang)}
            </a>

            {/* 3 · Google Play：SITE.play.status 切到 'live' 后自动变成可用链接 */}
            {playLive ? (
              <a className="btn" href={SITE.play.store} target="_blank" rel="noreferrer">
                {pick(DOWNLOAD.play, lang)}
              </a>
            ) : (
              <span className="btn is-disabled" aria-disabled="true">
                {pick(DOWNLOAD.play, lang)}
                <span className="btn-tag btn-tag--muted">{pick(DOWNLOAD.playBadge, lang)}</span>
              </span>
            )}
          </div>

          <p className="download-file">
            <span>{pick(fileNote, lang)}</span>
            <span className="download-file-sep">·</span>
            <a className="link" href={SITE.repo} target="_blank" rel="noreferrer">
              {pick(DOWNLOAD.source, lang)}
            </a>
          </p>

          {!playLive && <p className="download-play-note">{pick(DOWNLOAD.playNote, lang)}</p>}

          <div className="download-specs">
            {DOWNLOAD.specs.map((s) => (
              <div className="download-spec" key={s.id}>
                <span className="label">{pick(s.k, lang)}</span>
                <b>{specValue(s)}</b>
              </div>
            ))}
          </div>

          <div className="label" style={{ marginTop: 26 }}>{pick(DOWNLOAD.note, lang)}</div>
        </div>
      </div>
    </section>
  );
}
