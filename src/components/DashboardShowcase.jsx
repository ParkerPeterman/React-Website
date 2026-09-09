import React, { useEffect, useRef, useState } from 'react';
import './DashboardShowcase.css';

const DashboardShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    // Handle Mobile Resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects = [
    {
      title: "Short-Term Rental Price ML Pipeline",
      description: "An end-to-end Machine Learning pipeline predicting short-term rental prices in NYC using Weights & Biases and MLflow for tracking and deployment.",
      tags: ["Python", "MLflow", "Weights & Biases", "Hydra"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500",
      link: "#rental"
    },
    {
      title: "Scalable ML Pipeline with FastAPI",
      description: "Developed and deployed a machine learning model on Census data with a RESTful API using FastAPI, tracking data versions via DVC.",
      tags: ["FastAPI", "DVC", "Python", "GitHub Actions"],
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800&h=500",
      link: "#census"
    },
    {
      title: "Web Outage Tracker",
      description: "A network incident tracker and predictor using a Python backend and robust data generation techniques.",
      tags: ["Python", "Networking", "Data Generation"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800&h=500",
      link: "#noc"
    }
  ];

  const renderProjectCard = (project, index, isDropdownDisplay = false) => (
    <div 
      key={index} 
      className={`project-card ${isVisible && !isDropdownDisplay ? 'fade-in-up' : ''} project-card-${index}`}
      style={{ transitionDelay: !isDropdownDisplay ? `${index * 0.15}s` : '0s' }}
    >
      <div className="project-image-container">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay">
          {project.link ? (
            <a href={project.link} className="view-project-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              View Project
            </a>
          ) : (
            <button className="view-project-btn">View Details</button>
          )}
        </div>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="dashboard-showcase">
      <div className={`showcase-header ${isVisible ? 'fade-in-up' : ''}`}>
        <h2>Featured Data & ML Projects</h2>
        <p>Turning complex data into actionable insights with robust machine learning pipelines and custom web solutions.</p>
        <hr className="header-line" />
      </div>

      {isMobile ? (
        <div className="mobile-projects-container">
          <select 
            className="project-dropdown"
            value={selectedProjectIndex}
            onChange={(e) => setSelectedProjectIndex(Number(e.target.value))}
          >
            {projects.map((project, index) => (
              <option key={index} value={index}>
                {project.title}
              </option>
            ))}
          </select>
          <div className="mobile-project-display">
            {renderProjectCard(projects[selectedProjectIndex], selectedProjectIndex, true)}
          </div>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
      )}
    </section>
  );
};

export default DashboardShowcase;
