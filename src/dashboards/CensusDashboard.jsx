import DashShell, { StatGrid, Stat, Panel } from './DashShell';

const LOGS = [
  { time: '10:42:01', endpoint: '/predict', prediction: '<=50K', tone: 'bad',  confidence: '92%', latency: '42ms' },
  { time: '10:42:05', endpoint: '/predict', prediction: '>50K',  tone: 'good', confidence: '88%', latency: '46ms' },
  { time: '10:42:12', endpoint: '/predict', prediction: '<=50K', tone: 'bad',  confidence: '99%', latency: '39ms' },
  { time: '10:42:18', endpoint: '/predict', prediction: '>50K',  tone: 'good', confidence: '76%', latency: '51ms' },
  { time: '10:42:24', endpoint: '/predict', prediction: '<=50K', tone: 'bad',  confidence: '81%', latency: '44ms' },
];

export default function CensusDashboard() {
  return (
    <DashShell
      accent="acid"
      eyebrow="Project 02 — FastAPI / DVC"
      title="Census ML Gateway"
      status="Operational"
      subtitle="A census income classifier served behind a RESTful FastAPI surface. Data and model artefacts are versioned with DVC, and every push runs the full test and lint suite through GitHub Actions before deploy."
    >
      <StatGrid>
        <Stat label="Inferences Today" value="1.2M" note="Rolling 24 hours" tone="accent" />
        <Stat label="Median Latency" value="45ms" note="p50 across all regions" />
        <Stat label="API Health" value="Operational" note="No failing checks" tone="good" />
        <Stat label="CI Status" value="Passing" note="GitHub Actions" tone="good" />
      </StatGrid>

      <div className="dash__grid">
        <Panel title="Recent Inference Log" note="Live tail" wide>
          <div className="tablewrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Endpoint</th>
                  <th>Prediction</th>
                  <th>Confidence</th>
                  <th>Latency</th>
                </tr>
              </thead>
              <tbody>
                {LOGS.map((l) => (
                  <tr key={l.time}>
                    <td className="mono-cell">{l.time}</td>
                    <td className="mono-cell strong-cell">{l.endpoint}</td>
                    <td>
                      <span className={`badge badge--${l.tone}`}>{l.prediction}</span>
                    </td>
                    <td>{l.confidence}</td>
                    <td className="mono-cell">{l.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Model Registry" note="DVC">
          <div className="kv">
            <div className="kv__row">
              <span className="kv__key">Model Version</span>
              <span className="kv__val kv__val--mono">v2.1.4-beta</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Data Hash</span>
              <span className="kv__val kv__val--mono">a9f8c2e</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">F1 Score</span>
              <span className="kv__val">0.82</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Precision</span>
              <span className="kv__val">0.85</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Recall</span>
              <span className="kv__val">0.79</span>
            </div>
          </div>
        </Panel>
      </div>
    </DashShell>
  );
}
