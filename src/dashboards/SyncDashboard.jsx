import DashShell, { StatGrid, Stat, Panel, Bar } from './DashShell';

const PEERS = [
  { id: 'peer-01', host: 'workstation', files: '4,182', queue: 0, state: 'synced' },
  { id: 'peer-02', host: 'laptop', files: '4,182', queue: 0, state: 'synced' },
  { id: 'peer-03', host: 'nas-01', files: '4,180', queue: 2, state: 'transferring' },
  { id: 'peer-04', host: 'vm-build', files: '3,944', queue: 238, state: 'catching up' },
];

const PEER_TONE = { synced: 'good', transferring: 'warn', 'catching up': 'mute' };

const THREADS = [
  { name: 'Thread 0', load: 78 },
  { name: 'Thread 1', load: 64 },
  { name: 'Thread 2', load: 71 },
  { name: 'Thread 3', load: 52 },
];

export default function SyncDashboard() {
  return (
    <DashShell
      accent="acid"
      eyebrow="Project 05 — Python / Sockets"
      title="File Synchronization"
      status="4 peers connected"
      subtitle="A client–server system keeping a file tree in step across multiple devices. Multithreaded socket communication carries concurrent transfers, while version-control logic detects conflicting edits and resolves them without dropping either side's work."
    >
      <StatGrid>
        <Stat label="Connected Peers" value="4" note="All reachable" tone="good" pulse />
        <Stat label="Files Tracked" value="4,182" note="Across the tree" tone="accent" />
        <Stat label="Conflicts Resolved" value="17" note="Automatic merge" tone="good" />
        <Stat label="Queue Depth" value="240" note="vm-build catching up" tone="warn" />
      </StatGrid>

      <div className="dash__grid">
        <Panel title="Worker Thread Load" note="Transfer pool" wide>
          {THREADS.map((t) => (
            <Bar key={t.name} name={t.name} value={t.load} display={`${t.load}%`} />
          ))}
        </Panel>

        <Panel title="Protocol">
          <div className="kv">
            <div className="kv__row">
              <span className="kv__key">Transport</span>
              <span className="kv__val kv__val--mono">TCP sockets</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Concurrency</span>
              <span className="kv__val">Thread pool</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Change detection</span>
              <span className="kv__val">Hash + mtime</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Conflict policy</span>
              <span className="kv__val">Version merge</span>
            </div>
            <div className="kv__row">
              <span className="kv__key">Tree search</span>
              <span className="kv__val kv__val--mono">custom</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Peer Status" note="Live">
        <div className="tablewrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Peer</th>
                <th>Host</th>
                <th>Files</th>
                <th>Queue</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {PEERS.map((p) => (
                <tr key={p.id}>
                  <td className="mono-cell strong-cell">{p.id}</td>
                  <td className="mono-cell">{p.host}</td>
                  <td>{p.files}</td>
                  <td>{p.queue}</td>
                  <td>
                    <span className={`badge badge--${PEER_TONE[p.state]}`}>{p.state}</span>
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
