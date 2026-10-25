import CaseLayout, { Section, Ticks } from './CaseLayout';
import SystemDiagram from '../components/SystemDiagram';
import { projectById } from '../data/projects';

const p = projectById.health;

const principles = [
  'Code decides; the LLM phrases.',
  'Everything runs locally.',
  'Every load is an idempotent upsert.',
  'Every recommendation records what it saw.',
  'New rules run hidden (shadow mode) until my data supports them.',
  'Recovery is judged against my own rolling baseline, not population norms.',
  'Logging takes under two minutes a day.',
];

const supported = [
  ['Days per group', 'At least 20'],
  ['Adjusted p-value', 'Below 0.05 after Benjamini-Hochberg across everything tested that run'],
  ['Confidence intervals', 'Both exclude zero: Newey-West (HAC) and a 7-day moving-block bootstrap'],
  ['Effect size', 'At least 0.2 SD'],
  ['Replication', 'Same direction (p < 0.10) in the later half of the data'],
  ['Controls', 'Day of week, prior night’s sleep, previous day’s training load'],
];

const tests = [
  ['test_pipeline_db.py', 'Every layer populated, workout merging, grading, planted effects found, idempotent reruns'],
  ['test_llm_guard.py', 'Invented numbers, missing or extra actions, lost targets, advice slipped into the summary'],
  ['test_rules.py', 'Rule firing, dormant rules, error isolation, hiding the looser of two caps'],
  ['test_stats.py', 'Real effects supported, null effects not, BH matches statsmodels, balanced randomisation'],
  ['test_features_math.py', 'Pace at reference heart rate, RPE imputation, baselines that skip excluded days'],
  ['test_units_and_parsers.py', 'Garmin sleep and activity parsing, sentinel values to null, unit round trips'],
  ['test_goals.py, test_water.py', 'Energy-balance targets, goal pacing, water totals by local day'],
];

