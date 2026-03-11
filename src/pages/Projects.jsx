import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Scroll reveal hook ────────────────────────────────
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

// ── Data ──────────────────────────────────────────────
const PROJECTS = [
    {
        id: 1,
        num: "001",
        title: "MAUVE — Fashion E-Commerce",
        short: "Full-stack fashion store with 315+ products, admin dashboard & complete auth system.",
        desc: "Built a complete fashion e-commerce platform from scratch. Features 315+ products with category/subcategory browsing and real-time search. Implemented full auth — OTP email verification, forgot/reset password, JWT sessions. Admin dashboard with full CRUD for orders, products and customers. Automated email notifications for order confirmation & status. Product reviews with star ratings, written reviews, edit/delete and rating summary.",
        tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "JWT", "Nodemailer"],
        live: "https://mauve-store.vercel.app",
        github: "https://github.com/sardarjunaidsahil",
        featured: true,
        highlights: [
            "315+ products with category/subcategory browsing & real-time search",
            "OTP email verification, forgot/reset password & JWT sessions",
            "Admin dashboard — full CRUD for orders, products & customers",
            "Automated email notifications via Nodemailer",
            "Product reviews — star ratings, written reviews, edit/delete",
            "Deployed on Vercel + Railway + PostgreSQL cloud database",
        ],
    },
    {
        id: 2,
        num: "002",
        title: "ShopingNow — E-Commerce App",
        short: "Complete shopping platform with cart, checkout, secure auth & fully responsive UI.",
        desc: "Developed a full shopping platform with product listings, cart, and checkout flow. Implemented secure user authentication with login, registration, and session management. Built a fully responsive UI optimized for both mobile and desktop. Deployed on Netlify with live production environment.",
        tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
        live: "https://shopingnow56.netlify.app",
        github: "https://github.com/sardarjunaidsahil",
        featured: true,
        highlights: [
            "Product listings, cart & full checkout flow",
            "Secure login, registration & session management",
            "Fully responsive UI — mobile & desktop optimized",
            "Deployed live on Netlify",
        ],
    },
];

const FILTERS = ["All", "React.js", "Node.js", "PostgreSQL", "Express.js", "Tailwind CSS"];

