// Homelab, from homelab-tech-spec.txt (v1.0, 2026-10-25).
// Published at the architecture level only: no IP addresses, ports or
// hostnames beyond the VM names.
//
// status: 'running' — built and in use today
//         'planned' — designed, not built (includes everything that depends
//                     on the second 5820 and the RTX 6000s)
// Flip a status here and every figure and table follows.

export const labSummary =
  'Two Dell Precision 5820s in a 20U rolling rack: an always-on Proxmox host that runs everything used day to day, and a second box that wakes on demand for large models. Nothing personal leaves the house except encrypted backups.';

export const labFacts = [
  { label: 'Hosts', value: 'pve1 Proxmox VE 9, always on', status: 'running' },
  { label: '', value: 'llm1 Ubuntu 24.04, wakes on LAN', status: 'planned' },
  { label: 'Compute', value: 'Xeon W-2223, 128 GB ECC per host', status: 'running' },
  { label: 'GPUs today', value: '2× Quadro P4000 (16 GB) passed through to the GPU VM', status: 'running' },
  { label: 'GPUs target', value: '3× Quadro RTX 6000 + 1× P4000, 80 GB VRAM', status: 'planned' },
  { label: 'Guests', value: '4 VMs and 4 LXCs, ~35 services', status: 'running' },
  { label: 'Access', value: 'Tailscale only, no ports open on the router', status: 'running' },
  { label: 'Backups', value: 'Proxmox Backup Server, nightly', status: 'running' },
  { label: '', value: 'restic offsite copy to Backblaze B2', status: 'planned' },
  { label: 'Power', value: '~185 W average, ~$20/month (est.)', status: 'planned' },
];

/* Rack elevation, U counted from the floor (20U frame). */
export const rack = [
  { u: [18, 20], name: 'Free', detail: '3U for growth', status: 'empty' },
  { u: [16, 17], name: 'Stats screen', detail: '8.8" USB panel', status: 'planned' },
  { u: [14, 15], name: 'Switch', detail: '8× 1 GbE, PoE+', status: 'planned' },
  { u: [9, 13], name: 'llm1', detail: '5820, 2× RTX 6000', status: 'planned' },
  { u: [4, 8], name: 'pve1', detail: '5820, Proxmox VE 9', status: 'running' },
  { u: [1, 3], name: 'UPS', detail: '1500 VA / 1000 W', status: 'planned' },
];

/* Guests on pve1: 18 vCPUs on 8 threads, ~58 GB of 128 GB allocated. */
export const guests = [
  { id: 100, name: 'apps', type: 'VM', os: 'Debian 13 + Docker', vcpu: 4, ram: '24 GB', role: 'Nextcloud, Immich, Vaultwarden, Paperless, Open WebUI, Grafana, Uptime Kuma', status: 'running' },
  { id: 101, name: 'gpu', type: 'VM', os: 'Ubuntu 24.04', vcpu: 4, ram: '16 GB', role: 'Ollama, Whisper, Piper, Immich ML, embeddings; both GPUs via VFIO', status: 'running' },
  { id: 102, name: 'haos', type: 'VM', os: 'Home Assistant OS', vcpu: 2, ram: '4 GB', role: 'Smart home, voice pipeline, Zigbee', status: 'running' },
  { id: 103, name: 'pbs', type: 'VM', os: 'Proxmox Backup Server', vcpu: 2, ram: '4 GB', role: 'Nightly backups of every guest', status: 'running' },
  { id: 200, name: 'ts', type: 'LXC', os: 'Debian 13', vcpu: 1, ram: '0.5 GB', role: 'Tailscale subnet router', status: 'running' },
  { id: 201, name: 'dns', type: 'LXC', os: 'Debian 13', vcpu: 1, ram: '0.5 GB', role: 'AdGuard Home: DNS, ad blocking, local names', status: 'running' },
  { id: 202, name: 'proxy', type: 'LXC', os: 'Debian 13', vcpu: 1, ram: '1 GB', role: 'Nginx Proxy Manager: names and HTTPS for every web service', status: 'running' },
  { id: 210, name: 'mc', type: 'LXC', os: 'Debian 13', vcpu: 3, ram: '6 GB', role: 'Minecraft server, shared with friends over Tailscale', status: 'running' },
];

