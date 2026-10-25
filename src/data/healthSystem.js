// Figure 1: the Personal Health & Training System, part by part.
// Copy is condensed from the repo's README and docs/design-notes.md.
//
// Geometry is in the figure's own units (viewBox 1040 × 440). Each node is
// a 140 × 58 box placed on a 6-column, 3-row grid.

export const VIEW = { w: 1040, h: 440, node: { w: 140, h: 58 } };

const col = (i) => 20 + i * 172;
const row = (j) => 36 + j * 130;

export const nodes = [
  {
    id: 'garmin',
    x: col(0), y: row(0),
    name: 'Garmin watch',
    sub: 'sleep, HRV, runs',
    does: 'Sleep, HRV, resting heart rate, runs and effort, pulled from Garmin Connect at 04:00, 07:30 and 10:30 by a cron container. Every pull is an upsert, so the later runs fill in last night’s sleep without duplicating anything.',
    code: 'src/healthtracker/ingest, with a FIT-file fallback',
    why: 'The Garmin API is unofficial and can break. FIT exports dropped into an inbox folder go through the same parsers, so a broken API never means lost data.',
  },
  {
    id: 'app',
    x: col(0), y: row(2),
    name: 'Tracker app',
    sub: 'manual logs',
    does: 'An installable React app for what the watch can’t see: food with barcode lookup from Open Food Facts, lifts, games, weight, water, journal and injuries. It writes straight to the core tables and shows the morning’s coaching.',
    code: 'src/healthtracker/api (FastAPI) and web/ (React + TypeScript PWA)',
    why: 'Logging has to take under two minutes a day or it stops happening, so recent foods, saved meals and last session’s lifts are one tap away.',
  },
  {
    id: 'raw',
    x: col(1), y: row(0),
    name: 'raw.ingest',
    sub: 'as received',
    does: 'Every payload exactly as it arrived, before any parsing.',
    code: 'db/migrations/001_schema_v3.sql, raw schema',
    why: 'If a parser turns out to be wrong (Garmin’s effort scale is still unverified), a parser fix plus one backfill command corrects all of history.',
  },
  {
    id: 'core',
    x: col(1), y: row(1),
    name: 'core',
    sub: 'cleaned facts',
    does: 'Parsed, typed facts: sleep, activities, sets, food entries. When a manual workout overlaps a Garmin one by half or more, the Garmin row wins and inherits the sets, RPE and notes only the manual entry knew.',
    code: 'src/healthtracker/transform',
    why: 'Missing food days are stored as missing, never as zero, so a skipped log can’t look like a day of fasting to the rules.',
  },
  {
    id: 'features',
    x: col(2), y: row(1),
    name: 'daily_features',
    sub: 'one row per day',
    does: 'Training load, acute:chronic workload ratio, estimated 1RM, weekly hard sets, and recovery z-scores against my own rolling baseline.',
    code: 'src/healthtracker/features',
    why: 'Baselines use the last 30 eligible days, skipping sick, travel and injury days. A calendar window blanked every z-score for a month after an injury, exactly when recovery monitoring matters most.',
  },
  {
    id: 'rules',
    x: col(3), y: row(1),
    name: 'Rules engine',
    sub: '16 starter rules',
    does: 'Rules read daily_features and emit actions. Their thresholds live in a database table, so tuning a rule never needs a code change or a deploy.',
    code: 'src/healthtracker/rules',
    why: 'New rules run in shadow mode: graded exactly like visible ones but hidden, until my own data shows that following them helps.',
  },
  {
    id: 'actions',
    x: col(4), y: row(1),
    name: 'Actions',
    sub: 'graded targets',
    does: 'Every suggestion is a metric, a comparator and a target, like “nothing above RPE 6 today”. The next morning a grading job records whether it was followed and how recovery compared to baseline.',
    code: 'src/healthtracker/recommend',
    why: 'Advice that can’t be checked can’t be evaluated. When two actions constrain the same metric, only the stricter one is shown, but both are graded.',
  },
  {
    id: 'llm',
    x: col(5), y: row(1),
    name: 'Local LLM',
    sub: 'phrases only',
    does: 'Qwen3 14B on Ollama turns the actions into a short coaching message, returning JSON under a schema. A guard checks that every action is covered exactly once and that every number in the text appears in the input.',
    code: 'src/healthtracker/llm/guard.py',
    why: 'Code decides; the LLM phrases. If the guard fails after one retry, or Ollama is down, a deterministic template is used and the reason is stored with the recommendation.',
  },
  {
    id: 'stats',
    x: col(3), y: row(2),
    name: 'Weekly stats',
    sub: 'tests, proposals',
    does: 'Each Sunday it tests pre-registered hypotheses with OLS and Newey-West errors, a 7-day block bootstrap and Benjamini-Hochberg correction. Supported findings become proposals to tune, promote or retire rules.',
    code: 'src/healthtracker/stats',
    why: 'Consecutive days aren’t independent, so plain p-values would overstate everything. A finding also has to replicate in the later half of the data, and nothing changes until I approve it.',
  },
];

