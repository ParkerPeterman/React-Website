import { useEffect } from 'react';
import '../styles/tokens.css';
import '../styles/base.css';
import './dashboard.css';

/**
 * Common chrome for the three project dashboards: title bar, live clock-style
 * status, accent theming and the route back to the portfolio.
 */
export default function DashShell({ accent = 'acid', eyebrow, title, subtitle, status, children }) {
  useEffect(() => {
    document.title = `${title} — Parker Peterman`;
    return () => {
      document.title = 'Parker Peterman — Data & Machine Learning';
    };
  }, [title]);

  const back = (e) => {
    e.preventDefault();
    window.location.hash = '';
  };

  return (
    <div className={`dash a-${accent}`}>
      <header className="dash__bar">
        <div className="dash__id">
          <span className="dash__dot" />
          <div>
            <p className="mono">{eyebrow}</p>
            <h1 className="dash__title">{title}</h1>
          </div>
        </div>

        <div className="dash__baraside">
          {status && <span className="dash__status mono">{status}</span>}
          <a href="#" className="dash__back" onClick={back} data-cursor>
            ← Portfolio
          </a>
        </div>
      </header>

      {subtitle && <p className="dash__subtitle shell">{subtitle}</p>}

      <div className="dash__body shell">{children}</div>

      <footer className="dash__foot shell mono">
        Illustrative interface — figures represent the project's reporting surface.
      </footer>
    </div>
  );
}

/* --- Building blocks shared by all three dashboards ---------------------- */

export function StatGrid({ children }) {
  return <div className="dash__stats">{children}</div>;
}

export function Stat({ label, value, note, tone = 'neutral', pulse = false }) {
  return (
    <article className={`stat stat--${tone}`}>
      {pulse && <span className="stat__pulse" aria-hidden="true" />}
      <p className="stat__label mono">{label}</p>
      <p className="stat__value">{value}</p>
      {note && <p className={`stat__note stat__note--${tone}`}>{note}</p>}
    </article>
  );
}

export function Panel({ title, note, wide = false, children }) {
  return (
    <section className={`panel ${wide ? 'panel--wide' : ''}`}>
      <div className="panel__head">
        <h2 className="panel__title">{title}</h2>
        {note && <span className="mono">{note}</span>}
      </div>
      {children}
    </section>
  );
}

export function Bar({ name, value, display, tone = 'accent' }) {
  return (
    <div className="bar">
      <div className="bar__head">
        <span>{name}</span>
        <span className={`bar__value bar__value--${tone}`}>{display ?? value}</span>
      </div>
      <div className="bar__track">
        <div className={`bar__fill bar__fill--${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
