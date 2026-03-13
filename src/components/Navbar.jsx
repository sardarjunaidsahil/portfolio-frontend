import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home", },
  { path: "/projects", label: "Projects", },
  { path: "/skills", label: "Skills", },
  { path: "/contact", label: "Contact", },
  { path: "/about", label: "About", },
];

const GREEN = "#63FFB4";
const DARK = "#08080C";
const GRAY = "#8892a4";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Dancing+Script:wght@700&display=swap');

        .nb-root {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 9999;
          transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
          background: rgba(8,8,12,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99,255,180,0.12);
        }
        .nb-root.scrolled {
          box-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }
        .nb-root.top {
          box-shadow: none;
        }
        .nb-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* LOGO */
        .nb-logo {
          display: flex; align-items: center; gap: 3px;
          text-decoration: none;
        }
        .nb-logo-bracket {
          display: none;
        }
        .nb-logo:hover .nb-logo-bracket { opacity: 1; }
        .nb-logo-text {
          font-family: 'Dancing Script', cursive;
          font-size: 1.5rem; font-weight: 700;
          color: #63FFB4; letter-spacing: 0.02em;
          transition: color 0.2s;
          text-shadow: 0 0 20px rgba(99,255,180,0.4);
        }
        .nb-logo:hover .nb-logo-text { color: ${GREEN}; }
        .nb-logo-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${GREEN};
          animation: nbpulse 2.5s ease-in-out infinite;
        }
        @keyframes nbpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.6); }
        }

        /* DESKTOP NAV */
        .nb-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }
        @media(max-width:768px){ .nb-links { display:none; } }

        .nb-link {
          position: relative;
          display: flex; align-items: center;
          padding: 8px 14px;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: ${GRAY};
          transition: color 0.2s;
        }
        .nb-link:hover { color: #e8eaf0; }
        .nb-link.active { color: ${GREEN}; }

        .nb-underline {
          position: absolute; bottom: 0; left: 14px; right: 14px;
          height: 1px; background: ${GREEN};
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nb-link:hover .nb-underline,
        .nb-link.active .nb-underline { transform: scaleX(1); }

        /* HIRE ME */
        .nb-hire {
          position: relative; overflow: hidden;
          margin-left: 16px; padding: 9px 22px;
          border: 1px solid ${GREEN}; color: ${GREEN};
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.9rem; letter-spacing: 0.03em;
          text-decoration: none; cursor: pointer;
          background: transparent;
          border-radius: 2px;
          clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition: color 0.3s;
        }
        .nb-hire::before {
          content: ''; position: absolute; inset: 0;
          background: ${GREEN}; transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .nb-hire:hover { color: ${DARK}; }
        .nb-hire:hover::before { transform: translateX(0); }
        .nb-hire span { position: relative; z-index: 1; }

        /* HAMBURGER */
        .nb-ham {
          display: none; flex-direction: column;
          justify-content: center; gap: 5px;
          width: 36px; height: 36px;
          background: none; border: none;
          cursor: pointer; padding: 4px; z-index: 1001;
        }
        @media(max-width:768px){ .nb-ham { display:flex; } }
        .nb-ham-line {
          height: 1.5px; background: #e8eaf0; border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nb-ham-line:nth-child(1) { width: 100%; }
        .nb-ham-line:nth-child(2) { width: 65%; margin-left: auto; }
        .nb-ham-line:nth-child(3) { width: 100%; }
        .nb-ham.open .nb-ham-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: ${GREEN}; width: 100%;
        }
        .nb-ham.open .nb-ham-line:nth-child(2) {
          opacity: 0; transform: translateX(10px);
        }
        .nb-ham.open .nb-ham-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: ${GREEN};
        }

        /* MOBILE MENU */
        .nb-overlay {
          position: fixed; inset: 0; z-index: 998;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .nb-overlay.open { opacity: 1; pointer-events: all; }

        .nb-mobile {
          position: fixed; top: 0; right: 0;
          width: min(300px, 85vw); height: 100vh;
          z-index: 999;
          background: #0C0C14;
          border-left: 1px solid rgba(99,255,180,0.15);
          display: flex; flex-direction: column;
          padding: 90px 2rem 2.5rem;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .nb-mobile.open { transform: translateX(0); }

        .nb-mobile-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column;
        }
        .nb-mobile-link {
          display: flex; align-items: center;
          padding: 15px 0; text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: padding-left 0.2s;
        }
        .nb-mobile-link:hover,
        .nb-mobile-link.active { padding-left: 10px; }

        .nb-mobile-label {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem; font-weight: 700;
          color: ${GRAY}; transition: color 0.2s;
        }
        .nb-mobile-link:hover .nb-mobile-label,
        .nb-mobile-link.active .nb-mobile-label { color: #fff; }
        .nb-mobile-link.active .nb-mobile-label { color: ${GREEN}; }

        .nb-mobile-hire {
          margin-top: auto; display: block;
          padding: 14px; text-align: center;
          border: 1px solid ${GREEN}; color: ${GREEN};
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.95rem; letter-spacing: 0.03em;
          text-decoration: none;
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition: background 0.3s, color 0.3s;
        }
        .nb-mobile-hire:hover { background: ${GREEN}; color: ${DARK}; }

        /* SCAN LINE */
        .nb-scan {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, ${GREEN}, transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .nb-root.scrolled .nb-scan { opacity: 0.2; }
      `}</style>

      {/* Overlay */}
      <div
        className={`nb-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`nb-mobile${menuOpen ? " open" : ""}`}>
        <ul className="nb-mobile-list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`nb-mobile-link${isActive ? " active" : ""}`}
                >
                  <span className="nb-mobile-label">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to="/contact"
          className="nb-mobile-hire"
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </Link>
      </div>

      {/* Navbar */}
      <nav className={`nb-root${scrolled ? " scrolled" : " top"}`}>
        <div className="nb-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <span className="nb-logo-bracket">&lt;</span>
            <span className="nb-logo-text">Sardar Junaid Sahil</span>
            <span className="nb-logo-space"> </span>
            <span className="nb-logo-bracket">/&gt;</span>
          </Link>

          {/* Desktop links */}
          <ul className="nb-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nb-link${isActive ? " active" : ""}`}
                  >
                    <span>{link.label}</span>
                    <span className="nb-underline" />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/contact" className="nb-hire">
                <span>Hire Me</span>
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`nb-ham${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="nb-ham-line" />
            <div className="nb-ham-line" />
            <div className="nb-ham-line" />
          </button>
        </div>

        <div className="nb-scan" />
      </nav>
    </>
  );
}