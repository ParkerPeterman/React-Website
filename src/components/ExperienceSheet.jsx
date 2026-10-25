import { experience, education, certifications } from '../data/site';
import './ExperienceSheet.css';

export default function ExperienceSheet({ sheet, of }) {
  return (
    <section className="sheet" id="experience" aria-labelledby="exp-title">
      <div className="sheet__body">
        <header className="sheet__head">
          <h2 className="sheet__title" id="exp-title">Experience</h2>
          <p className="sheet__no" aria-label={`Sheet ${sheet} of ${of}`}>
            <span>Sheet</span>
            <span>{sheet} / {of}</span>
          </p>
        </header>

        <div className="exp">
          <ol className="exp__jobs">
            {experience.map((e) => (
              <li className="exp__job" key={e.org}>
                <div className="exp__head">
                  <h3 className="exp__role">{e.role}</h3>
                  <p className="exp__org letter">{e.org}</p>
                  <p className="exp__period letter">{e.period}</p>
                </div>
                <ul className="exp__points">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="exp__side">
            <div className="exp__block">
              <h3 className="exp__h">Education</h3>
              <p className="exp__school letter"><b>{education.degree}</b></p>
              <p className="letter">{education.org}</p>
              <p className="letter exp__dim">{education.period}</p>
              <p className="letter exp__notes">{education.notes.join(', ')}</p>
            </div>

            <div className="exp__block">
              <h3 className="exp__h">Certifications</h3>
              <table className="spec exp__certs">
                <tbody>
                  {certifications.map((c) => (
                    <tr key={c.title}>
                      <th scope="row">
                        {c.title}
                        <span className="exp__issuer">{c.issuer}</span>
                      </th>
                      <td className="num">{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
