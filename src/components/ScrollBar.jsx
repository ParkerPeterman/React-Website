import React, { useState, useEffect } from 'react';

const ScrollBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            id="scroll-progress" 
            style={{ 
                width: `${scrollProgress}%`,
                position: 'fixed',
                top: 0,
                left: 0,
                height: '4px',
                background: 'var(--link-color)',
                zIndex: 1000 
            }} 
        />
    );
};

export default ScrollBar;