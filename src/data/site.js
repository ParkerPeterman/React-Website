// Single source of truth for every piece of copy on the site.
// Components stay presentational; edit content here.

export const identity = {
  first: 'Parker',
  last: 'Peterman',
  location: 'Maize, Kansas',
  phone: '(316) 680-5045',
  email: 'petermanparker6@gmail.com',
  github: 'https://github.com/ParkerPeterman',
  linkedin: 'https://www.linkedin.com/in/parker-peterman-a17430347',
};

export const roles = [
  'Software Engineering',
  'Machine Learning',
  'Distributed Systems',
  'Data Analytics',
];

export const intro =
  'I build the system and the panel it reports to — from Python services and SQL through to the interface a stakeholder actually reads.';

export const projects = [
  {
    index: '01',
    title: 'Short-Term Rental Price ML Pipeline',
    blurb:
      'End-to-end machine learning pipeline predicting short-term rental prices across NYC, with experiment tracking and reproducible deployment.',
    tags: ['Python', 'MLflow', 'Weights & Biases', 'Hydra'],
    hash: '#rental',
    accent: 'violet',
    metric: { value: '0.84', label: 'R² on validation' },
    preview: {
      kind: 'bars',
      chrome: 'feature_importance.py',
      kpis: [
        { label: 'R²', value: '0.84' },
        { label: 'MAE', value: '$41.50' },
      ],
      bars: [
        { label: 'Neighborhood', v: 85 },
        { label: 'Room type', v: 62 },
        { label: 'Reviews', v: 47 },
        { label: 'Availability', v: 31 },
        { label: 'Min nights', v: 18 },
      ],
    },
  },
  {
    index: '02',
    title: 'Scalable ML Pipeline with FastAPI',
    blurb:
      'A census income model served behind a RESTful API, with versioned data, CI on every push, and monitored inference in production.',
    tags: ['FastAPI', 'DVC', 'Python', 'GitHub Actions'],
    hash: '#census',
    accent: 'acid',
    metric: { value: '45ms', label: 'median latency' },
    preview: {
      kind: 'stream',
      chrome: 'GET /predict',
      kpis: [
        { label: 'p50', value: '45ms' },
        { label: 'req/s', value: '1.2k' },
      ],
      // Latency samples, ms. Loops seamlessly, so the series is its own period.
      series: [38, 44, 41, 52, 47, 61, 55, 49, 58, 44, 51, 46],
    },
  },
  {
    index: '03',
    title: 'Web Outage Tracker',
    blurb:
      'Network incident tracking and outage prediction — a Python backend feeding a live NOC surface with SLA and MTTR logic built in.',
    tags: ['Python', 'Networking', 'Scikit-Learn'],
    hash: '#noc',
    accent: 'ember',
    metric: { value: '99.8%', label: 'uptime tracked' },
    preview: {
      kind: 'pulse',
      chrome: 'noc · live',
      kpis: [
        { label: 'Uptime', value: '99.8%' },
        { label: 'MTTR', value: '14m' },
      ],
      series: [70, 74, 69, 82, 77, 88, 72, 91, 68, 84, 79, 86],
      nodes: [
        { x: 22, y: 30, tone: 'bad' },
        { x: 58, y: 62, tone: 'warn' },
        { x: 82, y: 24, tone: 'good' },
      ],
    },
  },
  {
    index: '04',
    title: 'Campsite Rating Web App',
    blurb:
      'A React front end over a multi-criteria decision model that scores campsites against live OpenMeteo forecasts and the preferences a camper actually states.',
    tags: ['React', 'OpenMeteo API', 'Decision Modelling', 'JavaScript'],
    hash: '#campsite',
    accent: 'violet',
    metric: { value: '7-day', label: 'forecast window' },
    preview: {
      kind: 'bars',
      chrome: 'score_campsite.js',
      kpis: [
        { label: 'Criteria', value: '6' },
        { label: 'Forecast', value: '7d' },
      ],
      bars: [
        { label: 'Precipitation', v: 88 },
        { label: 'Temperature', v: 71 },
        { label: 'Wind', v: 54 },
        { label: 'Cloud cover', v: 40 },
        { label: 'Daylight', v: 26 },
      ],
    },
  },
  {
    index: '05',
    title: 'Distributed File Synchronization System',
    blurb:
      'A Python client–server system keeping files in step across multiple devices, with multithreaded sockets for concurrent transfers and version logic that resolves conflicting edits.',
    tags: ['Python', 'Sockets', 'Concurrency', 'Version Control'],
    hash: '#sync',
    accent: 'acid',
    metric: { value: 'N-way', label: 'device sync' },
    preview: {
      kind: 'stream',
      chrome: 'syncd · 4 peers',
      kpis: [
        { label: 'Peers', value: '4' },
        { label: 'Conflicts', value: '0' },
      ],
      // Transfer throughput, MB/s. Loops seamlessly — the series is its period.
      series: [42, 55, 48, 67, 59, 74, 63, 81, 58, 70, 52, 46],
    },
  },
];

