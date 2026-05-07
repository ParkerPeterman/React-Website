import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import TechnicalBackground from './components/background';
import ScrollBar from './components/ScrollBar';

import Navigation from './components/Navigation';
import Header from './components/Header';
import Certifications from './components/Certifications';
import { LogoLoop } from './components/LogoLoop'
import Resume from './components/Resume';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import DashboardShowcase from './components/DashboardShowcase';

import RentalDashboard from './components/dashboards/RentalDashboard/RentalDashboard';
import CensusDashboard from './components/dashboards/CensusDashboard/CensusDashboard';
import NOCDashboard from './components/dashboards/NOCDashboard/NOCDashboard';

const logo = '/Logo.svg';

function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#rental') return <RentalDashboard />;
  if (currentHash === '#census') return <CensusDashboard />;
  if (currentHash === '#noc') return <NOCDashboard />;

  return (
    <>
      <TechnicalBackground />
      <ScrollBar />

      <Navigation logo={logo} logoAlt="Parker Peterman Logo" />

      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <Header />

      <div id="DashboardShowcase">
        <DashboardShowcase />
      </div>

      <Certifications />

      <LogoLoop
        logoHeight={100}
        gap={48}
        speed={55}
        fadeOut={true}
        fadeOutColor="#020003"
      />
      
      <div id="Resume">
        <Resume />
      </div>

      <div id="ContactForm">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}

export default App;