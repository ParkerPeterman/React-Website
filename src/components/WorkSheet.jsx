import {
  projectById,
  rentalImportance,
  censusEducation,
  censusOverall,
  outageServices,
} from '../data/projects';
import Figure from './Figure';
import { BarChart, DotPlot, Dumbbell } from './charts/Charts';
import './WorkSheet.css';

function ProjectCopy({ p }) {
  return (
    <div className="proj__copy">
      <p className="proj__kind letter">
        {p.kind}, {p.year}
      </p>
      <h3 className="proj__title" id={`proj-${p.id}`}>
        {p.title}
      </h3>
      <p className="proj__summary">{p.summary}</p>

      <dl className="proj__facts">
        {p.facts.map(([k, v]) => (
          <div key={k} className="proj__fact">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <ul className="proj__stack" aria-label="Built with">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="proj__links">
        <a className="btn btn--quiet" href={p.hash}>
          Read the case study
        </a>
        {p.repo ? (
          <a className="link" href={p.repo} target="_blank" rel="noopener noreferrer">
            View code on GitHub
          </a>
        ) : (
          <span className="proj__norepo letter">Code not published yet</span>
        )}
      </div>
    </div>
  );
}

const pct2 = (v) => v.toFixed(2);

export default function WorkSheet({ sheet, of }) {
  const health = projectById.health;
  const rental = projectById.rental;
  const census = projectById.census;
  const outage = projectById.outage;

  const topFeatures = rentalImportance.slice(0, 5);
  const someSlices = censusEducation.filter((s) =>
    ['10th', 'HS grad', 'Some college', 'Bachelors', 'Masters'].includes(s.label)
  );

  return (
    <section className="sheet" id="work" aria-labelledby="work-title">
      <div className="sheet__body">
        <header className="sheet__head">
          <div>
            <h2 className="sheet__title" id="work-title">Work</h2>
            <p className="lede work__lede">
              Every number on this sheet comes from the repo or its run logs. The two Udacity projects
              started from course starter kits; the health system and the outage tracker are my own
              from the first line.
            </p>
          </div>
          <p className="sheet__no" aria-label={`Sheet ${sheet} of ${of}`}>
            <span>Sheet</span>
            <span>{sheet} / {of}</span>
          </p>
        </header>

        {/* Featured: the health system */}
        <article className="proj proj--featured" aria-labelledby="proj-health">
          <ProjectCopy p={health} />
          <div className="proj__shots">
            <figure className="shot proj__phone">
              <img
                src="/work/app-today.webp"
                width="800"
                height="1720"
                alt="Tracker app Today screen: recovery against baseline, one action to keep effort at RPE 6 or below, yesterday’s nutrition, and four stat cards."
                loading="lazy"
              />
              <figcaption>The morning view on a phone.</figcaption>
            </figure>
            <figure className="shot proj__wide">
              <img
                src="/work/dashboard-insights.webp"
                width="1300"
                height="900"
                alt="Dashboard Insights page: 7 supported findings, 13 weak, 16 waiting for data, with confidence-interval plots for the effect of drinks on next-morning HRV and resting heart rate."
                loading="lazy"
              />
              <figcaption>
                Weekly findings with 95% intervals. Both screens show the synthetic demo athlete, never
                real health data.
              </figcaption>
            </figure>
          </div>
        </article>

        {/* The other three, each with the one figure that says the most */}
        <div className="work__rows">
          <article className="proj" aria-labelledby="proj-rental">
            <ProjectCopy p={rental} />
            <Figure
              n={2}
              title="What the final model leans on. The listing title and room type carry about 82% of the importance."
              source="Random-forest feature importance, W&B run e7dr7vtf. Values read off the logged chart."
              table={{ head: ['Feature', 'Importance'], rows: rentalImportance.map((r) => [r.label, `≈${pct2(r.value)}`]) }}
            >
              <BarChart
                rows={topFeatures}
                max={0.56}
                format={(v) => `≈${pct2(v)}`}
                highlight={['Listing title (TF-IDF)', 'Room type']}
                label="Feature importance, top five features"
              />
            </Figure>
          </article>

          <article className="proj" aria-labelledby="proj-census">
            <ProjectCopy p={census} />
            <Figure
              n={3}
              title="One F1 score hides a wide spread. Across these education levels it runs from 0.24 to 0.84."
              source="slice_output.txt, test set. The line marks the overall F1 of 0.686."
              table={{
                head: ['Education', 'Rows', 'F1', 'Recall'],
                rows: censusEducation.map((s) => [s.label, s.n.toLocaleString(), pct2(s.f1), pct2(s.recall)]),
              }}
            >
              <DotPlot
                rows={someSlices.map((s) => ({ label: s.label, n: s.n, value: s.f1, recall: s.recall }))}
                refValue={censusOverall.f1}
                refLabel="overall 0.69"
                detail={(r) => `recall ${pct2(r.recall)}`}
                label="F1 by education level, selected slices"
              />
            </Figure>
          </article>

          <article className="proj" aria-labelledby="proj-outage">
            <ProjectCopy p={outage} />
            <Figure
              n={4}
              title="Mean repair time is more than three times the median: a few multi-day tickets pull MTTR to 10.5 hours, while two-thirds close within 4."
              source="network_incidents.csv, 448 resolved tickets. The data is generated."
              table={{
                head: ['Service', 'Resolved', 'Median (h)', 'Mean (h)'],
                rows: outageServices.map((s) => [s.label, s.n, s.median.toFixed(1), s.mean.toFixed(1)]),
              }}
            >
              <Dumbbell
                rows={outageServices.map((s) => ({ label: s.label, a: s.median, b: s.mean }))}
                max={12}
                ticks={[0, 3, 6, 9, 12]}
                aLabel="Median"
                bLabel="Mean (MTTR)"
                format={(v) => `${Number.isInteger(v) ? v : v.toFixed(1)} h`}
                label="Repair time per service, median against mean"
              />
            </Figure>
          </article>
        </div>
      </div>
    </section>
  );
}
