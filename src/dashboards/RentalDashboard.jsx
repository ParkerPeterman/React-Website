import DashShell, { StatGrid, Stat, Panel, Bar } from './DashShell';

const FEATURES = [
  { name: 'Neighborhood', score: 85 },
  { name: 'Room Type', score: 60 },
  { name: 'Reviews', score: 45 },
  { name: 'Availability', score: 30 },
  { name: 'Minimum Nights', score: 15 },
];

const RUNS = [
  { id: 'run-4f2a', params: 'n_est=300, depth=12', rmse: '58.4', r2: '0.84', state: 'promoted' },
  { id: 'run-3b91', params: 'n_est=200, depth=10', rmse: '61.2', r2: '0.81', state: 'archived' },
  { id: 'run-2c47', params: 'n_est=150, depth=8',  rmse: '66.9', r2: '0.77', state: 'archived' },
];

export default function RentalDashboard() {
  return (
    <DashShell
      accent="violet"
      eyebrow="Project 01 — MLflow / Weights & Biases"
      title="Rental Price Pipeline"
      status="Model healthy"
      subtitle="An end-to-end pipeline predicting short-term rental prices across New York City. Every run is tracked, versioned and reproducible, with drift monitored against the production baseline."
    >
      <StatGrid>
        <Stat label="Properties Modelled" value="42,891" note="↑ 12% week over week" tone="good" />
        <Stat label="Model R²" value="0.84" note="Validation set" tone="accent" />
        <Stat label="Mean Absolute Error" value="$41.50" note="↓ $3.20 improvement" tone="good" />
        <Stat label="Data Drift" value="None" note="W&B monitoring active" tone="good" />
      </StatGrid>

      <div className="dash__grid">
        <Panel title="Feature Importance" note="Top 5" wide>
          {FEATURES.map((f) => (
            <Bar
              key={f.name}
              name={f.name}
              value={f.score}
              display={(f.score / 100).toFixed(2)}
            />
          ))}
        </Panel>

        <Panel title="Pipeline Stages">
          <div className="kv">
            <div className="kv__row">
              <span className="kv__key">Ingest</span>
              <span className="kv__val kv__val--mono">passed</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Clean & Validate</span>
              <span className="kv__val kv__val--mono">passed</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Train</span>
              <span className="kv__val kv__val--mono">passed</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Evaluate</span>
              <span className="kv__val kv__val--mono">passed</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Orchestration</span>
              <span className="kv__val">Hydra</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Recent Experiment Runs" note="MLflow tracking">
        <div className="tablewrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Run</th>
                <th>Parameters</th>
                <th>RMSE</th>
                <th>R²</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {RUNS.map((r) => (
                <tr key={r.id}>
                  <td className="mono-cell strong-cell">{r.id}</td>
                  <td className="mono-cell">{r.params}</td>
                  <td>{r.rmse}</td>
                  <td>{r.r2}</td>
                  <td>
                    <span className={`badge badge--${r.state === 'promoted' ? 'good' : 'mute'}`}>
                      {r.state}
                    </span>
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
