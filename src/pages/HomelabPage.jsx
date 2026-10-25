import CaseLayout, { Section, Ticks } from './CaseLayout';
import RackElevation from '../components/RackElevation';
import Status, { RowHead } from '../components/Status';
import {
  labFacts,
  guests,
  models,
  routes,
  power,
  powerCut,
  backups,
  retention,
  boundaries,
  alerts,
} from '../data/homelab';
import './HomelabPage.css';

const hardware = [
  ['Role', 'Services, always on', 'Large models, on demand'],
  ['CPU', 'Xeon W-2223, 4C/8T, 3.6 GHz', 'Xeon W-2223 (assumed)'],
  ['RAM', '128 GB DDR4-2666 ECC, 8 × 16 GB RDIMM', '128 GB DDR4 ECC'],
  ['GPUs', 'Today 2× Quadro P4000; target RTX 6000 + P4000', '2× Quadro RTX 6000 24 GB'],
  ['Power supply', '950 W', '950 W'],
  ['Disks', '1 TB SATA SSD, 4 TB HDD; second 4 TB planned', 'SSD for OS and model files'],
  ['OS', 'Proxmox VE 9', 'Ubuntu 24.04 LTS, bare metal'],
  ['UPS outlet', 'Battery', 'Surge only'],
  ['Wake', 'Always on', 'Wake-on-LAN, suspends after 30 idle minutes'],
];

