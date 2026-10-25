import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/** The attribute is already set by the inline script in index.html. */
const currentTheme = () =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/**
 * Reads and writes the theme on <html>: 'light' is paper, 'dark' is
 * blueprint. An explicit choice is persisted and wins from then on; until the
 * visitor picks, the OS preference is followed live.
 */
export default function useTheme() {
  const [theme, setThemeState] = useState(currentTheme);

  const apply = useCallback((next) => {
    document.documentElement.dataset.theme = next;
    setThemeState(next);

    // Keeps the mobile browser chrome in step with the page.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()
      );
    }
  }, []);

  const setTheme = useCallback(
    (next) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode / storage disabled — the theme still applies for this session.
      }
      apply(next);
    },
    [apply]
  );

  // Follow the OS only while the visitor hasn't chosen for themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored === 'light' || stored === 'dark') return;
      apply(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  return { theme, setTheme };
}
