#!/usr/bin/env node
/**
 * 把 App 仓库最新的 release 同步进 SITE：版本号、体积、APK 兜底直链。
 *
 * 站点运行时本来就会自己去 GitHub API 取最新地址（hooks/useLatestRelease.js），
 * 这个脚本负责另一半：当浏览器取不到 API（403 / 断网 / 限流）时，页面退回的
 * SITE.apkFallback 与展示的版本号、体积也不能过时。
 *
 * 由 .github/workflows/deploy.yml 每天定时调用；也可手动运行：
 *   node scripts/sync-release.mjs
 * 拿不到数据时以非零码退出，让 workflow 红掉，而不是把旧数据当成成功。
 */
import { readFileSync, writeFileSync } from 'node:fs';

const OWNER = 'Solar-CV';
const REPO = 'AscentApp';
const FILE = new URL('../src/data/content.js', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'ascentroam-site-sync',
};
// Actions 里传 GITHUB_TOKEN：配额从 60 次/小时提到 5000，也避开共享出口 IP 的限流。
if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;

const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`, { headers });
if (!res.ok) {
  console.error(`GitHub API 请求失败：HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}

const release = await res.json();
const apk = (release.assets || []).find((a) => /\.apk$/i.test(a.name || ''));
if (!apk) {
  console.error(`最新 release ${release.tag_name} 没有 .apk 附件`);
  process.exit(1);
}

const version = String(release.tag_name || '').replace(/^v/, '');
if (!version) {
  console.error('release 没有可用的 tag_name');
  process.exit(1);
}

// 与 Download.jsx 的 megabytes() 同一口径：10 MB 以上取整，以下保留一位。
const mb = apk.size / 1048576;
const size = `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB`;

const VERSION_RE = /(\n\s*version: ')[^']*(')/;
const SIZE_RE = /(\n\s*size: ')[^']*(')/;
const FALLBACK_RE = /(\n\s*apkFallback: ')[^']*(')/;

const before = readFileSync(FILE, 'utf8');
for (const [label, re] of [['version', VERSION_RE], ['size', SIZE_RE], ['apkFallback', FALLBACK_RE]]) {
  const count = (before.match(new RegExp(re.source, 'g')) || []).length;
  if (count !== 1) {
    console.error(`content.js 里 ${label} 期望 1 处，实际 ${count} 处，拒绝改写`);
    process.exit(1);
  }
}

const after = before
  .replace(VERSION_RE, `$1${version}$2`)
  .replace(SIZE_RE, `$1${size}$2`)
  .replace(FALLBACK_RE, `$1${apk.browser_download_url}$2`);

if (after === before) {
  console.log(`已是最新：${release.tag_name}（${size}）`);
  process.exit(0);
}

writeFileSync(FILE, after);
console.log(`已同步：${release.tag_name}（${size}，${apk.name}）`);
