import { identity, statement, intro } from '../data/site';
import SystemDiagram from './SystemDiagram';
import './TitleSheet.css';

/**
 * Sheet 1: the title sheet. A statement, the system drawing, and a title
 * block in the corner holding everything a recruiter scans for first.
 */
export default function TitleSheet({ sheets }) {
  return (
    <section className="sheet tsheet" id="index" aria-labelledby="tsheet-name">
      <div className="sheet__body tsheet__body">
        <div className="tsheet__lead">
          <p className="tsheet__statement">{statement}</p>
          <div className="tsheet__aside">
            <p className="tsheet__status">
              <span className="status">{identity.status}</span>
            </p>
            <p className="lede">{intro}</p>
            <div className="tsheet__ctas">
              <a className="btn" href={identity.resume} download>
                Download résumé (PDF)
              </a>
              <a className="link" href={`mailto:${identity.email}`}>
                Email me
              </a>
            </div>
          </div>
        </div>

        <SystemDiagram />
      </div>

      <div className="tblock">
        <div className="tblock__cell tblock__cell--name">
          <span className="caps">Drawn by</span>
          <h1 id="tsheet-name" className="tblock__name">
            {identity.first} {identity.last}
          </h1>
          <span className="tblock__role">{identity.role}</span>
        </div>

        <div className="tblock__cell tblock__cell--status">
          <span className="caps">Status</span>
          <span className="tblock__value">{identity.status}</span>
        </div>

        <div className="tblock__cell tblock__cell--degree">
          <span className="caps">Degree</span>
          <span className="tblock__value">{identity.degree}</span>
          <span className="tblock__sub">
            {identity.gpa} GPA, graduating {identity.degreeDate}
          </span>
        </div>

        <div className="tblock__cell tblock__cell--loc">
          <span className="caps">Location</span>
          <span className="tblock__value">{identity.location}</span>
        </div>

        <div className="tblock__cell tblock__cell--contact">
          <span className="caps">Contact</span>
          <a className="tblock__value tblock__link" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
          <span className="tblock__links">
            <a className="link" href={identity.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="link" href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
        </div>

        <div className="tblock__cell tblock__cell--sign">
          <span className="caps">Signed</span>
          <span className="tblock__signature" role="img" aria-label="Parker Peterman’s signature" />
        </div>

        <div className="tblock__cell tblock__cell--sheet">
          <span className="caps">Sheet</span>
          <span className="tblock__value">1 of {sheets}</span>
        </div>
      </div>
    </section>
  );
}
