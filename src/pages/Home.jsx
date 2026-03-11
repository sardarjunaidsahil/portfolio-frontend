import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TECHS = [
  "React", "Node.js", "Express", "PostgreSQL",
  "Tailwind CSS", "TypeScript", "JWT", "Nodemailer",
  "REST APIs", "Git", "Vercel", "Railway",
];

const PROJECTS = [
  {
    id: 1, num: "001",
    title: "MAUVE — Fashion Store",
    desc: "Full-stack fashion e-commerce with 315+ products, OTP auth, admin dashboard & email notifications.",
    tags: ["React", "Node.js", "PostgreSQL", "JWT"],
    live: "https://mauve-store.vercel.app",
    github: "https://github.com/sardarjunaidsahil",
  },
  {
    id: 2, num: "002",
    title: "ShopingNow — E-Commerce",
    desc: "Complete shopping platform with cart, checkout, secure auth & fully responsive UI.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    live: "https://shopingnow56.netlify.app",
    github: "https://github.com/sardarjunaidsahil",
  },
  {
    id: 3, num: "003",
    title: "REST API Boilerplate",
    desc: "Production-ready Express API with JWT auth, OTP verification, rate limiting & Nodemailer.",
    tags: ["Express", "PostgreSQL", "JWT", "Nodemailer"],
    live: "#",
    github: "https://github.com/sardarjunaidsahil",
  },
];

const STATS = [
  { value: "2", suffix: "+", label: "Years Freelancing" },
  { value: "2", suffix: "", label: "Live Apps" },
  { value: "315", suffix: "+", label: "Products (MAUVE)" },
  { value: "100", suffix: "%", label: "Self-Built" },
];

const COLORS = ["#63FFB4", "#79b8ff", "#f97583", "#ffab70", "#c792ea"];