function Architecture() {
  return (
    <figure className="fig arch">
      <div className="arch__grid">
        <div className="arch__col">
          <div className="arch__box">
            <span className="caps">Around the house</span>
            <ul>
              <li>Phone and desktop</li>
              <li>Voice speaker (HA Voice PE)</li>
              <li>Zigbee sensors, smart scale, ring</li>
            </ul>
          </div>
          <div className="arch__box">
            <span className="caps">Internet</span>
            <ul>
              <li>Tailscale coordination</li>
              <li className="is-planned">Backblaze B2, encrypted backups</li>
              <li>Open Food Facts lookups</li>
            </ul>
          </div>
        </div>

        <div className="arch__wire" aria-hidden="true" />

        <div className="arch__col">
          <div className="arch__box is-planned">
            <span className="caps">Rack network and power</span>
            <ul>
              <li>Access point (PoE)</li>
              <li>Switch, 8× 1 GbE</li>
              <li>UPS, status over USB to NUT</li>
            </ul>
          </div>
        </div>

        <div className="arch__wire" aria-hidden="true" />

        <div className="arch__col arch__col--hosts">
          <div className="arch__box arch__host">
            <span className="arch__hostname">pve1 <Status value="running" /></span>
            <span className="caps">LXC</span>
            <p className="arch__chips">
              <span>Tailscale</span><span>AdGuard</span><span>Proxy Manager</span><span>Minecraft</span>
            </p>
            <span className="caps">VMs</span>
            <dl className="arch__vms">
              <dt>apps</dt><dd>Nextcloud, Immich, Vaultwarden, Paperless, Open WebUI, Grafana</dd>
              <dt>gpu</dt><dd>Ollama, Whisper, embeddings, Immich ML; GPUs via VFIO</dd>
              <dt>haos</dt><dd>Home Assistant, voice pipeline</dd>
              <dt>pbs</dt><dd>Proxmox Backup Server</dd>
            </dl>
          </div>
          <div className="arch__box arch__host is-planned">
            <span className="arch__hostname">llm1 <Status value="planned" /></span>
            <p>Ollama with gpt-oss-120b on 2× RTX 6000. Woken for deep questions and the 01:30 coach report.</p>
          </div>
        </div>
      </div>
      <figcaption>
        <b>Figure 1.</b> Architecture in the target design. Devices reach the hosts through the rack
        switch; nothing reaches in from the internet except over Tailscale.
        <span className="legend arch__legend">
          <span><i />Running</span>
          <span><i className="dash" />Planned</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function HomelabPage() {
  const battery = power.filter((d) => d.outlet === 'Battery');
  const sum = (rows, k) => rows.reduce((t, r) => t + r[k], 0);

  return (
    <CaseLayout
      id="lab"
      kind="Tech spec, revision 1.0, 25 Oct 2026"
      title="Homelab"
      summary="Two Dell Precision 5820s in a 20U rolling rack. pve1 runs everything used day to day, including the voice assistant; llm1 sleeps until something needs the big model. Written as a full spec before the second half arrives, with every estimate and assumption marked."
      facts={labFacts
        .filter((f) => f.label)
        .slice(0, 5)
        .map((f) => [f.label, f.value])}
    >
      <Section n={1} title="Status">
        <p>
          The Proxmox host and all of its guests are running today on two Quadro P4000s. The second
          5820, the three RTX 6000s, the rack network and the offsite copy are designed but not built.
          The tables mark which is which; the prose sections describe the design as specified.
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="Lab at a glance">
          <table className="spec spec--stack lab__facts">
            <thead><tr><th scope="col">Item</th><th scope="col">Specification</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {labFacts.map((f, i) => (
                <tr key={i}>
                  <RowHead label={f.label} i={i} />
                  <td>{f.value}</td>
                  <td><Status value={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={2} title="Architecture">
        <Architecture />
        <div className="table-scroll" tabIndex={0} aria-label="Request routing">
          <table className="spec">
            <thead><tr><th scope="col">Request</th><th scope="col">Path</th></tr></thead>
            <tbody>
              {routes.map(([r, path]) => (
                <tr key={r}><th scope="row">{r}</th><td>{path}</td></tr>
              ))}
            </tbody>
            <caption>Request routing in the target design.</caption>
          </table>
        </div>
      </Section>

      <Section n={3} title="Hardware">
        <div className="lab__hw">
          <RackElevation n={2} />
          <div className="table-scroll" tabIndex={0} aria-label="Machines">
            <table className="spec">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Spec</span></th>
                  <th scope="col">pve1 <Status value="running" /></th>
                  <th scope="col">llm1 <Status value="planned" /></th>
                </tr>
              </thead>
              <tbody>
                {hardware.map(([k, a, b]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
              <caption>
                Each RTX 6000 is capped at 250 W with nvidia-smi: it loses little speed and stays well
                inside each 950 W supply.
              </caption>
            </table>
          </div>
        </div>
      </Section>

      <Section n={4} title="Compute">
        <p>
          18 vCPUs on 8 threads is normal here; the guests rarely all work at once. About 58 GB of the
          128 GB is allocated, leaving room to grow. Both GPUs pass through to the GPU VM with IOMMU on
          and the cards bound to vfio-pci on the host.
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="Guests on pve1">
          <table className="spec guests">
            <thead>
              <tr>
                <th scope="col" className="num">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">OS</th>
                <th scope="col" className="num">vCPU</th>
                <th scope="col" className="num">RAM</th>
                <th scope="col">Runs</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g.id}>
                  <td className="num">{g.id}</td>
                  <th scope="row">{g.name}</th>
                  <td>{g.type}</td>
                  <td>{g.os}</td>
                  <td className="num">{g.vcpu}</td>
                  <td className="num">{g.ram}</td>
                  <td>{g.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={5} title="AI stack">
        <p>
          The fast model stays loaded on pve1 for voice and chat; the deep model lives on llm1 and is
          only woken when needed. Embeddings stay on pve1 on purpose, so document search keeps working
          while llm1 sleeps. Placements below assume the RTX 6000s.
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="Model placement">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Model (4-bit)</th>
                <th scope="col" className="num">Size</th>
                <th scope="col">Where</th>
                <th scope="col">Fit</th>
                <th scope="col">Job</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.model}>
                  <th scope="row">{m.model}</th>
                  <td className="num">{m.size}</td>
                  <td>{m.where}</td>
                  <td>{m.fit}</td>
                  <td>{m.job}</td>
                </tr>
              ))}
            </tbody>
            <caption>Status: planned. Qwen sizes from Unsloth’s published quantizations.</caption>
          </table>
        </div>
        <Ticks
          items={[
            'Home Assistant has a “Wake LLM box” button and an automation that sends Wake-on-LAN.',
            'The coach worker wakes llm1 itself at 01:25, polls Ollama until it answers, then runs.',
            'A systemd timer on llm1 suspends it after 30 minutes with no Ollama requests.',
          ]}
        />
      </Section>

      <Section n={6} title="Power">
        <div className="table-scroll" tabIndex={0} aria-label="Power budget">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Device</th>
                <th scope="col" className="num">Idle (W)</th>
                <th scope="col" className="num">Full load (W)</th>
                <th scope="col">Outlet</th>
              </tr>
            </thead>
            <tbody>
              {power.map((d) => (
                <tr key={d.device}>
                  <th scope="row">{d.device}</th>
                  <td className="num">~{d.idle}</td>
                  <td className="num">~{d.full}</td>
                  <td>{d.outlet}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Battery side</th>
                <td className="num"><b>~{sum(battery, 'idle')}</b></td>
                <td className="num"><b>~{sum(battery, 'full')}</b></td>
                <td>{Math.round((sum(battery, 'full') / 1000) * 100)}% of the UPS’s 1000 W</td>
              </tr>
            </tbody>
            <caption>
              Estimates. With llm1 awake about 4 hours a day the rack averages ~185 W: about 135 kWh and
              $20 a month at $0.15/kWh. UPS runtime ~22 minutes at idle, ~4 at full load.
            </caption>
          </table>
        </div>
        <h3>When the power goes out</h3>
        <ol className="steps">
          {powerCut.map((s) => (
            <li key={s}><div><span>{s}</span></div></li>
          ))}
        </ol>
      </Section>

      <Section n={7} title="Storage and backups">
        <div className="table-scroll" tabIndex={0} aria-label="3-2-1 backup plan">
          <table className="spec">
            <thead><tr><th scope="col">3-2-1</th><th scope="col">Where</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {backups.map((b, i) => (
                <tr key={i}>
                  <th scope="row">{b.copy || <span className="sr-only">Copy 2, continued</span>}</th>
                  <td>{b.where}</td>
                  <td><Status value={b.status} /></td>
                </tr>
              ))}
            </tbody>
            <caption>
              Offsite: Nextcloud data, Immich originals, Paperless, health database dumps, Vaultwarden,
              Home Assistant backups, and the compose and env files, encrypted. Not sent: models, media,
              camera footage, VM images.
            </caption>
          </table>
        </div>
        <div className="table-scroll" tabIndex={0} aria-label="Retention">
          <table className="spec">
            <thead><tr><th scope="col">Policy</th><th scope="col">Rule</th></tr></thead>
            <tbody>
              {retention.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={8} title="Security">
        <Ticks
          items={[
            'Remote access only through Tailscale, as a subnet router in its own container. No port forwards on the router; friends reach Minecraft through Tailscale node sharing.',
            'The Proxmox and backup UIs and SSH are reachable only on the LAN and Tailscale. SSH by key only.',
            'Ollama has no login, so it listens on the LAN only and the firewall allows its port from the apps, GPU and Home Assistant VMs alone.',
            'Vaultwarden runs with 2FA, sign-ups off and an admin token. No AI service can reach it.',
            'Every VM takes security updates automatically; Proxmox and Home Assistant are updated by hand each month, after their backups.',
          ]}
        />
        <div className="table-scroll" tabIndex={0} aria-label="AI boundaries">
          <table className="spec">
            <thead>
              <tr><th scope="col">AI surface</th><th scope="col">Can reach</th><th scope="col">Never</th></tr>
            </thead>
            <tbody>
              {boundaries.map(([a, can, never]) => (
                <tr key={a}><th scope="row">{a}</th><td>{can}</td><td>{never}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={9} title="Monitoring">
        <p>
          As specified, Prometheus scrapes node, Proxmox, GPU, UPS, disk SMART and Postgres exporters
          into Grafana dashboards. Uptime Kuma checks every service each minute and takes push heartbeats from the
          nightly jobs, so a job that silently stops running still raises an alert. ntfy pushes these to
          my phone:
        </p>
        <Ticks items={alerts} />
      </Section>

      <Section n={10} title="Open questions">
        <Ticks
          items={[
            'Which enterprise switch and access point come from work? Some access points need controller software.',
            'Can the ring’s app write to Health Connect directly? If so, a CSV export step disappears from the health pipeline.',
            'A real domain name, for trusted HTTPS certificates without opening ports.',
            'How big llm1’s model SSD needs to be. 1 TB holds three or four large models.',
          ]}
        />
      </Section>
    </CaseLayout>
  );
}
