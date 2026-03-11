import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Scroll Animation Hook ─────────────────────────────
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

// ── Animated number counter ───────────────────────────
function AnimNum({ value, suffix, started }) {
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

const EXPERIENCE = [
    {
        role: "Freelance Full Stack Developer",
        company: "Self-Employed",
        location: "Remote · Lahore",
        period: "2023 — Present",
        points: [
            "Built two production-ready e-commerce platforms independently from scratch",
            "Handled complete project lifecycle — requirements, development, testing & deployment",
            "Delivered live applications with cloud hosting on Vercel, Netlify & Railway",
            "Continuously shipping features: reviews, email notifications, admin tools",
        ],
    },
];

const EDUCATION = [
    {
        degree: "BSc Computer Science",
        school: "University — Lahore",
        period: "2023 — Present",
        note: "In Progress",
        active: true,
    },
    {
        degree: "Full Stack Web Development",
        school: "PNY Trainings — Arfa Karim Tower, Lahore",
        period: "Certificate Awarded",
        note: "Certified",
        active: false,
    },
    {
        degree: "Intermediate (F.Sc / I.Com)",
        school: "Lahore",
        period: "Completed",
        note: null,
        active: false,
    },
    {
        degree: "Matriculation (SSC)",
        school: "Lahore",
        period: "Completed",
        note: null,
        active: false,
    },
];

const STRENGTHS = [
    { icon: "⚡", title: "Full-Cycle Builder", desc: "Independently builds & deploys complete production apps — database schema to UI." },
    { icon: "🔍", title: "Problem Solver", desc: "Strong at debugging, writing maintainable code & solving real-world problems." },
    { icon: "🚀", title: "Fast Learner", desc: "Quickly picks up new frameworks & integrates third-party services." },
    { icon: "🌐", title: "End-to-End Dev", desc: "Experienced across the entire stack — frontend, backend, DB & deployment." },
];

// ── Reveal wrapper ────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
    const [ref, visible] = useReveal();
    const from = direction === "left" ? "translateX(-40px)"
        : direction === "right" ? "translateX(40px)"
            : "translateY(32px)";
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : from,
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        }}>
            {children}
        </div>
    );
}

