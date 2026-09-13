import { useRef } from 'react';
import useReveal from '../lib/useReveal';
import { experience, education } from '../data/site';
import './Record.css';

function Ledger({ title, entries }) {
  return (
    <div className="record__group">
      <h3 className="record__grouptitle mono">{title}</h3>
      <ul>
        {entries.map((e) => (
          <li className="record__entry" key={e.org} data-rise>
            <div className="record__head">
              <h4 className="record__org">{e.org}</h4>
              <span className="record__role">{e.role}</span>
              <span className="record__period mono">{e.period}</span>
            </div>
            <ul className="record__points">
              {e.points.map(([label, body]) => (
                <li key={label}>
                  <span className="record__pointlabel">{label}</span>
                  <span className="record__pointbody">{body}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Record() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section className="record" id="record" ref={root}>
      <div className="marker shell">
        <span className="mono">04 — Record</span>
        <span className="marker__rule" />
      </div>

      <div className="record__intro shell">
        <h2 className="record__heading">
          <span className="reveal-line">
            <span>Where it</span>
          </span>
          <span className="reveal-line">
            <span>has been <span className="serif-em">put to work</span></span>
          </span>
        </h2>
      </div>

      <div className="record__body shell">
        <Ledger title="Experience" entries={experience} />
        <Ledger title="Education" entries={education} />
      </div>
    </section>
  );
}