export default function HealthCase() {
  return (
    <CaseLayout
      id="health"
      kind={`${p.kind}, ${p.year}`}
      title={p.title}
      summary="A local system that collects my wearable, nutrition, training and journal data, computes stats and rule-based recommendations in code, and uses a local LLM only to phrase them as a short daily coaching message. A weekly job checks whether following the advice actually helped."
      facts={[
        ['Role', 'Sole designer and developer'],
        ['Stack', 'Python, PostgreSQL, FastAPI, React + TypeScript, Streamlit, Ollama, Docker Compose'],
        ['Size', '~8,400 lines Python, ~5,000 TypeScript, 45 tables'],
        ['Tests', '84 passing (pytest, run 25 Oct 2026)'],
        ['Code', <a key="r" href={p.repo} target="_blank" rel="noopener noreferrer">github.com/ParkerPeterman/HealthTrackerProject</a>],
      ]}
    >
      <Section n={1} title="Problem">
        <p>
          Wearable, food, training and journal data live in separate apps, and the advice those apps
          give can’t be checked against what happened next. I wanted coaching computed from my own
          baselines, on my own machine, with a record of whether each suggestion was followed and
          whether it helped.
        </p>
        <p>
          The hard constraint was trust. An LLM is good at writing a friendly paragraph and bad at
          arithmetic, so the system is built so that it never has to do any.
        </p>
      </Section>

      <Section n={2} title="How it works" wide>
        <SystemDiagram initial="features" />
        <Ticks items={principles} />
      </Section>

      <Section n={3} title="Key decisions">
        <h3>The LLM is boxed in</h3>
        <p>
          The model gets a compact JSON payload (status in display units, the fired rules, the actions
          with ids) and must return a summary plus one message per action under a JSON schema. A guard
          then checks that exactly the rule-made actions are covered once each, that every number in
          the text appears in the input, that each action’s target survives the rewording, and that
          the summary gives no advice of its own. On failure, after one retry, a deterministic template
          is used and the reason is stored.
        </p>

        <h3>Every suggestion is checkable</h3>
        <p>
          A rule emits an action as a metric, a comparator, a target and the outcome to watch. Each
          morning the grading job resolves the metric for that day and records whether the action was
          followed and how the outcome, such as next-morning HRV, compared to baseline. Shadow rules are
          graded the same way, which is what lets the weekly job propose promoting them.
        </p>

        <h3>When is a finding “supported”?</h3>
        <div className="table-scroll" tabIndex={0} aria-label="Criteria for a supported finding">
          <table className="spec">
            <thead>
              <tr><th scope="col">Requirement</th><th scope="col">Threshold</th></tr>
            </thead>
            <tbody>
              {supported.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Consecutive days aren’t independent, so plain standard errors would overstate every effect.
          Self-experiments assign days in randomized pairs balanced across weekdays and are analysed
          intention-to-treat with a permutation test.
        </p>
      </Section>

      <Section n={4} title="What it looks like">
        <div className="case__shots">
          <figure className="shot">
            <img src="/work/app-today.webp" width="800" height="1720" loading="lazy"
              alt="Today screen: recovery against baseline, one action to keep effort at RPE 6 or below, and stat cards for HRV, resting heart rate, sleep and 7-day load." />
            <figcaption>Today: the coaching, then the numbers behind it.</figcaption>
          </figure>
          <figure className="shot">
            <img src="/work/app-coach.webp" width="800" height="1720" loading="lazy"
              alt="Coach screen: the weekly job proposes moving the caffeine cutoff from 16:00 to 14:00 because later caffeine lowers that night’s sleep score by 6.4 points, with Keep and Approve buttons." />
            <figcaption>The weekly job proposes a rule change; nothing moves until I approve.</figcaption>
          </figure>
          <figure className="shot">
            <img src="/work/app-train.webp" width="800" height="1720" loading="lazy"
              alt="Training screen: the next two weeks auto-planned around fixed ultimate games, with buttons to log a game, a lift or other training." />
            <figcaption>Two weeks auto-planned around fixed games.</figcaption>
          </figure>
        </div>
        <div className="case__shots case__shots--wide">
          <figure className="shot">
            <img src="/work/dashboard-trends.webp" width="1300" height="900" loading="lazy"
              alt="Dashboard Trends page: overnight HRV and resting heart rate with 7-day and 30-day lines, sleep duration and sleep score over 90 days." />
            <figcaption>Dashboard: recovery trends with 7- and 30-day lines.</figcaption>
          </figure>
          <figure className="shot">
            <img src="/work/dashboard-insights.webp" width="1300" height="900" loading="lazy"
              alt="Dashboard Insights page: 7 supported findings, 13 weak, 16 waiting for data, with 95% confidence-interval plots." />
            <figcaption>Dashboard: weekly findings with 95% intervals.</figcaption>
          </figure>
        </div>
        <p>
          All screens show the synthetic demo athlete: 180 days of generated, realistic Garmin payloads
          with effects planted in them, kept in a separate database. A pipeline test checks that the weekly
          stats job finds those planted effects, so the statistics are exercised end to end without real
          health data in the repo.
        </p>
      </Section>

      <Section n={5} title="Verification">
        <p>
          84 tests pass, including database tests against a real Postgres instance. The suite is
          organised by layer:
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="Test files">
          <table className="spec">
            <thead>
              <tr><th scope="col">File</th><th scope="col">Covers</th></tr>
            </thead>
            <tbody>
              {tests.map(([f, c]) => (
                <tr key={f}><th scope="row">{f}</th><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          It runs as five Compose services (database, migrations, API and app, dashboard, scheduler),
          restarts itself after a reboot, and is reached from my phone over Tailscale with HTTPS so the
          barcode camera works.
        </p>
      </Section>

      <Section n={6} title="What’s next">
        <Ticks
          items={[
            <><strong>Move it onto the homelab.</strong> Postgres becomes TimescaleDB with continuous aggregates, and the nightly report moves to the larger model on llm1, falling back to the always-on model if it doesn’t wake in three minutes.</>,
            <><strong>Structured outputs at the source.</strong> Send the output schema with the Ollama request so replies are valid on the first try, instead of relying on the retry.</>,
            <><strong>An eval set from my own history.</strong> Replay stored recommendation inputs whenever the prompt or model changes, and compare outputs and my ratings.</>,
            <><strong>Phase 5 needs time, not code.</strong> A readiness model, change-point detection and retrieval over my own notes wait on 6 to 12 months of real data.</>,
          ]}
        />
      </Section>
    </CaseLayout>
  );
}
