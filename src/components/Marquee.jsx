import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import './Marquee.css';

/**
 * A running text band. Base drift is constant; scrolling adds velocity and
 * flips direction with the scroll, so the strip reacts to the reader.
 */
export default function Marquee({ items, accent = 'acid', speed = 26 }) {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      // Duplicated content means -50% lands exactly on a seam.
      const drift = gsap.to(el, {
        xPercent: -50,
        ease: 'none',
        duration: speed,
        repeat: -1,
      });

      if (prefersReducedMotion()) {
        drift.pause();
        return;
      }

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          drift.timeScale(self.direction === 1 ? 1 : -1);
        },
      });

      return () => st.kill();
    },
    { scope: root }
  );

  const run = [...items, ...items];

  return (
    <div className={`marquee a-${accent}`} ref={root} aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {run.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__sep">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
