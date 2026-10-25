import { identity, sections } from '../data/site';
import ThemeToggle from './ThemeToggle';
import './Masthead.css';

/** The bar along the top of every sheet: name, section links, style switch. */
export default function Masthead({ current }) {
  return (
    <header className="mast">
      <div className="mast__inner">
        <a className="mast__name" href="#index">
          {identity.first} {identity.last}
        </a>

        <nav className="mast__nav" aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={current === s.id ? 'location' : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mast__aside">
          <a className="mast__resume" href={identity.resume} download>
            Download résumé
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
