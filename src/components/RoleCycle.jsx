import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { roles } from '../data/site';
import './RoleCycle.css';

/**
 * Replaces the old typewriter. Rather than typing character by character, the
 * outgoing role clips upward while the incoming one rises into place — same
 * information, far less visual noise.
 */
export default function RoleCycle() {
  const [i, setI] = useState(0);
  const out = useRef(null);
  const incoming = useRef(null);
  const prev = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      prev.current = i;
      setI((n) => (n + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [i]);

  useEffect(() => {
    if (prefersReducedMotion() || !incoming.current) return;
    gsap.fromTo(
      incoming.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.75, ease: 'expo.out' }
    );
    gsap.fromTo(
      out.current,
      { yPercent: 0 },
      { yPercent: -100, duration: 0.75, ease: 'expo.out' }
    );
  }, [i]);

  return (
    <div className="rolecycle" aria-live="polite">
      <span className="sr-only">{roles[i]}</span>
      <span className="rolecycle__window" aria-hidden="true">
        <span className="rolecycle__out" ref={out}>
          {roles[prev.current]}
        </span>
        <span className="rolecycle__in" ref={incoming}>
          {roles[i]}
        </span>
      </span>
    </div>
  );
}
