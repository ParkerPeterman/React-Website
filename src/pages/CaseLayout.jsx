import { useEffect, useRef } from 'react';
import Masthead from '../components/Masthead';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import './CaseLayout.css';

const ORDER = [...projects.map((p) => ({ id: p.id, title: p.title, hash: p.hash })), { id: 'lab', title: 'Homelab tech spec', hash: '#homelab' }];

/**
 * A case study is one long sheet set out like a spec document: a header
 * block with the facts, then numbered sections. Focus moves to the title on
 * arrival so keyboard and screen-reader users land at the top of the page.
 */
export default function CaseLayout({ id, kind, title, summary, facts, children }) {
  const heading = useRef(null);

  useEffect(() => {
    document.title = `${title} | Parker Peterman`;
    heading.current?.focus({ preventScroll: true });
  }, [title]);

  const i = ORDER.findIndex((o) => o.id === id);
  const next = ORDER[(i + 1) % ORDER.length];

  return (
    <>
      <a className="skip-link" href="#case-main">Skip to content</a>
      <Masthead current={id === 'lab' ? 'lab' : 'work'} />

      <main id="case-main">
        <article className="sheet case">
          <div className="sheet__body">
            <a className="case__back link" href={id === 'lab' ? '#lab' : '#work'}>
              {id === 'lab' ? 'See the homelab sheet' : 'See all work'}
            </a>

            <header className="case__head">
              <div>
                <p className="case__kind letter">{kind}</p>
                <h1 className="case__title" ref={heading} tabIndex={-1}>
                  {title}
                </h1>
                <p className="lede case__summary">{summary}</p>
              </div>

              <dl className="kv case__facts">
                {facts.map(([k, v]) => (
                  <FactRow key={k} k={k} v={v} />
                ))}
              </dl>
            </header>

            <div className="case__body">{children}</div>

            <nav className="case__next" aria-label="Next">
              <span className="caps">Next</span>
              <a className="link case__nextlink" href={next.hash}>{next.title}</a>
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

function FactRow({ k, v }) {
  return (
    <>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </>
  );
}

/** A numbered section of the document. */
export function Section({ n, title, children, id, wide = false }) {
  return (
    <section className={`case__sec ${wide ? 'case__sec--wide' : ''}`} id={id} aria-labelledby={`sec-${n}`}>
      <h2 className="case__sectitle" id={`sec-${n}`}>
        <span className="case__secno">{n}</span>
        {title}
      </h2>
      <div className="case__seccontent">{children}</div>
    </section>
  );
}

/** Leader-ticked list used for principles, decisions and next steps. */
export function Ticks({ items }) {
  return (
    <ul className="ticks">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
