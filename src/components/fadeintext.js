import React, { useState, useEffect } from 'react';
import './FadeInText.css';

const FadeInText = ({ 
    text, 
    direction = 'left', // 'left' or 'right'
    duration = 1.5,     // seconds
    delay = 0 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <span 
        className={`fade-text ${direction} ${isVisible ? 'visible' : ''}`}
        style={{ '--duration': `${duration}s` }}
        >
        {text}
        </span>
    );
};

export default FadeInText;