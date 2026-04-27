import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TypeWriter from './TypeWriter';
import Magnet from './Magnet';

function Header() {
  const container = useRef();
  const name = "Parker Peterman";

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

    // 1. Letters fall from the top
    tl.from(".letter", {
      y: -80,
      opacity: 0,
      stagger: 0.04,
      ease: "back.out(1.7)" // Adds a slight snappy 'bounce' at the end
    })
    // 2. Icons slide in from the sides (GitHub from left, LinkedIn from right)
    .from(".github", { x: -60, opacity: 0 }, "-=0.6")
    .from(".linkedin", { x: 60, opacity: 0 }, "<") // "<" starts exactly with the previous animation
    // 3. Contact info slides up from bottom
    .from(".contact-details", { y: 30, opacity: 0 }, "-=0.4");

  }, { scope: container });

  return (
    <header ref={container}>
      <div className="header-container">
        <div className="github">
          <Magnet>
            <a href="https://github.com/ParkerPeterman" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </Magnet> 
        </div>

        <h1 className="user-name">
          {/* Wrap the first name */}
          <span className="name-wrapper" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {"Parker".split("").map((char, index) => (
              <span key={`parker-${index}`} className="letter">
                {char}
              </span>
            ))}
          </span>

          {/* Non-breaking space between names */}
          <span className="letter">&nbsp;</span>

          {/* Wrap the last name */}
          <span className="name-wrapper" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {"Peterman".split("").map((char, index) => (
              <span key={`peterman-${index}`} className="letter">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div className="linkedin">
          <Magnet>
            <a href="https://www.linkedin.com/in/parker-peterman-a17430347/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </Magnet>
        </div>
      </div>

      <h3 className="contact-details">
        <em>Maize, Kansas</em> || <em>(316) 680-5045</em> || <em>petermanparker6@gmail.com</em>
      </h3>
      
      <TypeWriter />
    </header>
  );
}

export default Header;