/* Where each model lives in the target design (4-bit weights). */
export const models = [
  { model: 'Qwen 3.5 27B', size: '17 GB', where: 'pve1 RTX 6000', fit: '100% on GPU, ~6 GB left for context', job: 'Voice and quick chat, always loaded' },
  { model: 'Whisper large-v3-turbo', size: '~2 GB', where: 'pve1 P4000', fit: '100%', job: 'Speech to text' },
  { model: 'nomic-embed-text', size: '<1 GB', where: 'pve1 P4000', fit: '100%', job: 'Document search vectors' },
  { model: 'Immich ML', size: '~1.5 GB', where: 'pve1 P4000', fit: '100%', job: 'Faces and photo search' },
  { model: 'gpt-oss-120b', size: '65 GB', where: 'llm1 2× RTX 6000', fit: '~70% on GPU, ~19 GB in RAM', job: 'Deep questions, nightly coach report' },
];

/* Request routing, one line each. */
export const routes = [
  ['Voice command', 'Home Assistant matches it locally; no model needed'],
  ['Voice question', 'Home Assistant → Whisper (P4000) → Qwen 3.5 27B → Piper → speaker'],
  ['Quick chat', 'Open WebUI → Qwen 3.5 27B on pve1'],
  ['Documents', 'Open WebUI → embeddings on the P4000 → passages → model'],
  ['Deep research', 'Open WebUI → Wake-on-LAN llm1 → gpt-oss-120b'],
  ['Nightly coach', 'Worker wakes llm1 at 01:25; falls back to Qwen 3.5 27B if no answer in 3 minutes'],
];

/* Power budget (est.). llm1 sits on a surge-only outlet, never battery. */
export const power = [
  { device: 'pve1 (RTX 6000 + P4000)', idle: 138, full: 585, outlet: 'Battery' },
  { device: 'Switch + AP (PoE)', idle: 17, full: 28, outlet: 'Battery' },
  { device: 'KVMs (2)', idle: 4, full: 6, outlet: 'Battery' },
  { device: 'llm1 (2× RTX 6000)', idle: 136, full: 700, outlet: 'Surge only' },
];

export const powerCut = [
  'Mains fails and the UPS switches to battery.',
  'NUT on the Proxmox host sees it; Home Assistant and ntfy alert my phone.',
  'llm1 loses power at once. Harmless: no data lives there.',
  'At 50% battery or 5 minutes left, Proxmox shuts every guest down cleanly, then itself.',
  'When power returns the BIOS powers pve1 on, and guests start in order: DNS, Tailscale, proxy, apps, GPU, Home Assistant, backups.',
];

export const backups = [
  { copy: 'Copy 1', where: 'Live data on the HDD and SSD', status: 'running' },
  { copy: 'Copy 2', where: 'Proxmox Backup Server, sharing the data HDD until a second 4 TB drive is added', status: 'running' },
  { copy: '', where: 'Weekly sync of the backup store to a USB SSD', status: 'planned' },
  { copy: 'Copy 3', where: 'restic to Backblaze B2, encrypted, offsite', status: 'planned' },
];

export const retention = [
  ['Proxmox Backup Server', 'Keep 7 daily, 4 weekly, 6 monthly'],
  ['restic (B2)', 'Keep 7 daily, 4 weekly, 12 monthly'],
  ['Restore test', 'One VM and one file from B2 every 3 months'],
];

/* What each AI surface is allowed to touch. */
export const boundaries = [
  ['Voice assistant', 'Exposed devices, calendar, to-dos, general questions', 'Documents, health data'],
  ['Private assistant', 'Documents, past chats, health data through read-only roles', 'Writes of any kind'],
  ['Any AI service', 'Nothing below', 'Passwords, Proxmox, the backup server'],
];

export const alerts = [
  'A service down for more than 3 minutes',
  'UPS on battery',
  'A disk over 85% full, or a SMART warning',
  'A GPU over 85 °C',
  'A nightly job that didn’t report in (push heartbeats from the importer, coach worker, pg_dump, PBS and restic)',
];
