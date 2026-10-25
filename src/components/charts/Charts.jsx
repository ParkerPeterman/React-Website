import './charts.css';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

/** Evenly spaced axis ticks from 0 to max. */
function Axis({ ticks, max, format }) {
  return (
    <div className="chart__axis" aria-hidden="true">
      {ticks.map((t, i) => (
        <span
          key={t}
          className={i % 2 === 1 && i !== ticks.length - 1 ? 'is-minor' : undefined}
          style={{ left: `${(t / max) * 100}%` }}
        >
          {format(t)}
        </span>
      ))}
    </div>
  );
}

function Grid({ ticks, max }) {
  return (
    <div className="chart__grid" aria-hidden="true">
      {ticks.map((t) => (
        <i key={t} style={{ left: `${(t / max) * 100}%` }} />
      ))}
    </div>
  );
}

/**
 * Horizontal bars, one series. Values are labelled at the bar tips; the
 * `highlight` rows take the markup colour (the rows the caption is about).
 */
export function BarChart({ rows, max, format = (v) => v, highlight = [], label }) {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <div className="chart chart--bars" role="group" aria-label={label}>
      {rows.map((r) => {
        const w = clamp01(r.value / top) * 100;
        return (
          <div className={`chart__row ${highlight.includes(r.label) ? 'is-hi' : ''}`} key={r.label}>
            <span className="chart__label">{r.label}</span>
            <span className="chart__track">
              <span className="chart__bar" style={{ width: `${w}%` }} />
              <span className="chart__value" style={{ left: `${w}%` }}>
                {format(r.value)}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Dot plot on a 0–1 scale with a reference line (the overall score). Each
 * row is focusable and shows its exact value on hover or focus; the extremes
 * are labelled outright.
 */
export function DotPlot({ rows, refValue, refLabel, format = (v) => v.toFixed(2), detail, label }) {
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const values = rows.map((r) => r.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);

  return (
    <div className="chart chart--dots" role="group" aria-label={label}>
      <div className="chart__plotarea">
        <Grid ticks={ticks} max={1} />
        {refValue != null && (
          <div className={`chart__ref ${refValue > 0.55 ? 'is-flip' : ''}`} style={{ left: `${refValue * 100}%` }}>
            <span>{refLabel}</span>
          </div>
        )}
      </div>

      {rows.map((r) => {
        const extreme = r.value === lo || r.value === hi;
        return (
          <div className={`chart__row ${extreme ? 'is-extreme' : ''}`} key={r.label} tabIndex={0}>
            <span className="chart__label">
              {r.label}
              {r.n != null && <span className="chart__n">{r.n.toLocaleString()}</span>}
            </span>
            <span className="chart__track">
              <span className="chart__dot" style={{ left: `${r.value * 100}%` }} />
              <span className={`chart__tip ${r.value > 0.55 ? 'is-flip' : ''}`} style={{ left: `${r.value * 100}%` }}>
                {format(r.value)}
                {detail && <span className="chart__tipmore">{detail(r)}</span>}
              </span>
            </span>
          </div>
        );
      })}

      <div className="chart__row chart__row--axis">
        <span className="chart__label" />
        <span className="chart__track">
          <Axis ticks={ticks} max={1} format={(t) => (t === 0 ? '0' : t.toFixed(2).replace(/^0/, ''))} />
        </span>
      </div>
    </div>
  );
}

/**
 * Dumbbell: two values per row joined by a line. Used for median against
 * mean, where the gap between them is the finding. Shape carries identity
 * as well as colour: filled dot for `a`, ring for `b`.
 */
export function Dumbbell({ rows, max, ticks, aLabel, bLabel, format, label }) {
  return (
    <div className="chart chart--dumbbell" role="group" aria-label={label}>
      <div className="legend chart__legend">
        <span><b className="chart__key chart__key--a" />{aLabel}</span>
        <span><b className="chart__key chart__key--b" />{bLabel}</span>
      </div>

      <div className="chart__plotarea">
        <Grid ticks={ticks} max={max} />
      </div>

      {rows.map((r, i) => {
        const a = (r.a / max) * 100;
        const b = (r.b / max) * 100;
        return (
          <div className="chart__row" key={r.label} tabIndex={0}>
            <span className="chart__label">{r.label}</span>
            <span className="chart__track">
              <span className="chart__span" style={{ left: `${Math.min(a, b)}%`, width: `${Math.abs(b - a)}%` }} />
              <span className="chart__dot chart__dot--a" style={{ left: `${a}%` }} />
              <span className="chart__dot chart__dot--b" style={{ left: `${b}%` }} />
              {/* direct labels on the first row; the rest on hover/focus */}
              <span className={`chart__end chart__end--a ${i === 0 ? 'is-shown' : ''}`} style={{ left: `${a}%` }}>
                {format(r.a)}
              </span>
              <span className={`chart__end chart__end--b ${i === 0 ? 'is-shown' : ''}`} style={{ left: `${b}%` }}>
                {format(r.b)}
              </span>
            </span>
          </div>
        );
      })}

      <div className="chart__row chart__row--axis">
        <span className="chart__label" />
        <span className="chart__track">
          <Axis ticks={ticks} max={max} format={format} />
        </span>
      </div>
    </div>
  );
}
