import { useCallback, useEffect, useState } from 'react';

const KEY = 'ar-lang';

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch (e) {}

  // Cloudflare Pages injects this for mainland China visitors.
  // It is only a default: a stored user choice always wins.
  if (typeof window !== 'undefined') {
    const injected = window.__AR_LANG__;
    if (injected === 'zh' || injected === 'en') return injected;
  }

  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return /^zh/i.test(nav) ? 'zh' : 'en';
}

export function useLanguage() {
  const [lang, setLangState] = useState(initial);

  // Never persist the inferred default here. Otherwise the IP / browser
  // guess becomes a permanent choice on the first visit.
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next !== 'zh' && next !== 'en') return;
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
  }, []);

  const toggle = useCallback(() => {
    setLangState((l) => {
      const next = l === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      return next;
    });
  }, []);

  return { lang, setLang, toggle };
}
