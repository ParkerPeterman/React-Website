import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './Navigation.css';

// Data moved inside the file to keep App.jsx clean
const NAV_ITEMS = [
    {
        label: "About",
        bgColor: "#1B1722",
        textColor: "#fff",
        links: [
            { label: "Resume", href: "#Resume", ariaLabel: "Resume" },
            { label: "Careers", href: "/careers", ariaLabel: "About Careers" }
        ]
    },
    {
        label: "Projects",
        bgColor: "#2F293A",
        textColor: "#fff",
        links: [
            { label: "Featured", href: "/projects", ariaLabel: "Featured Projects" },
            { label: "Case Studies", href: "/case-studies", ariaLabel: "Project Case Studies" }
        ]
    },
    {
        label: "Contact",
        bgColor: "#544a68",
        textColor: "#fff",
        links: [
            { label: "Email", href: "mailto:petermanparker6@gmail.com", ariaLabel: "Email us" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/parker-peterman-a17430347", ariaLabel: "LinkedIn" }
        ]
    }
];

const CardNav = ({
    logo,
    logoAlt = 'Logo',
    items = NAV_ITEMS, 
    className = '',
    ease = 'power3.out',
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 280;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content');
            // top bar height (60) + content height + buffer
            return 60 + (contentEl?.scrollHeight || 200) + 20;
        }
        return 280; // Desktop height
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const navEl = navRef.current;
            gsap.set(navEl, { height: 60 });
            gsap.set(cardsRef.current, { y: 30, opacity: 0 });

            tlRef.current = gsap.timeline({ paused: true })
                .to(navEl, { height: calculateHeight(), duration: 0.4, ease })
                .to(cardsRef.current, { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.3, 
                    stagger: 0.1 
                }, "-=0.2");
        }, navRef);

        return () => ctx.revert();
    }, [items, ease]);

    const toggleMenu = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            setIsHamburgerOpen(true);
            tlRef.current?.play();
        } else {
            setIsHamburgerOpen(false);
            tlRef.current?.reverse().eventCallback("onReverseComplete", () => setIsExpanded(false));
        }
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label="Toggle menu"
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div className="logo-container">
                        <img src={logo} alt={logoAlt} className="logo" />
                    </div>

                    <button 
                        type="button" 
                        className="card-nav-cta-button"
                        onClick={() => {
                            const contactSection = document.getElementById('ContactForm');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        Lets Talk
                    </button>
                </div>

                <div className="card-nav-content">
                    {items.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="nav-card" 
                            ref={el => (cardsRef.current[idx] = el)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            {/* Card labels and links now render properly */}
                            <div className="nav-card-label">{item.label}</div>
                            
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <a 
                                        key={i} 
                                        className="nav-card-link" 
                                        href={lnk.href || "#"} 
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <GoArrowUpRight />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;