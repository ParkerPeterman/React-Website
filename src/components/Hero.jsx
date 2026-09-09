import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { identity, intro } from '../data/site';
import RoleCycle from './RoleCycle';
import './Hero.css';

/**
 * Two oversized name lines that split apart as you scroll — the last name
 * drifts right, the first drifts left, and the intro copy parallaxes between
 * them. Letters arrive from a mask on load, staggered from the outside in.
 */
export default function Hero() {
  const root = useRef(null);

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
      <h1 className="hero__name">
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
