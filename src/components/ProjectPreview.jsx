import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import './ProjectPreview.css';

/**
 * A miniature, always-running dashboard standing in for each project, so the
 * card previews the panel it links to instead of describing it in prose.
 *
 * Three kinds:
 *   bars   — feature importances filling, then breathing
 *   stream — a latency trace scrolling right to left, like a live monitor
 *   pulse  — an uptime area with incident nodes blinking over it
 *
 * The stream/pulse series are duplicated end to end and translated by exactly
 * one period, so the loop is seamless with no visible jump.
 *
 * Entrances are gated by an IntersectionObserver rather than a ScrollTrigger:
 * the rail pins and moves these cards *horizontally*, so a vertical trigger
 * would resolve once at pin time and fire every card at the same moment.
 */

const VB_W = 200;
const VB_H = 100;

/** Map a series to points across two periods so it can loop seamlessly. */
function buildPoints(series, { floor = 0, ceil = 100, pad = 12 } = {}) {
  const doubled = [...series, ...series, series[0]];
  const step = VB_W / series.length;
  const range = ceil - floor || 1;

  return doubled.map((v, i) => {
    const x = i * step;
    const norm = (v - floor) / range;
    const y = VB_H - pad - norm * (VB_H - pad * 2);
    return { x, y };
  });
}

const toPolyline = (pts) => pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

const toArea = (pts) =>
  `M0,${VB_H} L${pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L')} L${pts[
    pts.length - 1
  ].x.toFixed(2)},${VB_H} Z`;

export default function ProjectPreview({ preview }) {
  const root = useRef(null);
  const { kind, chrome, kpis } = preview;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      // Entrances, held paused until the card is actually on screen.
      const intro = [];

      if (kind === 'bars') {
        const bars = gsap.utils.toArray(el.querySelectorAll('.ppv__barfill'));

        intro.push(
          gsap.fromTo(
            bars,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, paused: true }
          )
        );

        // Slow breathing so the panel never sits completely still.
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleX: 0.93 + (i % 3) * 0.02,
            duration: 2.2 + i * 0.35,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.2 + i * 0.15,
          });
        });
      }

      if (kind === 'stream' || kind === 'pulse') {
        const track = el.querySelector('.ppv__track');
        // Exactly one period, so the seam never lands mid-view.
        gsap.to(track, {
          x: -VB_W,
          duration: kind === 'stream' ? 9 : 13,
          ease: 'none',
          repeat: -1,
        });

        const trace = el.querySelector('.ppv__trace');
        const len = trace?.getTotalLength?.() ?? 0;
        if (len) {
          intro.push(
            gsap.fromTo(
              trace,
              { strokeDasharray: len, strokeDashoffset: len },
              { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', paused: true }
            )
          );
        }
      }

      if (kind === 'pulse') {
        gsap.utils.toArray(el.querySelectorAll('.ppv__node')).forEach((node, i) => {
          gsap.to(node, {
            opacity: 0.25,
            scale: 0.7,
            transformOrigin: 'center',
            duration: 0.9 + i * 0.25,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      }

      // Chrome status light, shared by all three.
      gsap.to(el.querySelector('.ppv__live'), {
        opacity: 0.25,
        duration: 1.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      const io = new IntersectionObserver(
        ([entry], obs) => {
          if (!entry.isIntersecting) return;
          intro.forEach((tween) => tween.play());
          obs.disconnect();
        },
        { threshold: 0.35 }
      );
      io.observe(el);

      return () => io.disconnect();
    },
    { scope: root, dependencies: [kind] }
  );

  const pts = preview.series ? buildPoints(preview.series) : null;

  return (
    <div className="ppv" ref={root} aria-hidden="true">
      <div className="ppv__chrome">
        <span className="ppv__live" />
        <span className="ppv__chrometext mono">{chrome}</span>
      </div>

      <div className="ppv__kpis">
        {kpis.map((k) => (
          <div className="ppv__kpi" key={k.label}>
            <span className="ppv__kpival">{k.value}</span>
            <span className="ppv__kpilabel mono">{k.label}</span>
          </div>
        ))}
      </div>

      <div className="ppv__body">
        {kind === 'bars' && (
          <ul className="ppv__bars">
            {preview.bars.map((b) => (
              <li className="ppv__bar" key={b.label}>
                <span className="ppv__barlabel mono">{b.label}</span>
                <span className="ppv__bartrack">
                  <span className="ppv__barfill" style={{ width: `${b.v}%` }} />
                </span>
              </li>
            ))}
          </ul>
        )}

        {(kind === 'stream' || kind === 'pulse') && (
          <svg className="ppv__chart" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
            {/* Static gridlines sit outside the scrolling group. */}
            <g className="ppv__grid">
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2={VB_W} y2={y} />
              ))}
            </g>

            <g className="ppv__track">
              {kind === 'pulse' && <path className="ppv__area" d={toArea(pts)} />}
              <polyline className="ppv__trace" points={toPolyline(pts)} />
            </g>

            {kind === 'pulse' &&
              preview.nodes.map((n, i) => (
                <circle
                  key={i}
                  className={`ppv__node ppv__node--${n.tone}`}
                  cx={(n.x / 100) * VB_W}
                  cy={(n.y / 100) * VB_H}
                  r="4"
                />
              ))}
          </svg>
        )}
      </div>
    </div>
  );
}
