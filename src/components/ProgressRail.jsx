import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';
import './ProgressRail.css';

/**
 * A hairline on the left edge that fills with read progress, plus a live
 * percentage. Replaces the old top progress bar.
 */
export default function ProgressRail() {
  const fill = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(fill.current, { scaleY: self.progress });
        if (label.current) {
          label.current.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="prail" aria-hidden="true">
      <div className="prail__track">
        <div className="prail__fill" ref={fill} />
      </div>
      <span className="prail__label mono" ref={label}>
        00
      </span>
    </div>
  );
}