export default function Projects() {
    const [active, setActive] = useState("All");
    const [expanded, setExpanded] = useState(null);
    const [statsRef, statsVisible] = useReveal(0.3);

    const filtered = active === "All"
        ? PROJECTS
        : PROJECTS.filter(p => p.tags.includes(active));

    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .pj-card { animation:fadeUp 0.5s ease both; }
        .pj-card:nth-child(1) { animation-delay:0.05s; }
        .pj-card:nth-child(2) { animation-delay:0.15s; }
        @media(max-width:640px){
          .pj-expand-grid { grid-template-columns:1fr !important; }
          .pj-top-row { flex-direction:column !important; align-items:flex-start !important; }
        }
      `}</style>

            <div style={{ background: "#08080C", minHeight: "100vh", paddingTop: "72px", overflowX: "hidden" }}>

                {/* ── Header ───────────────────────────────── */}
                <section style={{
                    position: "relative", padding: "4rem 0 3rem",
                    borderBottom: "1px solid rgba(99,255,180,0.08)",
                }}>
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "linear-gradient(rgba(99,255,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(99,255,180,0.02) 1px,transparent 1px)",
                        backgroundSize: "60px 60px"
                    }} />
                    <div style={{
                        position: "absolute", top: "20%", right: "8%", width: "320px", height: "320px",
                        borderRadius: "50%", pointerEvents: "none",
                        background: "radial-gradient(circle,rgba(99,255,180,0.05) 0%,transparent 70%)"
                    }} />

                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px",
                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
                            color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase"
                        }}>
                            <span style={{ width: "24px", height: "1px", background: "#63FFB4" }} />
                            Portfolio
                        </div>

                        <h1 style={{
                            fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                            fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff",
                            letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1rem 0"
                        }}>
                            My Projects
                        </h1>

                        <p style={{
                            color: "#8892a4", fontSize: "0.95rem", lineHeight: 1.8,
                            maxWidth: "520px", fontFamily: "'Outfit',sans-serif", margin: "0 0 2rem 0"
                        }}>
                            Production-ready applications built independently — from database
                            schema to UI design and cloud deployment.
                        </p>

                        {/* Quick stats — FIXED: always 1 line */}
                        <div ref={statsRef} style={{ display: "flex", flexWrap: "nowrap", gap: "0", width: "100%" }}>
                            {[
                                { num: "2", suf: "", label: "Live Projects" },
                                { num: "315", suf: "+", label: "Products (MAUVE)" },
                                { num: "2023", suf: "", label: "Freelancing Since" },
                            ].map(s => (
                                <div key={s.label} style={{ flex: 1, minWidth: 0 }}>
                                    <span style={{
                                        display: "block", fontFamily: "'Outfit',sans-serif",
                                        fontWeight: 800, fontSize: "clamp(1.2rem,3vw,1.8rem)", color: "#63FFB4",
                                        letterSpacing: "-0.02em"
                                    }}>
                                        <AnimNum value={s.num} suffix={s.suf} started={statsVisible} />
                                    </span>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(0.48rem,1.2vw,0.58rem)",
                                        color: "#4a5568", letterSpacing: "0.08em", textTransform: "uppercase",
                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block"
                                    }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Filter Bar ───────────────────────────── */}
                <div style={{
                    position: "sticky", top: "72px", zIndex: 10,
                    background: "rgba(8,8,12,0.9)", backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(99,255,180,0.06)", padding: "1rem 0"
                }}>
                    <div style={{
                        maxWidth: "1152px", margin: "0 auto", padding: "0 2rem",
                        display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center"
                    }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                            color: "#4a5568", letterSpacing: "0.1em", marginRight: "4px"
                        }}>filter_by:</span>
                        {FILTERS.map(f => (
                            <button key={f} onClick={() => setActive(f)} style={{
                                padding: "5px 14px", fontSize: "0.76rem", fontWeight: 500,
                                fontFamily: "'Outfit',sans-serif", borderRadius: "2px", cursor: "pointer",
                                border: active === f ? "1px solid #63FFB4" : "1px solid rgba(99,255,180,0.12)",
                                background: active === f ? "rgba(99,255,180,0.1)" : "transparent",
                                color: active === f ? "#63FFB4" : "#8892a4",
                                transition: "all 0.2s",
                            }}>{f}</button>
                        ))}
                    </div>
                </div>

                {/* ── Project Cards ─────────────────────────── */}
                <section style={{ padding: "2.5rem 0 5rem" }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}>

                        {filtered.length === 0 && (
                            <div style={{
                                textAlign: "center", padding: "5rem 0",
                                fontFamily: "'JetBrains Mono',monospace", color: "#4a5568", fontSize: "0.85rem"
                            }}>
                // no_projects_found()
                            </div>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {filtered.map((p) => (
                                <div key={p.id} className="pj-card" style={{
                                    position: "relative", background: "#0D0D16",
                                    border: "1px solid rgba(99,255,180,0.08)", borderRadius: "8px",
                                    overflow: "hidden", transition: "border-color 0.3s, box-shadow 0.3s",
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = "rgba(99,255,180,0.22)";
                                        e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.45)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "rgba(99,255,180,0.08)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {/* Top green line */}
                                    <div style={{
                                        height: "2px",
                                        background: "linear-gradient(to right,#63FFB4,rgba(99,255,180,0.3),transparent)"
                                    }} />

                                    <div style={{ padding: "2rem 2rem 1.8rem" }}>

                                        {/* Top row: title + buttons */}
                                        <div className="pj-top-row" style={{
                                            display: "flex",
                                            alignItems: "flex-start", justifyContent: "space-between",
                                            flexWrap: "wrap", gap: "1rem", marginBottom: "1rem"
                                        }}>

                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                                                    <span style={{
                                                        fontFamily: "'JetBrains Mono',monospace",
                                                        fontSize: "0.6rem", color: "rgba(99,255,180,0.38)", letterSpacing: "0.1em"
                                                    }}>
                                                        {p.num}
                                                    </span>
                                                    {p.featured && (
                                                        <span style={{
                                                            padding: "1px 8px", fontSize: "0.58rem",
                                                            fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em",
                                                            border: "1px solid rgba(99,255,180,0.3)", color: "#63FFB4", borderRadius: "2px"
                                                        }}>
                                                            FEATURED
                                                        </span>
                                                    )}
                                                </div>
                                                <h2 style={{
                                                    fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                                                    fontSize: "clamp(1.2rem,3vw,1.7rem)", color: "#fff",
                                                    letterSpacing: "-0.02em", margin: 0
                                                }}>{p.title}</h2>
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{ display: "flex", gap: "10px", flexShrink: 0, flexWrap: "wrap" }}>
                                                <a href={p.live} target="_blank" rel="noreferrer" style={{
                                                    padding: "8px 18px", fontSize: "0.78rem", fontWeight: 600,
                                                    fontFamily: "'Outfit',sans-serif",
                                                    background: "#63FFB4", color: "#08080C",
                                                    border: "1px solid #63FFB4", textDecoration: "none",
                                                    clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                                    transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "5px",
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#63FFB4"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "#63FFB4"; e.currentTarget.style.color = "#08080C"; }}
                                                >↗ Live Demo</a>
                                                <a href={p.github} target="_blank" rel="noreferrer" style={{
                                                    padding: "8px 18px", fontSize: "0.78rem", fontWeight: 600,
                                                    fontFamily: "'Outfit',sans-serif",
                                                    background: "transparent", color: "#63FFB4",
                                                    border: "1px solid rgba(99,255,180,0.3)", textDecoration: "none",
                                                    clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                                    transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "5px",
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#63FFB4"; e.currentTarget.style.background = "rgba(99,255,180,0.05)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,255,180,0.3)"; e.currentTarget.style.background = "transparent"; }}
                                                >⌥ GitHub</a>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.1rem" }}>
                                            {p.tags.map(t => (
                                                <span key={t} style={{
                                                    padding: "3px 10px", fontSize: "0.62rem",
                                                    fontFamily: "'JetBrains Mono',monospace",
                                                    border: "1px solid rgba(99,255,180,0.18)",
                                                    color: "#63FFB4", borderRadius: "2px",
                                                }}>{t}</span>
                                            ))}
                                        </div>

                                        {/* Short desc */}
                                        <p style={{
                                            color: "#8892a4", fontSize: "0.88rem", lineHeight: 1.8,
                                            fontFamily: "'Outfit',sans-serif", margin: "0 0 1rem 0"
                                        }}>
                                            {p.short}
                                        </p>

                                        {/* Toggle */}
                                        <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{
                                            background: "none", border: "none", cursor: "pointer", padding: 0,
                                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
                                            color: "rgba(99,255,180,0.55)", letterSpacing: "0.06em", transition: "color 0.2s",
                                        }}
                                            onMouseEnter={e => e.target.style.color = "#63FFB4"}
                                            onMouseLeave={e => e.target.style.color = "rgba(99,255,180,0.55)"}
                                        >
                                            {expanded === p.id ? "▲ show less" : "▼ view details"}
                                        </button>

                                        {/* Expanded */}
                                        {expanded === p.id && (
                                            <div style={{
                                                marginTop: "1.5rem", paddingTop: "1.5rem",
                                                borderTop: "1px solid rgba(99,255,180,0.07)"
                                            }}>
                                                <div className="pj-expand-grid" style={{
                                                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem"
                                                }}>

                                                    <div>
                                                        <div style={{
                                                            fontFamily: "'JetBrains Mono',monospace",
                                                            fontSize: "0.62rem", color: "#63FFB4", letterSpacing: "0.1em",
                                                            textTransform: "uppercase", marginBottom: "10px"
                                                        }}>// about</div>
                                                        <p style={{
                                                            color: "#8892a4", fontSize: "0.875rem", lineHeight: 1.9,
                                                            fontFamily: "'Outfit',sans-serif", margin: 0
                                                        }}>{p.desc}</p>
                                                    </div>

                                                    <div>
                                                        <div style={{
                                                            fontFamily: "'JetBrains Mono',monospace",
                                                            fontSize: "0.62rem", color: "#63FFB4", letterSpacing: "0.1em",
                                                            textTransform: "uppercase", marginBottom: "10px"
                                                        }}>// key features</div>
                                                        <ul style={{
                                                            listStyle: "none", margin: 0, padding: 0,
                                                            display: "flex", flexDirection: "column", gap: "9px"
                                                        }}>
                                                            {p.highlights.map((h, j) => (
                                                                <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                                                    <span style={{
                                                                        color: "#63FFB4", fontFamily: "'JetBrains Mono',monospace",
                                                                        fontSize: "0.68rem", flexShrink: 0, marginTop: "2px"
                                                                    }}>→</span>
                                                                    <span style={{
                                                                        color: "#8892a4", fontSize: "0.875rem",
                                                                        lineHeight: 1.65, fontFamily: "'Outfit',sans-serif"
                                                                    }}>{h}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Coming soon */}
                        <div style={{
                            marginTop: "2.5rem", padding: "1.8rem",
                            border: "1px dashed rgba(99,255,180,0.12)", borderRadius: "6px",
                            textAlign: "center", background: "rgba(99,255,180,0.015)"
                        }}>
                            <span style={{
                                fontFamily: "'JetBrains Mono',monospace",
                                fontSize: "0.72rem", color: "#4a5568", letterSpacing: "0.1em"
                            }}>
                // More Projects Coming Soon...
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────────── */}
                <section style={{
                    padding: "4rem 0", background: "#0a0a12",
                    borderTop: "1px solid rgba(99,255,180,0.08)"
                }}>
                    <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
                        <p style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem",
                            color: "rgba(99,255,180,0.55)", letterSpacing: "0.12em", marginBottom: "14px"
                        }}>
              // like_what_you_see()
                        </p>
                        <h2 style={{
                            fontFamily: "'Outfit',sans-serif", fontWeight: 800,
                            fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#fff",
                            letterSpacing: "-0.02em", margin: "0 0 0.8rem 0"
                        }}>
                            Let's Work Together
                        </h2>
                        <p style={{
                            color: "#8892a4", fontSize: "0.88rem", lineHeight: 1.8,
                            maxWidth: "360px", margin: "0 auto 2rem", fontFamily: "'Outfit',sans-serif"
                        }}>
                            Available for freelance projects and full-time positions.
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
                            >View GitHub</a>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}