import React, { useState, useEffect, useRef } from 'react';
import './Resume.css';

// Reusable component to handle individual section animations
const ResumeSection = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once the animation has triggered
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } 
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="resume-section">
      <div className={`side-header ${isVisible ? 'animate-left' : ''}`}>
        <h2>{title}</h2>
        <hr />
      </div>
      <div className={`side-content ${isVisible ? 'animate-right' : ''}`}>
        {children}
      </div>
    </section>
  );
};

function Resume() {
  return (
    <div className="resume">
      
      <ResumeSection title="Education">
        <article className="resume-item">
          <div className="resume-title">
            <h3>Maize High School | Diploma</h3>
            <span className="right-aligned">Sep 2020 - May 2024</span>
          </div>
          <ul>
            <li>4.2 GPA</li>
            <li>National Honors Society</li>
          </ul>
        </article>

        <article className="resume-item">
          <div className="resume-title">
            <h3>Western Governors University | Bachelor's in Data Analytics</h3>
            <span className="right-aligned">October 2024 - October 2026</span>
          </div>
          <ul>
            <li>4.0 GPA</li>
            <li>Data Analytics Major</li>
            <li>Math Minor</li>
          </ul>
        </article>

        <article className="resume-item">
          <div className="resume-title">
            <h3>Certifications</h3>
          </div>
          <ul>
            <li>CompTIA Project+ | CompTIA | March, 2026</li>
            <li>CompTIA Data+ | CompTIA | January, 2026</li>
            <li>AWS Cloud Practitioner | Amazon Web Services | December, 2025</li>
            <li>Udacity Data Analytics Nanodegree | Udacity | May, 2026</li>
          </ul>
        </article>
      </ResumeSection>

      <ResumeSection title="Skills">
        <article className="resume-item">
          <div className="resume-title">
            <h3>Tools</h3>
          </div>
          <ul>
            <li>
              Expert in architecting relational databases using <bold>PostgreSQL, MySQL</bold>, and{' '}
              <bold>T-SQL</bold> to ensure data integrity and optimized query performance for large-scale datasets.
            </li>
            <li>
              <bold>Advanced Business Intelligence</bold>: Leveraging <bold>Microsoft Power BI (DAX, Power Query)</bold>{' '}
              and <bold>Tableau Desktop</bold> to transform complex data into interactive dashboards. Utilizing{' '}
              <bold>Tableau Pulse</bold> and <bold>Power BI Copilot</bold> to deliver AI-driven, automated insights to stakeholders.
            </li>
            <li>
              <bold>Statistical Programming & Machine Learning</bold>: Developing predictive models and performing deep 
              exploratory data analysis (EDA) using <bold>Python</bold>, specifically utilizing Pandas for manipulation,{' '}
              <bold>NumPy</bold> for computation, and <bold>Scikit-Learn</bold> for modeling.
            </li>
            <li>
              <bold>Cloud Data Architecture</bold>: Designing scalable data pipelines within the <bold>AWS</bold> ecosystem. 
              Proficient in managing cloud warehouses like <bold>Snowflake</bold>, <bold>Amazon Redshift</bold>, and{' '}
              <bold>Google BigQuery</bold>, while automating ETL processes via <bold>Fivetran</bold> and <bold>Airbyte</bold>.
            </li>
            <li>
              <bold>Advanced Analytics & Automation</bold>: Streamlining reporting workflows in <bold>Excel</bold> by utilizing{' '}
              <bold>Power Query</bold>, <bold>VBA/Macros</bold>, and <bold>Python in Excel</bold> to reduce manual processing 
              time and increase calculation accuracy.
            </li>
          </ul>
        </article>
      </ResumeSection>

      <ResumeSection title="Work Experience">
        <article className="resume-item">
          <div className="resume-title">
            <h3>Ennovar at Kansas Fiber Network | Software Engineer</h3>
          </div>
          <ul>
            <li><bold>Software Development & Monitoring:</bold> Co-developed a real-time monitoring and tracking application focused on visualizing and analyzing core network infrastructure metrics.</li>
            <li><bold>Automation & Logic Implementation: </bold> Programmed automated logic to evaluate system downtime against SLA contracts and automate MTTR calculations, reducing administrative overhead.</li>
            <li><bold>System Architecture & Data Flow:  </bold> Architected a distributed compute model and local database caching system to optimize real-time data flows and maintain high operational uptime.</li>
            <li><bold>Quality Assurance & Documentation: </bold> Contributed to debugging, technical problem identification, and documentation of software components across operational workflows.</li>
          </ul>
        </article>

        <article className="resume-item">
          <div className="resume-title">
            <h3>Ennovar at Textron Aviation | Technical Operations Team</h3>
          </div>
          <ul>
            <li><bold>Defense Contracting Security Compliance: </bold> Operated within a strictly controlled environment, maintaining defense contract security compliance standards.</li>
            <li><bold>Systems Integration & Analytics: </bold> Integrated ServiceNow ticketing data to engineer, maintain, and optimize real-time operational health dashboards.</li>
            <li><bold>System Architecture & Data Flow:  </bold> Imaged organizational systems with custom, department-specific software configurations based on individual user roles.</li>
            <li><bold>Technical Support & Diagnostics:  </bold> Resolved complex hardware, software, and configuration issues while providing detailed documentation for organizational assets.</li>
          </ul>
        </article>
      </ResumeSection>

      <ResumeSection title="Community Service">
        <article className="resume-item">
          <ul>
            <li>
              Collaborated with local and state government bodies to rename a street near my high school in 
              commemoration of our principal who is battling cancer as well as giving speeches at fundraising events.
            </li>
            <li>
              Led an effort to landscape homes, either owned by community members with disabilities or homes that 
              were abandoned, in an effort to beautify the neighborhood.
            </li>
          </ul>
        </article>
      </ResumeSection>

    </div>
  );
}

export default Resume;