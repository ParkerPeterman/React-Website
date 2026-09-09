import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from './motion';

/**
 * Standard entrance for a section: masked lines rise, tagged elements fade up,
 * and the section gains .is-in so CSS-driven rules (hairlines) can run too.
 *
 * Mark children with `.reveal-line > span` for the mask treatment, or
 * `[data-rise]` for a simpler fade-and-lift.
 */
export default function useReveal(scope, { start = 'top 78%' } = {}) {
  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const lines = el.querySelectorAll('.reveal-line > span');
      const risers = el.querySelectorAll('[data-rise]');

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, y: 0 });
        gsap.set(risers, { opacity: 1, y: 0 });
        el.classList.add('is-in');
        return;
      }

      gsap.set(risers, { opacity: 0, y: 26 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, once: true },
        onStart: () => el.classList.add('is-in'),
      });

      if (lines.length) {
        // fromTo, not to: .reveal-line > span hides itself in CSS with
        // translateY(105%). GSAP reads that back as a pixel `y`, so animating
        // yPercent alone would leave the line sitting below its mask.
        tl.fromTo(
          lines,
          { yPercent: 105, y: 0 },
          { yPercent: 0, duration: 1.05, stagger: 0.07, ease: 'expo.out' }
        );
      }

      if (risers.length) {
        tl.to(
          risers,
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out' },
          lines.length ? '-=0.75' : 0
        );
      }
    },
    { scope }
  );
}
