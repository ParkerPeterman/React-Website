import DashShell, { StatGrid, Stat, Panel, Bar } from './DashShell';

const CRITERIA = [
  { name: 'Precipitation', weight: 88, tone: 'accent' },
  { name: 'Temperature', weight: 71, tone: 'accent' },
  { name: 'Wind Speed', weight: 54, tone: 'accent' },
  { name: 'Cloud Cover', weight: 40, tone: 'warn' },
  { name: 'Daylight Hours', weight: 26, tone: 'warn' },
  { name: 'Elevation', weight: 18, tone: 'warn' },
];

const SITES = [
  { name: 'Kanopolis State Park', score: '8.9', rain: '0%', wind: '6 mph', verdict: 'ideal' },
  { name: 'Cheney Reservoir', score: '7.4', rain: '10%', wind: '14 mph', verdict: 'good' },
  { name: 'Elk City State Park', score: '6.1', rain: '35%', wind: '11 mph', verdict: 'fair' },
  { name: 'Toronto Point', score: '4.2', rain: '70%', wind: '19 mph', verdict: 'poor' },
];

const VERDICT_TONE = { ideal: 'good', good: 'good', fair: 'warn', poor: 'bad' };

export default function CampsiteDashboard() {
  return (
    <DashShell
      accent="violet"
      eyebrow="Project 04 — React / OpenMeteo"
      title="Campsite Rating"
      status="Forecast live"
      subtitle="A multi-criteria decision model scoring campsites against live OpenMeteo forecasts and stated camper preferences. Criteria weights were derived from a survey of online camping communities, then normalised so no single factor can dominate the result."
    >
      <StatGrid>
        <Stat label="Sites Scored" value="128" note="Across Kansas" tone="accent" />
        <Stat label="Forecast Window" value="7 days" note="OpenMeteo hourly" tone="neutral" />
        <Stat label="Weighted Criteria" value="6" note="Survey-derived" tone="neutral" />
        <Stat label="Top Score" value="8.9" note="Kanopolis State Park" tone="good" />
      </StatGrid>

      <div className="dash__grid">
        <Panel title="Criteria Weights" note="Normalised" wide>
          {CRITERIA.map((c) => (
            <Bar
              key={c.name}
              name={c.name}
              value={c.weight}
              tone={c.tone}
              display={(c.weight / 100).toFixed(2)}
            />
          ))}
        </Panel>

        <Panel title="Model Inputs">
          <div className="kv">
            <div className="kv__row">
              <span className="kv__key">Weather source</span>
              <span className="kv__val">OpenMeteo</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Location lookup</span>
              <span className="kv__val">Geocoding</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Preference input</span>
              <span className="kv__val">User form</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Model</span>
              <span className="kv__val kv__val--mono">MCDM</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Front end</span>
              <span className="kv__val">React</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Ranked Campsites" note="Next 48 hours">
        <div className="tablewrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Site</th>
                <th>Score</th>
                <th>Rain</th>
                <th>Wind</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              {SITES.map((s) => (
                <tr key={s.name}>
                  <td className="strong-cell">{s.name}</td>
                  <td className="mono-cell">{s.score}</td>
                  <td>{s.rain}</td>
                  <td>{s.wind}</td>
                  <td>
                    <span className={`badge badge--${VERDICT_TONE[s.verdict]}`}>{s.verdict}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </DashShell>
  );
}
