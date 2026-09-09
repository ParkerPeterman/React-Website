import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/** The attribute is already set by the inline script in index.html. */
const currentTheme = () =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/**
 * Reads and writes the theme on <html>. An explicit choice is persisted and
 * wins from then on; until the visitor picks, the OS preference is followed
 * live so a system change is reflected without a reload.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  const apply = useCallback((next) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);

    // Keeps the mobile browser chrome in step with the page.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        getComputedStyle(document.documentElement).getPropertyValue('--surface').trim()
      );
    }
  }, []);

  const toggle = useCallback(() => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — the theme still applies for this session.
    }
    apply(next);
  }, [apply]);

  // Follow the OS only while the visitor hasn't chosen for themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored === 'light' || stored === 'dark') return;
      apply(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  return { theme, toggle };
}
