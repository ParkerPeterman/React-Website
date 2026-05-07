import React, { useState, useEffect } from 'react';

const Typewriter = () => {
    const titles = ["Dashboard Specialist", "React Dashboard Developer", "Data Analytics Expert", "BI Solutions Architect"];


    const [currentTitle, setCurrentTitle] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
        const current = titles[titleIndex];
        
        if (!isDeleting && charIndex <= current.length) {
            setCurrentTitle(current.substring(0, charIndex));
            setCharIndex(charIndex + 1);
        } else if (isDeleting && charIndex >= 0) {
            setCurrentTitle(current.substring(0, charIndex));
            setCharIndex(charIndex - 1);
        }

        if (!isDeleting && charIndex === current.length + 1) {
            setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setTitleIndex((titleIndex + 1) % titles.length);
        }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, titles]);

    return <h4>{currentTitle || '\u00A0'}</h4>;
};

export default Typewriter;