import CaseLayout, { Section, Ticks } from './CaseLayout';
import Figure from '../components/Figure';
import { BarChart } from '../components/charts/Charts';
import { projectById, rentalImportance, rentalRuns, rentalTest, rentalSteps } from '../data/projects';

const p = projectById.rental;
const f2 = (v) => v.toFixed(2);

const dataTests = [
  ['test_column_names', 'The expected columns, in order'],
  ['test_neighborhood_names', 'Only the five known boroughs'],
  ['test_proper_boundaries', 'Every listing inside NYC’s longitude and latitude bounds'],
  ['test_similar_neigh_distrib', 'KL divergence of the borough mix against the reference set below 0.2'],
  ['test_row_count', 'A plausible number of rows'],
  ['test_price_range', 'Every price between $10 and $350'],
];

export default function RentalCase() {
  return (
    <CaseLayout
      id="rental"
      kind={`${p.kind}, ${p.year}`}
      title={p.title}
      summary="A property manager gets new rental data every week and needs prices retrained on the same cadence. The work is a pipeline that can be re-run end to end on each new batch: clean, test the data, split, train, sweep, and score the production model on held-out data."
      facts={[
        ['Role', 'Built on Udacity’s starter kit. The shared components came with it; cleaning, data tests, EDA and training are mine'],
        ['Stack', 'MLflow, Hydra, Weights & Biases, scikit-learn, pandas, pytest, conda'],
        ['Result', `Test R² ${f2(rentalTest.r2)}, MAE $${f2(rentalTest.mae)}`],
        ['Code', <a key="r" href={p.repo} target="_blank" rel="noopener noreferrer">github.com/ParkerPeterman/Project-Build-an-ML-Pipeline-Starter</a>],
      ]}
    >
      <Section n={1} title="Pipeline">
        <p>
          Each step is its own MLflow project with its own environment, reading and writing versioned
          W&amp;B artifacts, so any step can be re-run on its own and every model can be traced to the
          exact data it saw. Hydra holds the configuration, and overrides on the command line drive the
          sweep.
        </p>
        <ol className="steps">
          {rentalSteps.map(([name, what]) => (
            <li key={name}>
              <div>
                <b>{name}</b>
                <span>{what}</span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section n={2} title="Data tests">
        <p>
          New data has to pass these before anything trains. The distribution check matters most: if
          next week’s borough mix drifts too far from the reference set, the run stops instead of
          quietly training on a different population.
        </p>
        <div className="table-scroll" tabIndex={0} aria-label="Data tests">
          <table className="spec">
            <thead><tr><th scope="col">Test</th><th scope="col">Checks</th></tr></thead>
            <tbody>
              {dataTests.map(([t, c]) => (
                <tr key={t}><th scope="row">{t}</th><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={3} title="Results">
        <div className="table-scroll" tabIndex={0} aria-label="Sweep and test results">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Run</th>
                <th scope="col">Set</th>
                <th scope="col" className="num">R²</th>
                <th scope="col" className="num">MAE</th>
              </tr>
            </thead>
            <tbody>
              {rentalRuns.map((r) => (
                <tr key={r.run}>
                  <th scope="row">{r.run}{r.best && ' (promoted)'}</th>
                  <td>Validation</td>
                  <td className="num">{r.r2.toFixed(3)}</td>
                  <td className="num">${r.mae.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">{rentalTest.run}</th>
                <td><b>Held-out test</b></td>
                <td className="num"><b>{rentalTest.r2.toFixed(3)}</b></td>
                <td className="num"><b>${rentalTest.mae.toFixed(2)}</b></td>
              </tr>
            </tbody>
            <caption>From each run’s wandb-summary.json. Prices in the data run from $10 to $350.</caption>
          </table>
        </div>

        <Figure
          n={1}
          title="Feature importance of the promoted model. Two features carry about 82% of it: the TF-IDF terms from the listing title, and the room type."
          source="W&B run e7dr7vtf, logged feature-importance plot. Values are read off the chart, so treat them as ±0.005."
          table={{ head: ['Feature', 'Importance'], rows: rentalImportance.map((r) => [r.label, `≈${f2(r.value)}`]) }}
        >
          <BarChart
            rows={rentalImportance}
            max={0.56}
            format={(v) => (v < 0.005 ? '<0.01' : `≈${f2(v)}`)}
            highlight={['Listing title (TF-IDF)', 'Room type']}
            label="Feature importance, all eleven features"
          />
        </Figure>
      </Section>

      <Section n={4} title="Reading the result">
        <p>
          An R² of 0.56 means the model explains a little over half the variance in price, and a typical
          miss of about $34 on listings that run from $10 to $350. That’s useful as a starting estimate
          for a pricing team, not a final answer. The sweep moved validation R² by only 0.005, so better
          scores are unlikely to come from tuning this model harder.
        </p>
        <p>
          Borough contributes almost nothing on its own, even though location obviously matters for
          price. The likely reason is that latitude and longitude carry the same signal more finely, which
          leaves the borough column with little to add.
        </p>
      </Section>

      <Section n={5} title="What I’d try next">
        <Ticks
          items={[
            'More text features. Five TF-IDF terms from the title already carry the most importance, so a larger vocabulary or embeddings of the title are the obvious next lever.',
            'Predict log price. Errors on a $300 listing and a $40 listing shouldn’t count the same.',
            'Try gradient boosting against the random forest, with the same data tests and the same held-out set so the comparison is fair.',
          ]}
        />
      </Section>
    </CaseLayout>
  );
}
