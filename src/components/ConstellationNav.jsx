import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';
import { scrollToSection } from '../lib/useSmoothScroll';
import { sections, identity } from '../data/site';
import ThemeToggle from './ThemeToggle';
import './ConstellationNav.css';

/**
 * Navigation as a scattered constellation rather than a bar: each item sits at
 * its own offset, hovering one dims the rest, and the active section is driven
 * by ScrollTrigger. Collapses to a corner list on narrow screens.
 */
export default function ConstellationNav() {
  const root = useRef(null);
  const [active, setActive] = useState('index');
  const [open, setOpen] = useState(false);

  // Track which section owns the viewport.
  useEffect(() => {
    const triggers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && setActive(id),
      });
    });
    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  // Fade in alongside the hero on mount.
  useEffect(() => {
    if (!root.current) return;
    gsap.to(root.current.querySelectorAll('.cnav__item, .cnav__mark, .cnav__controls'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
      delay: 0.15,
    });
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className={`cnav ${open ? 'is-open' : ''}`} ref={root} aria-label="Primary">
      <a className="cnav__mark" href="#index" onClick={(e) => go(e, 'index')} data-cursor="top">
        <img src="/Logo.svg" alt={`${identity.first} ${identity.last} — home`} />
      </a>

      <div className="cnav__controls">
        <ThemeToggle />

        <button
          className="cnav__toggle mono"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <ul className="cnav__list">
        {sections.map(({ id, label }, i) => (
          <li
            key={id}
            className={`cnav__item cnav__item--${i} ${active === id ? 'is-active' : ''}`}
          >
            <a href={`#${id}`} onClick={(e) => go(e, id)} data-cursor>
              <span className="cnav__idx mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="cnav__label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
