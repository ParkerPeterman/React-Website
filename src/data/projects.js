// Project index and the measured data behind each case-study figure.
// Sources are noted beside each block so the numbers can be re-checked.

export const projects = [
  {
    id: 'health',
    hash: '#health',
    title: 'Personal Health & Training System',
    kind: 'Personal project',
    year: '2026',
    summary:
      'Pulls my Garmin, food, training and journal data into Postgres, turns it into daily features and rule-based recommendations, and uses a local LLM only to phrase them. A weekly stats job tests whether the advice actually helped.',
    stack: ['Python', 'PostgreSQL', 'FastAPI', 'React + TypeScript', 'Ollama', 'Docker Compose'],
    facts: [
      ['Tests', '84 passing'],
      ['Code', '~8,400 lines Python, ~5,000 TypeScript'],
      ['Schema', '45 tables in 4 layers'],
    ],
    repo: 'https://github.com/ParkerPeterman/HealthTrackerProject',
  },
  {
    id: 'rental',
    hash: '#rental',
    title: 'NYC Rental Price Pipeline',
    kind: 'Udacity ML DevOps project',
    year: '2026',
    summary:
      'A reusable training pipeline for short-term rental prices that can be re-run on each week’s data: versioned artifacts, data tests that block drift, a tracked hyperparameter sweep and a held-out test step.',
    stack: ['MLflow', 'Hydra', 'Weights & Biases', 'scikit-learn', 'pytest'],
    facts: [
      ['Test R²', '0.563'],
      ['Test MAE', '$34.01'],
      ['Pipeline steps', '6'],
    ],
    repo: 'https://github.com/ParkerPeterman/Project-Build-an-ML-Pipeline-Starter',
  },
  {
    id: 'census',
    hash: '#census',
    title: 'Census Income Model API',
    kind: 'Udacity ML DevOps project',
    year: '2026',
    summary:
      'A random-forest income classifier served behind FastAPI, with lint and tests in CI on every push, a model card, and performance reported on 99 slices of the data instead of one headline number.',
    stack: ['FastAPI', 'Pydantic', 'scikit-learn', 'GitHub Actions', 'pytest'],
    facts: [
      ['Test F1', '0.686'],
      ['Slices reported', '99'],
      ['Held-out rows', '6,513'],
    ],
    repo: 'https://github.com/ParkerPeterman/Deploying-a-Scalable-ML-Pipeline-with-FastAPI',
  },
  {
    id: 'outage',
    hash: '#outage',
    title: 'Network Outage Tracker',
    kind: 'Practice build',
    year: '2026',
    summary:
      'A FastAPI and pandas service that computes MTTR, open outages, per-service load and ticket timing from incident data, feeding a React and Recharts NOC view. Runs on a generated set of 500 tickets.',
    stack: ['FastAPI', 'pandas', 'React', 'Recharts'],
    facts: [
      ['Tickets', '500 (synthetic)'],
      ['Endpoints', '5'],
      ['MTTR', '10.5 h mean, 3.1 h median'],
    ],
    repo: null,
  },
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));

/* Rental pipeline — feature importance of the final random forest.
   Source: W&B run e7dr7vtf, feature_importance plot. Values are read off
   the logged chart, so they are approximate to about ±0.005. */
export const rentalImportance = [
  { label: 'Listing title (TF-IDF)', value: 0.453 },
  { label: 'Room type', value: 0.368 },
  { label: 'Latitude', value: 0.041 },
  { label: 'Days available per year', value: 0.038 },
  { label: 'Longitude', value: 0.036 },
  { label: 'Number of reviews', value: 0.029 },
  { label: 'Last review date', value: 0.025 },
  { label: 'Minimum nights', value: 0.005 },
  { label: 'Reviews per month', value: 0.003 },
  { label: 'Borough', value: 0.0 },
  { label: 'Host listing count', value: 0.0 },
];

/* Rental pipeline — the four sweep runs (validation set) and the final
   test-step run. Source: wandb-summary.json for each run. */
export const rentalRuns = [
  { run: 'oowdbouo', r2: 0.5456, mae: 34.43 },
  { run: '4lciag2f', r2: 0.5463, mae: 34.4 },
  { run: 'zhy3kgk9', r2: 0.5501, mae: 34.2 },
  { run: 'e7dr7vtf', r2: 0.5506, mae: 34.18, best: true },
];
export const rentalTest = { run: 'jdt97azk', r2: 0.5634, mae: 34.01 };

export const rentalSteps = [
  ['download', 'Fetch the weekly sample and log it as a W&B artifact.'],
  ['basic_cleaning', 'Drop price outliers outside $10–350 and rows outside NYC bounds.'],
  ['data_check', 'pytest against the reference set: columns, boroughs, bounds, row count, price range, and KL divergence of the borough mix under 0.2.'],
  ['data_split', 'Split off a 20% test set, stratified by borough.'],
  ['train_random_forest', 'Random forest with TF-IDF over listing titles; sweep runs through Hydra multirun.'],
  ['test_regression_model', 'Run by hand once a model is tagged prod in W&B: score it on the held-out test set.'],
];

/* Census model — F1 by education level, every slice with at least 100
   rows in the 6,513-row test set. Source: slice_output.txt. */
export const censusOverall = { precision: 0.7419, recall: 0.6384, f1: 0.6863 };
export const censusEducation = [
  { label: '7th–8th', n: 141, f1: 0.0, recall: 0.0 },
  { label: '9th', n: 115, f1: 0.5, recall: 0.3333 },
  { label: '10th', n: 183, f1: 0.2353, recall: 0.1667 },
  { label: '11th', n: 225, f1: 0.4286, recall: 0.2727 },
  { label: 'HS grad', n: 2085, f1: 0.5261, recall: 0.4377 },
  { label: 'Some college', n: 1485, f1: 0.5914, recall: 0.5199 },
  { label: 'Assoc. (vocational)', n: 273, f1: 0.5789, recall: 0.5238 },
  { label: 'Assoc. (academic)', n: 198, f1: 0.6437, recall: 0.5957 },
  { label: 'Bachelors', n: 1053, f1: 0.7404, recall: 0.7289 },
  { label: 'Masters', n: 369, f1: 0.8409, recall: 0.8551 },
  { label: 'Professional school', n: 116, f1: 0.8852, recall: 0.9643 },
];
export const censusSex = [
  { label: 'Male', n: 4387, f1: 0.6997, recall: 0.6599 },
  { label: 'Female', n: 2126, f1: 0.6015, recall: 0.515 },
];

/* Outage tracker — repair time per service, resolved tickets only.
   Source: network_incidents.csv (generated, 500 tickets, 448 resolved). */
export const outageServices = [
  { label: 'Fiber-Backbone-East', n: 97, median: 3.23, mean: 10.74 },
  { label: 'Router-Group-A', n: 100, median: 3.36, mean: 10.57 },
  { label: 'Cloud-Gateway-Primary', n: 89, median: 2.97, mean: 9.37 },
  { label: 'VoIP-Server-Hutch', n: 85, median: 2.77, mean: 10.98 },
  { label: 'Switch-Maize-04', n: 77, median: 2.92, mean: 11.02 },
];
export const outageEndpoints = [
  ['GET /metrics/summary', 'Total tickets, open outages, MTTR in hours, and a stable or degraded flag.'],
  ['GET /incidents/active', 'Every ticket not yet resolved, as JSON records.'],
  ['GET /metrics/chart', 'Total and resolved tickets per service.'],
  ['GET /metrics/trends', 'Tickets per day, one series per service.'],
  ['GET /metrics/heatmap', 'Ticket counts by weekday and hour.'],
];
