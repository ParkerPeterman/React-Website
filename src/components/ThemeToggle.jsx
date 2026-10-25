import useTheme from '../lib/useTheme';
import './ThemeToggle.css';

/**
 * Paper or blueprint. Two named options rather than a sun/moon icon, because
 * on this site the dark theme is a different kind of drawing, not just a
 * dimmed one.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="ttoggle" role="group" aria-label="Drawing style">
      <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
        Paper
      </button>
      <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
        Blueprint
      </button>
    </div>
  );
}
