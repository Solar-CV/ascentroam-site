import { createContext, useContext } from 'react';
import useLatestRelease from '../hooks/useLatestRelease.js';
import { SITE } from '../data/content.js';

/**
 * 全站只发一次 GitHub Releases 请求。
 *
 * 首屏和下载区都要显示最新版本；如果各自调用 useLatestRelease，同一页面会打两次
 * api.github.com（未登录额度只有 60 次/小时）。这里用 Provider 把同一份结果分发给
 * Hero 与 Download，失败时两边一起退回 SITE.version / SITE.apkFallback。
 */
export const ReleaseContext = createContext({
  status: 'loading',
  version: null,
  tag: null,
  apk: null,
  size: null,
  publishedAt: null,
});

export function ReleaseProvider({ children }) {
  const release = useLatestRelease(SITE.releaseSource);
  return <ReleaseContext.Provider value={release}>{children}</ReleaseContext.Provider>;
}

export const useRelease = () => useContext(ReleaseContext);
