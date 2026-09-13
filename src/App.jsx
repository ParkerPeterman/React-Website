import { useEffect, useState } from 'react';
import './styles/tokens.css';
import './styles/base.css';

import useSmoothScroll from './lib/useSmoothScroll';
import { ScrollTrigger } from './lib/motion';

import Cursor from './components/Cursor';
import ConstellationNav from './components/ConstellationNav';
import ProgressRail from './components/ProgressRail';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WorkRail from './components/WorkRail';
import About from './components/About';
import Record from './components/Record';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import RentalDashboard from './dashboards/RentalDashboard';
import CensusDashboard from './dashboards/CensusDashboard';
import NOCDashboard from './dashboards/NOCDashboard';
import CampsiteDashboard from './dashboards/CampsiteDashboard';
import SyncDashboard from './dashboards/SyncDashboard';

const DASHBOARDS = {
  '#rental': RentalDashboard,
  '#census': CensusDashboard,
  '#noc': NOCDashboard,
  '#campsite': CampsiteDashboard,
  '#sync': SyncDashboard,
};

/** Minimal hash router — keeps the dashboards addressable without a dep. */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Site() {
  useSmoothScroll();

  // Fonts change text metrics, which changes pinned scroll distances.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <Cursor />
      <ConstellationNav />
      <ProgressRail />

      <main>
        <Hero />

        <Marquee
          items={['Software Engineering', 'Machine Learning', 'Distributed Systems', 'Analytics']}
          accent="acid"
        />

        <WorkRail />
        <About />
        <Record />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  const hash = useHashRoute();
  const Dashboard = DASHBOARDS[hash];

  // Dashboards are full-screen takeovers — start them at the top.
  useEffect(() => {
    if (Dashboard) window.scrollTo(0, 0);
  }, [Dashboard, hash]);

  if (Dashboard) return <Dashboard />;
  return <Site />;
}
