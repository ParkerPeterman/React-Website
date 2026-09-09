import { scrollToSection } from '../lib/useSmoothScroll';
import { identity } from '../data/site';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <span className="mono">
          © {year} {identity.first} {identity.last}
        </span>
        <span className="mono footer__built">Built with React, GSAP &amp; Lenis</span>
        <button
          className="mono footer__top"
          onClick={() => scrollToSection('index')}
          data-cursor
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