export const skills = [
  {
    label: 'Software Engineering & Scripting',
    body: 'Python with Pandas and NumPy, SQL across PostgreSQL, MySQL and T-SQL, and JavaScript — React and CSS where the work has to reach an interface.',
  },
  {
    label: 'Cloud Infrastructure',
    body: 'Distributed compute models, automated data pipeline orchestration and local database caching layers built to hold real-time throughput.',
  },
  {
    label: 'Systems Integration & Tooling',
    body: 'ServiceNow integration, enterprise asset tracking and custom real-time metric aggregation — joining systems that were never designed to talk.',
  },
  {
    label: 'Machine Learning & Modelling',
    body: 'Training and evaluating models against real problems, from preparing untreated data through to findings a stakeholder can act on.',
  },
  {
    label: 'Methodology & Security',
    body: 'Agile SDLC delivery with rapid iterations for stakeholder testing, worked to defense contract security compliance standards.',
  },
];

export const experience = [
  {
    org: 'Ennovar at Kansas Fiber Network',
    role: 'Software Engineer',
    period: 'Current',
    points: [
      ['System Logic Development', 'Architected systems for database caching and process scheduling for applications running on local servers.'],
      ['Automated Processes', 'Reduced the time for metric compilation by over 90%, freeing engineers to focus on network operability.'],
      ['Production Environment', 'Worked in an Agile SDLC environment to rapidly produce iterations of code for stakeholder testing.'],
    ],
  },
  {
    org: 'Ennovar at Textron Aviation',
    role: 'Technical Operations Team',
    period: 'Previous',
    points: [
      ['Defense Contracting Security Compliance', 'Followed DOD guidelines for working within a strict defense contract environment.'],
      ['Systems Integration & Analytics', 'Integrated ServiceNow ticketing data to engineer real-time operational health dashboards.'],
      ['Shop Floor Operations', 'Traveled to multiple job sites to run operational checks, ensuring that all assets were working properly.'],
      ['Infrastructure Management', 'Ran infrastructure for all-hands livestreams and managed server-based Linux remote desktops.'],
    ],
  },
];

export const education = [
  {
    org: 'Western Governors University',
    role: "Bachelor's in Data Analytics",
    period: 'Oct 2024 — Oct 2026',
    points: [
      ['4.0 GPA', 'Data Analytics major.'],
      ['Societies', 'Honors Society member and Data Club member.'],
    ],
  },
];

// `mono: true` renders the mark as a flat bone silhouette instead of restoring
// its true colours on hover — needed for artwork whose source fill is dark
// enough to vanish against the near-black card (the AWS mark is #252F3E).
export const certifications = [
  { img: '/Amazon_Web_Services_Logo.svg', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Dec 2025', mono: true },
  { img: '/data+_picture.png', title: 'CompTIA Data+', issuer: 'CompTIA', date: 'Jan 2026' },
  { img: '/project+_picture.webp', title: 'CompTIA Project+', issuer: 'CompTIA', date: 'Mar 2026' },
  { img: '/udacity_logo.webp', title: 'Data Analytics Nanodegree', issuer: 'Udacity', date: 'Apr 2026' },
];

// `ink: true` marks artwork that is a single flat colour at source and would
// otherwise sink into one ground or the other — GitHub is #1b1f23, MySQL
// #00546b, and the AWS wordmark #252f3e. Those follow the theme; every other
// mark keeps its own colour, which is the point of the row.
export const stack = [
  { src: '/python.svg', alt: 'Python' },
  { src: '/postgresql.svg', alt: 'PostgreSQL' },
  { src: '/mysql-icon-light.svg', alt: 'MySQL', ink: true },
  { src: '/aws_light.svg', alt: 'AWS', ink: true },
  { src: '/react_light.svg', alt: 'React' },
  { src: '/javascript.svg', alt: 'JavaScript' },
  { src: '/html5.svg', alt: 'HTML5' },
  { src: '/css_old.svg', alt: 'CSS' },
  { src: '/c-plusplus.svg', alt: 'C++' },
  { src: '/microsoft-excel.svg', alt: 'Excel' },
  { src: '/github_light.svg', alt: 'GitHub', ink: true },
];

export const sections = [
  { id: 'index', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'record', label: 'Record' },
  { id: 'contact', label: 'Contact' },
];
