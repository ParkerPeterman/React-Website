// Single source of truth for the copy on the home page.
// Every figure here was read from a repo, a run log or the résumé; see the
// comments for where. Edit content here; components stay presentational.

export const identity = {
  first: 'Parker',
  last: 'Peterman',
  role: 'Data and ML engineer',
  location: 'Maize, Kansas',
  phone: '(316) 680-5045',
  email: 'petermanparker6@gmail.com',
  github: 'https://github.com/ParkerPeterman',
  linkedin: 'https://www.linkedin.com/in/parker-peterman-a17430347',
  resume: '/Parker-Peterman-Resume.pdf',
  status: 'Open to full-time roles',
  degree: 'B.S. Data Analytics, WGU',
  degreeDate: 'Oct 2026',
  gpa: '4.0',
};

export const statement = 'I build data pipelines and ML systems that show their work.';

export const intro =
  'Software engineer at Kansas Fiber Network through Ennovar, finishing a data analytics degree at WGU. ' +
  'I like systems where every number can be traced back to the code that produced it: ' +
  'tested pipelines, models with slice reports, and an LLM that is only allowed to phrase what the code decided.';

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Homelab' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/* Skills as a bill of materials: each part lists where it is actually used,
   so a reader can go and check. Keys match project ids in projects.js. */
export const parts = [
  {
    part: 'Python',
    spec: 'pandas, NumPy, SciPy, statsmodels, scikit-learn, Typer CLIs',
    used: ['health', 'rental', 'census', 'outage'],
  },
  {
    part: 'SQL and data modelling',
    spec: 'PostgreSQL schema in raw / core / analytics / knowledge layers, numbered migrations, idempotent upserts; T-SQL and MySQL at work',
    used: ['health', 'work'],
  },
  {
    part: 'APIs and services',
    spec: 'FastAPI, Pydantic, REST inference endpoints, cron containers',
    used: ['health', 'census', 'outage'],
  },
  {
    part: 'ML pipelines',
    spec: 'MLflow projects, Hydra config, Weights & Biases artifacts and sweeps, random forests, TF-IDF features',
    used: ['rental', 'census'],
  },
  {
    part: 'Statistics',
    spec: 'OLS with Newey-West errors, moving-block bootstrap, Benjamini-Hochberg correction, permutation tests, slice metrics',
    used: ['health', 'census'],
  },
  {
    part: 'LLM systems',
    spec: 'Ollama, JSON-schema outputs, output guards with template fallback, model placement by VRAM',
    used: ['health', 'lab'],
  },
  {
    part: 'Testing and CI',
    spec: 'pytest (84 tests on the health system), data tests with a KL-divergence check, GitHub Actions with flake8',
    used: ['health', 'rental', 'census'],
  },
  {
    part: 'Infrastructure',
    spec: 'Proxmox VMs and LXCs, GPU passthrough (VFIO), Docker Compose, Tailscale, AdGuard DNS, Nginx Proxy Manager, NUT',
    used: ['lab', 'health'],
  },
  {
    part: 'Front end',
    spec: 'React, TypeScript, Vite, installable PWA, Recharts, Streamlit and Plotly',
    used: ['health', 'outage'],
  },
  {
    part: 'Enterprise systems',
    spec: 'ServiceNow integration, operational health dashboards, Agile SDLC, DoD contract security compliance',
    used: ['work'],
  },
];

// From the résumé. No dates are listed there, so none are shown here.
export const experience = [
  {
    org: 'Ennovar at Kansas Fiber Network',
    role: 'Software Engineer',
    period: 'Current',
    points: [
      'Architected database caching and process scheduling for applications running on local servers.',
      'Automated metric compilation, cutting the time it takes by more than 90% so engineers can focus on the network.',
      'Shipped in an Agile SDLC, turning around iterations quickly for stakeholder testing.',
    ],
  },
  {
    org: 'Ennovar at Textron Aviation',
    role: 'Technical Operations',
    period: 'Previous',
    points: [
      'Integrated ServiceNow ticketing data into real-time operational health dashboards.',
      'Worked under DoD guidelines inside a defense contract environment.',
      'Ran operational checks across job sites so shop-floor assets kept working.',
      'Ran infrastructure for all-hands livestreams and managed Linux remote desktops on servers.',
    ],
  },
];

export const education = {
  org: 'Western Governors University',
  degree: 'B.S. Data Analytics',
  period: 'Oct 2024 to Oct 2026',
  notes: ['4.0 GPA', 'Honors Society', 'Data Club'],
};

export const certifications = [
  { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Dec 2025' },
  { title: 'CompTIA Data+', issuer: 'CompTIA', date: 'Jan 2026' },
  { title: 'CompTIA Project+', issuer: 'CompTIA', date: 'Mar 2026' },
  { title: 'Data Analytics Nanodegree', issuer: 'Udacity', date: 'Apr 2026' },
];
