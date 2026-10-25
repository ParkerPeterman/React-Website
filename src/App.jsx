import { useEffect, useState } from 'react';
import './styles/tokens.css';
import './styles/base.css';

import Masthead from './components/Masthead';
import TitleSheet from './components/TitleSheet';
import WorkSheet from './components/WorkSheet';
import LabSheet from './components/LabSheet';
import SkillsSheet from './components/SkillsSheet';
import ExperienceSheet from './components/ExperienceSheet';
import ContactSheet from './components/ContactSheet';
import Footer from './components/Footer';

import HealthCase from './pages/HealthCase';
import RentalCase from './pages/RentalCase';
import CensusCase from './pages/CensusCase';
import OutageCase from './pages/OutageCase';
import HomelabPage from './pages/HomelabPage';
import NotFound from './pages/NotFound';

const PAGES = {
  '#health': HealthCase,
  '#rental': RentalCase,
  '#census': CensusCase,
  '#outage': OutageCase,
  '#noc': OutageCase, // old link to the outage dashboard
  '#homelab': HomelabPage,
};

// Sheets on the home page, in order. The count feeds every "Sheet n / N".
const SHEETS = ['index', 'work', 'lab', 'skills', 'experience', 'contact'];
const OF = SHEETS.length;

// Anchors from the previous version of the site.
const LEGACY = { about: 'skills', record: 'experience' };

/** Minimal hash router: keeps every page addressable without a dependency. */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

/** Which sheet is under the masthead, for aria-current in the nav. */
function useCurrentSheet() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const els = SHEETS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return current;
}

function Home() {
  const current = useCurrentSheet();

  useEffect(() => {
    document.title = 'Parker Peterman | Data and ML engineer';
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <Masthead current={current} />
      <main>
        <TitleSheet sheets={OF} />
        <WorkSheet sheet={2} of={OF} />
        <LabSheet sheet={3} of={OF} />
        <SkillsSheet sheet={4} of={OF} />
        <ExperienceSheet sheet={5} of={OF} />
        <ContactSheet sheet={6} of={OF} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const hash = useHashRoute();
  const Page = PAGES[hash];
  const raw = hash.replace(/^#/, '');
  const sheet = LEGACY[raw] ?? raw;
  const isHome = !Page && (sheet === '' || SHEETS.includes(sheet));

  // Pages start at the top. Sheet links scroll once the home page has
  // rendered, which matters when arriving from a case study.
  useEffect(() => {
    if (Page) {
      window.scrollTo(0, 0);
    } else if (isHome && sheet) {
      requestAnimationFrame(() => document.getElementById(sheet)?.scrollIntoView());
    }
  }, [hash, Page, isHome, sheet]);

  if (Page) return <Page />;
  if (!isHome) return <NotFound />;
  return <Home />;
}
