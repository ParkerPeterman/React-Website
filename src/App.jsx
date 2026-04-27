import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Background from './components/background';
import ScrollBar from './components/ScrollBar';


import Header from './components/Header';
import AboutSection from './components/AboutSection';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';


function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  return (
    <>
      <Background       />
      <ScrollBar />

      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <section className="page-block">
      <Header />
      <AboutSection />
      </section>

      <section className="page-block">
        <Certifications />
      </section>

      <Resume />

      <ContactForm />

      <Footer />
    </>
  );
}

export default App;