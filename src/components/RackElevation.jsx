import { rack } from '../data/homelab';
import './RackElevation.css';

const U = 24;          // drawing units per rack unit
const TOTAL = 20;      // 20U frame
const X0 = 56;         // left rail
const X1 = 304;        // right rail
const TOP = 74;        // y of U20's top edge
const yOf = (u) => TOP + (TOTAL - u) * U; // top edge of rack unit u

/**
 * Front elevation of the rack, U counted from the floor. Running equipment
 * is drawn solid; planned equipment dashed in redline, the same convention
 * as every status mark on the site.
 */
export default function RackElevation({ n = 2 }) {
  const height = TOTAL * U;

  return (
    <figure className="fig rackfig">
      <div className="fig__plot">
        <svg
          viewBox="0 0 430 610"
          className="rackfig__svg"
          role="img"
          aria-labelledby="rackfig-title rackfig-desc"
        >
          <title id="rackfig-title">Rack elevation, 20U</title>
          <desc id="rackfig-desc">
            {rack
              .map((r) => `U${r.u[0]} to U${r.u[1]}: ${r.name}, ${r.detail}, ${r.status}`)
              .join('. ')}
            . Access point on top of the rack, planned.
          </desc>

          {/* Access point on the top of the frame */}
          <g className="rk is-planned">
            <rect x={X0 + 34} y={14} width={180} height={36} />
            <text x={X0 + 124} y={38} textAnchor="middle" className="rk__name">Access point</text>
            <line x1={X0 + 124} y1={50} x2={X0 + 124} y2={TOP - 4} className="rk__lead" />
          </g>

          {/* Frame: rails, top and floor */}
          <rect x={X0} y={TOP} width={X1 - X0} height={height} className="rk__frame" />
          <line x1={X0 + 6} y1={TOP} x2={X0 + 6} y2={TOP + height} className="rk__rail" />
          <line x1={X1 - 6} y1={TOP} x2={X1 - 6} y2={TOP + height} className="rk__rail" />

          {/* U ticks and numbers */}
          {Array.from({ length: TOTAL }, (_, i) => {
            const u = i + 1;
            const y = yOf(u);
            return (
              <g key={u}>
                <line x1={X0 - 6} y1={y + U} x2={X0} y2={y + U} className="rk__tick" />
                <text x={X0 - 10} y={y + U / 2 + 4} textAnchor="end" className="rk__u">
                  {u}
                </text>
              </g>
            );
          })}

          {/* Equipment */}
          {rack.map((r) => {
            const [lo, hi] = r.u;
            const y = yOf(hi) + 2;
            const h = (hi - lo + 1) * U - 4;
            const tall = h > 60;
            return (
              <g key={r.name} className={`rk is-${r.status}`}>
                <rect x={X0 + 12} y={y} width={X1 - X0 - 24} height={h} />
                <text x={X0 + 24} y={tall ? y + 28 : y + h / 2 + 6} className="rk__name">
                  {r.name}
                </text>
                {tall ? (
                  <text x={X0 + 24} y={y + 48} className="rk__detail">{r.detail}</text>
                ) : (
                  <text x={X1 - 22} y={y + h / 2 + 5} textAnchor="end" className="rk__detail">{r.detail}</text>
                )}
                {r.status === 'planned' && tall && (
                  <text x={X1 - 22} y={y + 28} textAnchor="end" className="rk__flag">planned</text>
                )}
              </g>
            );
          })}

          {/* Overall height dimension */}
          <g className="rk__dim">
            <line x1={X1 + 30} y1={TOP} x2={X1 + 30} y2={TOP + height} markerStart="url(#rk-arrow)" markerEnd="url(#rk-arrow)" />
            <line x1={X1 + 4} y1={TOP} x2={X1 + 40} y2={TOP} />
            <line x1={X1 + 4} y1={TOP + height} x2={X1 + 40} y2={TOP + height} />
            <text x={X1 + 44} y={TOP + height / 2 - 6} className="rk__dimtext">20U</text>
            <text x={X1 + 44} y={TOP + height / 2 + 12} className="rk__dimtext rk__dimtext--sub">35 in</text>
          </g>

          {/* Floor and casters */}
          <line x1={X0 - 20} y1={TOP + height + 22} x2={X1 + 20} y2={TOP + height + 22} className="rk__floor" />
          <circle cx={X0 + 14} cy={TOP + height + 12} r={9} className="rk__caster" />
          <circle cx={X1 - 14} cy={TOP + height + 12} r={9} className="rk__caster" />

          <defs>
            <marker id="rk-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0 2 L5 5 L0 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption>
        <b>Figure {n}.</b> Rack elevation, front view. Heavy items sit low: the UPS is about 25 lb and
        each 5820 about 40 lb.
        <span className="legend rackfig__legend">
          <span><i />Running</span>
          <span><i className="dash" />Planned</span>
        </span>
      </figcaption>
    </figure>
  );
}
