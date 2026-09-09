import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import './Cursor.css';

/**
 * A trailing ring that swells over anything marked data-cursor.
 * Pointer-coarse devices and reduced-motion users never see it.
 */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return undefined;

    const ringEl = ring.current;
    const dotEl = dot.current;

    // Separate quickTo per element gives the ring its lag against the dot.
    const rx = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3' });
    const dx = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3' });

    let visible = false;
    const onMove = (e) => {
      if (!visible) {
        visible = true;
        gsap.to([ringEl, dotEl], { opacity: 1, duration: 0.3 });
      }
      rx(e.clientX); ry(e.clientY);
      dx(e.clientX); dy(e.clientY);
    };

    const onLeave = () => {
      visible = false;
      gsap.to([ringEl, dotEl], { opacity: 0, duration: 0.2 });
    };

    // Delegated hover — works for nodes added after mount.
    const onOver = (e) => {
      const hit = e.target.closest('[data-cursor]');
      if (!hit) return;
      const label = hit.getAttribute('data-cursor');
      ringEl.classList.add('is-active');
      if (label && label !== 'true') {
        ringEl.setAttribute('data-label', label);
        ringEl.classList.add('has-label');
      }
    };

    const onOut = (e) => {
      if (!e.target.closest('[data-cursor]')) return;
      ringEl.classList.remove('is-active', 'has-label');
      ringEl.removeAttribute('data-label');
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ring} />
      <div className="cursor__dot" ref={dot} />
    </div>
  );
}
