import { useCallback, useLayoutEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { identity, intro } from '../data/site';
import RoleCycle from './RoleCycle';
import './Hero.css';

/* Reference size the name is measured at, and the ceiling it may reach. A
   viewport-relative font-size cannot know how wide "PETERMAN" actually sets,
   so the name is measured once per width and scaled to the measure instead. */
const MEASURE_PX = 200;
const MAX_PX = 240;

function useFitName(nameRef) {
  const fittedFor = useRef(0);

  const fit = useCallback(() => {
    const name = nameRef.current;
    if (!name) return;

    // Font-size does not change the block's own width, so keying on it is a
    // stable guard against the ResizeObserver re-entering on our own write.
    const width = name.clientWidth;
    if (!width || width === fittedFor.current) return;
    fittedFor.current = width;

    const lines = name.querySelectorAll('.hero__line');
    if (!lines.length) return;

    name.style.fontSize = `${MEASURE_PX}px`;

    let ratio = Infinity;
    lines.forEach((line) => {
      // clientWidth is the room left after the line's own indent; the mask is
      // width: max-content, so its offsetWidth is the unwrapped set width.
      const natural = line.firstElementChild.offsetWidth;
      if (natural > 0) ratio = Math.min(ratio, line.clientWidth / natural);
    });

    name.style.fontSize = Number.isFinite(ratio)
      ? `${Math.min(MEASURE_PX * ratio, MAX_PX)}px`
      : '';
  }, [nameRef]);

  useLayoutEffect(() => {
    const name = nameRef.current;
    if (!name) return;

    const remeasure = () => {
      fittedFor.current = 0;
      fit();
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(name);

    // Fallback metrics set narrower than Archivo — refit once it lands.
    document.fonts?.ready.then(remeasure);

    return () => observer.disconnect();
  }, [fit, nameRef]);
}

/**
 * Two oversized name lines that split apart as you scroll — the last name
 * drifts right, the first drifts left, and the intro copy parallaxes between
 * them. Letters arrive from a mask on load, staggered from the outside in.
 */
export default function Hero() {
  const root = useRef(null);
  const name = useRef(null);

  useFitName(name);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (reduced) {
        // y:0 as well as yPercent:0 — clears the px offset GSAP reads back
        // from the CSS translateY(105%) hidden state.
        gsap.set('.hero__char, .hero .reveal-line > span', { yPercent: 0, y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // fromTo, not to: the hidden state is declared in CSS as translateY(105%),
      // which GSAP would otherwise read out of the matrix as a pixel `y` and
      // leave in place while animating yPercent. Stating the from-state clears it.
      tl.fromTo(
        '.hero__char',
        { yPercent: 105, y: 0 },
        { yPercent: 0, duration: 1.3, stagger: { each: 0.028, from: 'start' } }
      )
        .fromTo(
          '.hero__meta .reveal-line > span',
          { yPercent: 105, y: 0 },
          { yPercent: 0, duration: 1, stagger: 0.08 },
          '-=0.9'
        )
        .to('.hero__scrollcue', { opacity: 1, duration: 0.6 }, '-=0.6');

      // Scrubbed split: the two name lines pull apart as the hero leaves.
      gsap.to('.hero__line--first', {
        xPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      gsap.to('.hero__line--last', {
        xPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      gsap.to('.hero__meta', {
        yPercent: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: root }
  );

  const line = (text, modifier) => (
    <div className={`hero__line hero__line--${modifier}`}>
      <span className="hero__mask">
        {text.split('').map((char, i) => (
          <span className="hero__char" key={`${modifier}-${i}`}>
            {char}
          </span>
        ))}
      </span>
    </div>
  );

  return (
    <section className="hero" id="index" ref={root}>
      <h1 className="hero__name" ref={name}>
        <span className="sr-only">
          {identity.first} {identity.last}
        </span>
        <span aria-hidden="true">
          {line(identity.first, 'first')}
          {line(identity.last, 'last')}
        </span>
      </h1>

      <div className="hero__meta field">
        <div className="hero__intro">
          <p className="reveal-line">
            <span>{intro}</span>
          </p>
        </div>

        <div className="hero__role">
          <span className="reveal-line mono">
            <span>Currently</span>
          </span>
          <RoleCycle />
        </div>

        <address className="hero__contact">
          <span className="reveal-line mono">
            <span>{identity.location}</span>
          </span>
          <span className="reveal-line mono">
            <span>{identity.phone}</span>
          </span>
          <span className="reveal-line mono">
            <span>
              <a href={`mailto:${identity.email}`} data-cursor>
                {identity.email}
              </a>
            </span>
          </span>
        </address>
      </div>

      <div className="hero__scrollcue mono">
        <span>Scroll</span>
        <span className="hero__scrollcue-rule" />
      </div>
    </section>
  );
}
