import CaseLayout, { Section, Ticks } from './CaseLayout';
import Figure from '../components/Figure';
import { Dumbbell } from '../components/charts/Charts';
import { projectById, outageServices, outageEndpoints } from '../data/projects';

const p = projectById.outage;

// Resolved tickets by issue type. Source: network_incidents.csv.
const issues = [
  ['Hardware failure', 99, 3.5, 14.0],
  ['Latency spike', 88, 2.9, 10.5],
  ['Packet loss', 90, 2.9, 9.8],
  ['Configuration error', 87, 3.2, 8.9],
  ['Power outage', 84, 2.7, 8.9],
];

export default function OutageCase() {
  return (
    <CaseLayout
      id="outage"
      kind={`${p.kind}, ${p.year}`}
      title={p.title}
      summary="A small reporting service for a network operations centre: it reads incident tickets, computes mean time to repair, open outages, load per service and when tickets arrive, and serves them to a React dashboard. A practice build on generated data, written to work the same way on a real ticket export."
      facts={[
        ['Role', 'Sole developer'],
        ['Stack', 'Python, FastAPI, pandas, React, Recharts, Vite'],
        ['Data', '500 generated tickets over 30 days, 5 services, 5 issue types'],
        ['Code', 'Not published yet'],
      ]}
    >
      <Section n={1} title="How it works">
        <p>
          A generator writes the ticket file: each ticket gets a service, an issue type and a status
          (90% resolved), and resolved tickets get a repair time drawn from three bands, 70% under
          4 hours, 20% from 4 to 24, and 10% from 1 to 3 days. The API loads the file with pandas at
          start-up and serves five read-only endpoints, with CORS open for the dashboard.
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="API endpoints">
          <table className="spec">
            <thead><tr><th scope="col">Endpoint</th><th scope="col">Returns</th></tr></thead>
            <tbody>
              {outageEndpoints.map(([e, r]) => (
                <tr key={e}><th scope="row">{e}</th><td>{r}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={2} title="What the numbers say">
        <p>
          The dashboard’s headline is MTTR: 10.5 hours. But the median repair takes 3.1 hours, and 68%
          of tickets close within 4. The mean is pulled up by the tail of multi-day tickets, so on its own
          it describes almost no actual outage. It holds for every service and every issue type.
        </p>
        <Figure
          n={1}
          title="Median against mean repair time for each service. The gap is the long tail."
          source="network_incidents.csv, 448 resolved tickets. Generated data, so the shape comes from the generator’s repair-time bands."
          table={{
            head: ['Service', 'Resolved', 'Median (h)', 'Mean (h)'],
            rows: outageServices.map((s) => [s.label, s.n, s.median.toFixed(1), s.mean.toFixed(1)]),
          }}
        >
          <Dumbbell
            rows={outageServices.map((s) => ({ label: s.label, a: s.median, b: s.mean }))}
            max={15}
            ticks={[0, 5, 10, 15]}
            aLabel="Median"
            bLabel="Mean (MTTR)"
            format={(v) => `${Number.isInteger(v) ? v : v.toFixed(1)} h`}
            label="Repair time per service, median against mean"
          />
        </Figure>
        <div className="table-scroll" tabIndex={0} aria-label="Repair time by issue type">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Issue type</th>
                <th scope="col" className="num">Resolved</th>
                <th scope="col" className="num">Median (h)</th>
                <th scope="col" className="num">Mean (h)</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(([t, n, med, mean]) => (
                <tr key={t}>
                  <th scope="row">{t}</th>
                  <td className="num">{n}</td>
                  <td className="num">{med.toFixed(1)}</td>
                  <td className="num">{mean.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <caption>Hardware failures have the longest tail: a 14-hour mean on a 3.5-hour median.</caption>
          </table>
        </div>
      </Section>

      <Section n={3} title="What I’d change">
        <Ticks
          items={[
            <><strong>Report the median and the 90th percentile next to MTTR.</strong> Together they say what a typical outage costs and how bad the tail gets.</>,
            <><strong>Make the health flag relative.</strong> “Degraded” is set by a fixed count of 50 open tickets, which means something different for a network twice the size. A rate against a rolling baseline would travel.</>,
            <><strong>Read from a store, not a file loaded at start-up.</strong> Today new tickets need a restart. Postgres with a cache in front, or a stream, would make the board live.</>,
          ]}
        />
      </Section>
    </CaseLayout>
  );
}
