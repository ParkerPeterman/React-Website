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
  'Data Analytics',
  'Machine Learning',
  'Business Intelligence',
  'Dashboard Systems',
];

export const intro =
  'I build the pipeline and the panel it lands on — from Python and SQL through to the interface a stakeholder actually reads.';

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
];

export const skills = [
  {
    label: 'Databases',
    body: 'Architecting relational databases in PostgreSQL, MySQL and T-SQL — data integrity and optimized query performance across large-scale datasets.',
  },
  {
    label: 'Business Intelligence',
    body: 'Power BI (DAX, Power Query) and Tableau Desktop for interactive dashboards, with Tableau Pulse and Power BI Copilot delivering automated insight to stakeholders.',
  },
  {
    label: 'ML & Statistics',
    body: 'Predictive modelling and deep exploratory analysis in Python — Pandas for manipulation, NumPy for computation, Scikit-Learn for modelling.',
  },
  {
    label: 'Cloud Architecture',
    body: 'Scalable data pipelines across AWS. Snowflake, Amazon Redshift and Google BigQuery warehouses, with ETL automated through Fivetran and Airbyte.',
  },
  {
    label: 'Automation',
    body: 'Reporting workflows streamlined in Excel via Power Query, VBA/Macros and Python in Excel — less manual processing, higher calculation accuracy.',
  },
];

export const experience = [
  {
    org: 'Ennovar at Kansas Fiber Network',
    role: 'Software Engineer',
    period: 'Current',
    points: [
      ['Software Development & Monitoring', 'Co-developed a real-time monitoring and tracking application visualizing core network infrastructure metrics.'],
      ['Automation & Logic', 'Programmed automated logic evaluating system downtime against SLA contracts and automating MTTR calculations, reducing administrative overhead.'],
      ['System Architecture', 'Architected a distributed compute model and local database caching layer to optimize real-time data flow and maintain operational uptime.'],
      ['Quality Assurance', 'Contributed to debugging, technical problem identification and documentation of software components across operational workflows.'],
    ],
  },
  {
    org: 'Ennovar at Textron Aviation',
    role: 'Technical Operations Team',
    period: 'Previous',
    points: [
      ['Security Compliance', 'Operated within a strictly controlled environment, maintaining defense contract security compliance standards.'],
      ['Systems Integration', 'Integrated ServiceNow ticketing data to engineer, maintain and optimize real-time operational health dashboards.'],
      ['Deployment', 'Imaged organizational systems with custom, department-specific software configurations based on individual user roles.'],
      ['Diagnostics', 'Resolved complex hardware, software and configuration issues with detailed documentation for organizational assets.'],
    ],
  },
];

export const education = [
  {
    org: "Western Governors University",
    role: "Bachelor's in Data Analytics",
    period: 'Oct 2024 — Oct 2026',
    points: [['4.0 GPA', 'Data Analytics major, Mathematics minor.']],
  },
  {
    org: 'Maize High School',
    role: 'Diploma',
    period: 'Sep 2020 — May 2024',
    points: [['4.2 GPA', 'National Honors Society.']],
  },
];

export const service = [
  'Collaborated with local and state government bodies to rename a street near my high school in commemoration of our principal battling cancer, and spoke at fundraising events.',
  'Led an effort to landscape homes owned by community members with disabilities, and abandoned properties, to beautify the neighborhood.',
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

export const stack = [
  { src: '/python.svg', alt: 'Python' },
  { src: '/postgresql.svg', alt: 'PostgreSQL' },
  { src: '/mysql-icon-light.svg', alt: 'MySQL' },
  { src: '/aws_light.svg', alt: 'AWS' },
  { src: '/react_light.svg', alt: 'React' },
  { src: '/javascript.svg', alt: 'JavaScript' },
  { src: '/html5.svg', alt: 'HTML5' },
  { src: '/css_old.svg', alt: 'CSS' },
  { src: '/c-plusplus.svg', alt: 'C++' },
  { src: '/microsoft-excel.svg', alt: 'Excel' },
  { src: '/github_light.svg', alt: 'GitHub' },
];

export const sections = [
  { id: 'index', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'record', label: 'Record' },
  { id: 'contact', label: 'Contact' },
];
