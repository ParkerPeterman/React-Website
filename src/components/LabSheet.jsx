import { labSummary, labFacts } from '../data/homelab';
import RackElevation from './RackElevation';
import Status, { RowHead } from './Status';
import './LabSheet.css';

const decisions = [
  'The big model sleeps. llm1 wakes on LAN for deep questions and the nightly coach report, and suspends after 30 idle minutes, so it costs about 3 W most of the day.',
  'Embeddings stay on the always-on host, so document search keeps working while the big box is asleep. Only the final answer may need it.',
  'Nothing listens on the internet. Remote access is Tailscale only, and the router has no port forwards.',
  'llm1 is on a surge-only outlet. It holds no data, so losing power is harmless and the battery is saved for the host that matters.',
];

export default function LabSheet({ sheet, of }) {
  return (
    <section className="sheet" id="lab" aria-labelledby="lab-title">
      <div className="sheet__body">
        <header className="sheet__head">
          <div>
            <h2 className="sheet__title" id="lab-title">Homelab</h2>
            <p className="lede lab__lede">{labSummary}</p>
          </div>
          <p className="sheet__no" aria-label={`Sheet ${sheet} of ${of}`}>
            <span>Sheet</span>
            <span>{sheet} / {of}</span>
          </p>
        </header>

        <div className="lab">
          <RackElevation n={5} />

          <div className="lab__side">
            <div className="table-scroll" tabIndex={0} aria-label="Lab at a glance">
              <table className="spec spec--stack lab__facts">
                <caption>Written up as a full tech spec. Today’s build runs on pve1 with two P4000s.</caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Specification</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labFacts.map((f, i) => (
                    <tr key={i}>
                      <RowHead label={f.label} i={i} />
                      <td>{f.value}</td>
                      <td><Status value={f.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="lab__h">Design decisions</h3>
            <ul className="lab__decisions">
              {decisions.map((d) => (
                <li key={d.slice(0, 24)}>{d}</li>
              ))}
            </ul>

            <a className="btn" href="#homelab">Read the full lab spec</a>
          </div>
        </div>
      </div>
    </section>
  );
}
