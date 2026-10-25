import { useId, useState } from 'react';
import { VIEW, nodes, edges, stackedOrder } from '../data/healthSystem';
import './SystemDiagram.css';

const byId = Object.fromEntries(nodes.map((d) => [d.id, d]));
const pct = (v, of) => `${(v / of) * 100}%`;

/**
 * Figure 1. The health system as a drawing you can take apart: select a
 * part and the detail note below explains what it does, where it lives in
 * the repo, and the decision behind it. Wide screens get the full drawing;
 * narrow ones get the same parts stacked in reading order.
 *
 * The linework draws itself once on load (CSS, skipped under reduced
 * motion). Everything after that answers the visitor.
 */
export default function SystemDiagram({ initial = 'llm', caption = true }) {
  const [active, setActive] = useState(initial);
  const noteId = useId();
  const part = byId[active];

  const isLinked = (e) => e.from === active || e.to === active;

  const select = (id) => setActive(id);

  const nodeButton = (d, extra = {}) => (
    <button
      key={d.id}
      type="button"
      className={`sysfig__node ${active === d.id ? 'is-active' : ''}`}
      aria-pressed={active === d.id}
      aria-controls={noteId}
      onClick={() => select(d.id)}
      onFocus={() => select(d.id)}
      {...extra}
    >
      <span className="sysfig__name">{d.name}</span>
      <span className="sysfig__sub">{d.sub}</span>
    </button>
  );

  return (
    <figure className="sysfig fig">
      {/* Wide: the drawing */}
      <div className="sysfig__drawing" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
        <svg
          className="sysfig__lines"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <marker id="sysfig-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="sysfig__head" />
            </marker>
            <marker id="sysfig-arrow-hi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="sysfig__head sysfig__head--hi" />
            </marker>
          </defs>

          <g className="sysfig__edges">
            {edges.map((e) => (
              <path
                key={`${e.from}-${e.to}`}
                d={e.d}
                className={`sysfig__edge ${isLinked(e) ? 'is-linked' : ''}`}
                markerEnd={`url(#${isLinked(e) ? 'sysfig-arrow-hi' : 'sysfig-arrow'})`}
              />
            ))}
          </g>

          <g className="sysfig__labels">
            {edges
              .filter((e) => e.label)
              .map((e) => (
                <text
                  key={`${e.from}-${e.to}-l`}
                  x={e.lx}
                  y={e.ly}
                  textAnchor={e.anchor ?? 'middle'}
                  className={`sysfig__label ${isLinked(e) ? 'is-linked' : ''}`}
                >
                  {e.label}
                </text>
              ))}
          </g>
        </svg>
        <span className="sysfig__wipe" aria-hidden="true" />

        {nodes.map((d) =>
          nodeButton(d, {
            style: {
              left: pct(d.x, VIEW.w),
              top: pct(d.y, VIEW.h),
              width: pct(VIEW.node.w, VIEW.w),
              height: pct(VIEW.node.h, VIEW.h),
              '--i': Math.round(d.x / 172),
            },
          })
        )}
      </div>

      {/* Narrow: the same parts, stacked */}
      <ol className="sysfig__stack">
        {stackedOrder.map((id) => (
          <li key={id} className={id === 'stats' ? 'is-loop' : ''}>
            {nodeButton(byId[id])}
          </li>
        ))}
      </ol>

      <div className="sysfig__note" id={noteId} aria-live="polite">
        <h3 className="sysfig__notetitle">
          <span className="sysfig__balloon" aria-hidden="true" />
          {part.name}
        </h3>
        <p className="sysfig__does">{part.does}</p>
        <dl className="sysfig__meta">
          <div>
            <dt className="caps">Why it’s built this way</dt>
            <dd>{part.why}</dd>
          </div>
          <div>
            <dt className="caps">In the repo</dt>
            <dd className="sysfig__code">{part.code}</dd>
          </div>
        </dl>
      </div>

      {caption && (
        <figcaption>
          <b>Figure 1.</b> Personal Health &amp; Training System, as built. Select any part to read
          what it does and why.
          <span className="fig__source">
            Drawn from the repo’s README and design notes.
          </span>
        </figcaption>
      )}
    </figure>
  );
}
