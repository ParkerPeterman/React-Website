import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Split a string into per-character spans for staggered animation.
 * Words stay unbreakable so the line never wraps mid-word.
 */
export function splitChars(text) {
  return text.split(' ').map((word, w) => ({
    word,
    key: `w${w}`,
    chars: word.split('').map((char, c) => ({ char, key: `c${c}` })),
  }));
}

export { gsap, ScrollTrigger };
