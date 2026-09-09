import useTheme from '../lib/useTheme';
import './ThemeToggle.css';

/**
 * Sun/moon switch. The track slides a filled knob rather than swapping icons
 * outright, so the control reads as a state, not a button that did something.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      className={`ttoggle ${isLight ? 'is-light' : ''}`}
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label="Light mode"
      title={isLight ? 'Switch to dark' : 'Switch to light'}
      data-cursor
    >
      <span className="ttoggle__knob" aria-hidden="true" />

      <span className="ttoggle__icon ttoggle__icon--sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13">
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2" />
            <path d="M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
          </g>
        </svg>
      </span>

      <span className="ttoggle__icon ttoggle__icon--moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13">
          <path
            d="M20.6 13.4A8.4 8.4 0 1110.6 3.4a6.6 6.6 0 0010 10z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
