import React, { useState } from 'react';
import { gsap } from 'gsap';
import './TimeLine.css'; 

const timelineData = [
    {
        id: 1,
        type: 'education',
        title: 'Western Governors University',
        subtitle: 'Data Analytics Major | Math Minor',
        date: 'May 2023 - February 2025',
        details: ['4.0 GPA', 'Accelerated degree progress in Data Analytics'],
    },
    {
        id: 2,
        type: 'work',
        title: 'Brandt Information Services',
        subtitle: 'Technical Support',
        date: 'April 2025 - October 2025',
        details: [
        'Interpreted state wildlife regulations for callers',
        'Troubleshot Point of Sale system failures to optimize vendor operations'
        ],
    },
    {
        id: 3,
        type: 'work',
        title: 'YMCA',
        subtitle: 'Lifeguard',
        date: 'May 2023 - February 2025',
        details: [
        'Maintained compliance for state health regulations through chemical monitoring',
        'Managed early morning pool openings[cite: 5]'
        ],
    },
    {
        id: 4,
        type: 'education',
        title: 'Maize High School',
        subtitle: 'Diploma',
        date: 'Sep 2020 - May 2024',
        details: ['4.2 GPA[cite: 5]', 'National Honors Society[cite: 5]'],
    }
];

const Timeline = () => {
    const [hoveredId, setHoveredId] = useState(null);

    const onEnter = (id, e) => {
        setHoveredId(id);
        // GSAP "pop" effect on the node
        gsap.to(e.target.querySelector('.dot'), { scale: 1.5, backgroundColor: '#efc2ff', duration: 0.3 });
    };

    const onLeave = (e) => {
        setHoveredId(null);
        gsap.to(e.target.querySelector('.dot'), { scale: 1, backgroundColor: 'rgba(239, 194, 255, 0.6)', duration: 0.3 });
    };

    return (
        <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {timelineData.map((item) => (
            <div 
            key={item.id} 
            className="timeline-item"
            onMouseEnter={(e) => onEnter(item.id, e)}
            onMouseLeave={onLeave}
            >
            <div className="dot"></div>
            
            <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                
                <div className={`timeline-details ${hoveredId === item.id ? 'show' : ''}`}>
                <ul>
                    {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
};

export default Timeline;