import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import useReveal from '../lib/useReveal';
import { certifications, stack } from '../data/site';
import Marquee from './Marquee';
import './Credentials.css';

/**
 * Certifications laid out as scattered cards with a pointer-tracked tilt,
 * followed by the tooling strip. Tilt is skipped for reduced-motion users.
 */
export default function Credentials() {
  const root = useRef(null);
  useReveal(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Tilt the inner element, never .cred__card itself — the card's CSS
      // transform carries the off-grid scatter, and GSAP would overwrite it.
      const cards = gsap.utils.toArray('.cred__inner');
      const cleanups = cards.map((card) => {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });

        const move = (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          ry(x * 14);
          rx(y * -14);
        };
        const leave = () => { rx(0); ry(0); };

        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        };
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <section className="cred" ref={root}>
      <div className="marker shell">
        <span className="mono">05 — Credentials</span>
        <span className="marker__rule" />
      </div>

      <div className="cred__grid shell">
        {certifications.map((c, i) => (
          <article className={`cred__card cred__card--${i}`} key={c.title}>
            <div className="cred__inner" data-rise data-cursor>
              <div className={`cred__imgwrap ${c.mono ? 'is-mono' : ''}`}>
                <img src={c.img} alt="" loading="lazy" />
              </div>
              <div className="cred__meta">
                <h3 className="cred__title">{c.title}</h3>
                <p className="mono">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="cred__stack">
        <Marquee
          items={['Python', 'SQL', 'AWS', 'Power BI', 'Tableau', 'Scikit-Learn', 'React']}
          accent="violet"
          speed={30}
        />
        <ul className="cred__logos shell">
          {stack.map((s) => (
            <li key={s.alt}>
              <img src={s.src} alt={s.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
