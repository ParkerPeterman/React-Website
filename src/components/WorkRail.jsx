import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import { projects } from '../data/site';
import ProjectPreview from './ProjectPreview';
import './WorkRail.css';

/**
 * The work section pins and translates sideways: vertical scroll drives a
 * horizontal rail of project panels. Below 860px it degrades to an ordinary
 * vertical stack — pinned horizontal scrolling and touch don't mix well.
 */
export default function WorkRail() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 861px)', () => {
        if (prefersReducedMotion()) return;

        const el = track.current;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Each panel's inner content counter-drifts for depth.
        const panels = gsap.utils.toArray('.rail__panel');
        panels.forEach((panel) => {
          gsap.to(panel.querySelector('.rail__index'), {
            xPercent: 26,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="rail" id="work" ref={root}>
      <div className="rail__track" ref={track}>
        <div className="rail__intro rail__panel">
          <p className="mono">Selected Work — 2024/26</p>
          <h2 className="rail__heading">
            Pipelines,
            <br />
            <span className="serif-em">models</span> &amp;
            <br />
            the panels
            <br />
            they feed.
          </h2>
          <p className="rail__note">
            Three builds, end to end. Each opens a live dashboard.
          </p>
        </div>

        {projects.map((p) => (
          <article className={`rail__panel rail__card a-${p.accent}`} key={p.index}>
            <span className="rail__index" aria-hidden="true">
              {p.index}
            </span>

            <div className="rail__body">
              <div className="rail__preview">
                <ProjectPreview preview={p.preview} />
              </div>

              <div className="rail__copy">
                <h3 className="rail__title">{p.title}</h3>
                <p className="rail__blurb">{p.blurb}</p>

                <div className="rail__metric">
                  <span className="rail__metric-value">{p.metric.value}</span>
                  <span className="mono">{p.metric.label}</span>
                </div>

                <ul className="rail__tags">
                  {p.tags.map((t) => (
                    <li key={t} className="mono">
                      {t}
                    </li>
                  ))}
                </ul>

                <a className="rail__cta" href={p.hash} data-cursor="open">
                  <span>View dashboard</span>
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path
                      d="M4 16L16 4M16 4H7M16 4v9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}

        <div className="rail__panel rail__end">
          <p className="mono">End of selection</p>
          <a
            className="rail__endlink"
            href="https://github.com/ParkerPeterman"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="github"
          >
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
