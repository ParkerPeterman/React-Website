import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TechnicalBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    const spacing = 35; // Distance between dots
    const mouseRadius = 120; // Area of effect
    const repulsionStrength = 15; // How far they move

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    // Create the grid
    const initDots = () => {
      dots = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // The Render Loop (Powered by GSAP for 60fps smoothness)
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6338fd'; // Dot color
      
      dots.forEach(dot => {
        const dx = mouse.current.x - dot.originX;
        const dy = mouse.current.y - dot.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          // Calculate the push-away force
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;
          
          // Move dot away from origin
          dot.x = dot.originX - Math.cos(angle) * force * repulsionStrength;
          dot.y = dot.originY - Math.sin(angle) * force * repulsionStrength;
        } else {
          // Smoothly return to origin using "easing" math
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    // GSAP Ticker is better than requestAnimationFrame for sync with other GSAP anims
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-[#020617]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none', 
        backgroundColor: '#000000' 
  }}
    />
  );
};

export default TechnicalBackground;