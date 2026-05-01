import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import TechnicalBackground from './components/background';
import ScrollBar from './components/ScrollBar';

import Header from './components/Header';
import Certifications from './components/Certifications';
import  {LogoLoop } from './components/LogoLoop'
import Resume from './components/Resume';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  return (
    <>
      <TechnicalBackground/>
      <ScrollBar />

      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <Header />

      <Certifications />

      <LogoLoop 
        logoHeight = {100}
        gap = {48}
        speed={55} 
        fadeOut={true} 
        fadeOutColor="#020003" 
      />
      <Resume />

      <ContactForm />

      <Footer />
    </>
  );
}

export default App;