export default function About() {
    const [showCV, setShowCV] = useState(false);
    const [statsRef, statsVisible] = useReveal(0.3);

    return (
        <>
            <style>{`
        @keyframes gradShift {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }
        .about-grad-text {
          background: linear-gradient(135deg,#63FFB4,#79b8ff,#63FFB4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 4s ease infinite;
        }
        .strength-card:hover .strength-icon {
          transform: scale(1.2) rotate(-6deg);
          transition: transform 0.3s ease;
        }
        @media(max-width:768px){
          .about-hero-grid { grid-template-columns: 1fr !important; }
          .about-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .strengths-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:480px){
          .strengths-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

            {/* ── CV Modal ── */}
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
                        {/* Modal Header */}
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
                        {/* PDF iframe */}
                        <iframe
                            src="${import.meta.env.VITE_API_URL}/resume/view"
                            style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
                            title="Resume"
                        />
                    </div>
                </div>
            )}

            <div style={{ background: "#08080C", minHeight: "100vh", paddingTop: "72px", overflowX: "hidden" }}>

                {/* ══ HERO ══════════════════════════════════ */}
                <section style={{
                    position: "relative", padding: "4rem 0",
                    borderBottom: "1px solid rgba(99,255,180,0.08)",
                    overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "linear-gradient(rgba(99,255,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(99,255,180,0.02) 1px,transparent 1px)",
                        backgroundSize: "60px 60px"
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-20%", right: "-5%", width: "500px", height: "500px",
                        borderRadius: "50%", pointerEvents: "none",
                        background: "radial-gradient(circle,rgba(99,255,180,0.04) 0%,transparent 65%)"
                    }} />

                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
                        <div className="about-hero-grid" style={{
                            display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
                            gap: "4rem", alignItems: "center",
                        }}>
                            {/* Left */}
                            <div>
                                <Reveal delay={0}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
                                        fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                        color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                                    }}>
                                        <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                        About Me
                                    </div>
                                </Reveal>
                                <Reveal delay={0.1}>
                                    <h1 style={{
                                        fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                        fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff",
                                        letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1.2rem 0"
                                    }}>
                                        Building the web,<br />
                                        <span className="about-grad-text">one commit</span><br />
                                        at a time.
                                    </h1>
                                </Reveal>
                                <Reveal delay={0.2}>
                                    <p style={{
                                        color: "#8892a4", fontSize: "0.95rem", lineHeight: 1.9,
                                        fontFamily: "'Outfit',sans-serif", margin: "0 0 1.5rem 0", maxWidth: "500px"
                                    }}>
                                        I'm <strong style={{ color: "#fff" }}>Muhammad Junaid</strong> — a Full Stack Developer
                                        and BSc CS student based in <strong style={{ color: "#fff" }}>Lahore, Pakistan</strong>.
                                        I build production-ready web applications independently,
                                        handling everything from database design to deployment.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.3}>
                                    <p style={{
                                        color: "#8892a4", fontSize: "0.95rem", lineHeight: 1.9,
                                        fontFamily: "'Outfit',sans-serif", margin: "0 0 2rem 0", maxWidth: "500px"
                                    }}>
                                        Certified by <strong style={{ color: "#63FFB4" }}>PNY Trainings</strong> and actively
                                        freelancing since 2023 — I've shipped two live e-commerce platforms that
                                        real users interact with every day.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.4}>
                                    {/* ── BUTTONS FIX: nowrap + flex:1 — sab 1 line mein ── */}
                                    <div style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>

                                        <Link to="/projects" style={{
                                            padding: "10px 0", fontSize: "0.78rem", fontWeight: 600,
                                            fontFamily: "'Outfit',sans-serif", background: "#63FFB4", color: "#08080C",
                                            border: "1px solid #63FFB4", textDecoration: "none",
                                            clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                            transition: "all 0.3s", flex: 1, textAlign: "center",
                                        }}
                                            onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = "#63FFB4"; }}
                                            onMouseLeave={e => { e.target.style.background = "#63FFB4"; e.target.style.color = "#08080C"; }}
                                        >View Projects</Link>

                                        <a href="${import.meta.env.VITE_API_URL}/resume/download" style={{
                                            padding: "10px 0", fontSize: "0.78rem", fontWeight: 600,
                                            fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#63FFB4",
                                            border: "1px solid rgba(99,255,180,0.3)", textDecoration: "none",
                                            clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                            transition: "all 0.3s", flex: 1, textAlign: "center",
                                        }}
                                            onMouseEnter={e => { e.target.style.borderColor = "#63FFB4"; e.target.style.background = "rgba(99,255,180,0.05)"; }}
                                            onMouseLeave={e => { e.target.style.borderColor = "rgba(99,255,180,0.3)"; e.target.style.background = "transparent"; }}
                                        >⬇ Download CV</a>

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
                                </Reveal>
                            </div>

                            {/* Right — Info card */}
                            <Reveal delay={0.2} direction="right">
                                <div style={{
                                    background: "#0D0D16", border: "1px solid rgba(99,255,180,0.12)",
                                    borderRadius: "8px", overflow: "hidden",
                                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                                }}>
                                    <div style={{
                                        padding: "1rem 1.4rem",
                                        background: "rgba(255,255,255,0.02)",
                                        borderBottom: "1px solid rgba(99,255,180,0.08)",
                                        display: "flex", alignItems: "center", gap: "6px"
                                    }}>
                                        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                                            <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                                        ))}
                                        <span style={{
                                            marginLeft: "8px", fontFamily: "'JetBrains Mono',monospace",
                                            fontSize: "0.62rem", color: "#4a5568"
                                        }}>junaid.info</span>
                                    </div>
                                    <div style={{ padding: "1.5rem" }}>
                                        {[
                                            { key: "name", val: "Muhammad Junaid" },
                                            { key: "role", val: "Full Stack Developer" },
                                            { key: "location", val: "Lahore, Pakistan" },
                                            { key: "phone", val: "0339-3999039" },
                                            { key: "email", val: "sardarjunaidsahil@gmail.com" },
                                            { key: "status", val: "Open to Work ✓" },
                                            { key: "education", val: "BSc CS (In Progress)" },
                                            { key: "cert", val: "PNY Trainings Certified" },
                                        ].map(({ key, val }) => (
                                            <div key={key} style={{
                                                display: "flex", gap: "0", marginBottom: "10px",
                                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem",
                                                lineHeight: 1.6
                                            }}>
                                                <span style={{ color: "#63FFB4", minWidth: "110px" }}>{key}:</span>
                                                <span style={{ color: "#c9d1d9" }}>"{val}"</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ══ STATS ════════════════════════════════ */}
                <section style={{ background: "#0a0a12", padding: "3rem 0" }} ref={statsRef}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <div style={{
                            height: "1px", marginBottom: "2.5rem",
                            background: "linear-gradient(to right,transparent,rgba(99,255,180,0.15),transparent)"
                        }} />
                        <div className="about-stats-grid" style={{
                            display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem",
                        }}>
                            {[
                                { val: "2", suf: "+", label: "Years Freelancing", desc: "Since 2023" },
                                { val: "2", suf: "", label: "Live Apps Deployed", desc: "Production ready" },
                                { val: "315", suf: "+", label: "Products (MAUVE)", desc: "E-commerce" },
                                { val: "100", suf: "%", label: "Self-Built", desc: "No team, no agency" },
                            ].map((s, i) => (
                                <div key={s.label} style={{
                                    textAlign: "center", padding: "1.5rem 1rem",
                                    border: "1px solid rgba(99,255,180,0.07)",
                                    borderRadius: "6px", background: "#0D0D16",
                                    opacity: statsVisible ? 1 : 0,
                                    transform: statsVisible ? "none" : "translateY(24px)",
                                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                                }}>
                                    <span style={{
                                        display: "block", fontFamily: "'Outfit',sans-serif",
                                        fontWeight: 800, fontSize: "2.4rem", color: "#63FFB4",
                                        letterSpacing: "-0.03em", lineHeight: 1
                                    }}>
                                        <AnimNum value={s.val} suffix={s.suf} started={statsVisible} />
                                    </span>
                                    <span style={{
                                        display: "block", marginTop: "6px", fontFamily: "'Outfit',sans-serif",
                                        fontWeight: 600, fontSize: "0.85rem", color: "#fff"
                                    }}>{s.label}</span>
                                    <span style={{
                                        display: "block", marginTop: "3px",
                                        fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem",
                                        color: "#4a5568", letterSpacing: "0.1em"
                                    }}>{s.desc}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            height: "1px", marginTop: "2.5rem",
                            background: "linear-gradient(to right,transparent,rgba(99,255,180,0.15),transparent)"
                        }} />
                    </div>
                </section>

                {/* ══ EXPERIENCE ═══════════════════════════ */}
                <section style={{ padding: "5rem 0" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Experience
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 2.5rem 0"
                            }}>
                                Work History
                            </h2>
                        </Reveal>

                        {EXPERIENCE.map((exp, i) => (
                            <Reveal key={i} delay={0.1}>
                                <div style={{
                                    position: "relative", paddingLeft: "2rem",
                                    borderLeft: "1px solid rgba(99,255,180,0.2)",
                                    marginBottom: "2rem",
                                }}>
                                    <div style={{
                                        position: "absolute", left: "-5px", top: "4px",
                                        width: "9px", height: "9px", borderRadius: "50%",
                                        background: "#63FFB4",
                                        boxShadow: "0 0 12px rgba(99,255,180,0.6)",
                                    }} />
                                    <div style={{
                                        background: "#0D0D16", border: "1px solid rgba(99,255,180,0.1)",
                                        borderRadius: "8px", padding: "1.8rem 2rem",
                                        transition: "border-color 0.3s, box-shadow 0.3s",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.25)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                                            <h3 style={{
                                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                                fontSize: "1.2rem", color: "#fff", margin: 0
                                            }}>{exp.role}</h3>
                                            <span style={{
                                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
                                                color: "#63FFB4", padding: "3px 12px",
                                                border: "1px solid rgba(99,255,180,0.25)", borderRadius: "2px"
                                            }}>{exp.period}</span>
                                        </div>
                                        <p style={{
                                            fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem",
                                            color: "#8892a4", margin: "0 0 1.2rem 0"
                                        }}>
                                            {exp.company} · {exp.location}
                                        </p>
                                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                                            {exp.points.map((pt, j) => (
                                                <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                                    <span style={{
                                                        color: "#63FFB4", fontFamily: "'JetBrains Mono',monospace",
                                                        fontSize: "0.7rem", flexShrink: 0, marginTop: "3px"
                                                    }}>→</span>
                                                    <span style={{
                                                        color: "#8892a4", fontSize: "0.88rem",
                                                        lineHeight: 1.7, fontFamily: "'Outfit',sans-serif"
                                                    }}>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ══ EDUCATION ════════════════════════════ */}
                <section style={{ padding: "5rem 0", background: "#0a0a12" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Education
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 2.5rem 0"
                            }}>
                                Academic Background
                            </h2>
                        </Reveal>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
                            {EDUCATION.map((ed, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div style={{
                                        background: "#0D0D16", borderRadius: "6px", padding: "1.5rem",
                                        border: ed.active ? "1px solid rgba(99,255,180,0.3)" : "1px solid rgba(99,255,180,0.07)",
                                        position: "relative", overflow: "hidden",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                                    >
                                        {ed.active && (
                                            <div style={{
                                                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                                                background: "linear-gradient(to right,#63FFB4,rgba(99,255,180,0.3))"
                                            }} />
                                        )}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                            <h3 style={{
                                                fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                                                fontSize: "0.95rem", color: "#fff", margin: 0, flex: 1
                                            }}>{ed.degree}</h3>
                                            {ed.note && (
                                                <span style={{
                                                    marginLeft: "8px", padding: "2px 8px", fontSize: "0.56rem",
                                                    fontFamily: "'JetBrains Mono',monospace",
                                                    background: ed.active ? "rgba(99,255,180,0.1)" : "rgba(99,255,180,0.05)",
                                                    color: "#63FFB4", border: "1px solid rgba(99,255,180,0.25)",
                                                    borderRadius: "2px", flexShrink: 0, letterSpacing: "0.06em"
                                                }}>{ed.note}</span>
                                            )}
                                        </div>
                                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", color: "#8892a4", margin: "0 0 6px 0" }}>{ed.school}</p>
                                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#4a5568", letterSpacing: "0.06em" }}>{ed.period}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ STRENGTHS ════════════════════════════ */}
                <section style={{ padding: "5rem 0" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Key Strengths
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 2.5rem 0"
                            }}>
                                What I Bring
                            </h2>
                        </Reveal>
                        <div className="strengths-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}>
                            {STRENGTHS.map((s, i) => (
                                <Reveal key={i} delay={i * 0.1}>
                                    <div className="strength-card" style={{
                                        background: "#0D0D16", border: "1px solid rgba(99,255,180,0.08)",
                                        borderRadius: "8px", padding: "1.8rem 1.5rem",
                                        cursor: "default", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.25)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.08)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                                    >
                                        <div className="strength-icon" style={{ fontSize: "2rem", marginBottom: "1rem", display: "inline-block" }}>{s.icon}</div>
                                        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: "0 0 8px 0" }}>{s.title}</h3>
                                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#8892a4", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ LANGUAGES ════════════════════════════ */}
                <section style={{ padding: "3rem 0 5rem", background: "#0a0a12" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Languages
                            </div>
                        </Reveal>
                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                            {[
                                { lang: "Urdu", level: "Native", pct: 100 },
                                { lang: "English", level: "Professional Working", pct: 80 },
                            ].map((l, i) => (
                                <Reveal key={l.lang} delay={i * 0.15}>
                                    <div style={{
                                        background: "#0D0D16", border: "1px solid rgba(99,255,180,0.08)",
                                        borderRadius: "6px", padding: "1.5rem 2rem", minWidth: "220px"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "1rem", color: "#fff" }}>{l.lang}</span>
                                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#63FFB4" }}>{l.level}</span>
                                        </div>
                                        <div style={{ height: "3px", background: "rgba(99,255,180,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                                            <div style={{
                                                height: "100%", width: `${l.pct}%`,
                                                background: "linear-gradient(to right,#63FFB4,rgba(99,255,180,0.6))",
                                                borderRadius: "2px"
                                            }} />
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ CTA ══════════════════════════════════ */}
                <section style={{ padding: "4rem 0", borderTop: "1px solid rgba(99,255,180,0.08)" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
                        <Reveal>
                            <p style={{
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
                                color: "rgba(99,255,180,0.55)", letterSpacing: "0.12em", marginBottom: "14px"
                            }}>
                                // lets_connect()
                            </p>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#fff",
                                letterSpacing: "-0.02em", margin: "0 0 0.8rem 0"
                            }}>
                                Ready to collaborate?
                            </h2>
                            <p style={{
                                color: "#8892a4", fontSize: "0.9rem", lineHeight: 1.8,
                                maxWidth: "360px", margin: "0 auto 2rem", fontFamily: "'Outfit',sans-serif"
                            }}>
                                I'm open to freelance projects and full-time opportunities.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                                <Link to="/contact" style={{
                                    padding: "12px 28px", fontSize: "0.85rem", fontWeight: 600,
                                    fontFamily: "'Outfit',sans-serif", background: "#63FFB4", color: "#08080C",
                                    border: "1px solid #63FFB4", textDecoration: "none",
                                    clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                                    transition: "all 0.3s",
                                }}
                                    onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = "#63FFB4"; }}
                                    onMouseLeave={e => { e.target.style.background = "#63FFB4"; e.target.style.color = "#08080C"; }}
                                >Get In Touch</Link>
                                <a href="https://github.com/sardarjunaidsahil" target="_blank" rel="noreferrer" style={{
                                    padding: "12px 28px", fontSize: "0.85rem", fontWeight: 600,
                                    fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#63FFB4",
                                    border: "1px solid rgba(99,255,180,0.3)", textDecoration: "none",
                                    clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                                    transition: "all 0.3s",
                                }}
                                    onMouseEnter={e => { e.target.style.borderColor = "#63FFB4"; e.target.style.background = "rgba(99,255,180,0.05)"; }}
                                    onMouseLeave={e => { e.target.style.borderColor = "rgba(99,255,180,0.3)"; e.target.style.background = "transparent"; }}
                                >GitHub Profile</a>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </div>
        </>
    );
}