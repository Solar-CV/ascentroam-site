import { useEffect, useState } from 'react';

/**
 * 解析 GitHub 最新 release 里的 APK 直链。
 *
 * 站点是纯静态的（GitHub Pages，没有后端），而 App 仓库的 release 附件名带版本号
 * （ascentroam-v0.27.0-release.apk），所以 releases/latest/download/<固定名> 用不了。
 * 这里在浏览器里读一次 GitHub API（公开仓库，CORS 允许，未登录额度 60 次/小时），
 * 取出最新 APK 的地址；结果缓存 10 分钟，失败就由调用方退回 SITE.apkFallback。
 *
 * 如果 App 仓库以后在 release 里额外挂一个固定名的附件（例如 ascentroam-latest.apk），
 * 这个 hook 可以整个删掉，直接用静态链接。
 */

const CACHE_KEY = 'ar:latest-release';
const CACHE_TTL = 10 * 60 * 1000;

const readCache = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (raw && raw.data && Date.now() - raw.at < CACHE_TTL) return raw.data;
  } catch (e) {
    /* 隐私模式下 localStorage 可能不可用，忽略 */
  }
  return null;
};

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch (e) {
    /* 写不进去也不影响本次会话 */
  }
};

const EMPTY = {
  status: 'loading', // loading | ready | unavailable
  version: null,
  tag: null,
  apk: null,
  size: null,
  publishedAt: null,
};

export default function useLatestRelease(source) {
  const [release, setRelease] = useState(EMPTY);

  useEffect(() => {
    if (!source || !source.owner || !source.repo) {
      setRelease({ ...EMPTY, status: 'unavailable' });
      return undefined;
    }

    let alive = true;
    const cached = readCache();
    if (cached) setRelease({ ...cached, status: 'ready' });

    const url = `https://api.github.com/repos/${source.owner}/${source.repo}/releases/latest`;
    fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        const asset = (data.assets || []).find((a) => /\.apk$/i.test(a.name || ''));
        const next = {
          status: asset ? 'ready' : 'unavailable',
          version: (data.tag_name || '').replace(/^v/, '') || null,
          tag: data.tag_name || null,
          apk: (asset && asset.browser_download_url) || null,
          size: (asset && asset.size) || null,
          publishedAt: data.published_at || null,
        };
        writeCache(next);
        if (alive) setRelease(next);
      })
      .catch(() => {
        if (!alive) return;
        // 已经用缓存渲染过的，保持缓存内容，不让页面闪回
        setRelease((prev) => (prev.status === 'ready' ? prev : { ...EMPTY, status: 'unavailable' }));
      });

    return () => {
      alive = false;
    };
  }, [source && source.owner, source && source.repo]);

  return release;
}
