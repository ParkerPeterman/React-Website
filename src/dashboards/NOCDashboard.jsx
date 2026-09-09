import DashShell, { StatGrid, Stat, Panel, Bar } from './DashShell';

const INCIDENTS = [
  {
    severity: 'CRITICAL', tone: 'bad', region: 'US-East-1',
    component: 'BGP Router A', duration: '12m 40s', status: 'Investigating', statusTone: 'bad',
  },
  {
    severity: 'WARNING', tone: 'warn', region: 'EU-Central',
    component: 'Database Cluster', duration: '4m 10s', status: 'Mitigating', statusTone: 'warn',
  },
  {
    severity: 'INFO', tone: 'mute', region: 'AP-South',
    component: 'Load Balancer', duration: '45m 00s', status: 'Resolved', statusTone: 'good',
  },
];

export default function NOCDashboard() {
  return (
    <DashShell
      accent="ember"
      eyebrow="Project 03 — Python / Scikit-Learn"
      title="WebOutage NOC"
      status="3 active incidents"
      subtitle="Network incident tracking with predictive escalation. Downtime is evaluated against SLA contracts automatically, MTTR is derived rather than hand-entered, and a Scikit-Learn model flags nodes likely to fail next."
    >
      <StatGrid>
        <Stat label="Global Uptime" value="99.8%" note="↑ 0.1% past 30 days" tone="good" />
        <Stat label="Active Incidents" value="3" note="US-East-1 routing issue" tone="bad" pulse />
        <Stat label="Predicted Outages" value="1" note="High latency on Node 42" tone="warn" />
        <Stat label="Mean Time To Repair" value="14m" note="Ahead of SLA target" tone="good" />
      </StatGrid>

      <div className="dash__grid">
        <Panel title="Live Incident Log" note="Auto-refreshing" wide>
          <div className="tablewrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Region</th>
                  <th>Component</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INCIDENTS.map((i) => (
                  <tr key={i.region}>
                    <td>
                      <span className={`badge badge--${i.tone}`}>{i.severity}</span>
                    </td>
                    <td className="strong-cell">{i.region}</td>
                    <td>{i.component}</td>
                    <td className="mono-cell">{i.duration}</td>
                    <td>
                      <span className={`status-cell status-cell--${i.statusTone}`}>
                        <span className="status-cell__dot" />
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Predictive Engine" note="Scikit-Learn">
          <Bar name="DB CPU spike probability" value={82} display="82%" tone="bad" />
          <Bar name="Network saturation risk" value={45} display="45%" tone="warn" />
          <Bar name="Link flap likelihood" value={18} display="18%" tone="accent" />
        </Panel>
      </div>
    </DashShell>
  );
}
