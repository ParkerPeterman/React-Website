import React, { useRef } from 'react';

function AboutSection() {
  const videoRef = useRef(null);

  const handleVideoHover = (isHovering) => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <main>
      <div 
        className="image-container"
        onMouseEnter={() => handleVideoHover(true)}
        onMouseLeave={() => handleVideoHover(false)}
      >
        <img src="20251004_121924.jpg" alt="Portrait" className="header-image" />
        <video ref={videoRef} src="PortfolioVideo.mp4" className="header-video" muted loop />
      </div>
      <div className="about-me">
        <h5>About Me</h5>
        <p>
          Through my degree in <bold>Data Analytics</bold> and a <bold>4.0 GPA</bold>, I have developed 
          a rigorous approach to translating complex datasets into clear, actionable narratives. I thrive 
          at the intersection of mathematics and technology, balancing technical precision with the creative 
          problem-solving required to turn "what if" questions into "here is how" solutions.
        </p>
        <p>
          I am a certified <bold>AWS Cloud Practitioner</bold>, <bold>CompTIA Data+</bold>, and{' '}
          <bold>CompTIA Project+</bold> professional. This background allows me to dive into the full data 
          lifecycle—from architecting relational databases in <bold>PostgreSQL</bold> and <bold>T-SQL</bold>{' '}
          to designing scalable data pipelines within the <bold>AWS ecosystem</bold> using tools like{' '}
          <bold>Snowflake</bold> and <bold>Amazon Redshift</bold>. Whether I am cleaning a messy dataset 
          with <bold>Python</bold> (<bold>Pandas</bold> and <bold>NumPy</bold>) or building predictive 
          models using <bold>Scikit-Learn</bold>, my goal is always to provide the clarity needed for 
          high-stakes business decisions.
        </p>
        <p>
          I have a unique satisfaction in refining <bold>raw and untouched data</bold> into a strategic 
          asset through advanced visualization in <bold>Tableau</bold> and <bold>Power BI</bold>. By 
          leveraging modern tools like <bold>Power BI Copilot</bold> and <bold>Tableau Pulse</bold>, I 
          deliver AI-driven, automated insights that streamline reporting and increase calculation accuracy. 
          I am eager to bring this same energy and technical precision to your team to help solve your most 
          complex data puzzles.
        </p>
      </div>
    </main>
  );
}

export default AboutSection;