// ── TechWheel marquee ─────────────────────────────────
function TechWheel({ techs }) {
  const trackRef = useRef(null);
  const paused = useRef(false);
  const pos = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animate = () => {
      if (!paused.current) {
        pos.current -= 0.4;
        const half = track.scrollWidth / 2;
        if (Math.abs(pos.current) >= half) pos.current = 0;
        track.style.transform = `translateX(${pos.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const items = [...techs, ...techs];
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={() => { paused.current = false; }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: "linear-gradient(to right,#08080C,transparent)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
        background: "linear-gradient(to left,#08080C,transparent)", pointerEvents: "none"
      }} />
      <div ref={trackRef} style={{ display: "flex", gap: "10px", width: "max-content", willChange: "transform" }}>
        {items.map((t, i) => (
          <span key={i} className="tech-chip" style={{
            padding: "8px 18px", fontSize: "0.85rem", fontWeight: 500,
            fontFamily: "'Outfit',sans-serif", color: "#8892a4",
            border: "1px solid rgba(99,255,180,0.15)", background: "rgba(99,255,180,0.03)",
            borderRadius: "4px", cursor: "default", whiteSpace: "nowrap",
            transition: "color 0.2s, border-color 0.2s, background 0.2s",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Hooks ─────────────────────────────────────────────
function useTypewriter(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    const delay = del ? speed / 2 : cIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && cIdx < word.length) { setDisplay(word.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
      else if (!del && cIdx === word.length) { setDel(true); }
      else if (del && cIdx > 0) { setDisplay(word.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
      else { setDel(false); setWIdx(w => (w + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);
  return { display, wIdx };
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Counter({ value, suffix, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const num = parseInt(value);
    const step = Math.ceil(num / 40);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      setCount(cur);
      if (cur >= num) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [started, value]);
  return <>{count}{suffix}</>;
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const from = direction === "left" ? "translateX(-40px)"
    : direction === "right" ? "translateX(40px)"
      : "translateY(30px)";
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : from,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ── SpinCard — train light on border ──────────────────
function SpinCard({ p, delay }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      height: "100%",
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative", borderRadius: "8px", height: "100%",
          padding: "1.5px", background: "rgba(99,255,180,0.07)",
          overflow: "hidden",
          transform: hovered ? "translateY(-6px)" : "none",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{
          position: "absolute", inset: "-100%",
          background: `conic-gradient(
            from 0deg,
            transparent 0deg, transparent 75deg,
            rgba(99,255,180,0.12) 80deg,
            #63FFB4 88deg, #afffda 90deg, #63FFB4 92deg,
            rgba(99,255,180,0.12) 100deg,
            transparent 105deg, transparent 360deg
          )`,
          animation: "trainSpin 2.5s linear infinite",
        }} />
        <div style={{
          position: "relative", zIndex: 1, background: "#0D0D16",
          borderRadius: "7px", height: "100%", padding: "24px",
          display: "flex", flexDirection: "column",
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
          transition: "box-shadow 0.3s",
        }}>
          <span style={{
            marginBottom: "12px", fontFamily: "'JetBrains Mono',monospace",
            fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(99,255,180,0.35)"
          }}>
            {p.num}
          </span>
          <h3 style={{
            marginBottom: "8px", fontSize: "1.05rem", fontWeight: 700,
            color: "#fff", fontFamily: "'Outfit',sans-serif"
          }}>{p.title}</h3>
          <p style={{
            marginBottom: "16px", flex: 1, fontSize: "0.84rem",
            lineHeight: 1.7, color: "#8892a4", fontFamily: "'Outfit',sans-serif"
          }}>{p.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            {p.tags.map(tg => (
              <span key={tg} style={{
                borderRadius: "2px", border: "1px solid rgba(99,255,180,0.2)",
                padding: "2px 10px", fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.6rem", color: "#63FFB4"
              }}>{tg}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "auto" }}>
            {[{ label: "↗ Live Demo", href: p.live }, { label: "⌥ GitHub", href: p.github }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ fontSize: "0.8rem", color: "#8892a4", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#63FFB4"}
                onMouseLeave={e => e.target.style.color = "#8892a4"}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────
export default function Home() {
  const { display: typed, wIdx } = useTypewriter([
    "Full Stack Developer", "React Specialist", "Node.js Engineer",
    "UI/UX Enthusiast", "Problem Solver",
  ]);
  const activeColor = COLORS[wIdx % COLORS.length];
  const [showCV, setShowCV] = useState(false);

  const rafRef = useRef(null);
  const targetRot = useRef(0);
  const currentRot = useRef(0);
  const cardRef = useRef(null);
  const locked = useRef(true);
  const [statsRef, statsVisible] = useReveal(0.3);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onWheel = (e) => {
      if (!locked.current) return;
      targetRot.current += Math.min(Math.abs(e.deltaY) * 1.8, 360);
      if (targetRot.current >= 540) {
        locked.current = false;
        const n = Math.round(targetRot.current / 180) * 180;
        targetRot.current = n % 360 === 0 ? n + 180 : n;
        setTimeout(() => { document.body.style.overflow = ""; }, 600);
      }
    };
    const animate = () => {
      const diff = targetRot.current - currentRot.current;
      if (Math.abs(diff) > 0.1) {
        currentRot.current += diff * 0.12;
        if (cardRef.current)
          cardRef.current.style.transform = `rotateY(${currentRot.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    const onTouchStart = (e) => { window._ty = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (!locked.current) return;
      const delta = (window._ty || 0) - e.touches[0].clientY;
      if (delta > 5) {
        window._ty = e.touches[0].clientY;
        targetRot.current += 60;
        if (targetRot.current >= 540) {
          locked.current = false;
          const n = Math.round(targetRot.current / 180) * 180;
          targetRot.current = n % 360 === 0 ? n + 180 : n;
          setTimeout(() => { document.body.style.overflow = ""; }, 600);
        }
      }
    };
    const onScroll = () => {
      if (window.scrollY === 0) {
        locked.current = true;
        targetRot.current = 0; currentRot.current = 0;
        document.body.style.overflow = "hidden";
        if (cardRef.current) cardRef.current.style.transform = "rotateY(0deg)";
      }
    };
    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll);
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const S = {
    inner: { maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" },
    label: {
      display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
      fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
      color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
    },
    h2: {
      fontFamily: "'Outfit',sans-serif", fontWeight: 800,
      fontSize: "clamp(1.8rem,4vw,2.5rem)", color: "#fff",
      letterSpacing: "-0.02em", margin: "0 0 2rem 0"
    },
    divider: { height: "1px", background: "linear-gradient(to right,transparent,rgba(99,255,180,0.15),transparent)" },
  };

  return (
    <>
      <style>{`
        @keyframes trainSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top}
                                49%{transform:scaleY(1);transform-origin:top}
                                50%{transform:scaleY(1);transform-origin:bottom}
                                100%{transform:scaleY(0);transform-origin:bottom} }
        @keyframes spinRing   { to{transform:rotate(360deg)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes pulseGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(99,255,180,0.4)}
                                50%{box-shadow:0 0 0 8px rgba(99,255,180,0)} }

        .blink       { animation:blink 1s step-end infinite; }
        .scroll-line { animation:scrollLine 1.8s ease-in-out infinite; }
        .spin-ring   { animation:spinRing 3s linear infinite; }
        .pulse-dot   { animation:pulseGlow 2s ease-in-out infinite; }

        .h-badge { animation:heroFadeUp 0.6s ease 0.1s both; }
        .h-name  { animation:heroFadeUp 0.6s ease 0.25s both; }
        .h-typed { animation:heroFadeUp 0.6s ease 0.4s both; }
        .h-desc  { animation:heroFadeUp 0.6s ease 0.55s both; }
        .h-btns  { animation:heroFadeUp 0.6s ease 0.7s both; }
        .h-soc   { animation:heroFadeUp 0.6s ease 0.85s both; }
        .h-card  { animation:heroFadeUp 0.7s ease 0.3s both; }
        .mobile-profile { display:none; animation:heroFadeUp 0.6s ease 0.35s both; }

        .tech-chip:hover {
          border-color:#63FFB4 !important; color:#63FFB4 !important;
          background:rgba(99,255,180,0.07) !important; transform:translateY(-2px) !important;
        }
        .social-link:hover { color:#63FFB4 !important; }

        @media(max-width:900px){
          .hero-grid      { grid-template-columns:1fr !important; }
          .flip-card      { display:none !important; }
          .mobile-profile { display:block !important; }
          .stats-grid     { grid-template-columns:repeat(2,1fr) !important; }
          .proj-grid      { grid-template-columns:1fr !important; }
        }
        @media(max-width:600px){
          .hero-section   { min-height:unset !important; padding-top:64px !important; padding-bottom:0 !important; }
          .hero-grid      { padding:1rem 0 0 !important; gap:0 !important; }
          .h-badge        { margin-bottom:0.6rem !important; }
          .h-typed        { margin-top:0.5rem !important; }
          .mobile-profile { margin:0.8rem 0 !important; }
          .h-desc         { margin-top:0.5rem !important; }
          .h-btns         { margin-top:0.8rem !important; gap:8px !important; }
          .h-soc          { margin-top:0.8rem !important; padding-bottom:1.5rem !important; }
          .stats-grid     { gap:16px !important; padding:1.5rem 0 !important; }
          .proj-grid      { gap:12px !important; }
          .scroll-hint    { display:none !important; }
        }
      `}</style>

      {/* ══ CV MODAL — return ke andar hai ab ══ */}
      {showCV && (
        <div onClick={() => setShowCV(false)} style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: "min(860px, 95vw)", height: "90vh",
            background: "#0D0D16", borderRadius: "10px",
            border: "1px solid rgba(99,255,180,0.2)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}>
            <div style={{
              padding: "1rem 1.5rem",
              background: "rgba(255,255,255,0.02)",
              borderBottom: "1px solid rgba(99,255,180,0.08)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
                <span style={{
                  marginLeft: "8px", fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.62rem", color: "#4a5568"
                }}>Junaid_Sahil_Resume.pdf</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <a href="${import.meta.env.VITE_API_URL}/resume/download" style={{
                  padding: "6px 16px", fontSize: "0.75rem", fontWeight: 600,
                  fontFamily: "'Outfit',sans-serif", background: "#63FFB4", color: "#08080C",
                  borderRadius: "4px", textDecoration: "none",
                }}>⬇ Download</a>
                <button onClick={() => setShowCV(false)} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#8892a4", width: "30px", height: "30px",
                  borderRadius: "6px", cursor: "pointer", fontSize: "1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>
              </div>
            </div>
            <iframe
              src="${import.meta.env.VITE_API_URL}/resume/view"
              style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
              title="Resume"
            />
          </div>
        </div>
      )}

      <div style={{ background: "#08080C", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ══ HERO ══════════════════════════════════ */}
        <section className="hero-section" style={{
          position: "relative", minHeight: "100vh",
          display: "flex", alignItems: "center",
          paddingTop: "72px", overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(99,255,180,0.025) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(99,255,180,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}>
          <div style={{
            position: "absolute", top: "15%", left: "5%", width: "380px", height: "380px",
            borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle,rgba(99,255,180,0.07) 0%,transparent 70%)"
          }} />
          <div style={{
            position: "absolute", top: "50%", right: "5%", width: "280px", height: "280px",
            borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle,rgba(99,255,180,0.04) 0%,transparent 70%)"
          }} />

          <div style={S.inner}>
            <div className="hero-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "3rem", alignItems: "center", padding: "3rem 0",
            }}>

              {/* LEFT */}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span className="h-badge" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", width: "fit-content",
                  marginBottom: "1.5rem", padding: "6px 16px", borderRadius: "999px",
                  border: "1px solid rgba(99,255,180,0.3)", background: "rgba(99,255,180,0.05)",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                  color: "#63FFB4", letterSpacing: "0.1em",
                }}>
                  <span className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#63FFB4" }} />
                  Available for work
                </span>

                <h1 className="h-name" style={{
                  fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                  lineHeight: 1.05, fontSize: "clamp(2.4rem,5vw,4.5rem)",
                  letterSpacing: "-0.02em", margin: 0
                }}>
                  <span style={{
                    color: "rgba(255,255,255,0.4)", fontWeight: 600,
                    display: "block", fontSize: "0.5em", marginBottom: "4px"
                  }}>Hi, My Name is</span>
                  <span style={{ color: activeColor, transition: "color 0.6s ease" }}>Junaid Sahil</span>
                </h1>

                <div className="h-typed" style={{
                  display: "flex", alignItems: "center",
                  gap: "8px", marginTop: "1.2rem", flexWrap: "wrap"
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.8rem", color: "rgba(99,255,180,0.5)"
                  }}>~/dev $</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.8rem", color: activeColor, transition: "color 0.6s ease"
                  }}>
                    {typed}
                    <span className="blink" style={{
                      display: "inline-block", width: "2px",
                      height: "1em", marginLeft: "2px", verticalAlign: "middle",
                      background: activeColor, transition: "background 0.6s ease"
                    }} />
                  </span>
                </div>

                {/* Mobile profile card */}
                <div className="mobile-profile" style={{ margin: "1.5rem 0" }}>
                  <div style={{
                    background: "#0D0D16", border: "1px solid rgba(99,255,180,0.15)",
                    borderRadius: "12px", padding: "1.2rem",
                    display: "flex", alignItems: "center", gap: "1rem"
                  }}>
                    <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
                      <div className="spin-ring" style={{
                        position: "absolute", inset: "-4px",
                        borderRadius: "50%", border: "2px solid transparent",
                        borderTopColor: "#63FFB4", borderRightColor: "rgba(99,255,180,0.2)"
                      }} />
                      <div style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        overflow: "hidden", background: "#1a1a2e",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "2px solid rgba(99,255,180,0.2)"
                      }}>
                        <img src="/your-photo.jpg" alt="Junaid"
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                        <div style={{
                          display: "none", width: "100%", height: "100%",
                          alignItems: "center", justifyContent: "center",
                          color: "#63FFB4", fontSize: "1.2rem", fontWeight: 800,
                          fontFamily: "'Outfit',sans-serif"
                        }}>JS</div>
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                        fontSize: "0.95rem", color: "#fff", marginBottom: "2px"
                      }}>Junaid Sahil</div>
                      <div style={{
                        fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem",
                        color: "#63FFB4", letterSpacing: "0.08em", marginBottom: "6px"
                      }}>Full Stack Developer</div>
                      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                        {["React", "Node.js", "PostgreSQL"].map(b => (
                          <span key={b} style={{
                            fontSize: "0.62rem", color: "#8892a4",
                            border: "1px solid rgba(99,255,180,0.2)", padding: "1px 7px",
                            borderRadius: "2px", fontFamily: "'Outfit',sans-serif"
                          }}>{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="h-desc" style={{
                  marginTop: "1.2rem", color: "#8892a4",
                  fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "480px",
                  fontFamily: "'Outfit',sans-serif"
                }}>
                  I build scalable web applications — from pixel-perfect frontends
                  to robust backend systems. Passionate about clean code, great UX,
                  and solving real problems.
                </p>

                {/* ── BUTTONS FIX: Link buttons map se, View CV alag ── */}
                <div className="h-btns" style={{ display: "flex", flexWrap: "nowrap", gap: "8px", marginTop: "2rem" }}>
                  {[
                    { to: "/projects", label: "View My Work", solid: true },
                    { to: "/contact", label: "Get In Touch", solid: false },
                  ].map(({ to, label, solid }) => (
                    <Link key={label} to={to} style={{
                      padding: "10px 0", fontSize: "0.78rem", fontWeight: 600,
                      fontFamily: "'Outfit',sans-serif", textDecoration: "none",
                      background: solid ? "#63FFB4" : "transparent",
                      color: solid ? "#08080C" : "#63FFB4",
                      border: solid ? "1px solid #63FFB4" : "1px solid rgba(99,255,180,0.3)",
                      clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                      transition: "all 0.3s", flex: 1, textAlign: "center",
                    }}
                      onMouseEnter={e => {
                        if (solid) { e.target.style.background = "transparent"; e.target.style.color = "#63FFB4"; }
                        else { e.target.style.borderColor = "#63FFB4"; e.target.style.background = "rgba(99,255,180,0.05)"; }
                      }}
                      onMouseLeave={e => {
                        if (solid) { e.target.style.background = "#63FFB4"; e.target.style.color = "#08080C"; }
                        else { e.target.style.borderColor = "rgba(99,255,180,0.3)"; e.target.style.background = "transparent"; }
                      }}
                    >{label}</Link>
                  ))}
                  <button onClick={() => setShowCV(true)} style={{
                    padding: "10px 0", fontSize: "0.78rem", fontWeight: 600,
                    fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#8892a4",
                    border: "1px solid rgba(255,255,255,0.1)",
                    clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                    transition: "all 0.3s", cursor: "pointer", flex: 1,
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "#fff"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "#8892a4"; }}
                  >👁 View CV</button>
                </div>

                <div className="h-soc" style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "2rem" }}>
                  {[
                    { label: "GitHub", href: "https://github.com/sardarjunaidsahil" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/sardarjunaidsahil" },
                    { label: "Resume", href: "/resume.pdf" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      className="social-link"
                      style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                        color: "#8892a4", letterSpacing: "0.1em", textDecoration: "none",
                        transition: "color 0.2s"
                      }}>
                      <span style={{ display: "block", height: "1px", width: "20px", background: "currentColor" }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT — Flip Card */}
              <div className="flip-card h-card"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "380px", height: "360px", perspective: "1000px", flexShrink: 0 }}>
                  <div ref={cardRef} style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d",
                  }}>
                    {/* FRONT */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden"
                    }}>
                      <div style={{
                        height: "100%", background: "#0D0D16",
                        border: "1px solid rgba(99,255,180,0.1)", borderRadius: "8px",
                        overflow: "hidden", fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "0.78rem", boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
                      }}>
                        <div style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "10px 16px", background: "rgba(255,255,255,0.02)",
                          borderBottom: "1px solid rgba(99,255,180,0.08)"
                        }}>
                          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                            <span key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />
                          ))}
                          <span style={{ marginLeft: "8px", fontSize: "0.65rem", color: "#4a5568" }}>developer.js</span>
                        </div>
                        <div style={{ padding: "20px", lineHeight: 2.1 }}>
                          <div><span style={{ color: "#f97583" }}>const</span> <span style={{ color: "#79b8ff" }}>dev</span> <span style={{ color: "#e8eaf0" }}>{`= {`}</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#63FFB4" }}>name</span><span style={{ color: "#e8eaf0" }}>:</span> <span style={{ color: "#ffab70" }}>'Junaid Sahil'</span><span style={{ color: "#e8eaf0" }}>,</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#63FFB4" }}>role</span><span style={{ color: "#e8eaf0" }}>:</span> <span style={{ color: "#ffab70" }}>'Full Stack Dev'</span><span style={{ color: "#e8eaf0" }}>,</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#63FFB4" }}>stack</span><span style={{ color: "#e8eaf0" }}>: [</span></div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ffab70" }}>'React'</span><span style={{ color: "#e8eaf0" }}>, </span><span style={{ color: "#ffab70" }}>'Node.js'</span><span style={{ color: "#e8eaf0" }}>,</span></div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ffab70" }}>'PostgreSQL'</span><span style={{ color: "#e8eaf0" }}>, </span><span style={{ color: "#ffab70" }}>'Express'</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#e8eaf0" }}>],</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#63FFB4" }}>available</span><span style={{ color: "#e8eaf0" }}>:</span> <span style={{ color: "#f97583" }}>true</span><span style={{ color: "#e8eaf0" }}>,</span></div>
                          <div>&nbsp;&nbsp;<span style={{ color: "#63FFB4" }}>coffee</span><span style={{ color: "#e8eaf0" }}>:</span> <span style={{ color: "#ffab70" }}>'always ☕'</span></div>
                          <div><span style={{ color: "#e8eaf0" }}>{`}`}</span></div>
                          <br />
                          <div><span style={{ color: "#4a5568" }}>// Let's build something</span></div>
                          <div><span style={{ color: "#4a5568" }}>// amazing together 🚀</span></div>
                        </div>
                      </div>
                    </div>

                    {/* BACK */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}>
                      <div style={{
                        height: "100%", background: "#0D0D16",
                        border: "1px solid rgba(99,255,180,0.15)", borderRadius: "8px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "16px", padding: "24px", position: "relative",
                        boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
                      }}>
                        <div style={{
                          position: "absolute", inset: 0, pointerEvents: "none",
                          background: "radial-gradient(ellipse at 50% 0%,rgba(99,255,180,0.08) 0%,transparent 60%)"
                        }} />
                        <div style={{
                          position: "relative", width: "176px", height: "176px",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                          <div className="spin-ring" style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            border: "2px solid transparent",
                            borderTopColor: "#63FFB4", borderRightColor: "rgba(99,255,180,0.25)"
                          }} />
                          <div style={{
                            width: "144px", height: "144px", borderRadius: "50%",
                            border: "2px solid rgba(99,255,180,0.3)", overflow: "hidden",
                            background: "#1a1a2e",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <img src="/your-photo.jpg" alt="Junaid Sahil"
                              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                            <div style={{
                              display: "none", width: "100%", height: "100%",
                              alignItems: "center", justifyContent: "center",
                              color: "#63FFB4", fontSize: "2.5rem", fontWeight: 800,
                              fontFamily: "'Outfit',sans-serif"
                            }}>JS</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 1 }}>
                          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Outfit',sans-serif" }}>Junaid Sahil</span>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "#63FFB4", letterSpacing: "0.1em" }}>Full Stack Developer</span>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
                            {["⚡ React", "🛠 Node.js", "🍃 PostgreSQL"].map(b => (
                              <span key={b} style={{
                                fontSize: "0.7rem", color: "#8892a4",
                                border: "1px solid rgba(99,255,180,0.2)", padding: "2px 10px",
                                borderRadius: "2px", fontFamily: "'Outfit',sans-serif"
                              }}>{b}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint" style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)", display: "flex",
            flexDirection: "column", alignItems: "center", gap: "8px"
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem",
              color: "#4a5568", letterSpacing: "0.2em", writingMode: "vertical-rl"
            }}>scroll</span>
            <div className="scroll-line" style={{
              width: "1px", height: "40px",
              background: "linear-gradient(to bottom,#63FFB4,transparent)"
            }} />
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════ */}
        <section style={{ background: "#0a0a12" }} ref={statsRef}>
          <div style={S.inner}>
            <div style={S.divider} />
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: "24px", padding: "2.5rem 0",
            }}>
              {STATS.map((st, i) => (
                <div key={st.label} style={{
                  textAlign: "center",
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                }}>
                  <span style={{
                    display: "block", fontFamily: "'Outfit',sans-serif",
                    fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
                    color: "#63FFB4", letterSpacing: "-0.02em"
                  }}>
                    <Counter value={st.value} suffix={st.suffix} started={statsVisible} />
                  </span>
                  <span style={{
                    display: "block", marginTop: "6px",
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                    color: "#4a5568", letterSpacing: "0.15em", textTransform: "uppercase"
                  }}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={S.divider} />
          </div>
        </section>

        {/* ══ TECH STACK ════════════════════════════ */}
        <section style={{ padding: "5rem 0" }}>
          <div style={S.inner}>
            <Reveal>
              <div style={S.label}><span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />Tech Stack</div>
              <h2 style={S.h2}>Tools I Work With</h2>
            </Reveal>
            <TechWheel techs={TECHS} />
          </div>
        </section>

        {/* ══ PROJECTS ══════════════════════════════ */}
        <section style={{ padding: "5rem 0", background: "#0a0a12" }}>
          <div style={S.inner}>
            <Reveal>
              <div style={S.label}><span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />Featured Work</div>
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                flexWrap: "wrap", gap: "16px", marginBottom: "2.5rem"
              }}>
                <h2 style={{ ...S.h2, margin: 0 }}>Recent Projects</h2>
                <Link to="/projects" style={{
                  fontSize: "0.85rem", fontWeight: 600, color: "#63FFB4",
                  textDecoration: "none", fontFamily: "'Outfit',sans-serif",
                  borderBottom: "1px solid rgba(99,255,180,0.3)", paddingBottom: "2px", transition: "border-color 0.2s"
                }}
                  onMouseEnter={e => e.target.style.borderColor = "#63FFB4"}
                  onMouseLeave={e => e.target.style.borderColor = "rgba(99,255,180,0.3)"}
                >View all →</Link>
              </div>
            </Reveal>
            <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
              {PROJECTS.map((p, i) => (
                <SpinCard key={p.id} p={p} delay={i * 0.12} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════ */}
        <section style={{
          position: "relative", overflow: "hidden",
          borderTop: "1px solid rgba(99,255,180,0.08)",
          background: "#0a0a12", padding: "6rem 0"
        }}>
          <div style={{
            position: "absolute", left: "50%", top: "50%", width: "500px", height: "260px",
            transform: "translate(-50%,-50%)", pointerEvents: "none",
            background: "radial-gradient(ellipse,rgba(99,255,180,0.06) 0%,transparent 70%)"
          }} />
          <div style={{ position: "relative", ...S.inner, textAlign: "center" }}>
            <Reveal>
              <p style={{
                marginBottom: "20px", fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(99,255,180,0.7)"
              }}>
                // open_to_work()
              </p>
              <h2 style={{
                marginBottom: "16px", fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff",
                letterSpacing: "-0.02em", lineHeight: 1.15
              }}>
                Let's Build Something<br />
                <span style={{ color: "#63FFB4" }}>Together</span>
              </h2>
              <p style={{
                margin: "0 auto 2.5rem", maxWidth: "420px", fontSize: "0.9rem",
                lineHeight: 1.8, color: "#8892a4", fontFamily: "'Outfit',sans-serif"
              }}>
                Have a project in mind? I'm currently available for freelance work and full-time positions.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
                <Link to="/contact" style={{
                  padding: "14px 32px", fontSize: "0.85rem", fontWeight: 600,
                  fontFamily: "'Outfit',sans-serif", background: "#63FFB4", color: "#08080C",
                  border: "1px solid #63FFB4", textDecoration: "none",
                  clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                  transition: "all 0.3s"
                }}
                  onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = "#63FFB4"; }}
                  onMouseLeave={e => { e.target.style.background = "#63FFB4"; e.target.style.color = "#08080C"; }}
                >Start a Conversation</Link>
                <a href="mailto:sardarjunaidsahil@gmail.com" style={{
                  padding: "14px 32px", fontSize: "0.85rem", fontWeight: 600,
                  fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#63FFB4",
                  border: "1px solid rgba(99,255,180,0.3)", textDecoration: "none",
                  clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                  transition: "all 0.3s"
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "#63FFB4"; e.target.style.background = "rgba(99,255,180,0.05)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(99,255,180,0.3)"; e.target.style.background = "transparent"; }}
                >sardarjunaidsahil@gmail.com</a>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}