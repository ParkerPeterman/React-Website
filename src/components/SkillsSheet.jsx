import { parts } from '../data/site';
import './SkillsSheet.css';

// Where each "used in" reference points.
const REFS = {
  health: { label: 'Health system', href: '#health' },
  rental: { label: 'Rental pipeline', href: '#rental' },
  census: { label: 'Census API', href: '#census' },
  outage: { label: 'Outage tracker', href: '#outage' },
  lab: { label: 'Homelab', href: '#homelab' },
  work: { label: 'Day job', href: '#experience' },
};

/**
 * Skills as a parts list: what the part is, its specification, and where it
 * is used, so every claim links to something a reader can open.
 */
export default function SkillsSheet({ sheet, of }) {
  return (
    <section className="sheet" id="skills" aria-labelledby="skills-title">
      <div className="sheet__body">
        <header className="sheet__head">
          <div>
            <h2 className="sheet__title" id="skills-title">Skills</h2>
            <p className="lede skills__lede">
              Laid out like a parts list, with where each one is used, so you can open the project
              and check.
            </p>
          </div>
          <p className="sheet__no" aria-label={`Sheet ${sheet} of ${of}`}>
            <span>Sheet</span>
            <span>{sheet} / {of}</span>
          </p>
        </header>

        <div className="table-scroll" tabIndex={0} aria-label="Skills parts list">
          <table className="spec spec--stack parts">
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col">Specification</th>
                <th scope="col">Used in</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.part}>
                  <th scope="row">{p.part}</th>
                  <td className="parts__spec">{p.spec}</td>
                  <td>
                    <ul className="parts__used">
                      {p.used.map((u) => (
                        <li key={u}>
                          <a href={REFS[u].href}>{REFS[u].label}</a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
