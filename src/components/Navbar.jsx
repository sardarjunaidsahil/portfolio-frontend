import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/contact", label: "Contact" },
  { path: "/about", label: "About" },
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
    return () => {
      document.body.style.overflow = "";
    };
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
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.5s;
        }
        .nb-overlay.open { background: rgba(0,0,0,0.6); pointer-events: all; backdrop-filter: blur(6px); }

        .nb-mobile {
          position: fixed; top: 0; right: 0;
          width: min(320px, 88vw); height: 100vh;
          z-index: 999;
          background: #0A0A12;
          border-left: 1px solid rgba(99,255,180,0.12);
          display: flex; flex-direction: column;
          padding: 100px 2rem 2.5rem;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .nb-mobile::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(99,255,180,0.4), transparent);
        }
        .nb-mobile::after {
          content: '';
          position: absolute; bottom: 20%; left: -40%;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,255,180,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .nb-mobile.open { transform: translateX(0); }

        .nb-mobile-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 2px;
        }

        .nb-mobile-item {
          opacity: 0; transform: translateX(30px);
          transition: opacity 0.4s, transform 0.4s;
        }
        .nb-mobile.open .nb-mobile-item:nth-child(1) { opacity:1; transform:none; transition-delay: 0.15s; }
        .nb-mobile.open .nb-mobile-item:nth-child(2) { opacity:1; transform:none; transition-delay: 0.22s; }
        .nb-mobile.open .nb-mobile-item:nth-child(3) { opacity:1; transform:none; transition-delay: 0.29s; }
        .nb-mobile.open .nb-mobile-item:nth-child(4) { opacity:1; transform:none; transition-delay: 0.36s; }
        .nb-mobile.open .nb-mobile-item:nth-child(5) { opacity:1; transform:none; transition-delay: 0.43s; }

        .nb-mobile-link {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 0;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          group: true;
          position: relative; overflow: hidden;
        }

        .nb-mobile-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; color: rgba(99,255,180,0.25);
          letter-spacing: 0.1em; min-width: 20px;
          transition: color 0.25s;
        }
        .nb-mobile-link:hover .nb-mobile-num,
        .nb-mobile-link.active .nb-mobile-num { color: #63FFB4; }

        .nb-mobile-label {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.01em;
          transition: color 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nb-mobile-link:hover .nb-mobile-label { color: #fff; transform: translateX(6px); }
        .nb-mobile-link.active .nb-mobile-label { color: #63FFB4; }

        .nb-mobile-dot {
          margin-left: auto;
          width: 5px; height: 5px; border-radius: 50%;
          background: #63FFB4;
          opacity: 0; transform: scale(0);
          transition: opacity 0.25s, transform 0.25s;
        }
        .nb-mobile-link.active .nb-mobile-dot { opacity: 1; transform: scale(1); }
        .nb-mobile-link:hover .nb-mobile-dot { opacity: 0.4; transform: scale(1); }

        .nb-mobile-hire {
          margin-top: auto;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.4s 0.5s, transform 0.4s 0.5s;
          display: block; padding: 14px; text-align: center;
          border: 1px solid ${GREEN}; color: ${GREEN};
          font-family: 'Outfit', sans-serif; font-weight: 700;
          font-size: 0.9rem; letter-spacing: 0.06em;
          text-decoration: none; text-transform: uppercase;
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition: background 0.3s, color 0.3s;
          position: relative; overflow: hidden;
        }
        .nb-mobile.open .nb-mobile-hire { opacity: 1; transform: none; }
        .nb-mobile-hire::before {
          content: ''; position: absolute; inset: 0;
          background: ${GREEN}; transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
          position: fixed; inset: 0; z-index: 998;
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.4s;
        }
        .nb-overlay.open { background: rgba(0,0,0,0.7); pointer-events: all; }

        .nb-mobile {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          z-index: 999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #08080C;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nb-mobile::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(99,255,180,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .nb-mobile::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #63FFB4, transparent);
          opacity: 0.4;
        }
        .nb-mobile.open { opacity: 1; pointer-events: all; }

        .nb-mobile-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          width: 100%;
        }

        .nb-mobile-link {
          display: flex; align-items: center; justify-content: center;
          gap: 12px;
          padding: 18px 2rem;
          text-decoration: none;
          width: 100%;
          position: relative;
          transition: all 0.25s;
        }
        .nb-mobile-link::after {
          content: '';
          position: absolute; bottom: 0; left: 50%; right: 50%;
          height: 1px;
          background: rgba(99,255,180,0.1);
          transition: left 0.3s, right 0.3s;
        }
        .nb-mobile-link:hover::after,
        .nb-mobile-link.active::after { left: 2rem; right: 2rem; }

        .nb-mobile-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem; color: rgba(99,255,180,0.3);
          letter-spacing: 0.1em; min-width: 24px;
          transition: color 0.25s;
        }
        .nb-mobile-link:hover .nb-mobile-num,
        .nb-mobile-link.active .nb-mobile-num { color: #63FFB4; }

        .nb-mobile-label {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem; font-weight: 800;
          color: rgba(255,255,255,0.25);
          letter-spacing: -0.03em;
          transition: color 0.25s, transform 0.25s;
        }
        .nb-mobile-link:hover .nb-mobile-label { color: #fff; transform: translateX(6px); }
        .nb-mobile-link.active .nb-mobile-label { color: #63FFB4; }

        .nb-mobile-arrow {
          font-size: 0.9rem; color: transparent;
          transition: color 0.25s, transform 0.25s;
          margin-left: 4px;
        }
        .nb-mobile-link:hover .nb-mobile-arrow { color: #63FFB4; transform: translateX(4px); }
        .nb-mobile-link.active .nb-mobile-arrow { color: #63FFB4; }

        .nb-mobile-hire {
          margin-top: 2.5rem; display: inline-flex;
          align-items: center; gap: 8px;
          padding: 14px 36px; text-align: center;
          border: 1px solid ${GREEN}; color: ${GREEN};
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.9rem; letter-spacing: 0.08em;
          text-decoration: none; text-transform: uppercase;
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .nb-mobile-hire:hover {
          background: ${GREEN}; color: ${DARK};
          box-shadow: 0 0 30px rgba(99,255,180,0.3);
        }

        .nb-mobile-socials {
          display: flex; gap: 24px; margin-top: 1.5rem;
        }
        .nb-mobile-soc {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; color: rgba(99,255,180,0.3);
          letter-spacing: 0.1em; text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nb-mobile-soc:hover { color: #63FFB4; }

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
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path} className="nb-mobile-item">
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`nb-mobile-link${isActive ? " active" : ""}`}
                >
                  <span className="nb-mobile-num">0{i + 1}</span>
                  <span className="nb-mobile-label">{link.label}</span>
                  <span className="nb-mobile-dot" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="/contact" className="nb-mobile-hire" onClick={() => setMenuOpen(false)}>
          <span>Hire Me</span>
        </Link>
        <div className="nb-mobile-footer">
          <a href="https://github.com/sardarjunaidsahil" target="_blank" rel="noreferrer" className="nb-mobile-soc">GitHub</a>
          <a href="https://linkedin.com/in/sardarjunaidsahil" target="_blank" rel="noreferrer" className="nb-mobile-soc">LinkedIn</a>
        </div>
      </div>
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path} style={{ width: "100%" }}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`nb-mobile-link${isActive ? " active" : ""}`}
                >
                  <span className="nb-mobile-num">0{i + 1}</span>
                  <span className="nb-mobile-label">{link.label}</span>
                  <span className="nb-mobile-arrow">→</span>
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
          ✦ Hire Me
        </Link>
        <div className="nb-mobile-socials">
          <a
            href="https://github.com/sardarjunaidsahil"
            target="_blank"
            rel="noreferrer"
            className="nb-mobile-soc"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sardarjunaidsahil"
            target="_blank"
            rel="noreferrer"
            className="nb-mobile-soc"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`nb-root${scrolled ? " scrolled" : " top"}`}>
        <div className="nb-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <span className="nb-logo-bracket">&lt;</span>
            <span className="nb-logo-text">&lt;SardarJunaidSahil/&gt;</span>
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
