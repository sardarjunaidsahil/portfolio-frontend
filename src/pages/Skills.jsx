import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

function Reveal({ children, delay = 0, direction = "up" }) {
    const [ref, visible] = useReveal();
    const from = direction === "left" ? "translateX(-36px)"
        : direction === "right" ? "translateX(36px)"
            : "translateY(28px)";
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : from,
            transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        }}>
            {children}
        </div>
    );
}

// Animated skill bar
function SkillBar({ name, pct, delay, started }) {
    return (
        <div style={{
            marginBottom: "1.1rem",
            opacity: started ? 1 : 0,
            transform: started ? "none" : "translateX(-20px)",
            transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{
                    fontFamily: "'Outfit',sans-serif", fontWeight: 500,
                    fontSize: "0.85rem", color: "#c9d1d9"
                }}>{name}</span>
                <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                    color: "#63FFB4"
                }}>{pct}%</span>
            </div>
            <div style={{ height: "3px", background: "rgba(99,255,180,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                    height: "100%", borderRadius: "2px",
                    background: "linear-gradient(to right,#63FFB4,rgba(121,184,255,0.8))",
                    width: started ? `${pct}%` : "0%",
                    transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay + 0.2}s`,
                }} />
            </div>
        </div>
    );
}

const SKILL_GROUPS = [
    {
        title: "Frontend",
        icon: "◈",
        skills: [
            { name: "React.js", pct: 92 },
            { name: "JavaScript (ES6+)", pct: 88 },
            { name: "Tailwind CSS", pct: 90 },
            { name: "HTML5 / CSS3", pct: 92 },
            { name: "Vite", pct: 85 },
            { name: "React Router", pct: 88 },
            { name: "Context API", pct: 82 },
        ],
    },
    {
        title: "Backend",
        icon: "◉",
        skills: [
            { name: "Node.js", pct: 85 },
            { name: "Express.js", pct: 87 },
            { name: "REST APIs", pct: 88 },
            { name: "JWT Authentication", pct: 85 },
            { name: "bcryptjs", pct: 80 },
            { name: "Nodemailer", pct: 82 },
        ],
    },
    {
        title: "Database",
        icon: "◎",
        skills: [
            { name: "PostgreSQL", pct: 84 },
            { name: "SQL", pct: 85 },
            { name: "pgAdmin", pct: 78 },
        ],
    },
    {
        title: "Tools & Deployment",
        icon: "◆",
        skills: [
            { name: "Git / GitHub", pct: 88 },
            { name: "Vercel", pct: 90 },
            { name: "Netlify", pct: 88 },
            { name: "Railway", pct: 80 },
            { name: "Postman", pct: 82 },
            { name: "VS Code", pct: 92 },
        ],
    },
];

const TECH_CHIPS = [
    { label: "React.js", cat: "frontend" },
    { label: "Vite", cat: "frontend" },
    { label: "Tailwind CSS", cat: "frontend" },
    { label: "JavaScript", cat: "frontend" },
    { label: "HTML5", cat: "frontend" },
    { label: "CSS3", cat: "frontend" },
    { label: "React Router", cat: "frontend" },
    { label: "Context API", cat: "frontend" },
    { label: "Node.js", cat: "backend" },
    { label: "Express.js", cat: "backend" },
    { label: "REST APIs", cat: "backend" },
    { label: "JWT", cat: "backend" },
    { label: "Nodemailer", cat: "backend" },
    { label: "bcryptjs", cat: "backend" },
    { label: "PostgreSQL", cat: "database" },
    { label: "SQL", cat: "database" },
    { label: "pgAdmin", cat: "database" },
    { label: "Git", cat: "tools" },
    { label: "GitHub", cat: "tools" },
    { label: "Vercel", cat: "tools" },
    { label: "Netlify", cat: "tools" },
    { label: "Railway", cat: "tools" },
    { label: "Postman", cat: "tools" },
];

const CAT_COLORS = {
    frontend: { bg: "rgba(99,255,180,0.08)", border: "rgba(99,255,180,0.25)", text: "#63FFB4" },
    backend: { bg: "rgba(121,184,255,0.08)", border: "rgba(121,184,255,0.25)", text: "#79b8ff" },
    database: { bg: "rgba(255,171,112,0.08)", border: "rgba(255,171,112,0.25)", text: "#ffab70" },
    tools: { bg: "rgba(199,146,234,0.08)", border: "rgba(199,146,234,0.25)", text: "#c792ea" },
};

const CONCEPTS = [
    "Full Stack Development",
    "MVC Architecture",
    "OTP Authentication",
    "Responsive Design",
    "REST API Design",
    "Cloud Deployment",
    "Database Schema Design",
    "E-Commerce Development",
    "Admin Dashboard",
    "Email Automation",
];

// ── Skill Group Card — own hook per group ─────────────
function SkillGroup({ grp, gi }) {
    const [ref, visible] = useReveal(0.2);
    return (
        <div ref={ref} style={{
            background: "#0D0D16", border: "1px solid rgba(99,255,180,0.08)",
            borderRadius: "8px", padding: "1.8rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: `opacity 0.6s ease ${gi * 0.1}s, transform 0.6s ease ${gi * 0.1}s`,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <span style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "1.2rem", color: "#63FFB4"
                }}>{grp.icon}</span>
                <h3 style={{
                    fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                    fontSize: "1rem", color: "#fff", margin: 0
                }}>{grp.title}</h3>
            </div>
            {grp.skills.map((sk, si) => (
                <SkillBar key={sk.name} name={sk.name} pct={sk.pct}
                    delay={si * 0.06} started={visible} />
            ))}
        </div>
    );
}

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? TECH_CHIPS
        : TECH_CHIPS.filter(c => c.cat === activeFilter);

    return (
        <>
            <style>{`
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-8px); }
        }
        .skills-chip:hover { transform:translateY(-3px) scale(1.05) !important; }
        @media(max-width:768px){
          .skills-bars-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

            <div style={{ background: "#08080C", minHeight: "100vh", paddingTop: "72px", overflowX: "hidden" }}>

                {/* ── Header ───────────────────────────── */}
                <section style={{
                    position: "relative", padding: "4rem 0 3rem",
                    borderBottom: "1px solid rgba(99,255,180,0.08)", overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "linear-gradient(rgba(99,255,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(99,255,180,0.02) 1px,transparent 1px)",
                        backgroundSize: "60px 60px"
                    }} />
                    <div style={{
                        position: "absolute", top: "10%", right: "5%", width: "400px", height: "400px",
                        borderRadius: "50%", pointerEvents: "none",
                        background: "radial-gradient(circle,rgba(99,255,180,0.05) 0%,transparent 70%)"
                    }} />

                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Expertise
                            </div>
                            <h1 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff",
                                letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1rem 0"
                            }}>
                                Technical Skills
                            </h1>
                            <p style={{
                                color: "#8892a4", fontSize: "0.95rem", lineHeight: 1.8,
                                maxWidth: "500px", fontFamily: "'Outfit',sans-serif", margin: 0
                            }}>
                                A full-stack toolkit built through real production projects —
                                not just tutorials. Everything here has been used in shipped applications.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* ── Skill Bars ───────────────────────── */}
                <section style={{ padding: "5rem 0" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Proficiency
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.4rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 2.5rem 0"
                            }}>Skill Levels</h2>
                        </Reveal>

                        <div className="skills-bars-grid" style={{
                            display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem"
                        }}>
                            {SKILL_GROUPS.map((grp, gi) => (
                                <SkillGroup key={grp.title} grp={grp} gi={gi} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Tech Chips ───────────────────────── */}
                <section style={{ padding: "5rem 0", background: "#0a0a12" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Tech Stack
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.4rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 1.5rem 0"
                            }}>Tools & Technologies</h2>
                        </Reveal>

                        {/* Filter */}
                        <Reveal delay={0.1}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}>
                                {["all", "frontend", "backend", "database", "tools"].map(f => (
                                    <button key={f} onClick={() => setActiveFilter(f)} style={{
                                        padding: "5px 14px", fontSize: "0.75rem", fontWeight: 500,
                                        fontFamily: "'Outfit',sans-serif", borderRadius: "2px", cursor: "pointer",
                                        border: activeFilter === f ? "1px solid #63FFB4" : "1px solid rgba(99,255,180,0.12)",
                                        background: activeFilter === f ? "rgba(99,255,180,0.1)" : "transparent",
                                        color: activeFilter === f ? "#63FFB4" : "#8892a4",
                                        transition: "all 0.2s", textTransform: "capitalize",
                                    }}>{f}</button>
                                ))}
                            </div>
                        </Reveal>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {filtered.map((chip, i) => {
                                const c = CAT_COLORS[chip.cat];
                                return (
                                    <div key={chip.label} className="skills-chip" style={{
                                        padding: "8px 16px", fontSize: "0.82rem", fontWeight: 500,
                                        fontFamily: "'Outfit',sans-serif",
                                        background: c.bg, border: `1px solid ${c.border}`,
                                        color: c.text, borderRadius: "4px", cursor: "default",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        opacity: 1,
                                        animation: `fadeIn 0.4s ease ${i * 0.03}s both`,
                                    }}>
                                        {chip.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Concepts ─────────────────────────── */}
                <section style={{ padding: "5rem 0" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>
                        <Reveal>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px",
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                            }}>
                                <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                                Concepts
                            </div>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.8rem,4vw,2.4rem)", color: "#fff",
                                letterSpacing: "-0.03em", margin: "0 0 2rem 0"
                            }}>Core Concepts</h2>
                        </Reveal>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
                            {CONCEPTS.map((c, i) => (
                                <Reveal key={c} delay={i * 0.06}>
                                    <div style={{
                                        background: "#0D0D16", border: "1px solid rgba(99,255,180,0.08)",
                                        borderRadius: "6px", padding: "1.2rem 1.4rem",
                                        display: "flex", alignItems: "center", gap: "12px",
                                        transition: "border-color 0.3s, transform 0.3s",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.25)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.08)"; e.currentTarget.style.transform = "none"; }}
                                    >
                                        <span style={{
                                            width: "6px", height: "6px", borderRadius: "50%",
                                            background: "#63FFB4", flexShrink: 0,
                                            boxShadow: "0 0 8px rgba(99,255,180,0.5)"
                                        }} />
                                        <span style={{
                                            fontFamily: "'Outfit',sans-serif", fontWeight: 500,
                                            fontSize: "0.85rem", color: "#c9d1d9"
                                        }}>{c}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────── */}
                <section style={{
                    padding: "4rem 0", background: "#0a0a12",
                    borderTop: "1px solid rgba(99,255,180,0.08)"
                }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
                        <Reveal>
                            <p style={{
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
                                color: "rgba(99,255,180,0.55)", letterSpacing: "0.12em", marginBottom: "14px"
                            }}>
                // hire_me()
                            </p>
                            <h2 style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#fff",
                                letterSpacing: "-0.02em", margin: "0 0 0.8rem 0"
                            }}>
                                Put These Skills to Work
                            </h2>
                            <p style={{
                                color: "#8892a4", fontSize: "0.9rem", lineHeight: 1.8,
                                maxWidth: "360px", margin: "0 auto 2rem", fontFamily: "'Outfit',sans-serif"
                            }}>
                                Looking for a developer who can ship? Let's talk.
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
                                >Hire Me</Link>
                                <Link to="/projects" style={{
                                    padding: "12px 28px", fontSize: "0.85rem", fontWeight: 600,
                                    fontFamily: "'Outfit',sans-serif", background: "transparent", color: "#63FFB4",
                                    border: "1px solid rgba(99,255,180,0.3)", textDecoration: "none",
                                    clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                                    transition: "all 0.3s",
                                }}
                                    onMouseEnter={e => { e.target.style.borderColor = "#63FFB4"; e.target.style.background = "rgba(99,255,180,0.05)"; }}
                                    onMouseLeave={e => { e.target.style.borderColor = "rgba(99,255,180,0.3)"; e.target.style.background = "transparent"; }}
                                >See Projects</Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </div>
        </>
    );
}