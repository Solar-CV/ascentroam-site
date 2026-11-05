import { useCallback, useEffect, useState } from 'react';

const KEY = 'ar-theme';

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {}
  return 'light';
}

export function useTheme() {
  const [theme, setThemeState] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e100f' : '#f7f7f4');
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    window.dispatchEvent(new Event('ar:theme'));
  }, [theme]);

  const toggle = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );
  return { theme, toggle };
}