const n = Object.fromEntries(nodes.map((d) => [d.id, d]));
const W = VIEW.node.w;
const H = VIEW.node.h;
const cx = (id) => n[id].x + W / 2;
const cy = (id) => n[id].y + H / 2;
const right = (id) => n[id].x + W;
const left = (id) => n[id].x;
const top = (id) => n[id].y;
const bottom = (id) => n[id].y + H;

/* Orthogonal edges, drawn as SVG paths. `label` sits at [lx, ly]. */
export const edges = [
  { from: 'garmin', to: 'raw', d: `M${right('garmin')} ${cy('garmin')} H${left('raw')}` },
  { from: 'raw', to: 'core', d: `M${cx('raw')} ${bottom('raw')} V${top('core')}`, label: 'parsed', lx: cx('raw') + 10, ly: (bottom('raw') + top('core')) / 2 + 4, anchor: 'start' },
  { from: 'app', to: 'core', d: `M${right('app')} ${cy('app')} H${cx('core')} V${bottom('core')}`, label: 'logs', lx: cx('core') + 10, ly: (bottom('core') + cy('app')) / 2 + 4, anchor: 'start' },
  { from: 'core', to: 'features', d: `M${right('core')} ${cy('core')} H${left('features')}` },
  { from: 'features', to: 'rules', d: `M${right('features')} ${cy('features')} H${left('rules')}` },
  { from: 'rules', to: 'actions', d: `M${right('rules')} ${cy('rules')} H${left('actions')}` },
  { from: 'actions', to: 'llm', d: `M${right('actions')} ${cy('actions')} H${left('llm')}` },
  { from: 'features', to: 'stats', d: `M${cx('features')} ${bottom('features')} V${cy('stats')} H${left('stats')}`, label: 'weekly', lx: cx('features') + 10, ly: (bottom('features') + cy('stats')) / 2 + 4, anchor: 'start' },
  { from: 'actions', to: 'stats', d: `M${cx('actions')} ${bottom('actions')} V${cy('stats')} H${right('stats')}`, label: 'graded next morning', lx: cx('actions') + 10, ly: (bottom('actions') + cy('stats')) / 2 + 4, anchor: 'start' },
  { from: 'stats', to: 'rules', d: `M${cx('stats')} ${top('stats')} V${bottom('rules')}`, label: 'proposals I approve', lx: cx('stats') + 10, ly: (top('stats') + bottom('rules')) / 2 + 4, anchor: 'start' },
  { from: 'llm', to: 'app', d: `M${cx('llm')} ${bottom('llm')} V400 H${cx('app')} V${bottom('app')}`, label: 'coaching message, checked by the guard', lx: (cx('llm') + cx('app')) / 2 + 120, ly: 392 },
];

/* Reading order for the narrow, stacked version of the figure. */
export const stackedOrder = ['garmin', 'app', 'raw', 'core', 'features', 'rules', 'actions', 'llm', 'stats'];
