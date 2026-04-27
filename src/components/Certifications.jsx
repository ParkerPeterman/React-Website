import React from 'react';
import './Certifications.css';

function Certifications() {
  const certifications = [
    {
      img: "Amazon_Web_Services_Logo.svg",
      title: "AWS Cloud Practitioner",
      issued: "December 2025"
    },
    {
      img: "data+_picture.png",
      title: "CompTIA Data+",
      issued: "January 2026"
    },
    {
      img: "project+_picture.webp",
      title: "CompTIA Project+",
      issued: "March 2026"
    },
    {
      img: "udacity_logo.webp",
      title: "Udacity Data Analytics Nanodegree",
      issued: "April 2026"
    }
  ];

  return (
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
  );
}

export default Certifications;
