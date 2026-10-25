import CaseLayout, { Section, Ticks } from './CaseLayout';
import Figure from '../components/Figure';
import { DotPlot } from '../components/charts/Charts';
import { projectById, censusOverall, censusEducation, censusSex } from '../data/projects';

const p = projectById.census;
const f2 = (v) => v.toFixed(2);

export default function CensusCase() {
  return (
    <CaseLayout
      id="census"
      kind={`${p.kind}, ${p.year}`}
      title={p.title}
      summary="Predicts whether a person earns more than $50K a year from 1994 Census data, served as a REST API. The point of the project is the delivery around the model: tests, CI, a model card, and a slice report that shows who the model fails."
      facts={[
        ['Role', 'Built on Udacity’s starter code; the model, API, tests, CI and model card are mine'],
        ['Stack', 'scikit-learn, FastAPI, Pydantic, pytest, flake8, GitHub Actions'],
        ['Result', `Precision ${censusOverall.precision.toFixed(3)}, recall ${censusOverall.recall.toFixed(3)}, F1 ${censusOverall.f1.toFixed(3)}`],
        ['Code', <a key="r" href={p.repo} target="_blank" rel="noopener noreferrer">github.com/ParkerPeterman/Deploying-a-Scalable-ML-Pipeline-with-FastAPI</a>],
      ]}
    >
      <Section n={1} title="What I built">
        <Ticks
          items={[
            <><strong>Data processing.</strong> One-hot encoding for the eight categorical features and a binarized label, with the fitted encoders saved alongside the model so inference uses exactly the same transform.</>,
            <><strong>Model.</strong> A random forest (100 trees, fixed seed) trained on 80% of the data and scored on the remaining 6,513 rows.</>,
            <><strong>API.</strong> FastAPI with a GET welcome route and a POST route for inference. The request body is a Pydantic model with field aliases, because the census columns have hyphens in their names.</>,
            <><strong>CI.</strong> GitHub Actions runs flake8 and the pytest suite on every push.</>,
            <><strong>Model card.</strong> Intended use, data, metrics, and the ethical caveats of a 1994 dataset with race, sex and native country as inputs.</>,
          ]}
        />
      </Section>

      <Section n={2} title="Slice report">
        <p>
          A single F1 of 0.686 says little about who the model works for, so performance is reported on
          all 99 values of the eight categorical features. The pattern is clear: precision stays high,
          but recall falls with education. For high-school graduates, the largest group in the test set,
          recall is 0.44, so the model misses more than half of the high earners without a degree.
        </p>

        <Figure
          n={1}
          title="F1 by education level, every slice with at least 100 rows. Hover or focus a row for its recall."
          source="slice_output.txt, test set. The line marks the overall F1 of 0.686. Five slices under 100 rows, Doctorate among them, are left out."
          table={{
            head: ['Education', 'Rows', 'F1', 'Recall'],
            rows: censusEducation.map((s) => [s.label, s.n.toLocaleString(), f2(s.f1), f2(s.recall)]),
          }}
        >
          <DotPlot
            rows={censusEducation.map((s) => ({ label: s.label, n: s.n, value: s.f1, recall: s.recall }))}
            refValue={censusOverall.f1}
            refLabel="overall 0.69"
            detail={(r) => `recall ${f2(r.recall)}`}
            label="F1 by education level"
          />
        </Figure>

        <div className="table-scroll" tabIndex={0} aria-label="Performance by sex">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Sex</th>
                <th scope="col" className="num">Rows</th>
                <th scope="col" className="num">Recall</th>
                <th scope="col" className="num">F1</th>
              </tr>
            </thead>
            <tbody>
              {censusSex.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td className="num">{s.n.toLocaleString()}</td>
                  <td className="num">{f2(s.recall)}</td>
                  <td className="num">{f2(s.f1)}</td>
                </tr>
              ))}
            </tbody>
            <caption>The same gap by sex: the model finds 66% of high-earning men and 52% of high-earning women.</caption>
          </table>
        </div>
      </Section>

      <Section n={3} title="Evidence">
        <div className="case__shots case__shots--wide">
          <figure className="shot">
            <img src="/work/census-continuous_integration.webp" width="952" height="636" loading="lazy"
              alt="GitHub repository page showing the Python CI workflow passed: build on Python 3.10, successful in 32 seconds." />
            <figcaption>CI passing on push: flake8 and pytest on Python 3.10.</figcaption>
          </figure>
          <div className="case__stack">
            <figure className="shot">
              <img src="/work/census-local_api.webp" width="1375" height="286" loading="lazy"
                alt="Terminal output from local_api.py: status 200 for the welcome route, then status 200 and a prediction of <=50K for a sample person." />
              <figcaption>Calling the running API: both routes return 200.</figcaption>
            </figure>
            <figure className="shot">
              <img src="/work/census-unit_test.webp" width="1115" height="628" loading="lazy"
                alt="pytest output with the three unit tests passing." />
              <figcaption>The three unit tests.</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section n={4} title="What I’d try next">
        <Ticks
          items={[
            'Move the decision threshold. The model is precise but misses high earners; if missing them is the costlier error, a lower threshold trades a little precision for recall.',
            'Add a fairness check to CI, failing the build if the recall gap between groups grows past a set margin.',
            'Compare against gradient boosting with the same split and slice report, as the model card suggests.',
          ]}
        />
      </Section>
    </CaseLayout>
  );
}
