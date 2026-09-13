import { useRef, useState } from 'react';
import useReveal from '../lib/useReveal';
import { skills } from '../data/site';
import './About.css';

/**
 * Skills as an interrogable list rather than a wall of bullets: the heading
 * sticks while rows open on hover/focus, so the detail is opt-in.
 */
export default function About() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);
  useReveal(root);

  return (
    <section className="about" id="about" ref={root}>
      <div className="marker shell">
        <span className="mono">03 — Capability</span>
        <span className="marker__rule" />
      </div>

      <div className="about__body shell field">
        <div className="about__lede">
          <h2 className="about__heading">
            <span className="reveal-line">
              <span>What I</span>
            </span>
            <span className="reveal-line">
              <span className="serif-em">actually</span>
            </span>
            <span className="reveal-line">
              <span>work in.</span>
            </span>
          </h2>
          <p className="about__sub" data-rise>
            Five areas, from the server up to the interface.
          </p>
        </div>

        <ul className="about__list">
          {skills.map((s, i) => (
            <li
              key={s.label}
              className={`about__row ${open === i ? 'is-open' : ''}`}
              data-rise
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
            >
              <button
                className="about__trigger"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                data-cursor
              >
                <span className="about__num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="about__label">{s.label}</span>
                <span className="about__plus" aria-hidden="true" />
              </button>
              <div className="about__panel">
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
