import { labFacts } from '../data/homelab';

const LABEL = { running: 'Running', planned: 'Planned' };

/** Solid mark for running, dashed redline for planned. */
export default function Status({ value }) {
  if (!LABEL[value]) return null;
  return <span className={`status status--${value}`}>{LABEL[value]}</span>;
}

/**
 * Row header for the lab-facts tables. A row that continues the one above
 * shows no label, but still names its group for screen readers.
 */
export function RowHead({ label, i }) {
  if (label) return <th scope="row">{label}</th>;
  let j = i;
  while (j > 0 && !labFacts[j].label) j -= 1;
  return (
    <th scope="row" className="is-cont">
      <span className="sr-only">{labFacts[j].label}</span>
    </th>
  );
}
