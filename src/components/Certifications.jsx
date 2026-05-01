import React, { useEffect } from 'react';
import './Certifications.css';

function Certifications() {
  const certifications = [
    { id: 1, img: "Amazon_Web_Services_Logo.svg", title: "AWS Cloud Practitioner", issued: "December 2025" },
    { id: 2, img: "data+_picture.png", title: "CompTIA Data+", issued: "January 2026" },
    { id: 3, img: "project+_picture.webp", title: "CompTIA Project+", issued: "March 2026" },
    { id: 4, img: "udacity_logo.webp", title: "Udacity Data Analytics Nanodegree", issued: "April 2026" }
  ];

  useEffect(() => {
    // ── UI Interactions (Tilt) ────────────────────────────────────────────────
    const slides = document.querySelectorAll('.cert-card');
    const handleMouseMove = (e, slide) => {
      const { left, top, width, height } = slide.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      slide.style.transition = 'transform 0.1s ease';
      slide.style.transform = `perspective(600px) rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale(1.03)`;
    };

    const handleMouseLeave = (slide) => {
      slide.style.transition = 'transform 0.4s ease';
      slide.style.transform = '';
    };

    slides.forEach(slide => {
      slide.addEventListener('mousemove', (e) => handleMouseMove(e, slide));
      slide.addEventListener('mouseleave', () => handleMouseLeave(slide));
    });

    // ── Scroll Progress ──────────────────────────────────────────────────────
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="certifications-section">
      {/* Scroll Progress Bar */}
      <div id="scroll-progress-container" style={{ position: 'fixed', top: 0, width: '100%', height: '4px', zIndex: 100 }}>
        <div id="scroll-progress" style={{ height: '100%', background: '#FE4C25', width: '0%' }}></div>
      </div>

      <div className="cert-grid-container">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div 
              className="cert-image" 
              style={{ backgroundImage: `url(${cert.img})` }} 
            />
            <div className="cert-info">
              <h3>{cert.title}</h3>
              <p>{cert.issued}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;