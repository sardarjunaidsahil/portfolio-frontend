import { Link } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Skills", to: "/skills" },
    { label: "Contact", to: "/contact" },
];

const PROJECTS = [
    { label: "MAUVE — Fashion Store", href: "https://mauve-store.vercel.app" },
    { label: "ShopingNow — E-Commerce", href: "https://shopingnow56.netlify.app" },
];

const SOCIALS = [
    {
        label: "GitHub",
        href: "https://github.com/sardarjunaidsahil",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/sardarjunaidsahil",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:sardarjunaidsahil@gmail.com",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <style>{`
        @keyframes footerGlow {
          0%,100% { opacity:0.4; } 50% { opacity:0.8; }
        }
        .ft-nav-link:hover  { color:#63FFB4 !important; }
        .ft-proj-link:hover { color:#63FFB4 !important; padding-left:8px !important; }
        .ft-social:hover    { border-color:#63FFB4 !important; color:#63FFB4 !important;
                              background:rgba(99,255,180,0.08) !important;
                              transform:translateY(-2px) !important; }
      `}</style>

            <footer style={{
                background: "#0a0a12",
                borderTop: "1px solid rgba(99,255,180,0.08)",
                position: "relative", overflow: "hidden",
            }}>
                {/* Subtle glow */}
                <div style={{
                    position: "absolute", top: "-80px", left: "50%",
                    transform: "translateX(-50%)",
                    width: "600px", height: "200px", pointerEvents: "none",
                    background: "radial-gradient(ellipse,rgba(99,255,180,0.04) 0%,transparent 70%)",
                    animation: "footerGlow 4s ease-in-out infinite",
                }} />

                {/* ── Main content ── */}
                <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "3.5rem 2rem 2rem", position: "relative" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
                        gap: "2.5rem",
                    }}
                        className="ft-grid"
                    >

                        {/* Brand col */}
                        <div>
                            {/* Logo */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                                <span style={{
                                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
                                    fontSize: "1.1rem", color: "#63FFB4", letterSpacing: "-0.02em",
                                }}>
                                    [<span style={{ color: "#fff" }}>dev</span>
                                    <span style={{
                                        display: "inline-block", width: "6px", height: "6px",
                                        borderRadius: "50%", background: "#63FFB4",
                                        margin: "0 1px 3px", verticalAlign: "middle",
                                        animation: "footerGlow 1.4s ease-in-out infinite",
                                    }} />]
                                </span>
                                <span style={{
                                    fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                                    fontSize: "0.95rem", color: "#fff", letterSpacing: "-0.01em",
                                }}>Junaid Sahil</span>
                            </div>

                            <p style={{
                                fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem",
                                color: "#8892a4", lineHeight: 1.8, maxWidth: "280px", margin: "0 0 1.5rem 0",
                            }}>
                                Full Stack Developer based in Lahore, Pakistan. Building
                                production-ready web applications independently.
                            </p>

                            {/* Socials */}
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {SOCIALS.map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                        className="ft-social"
                                        title={s.label}
                                        style={{
                                            width: "38px", height: "38px", borderRadius: "6px",
                                            border: "1px solid rgba(99,255,180,0.15)",
                                            background: "transparent", color: "#8892a4",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            textDecoration: "none", transition: "all 0.25s", flexShrink: 0,
                                        }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase",
                                margin: "0 0 1.2rem 0",
                            }}>// navigate</h4>
                            <ul style={{
                                listStyle: "none", margin: 0, padding: 0,
                                display: "flex", flexDirection: "column", gap: "10px"
                            }}>
                                {NAV_LINKS.map(l => (
                                    <li key={l.label}>
                                        <Link to={l.to} className="ft-nav-link" style={{
                                            fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                                            color: "#8892a4", textDecoration: "none", transition: "color 0.2s",
                                        }}>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Projects */}
                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase",
                                margin: "0 0 1.2rem 0",
                            }}>// projects</h4>
                            <ul style={{
                                listStyle: "none", margin: 0, padding: 0,
                                display: "flex", flexDirection: "column", gap: "10px"
                            }}>
                                {PROJECTS.map(p => (
                                    <li key={p.label}>
                                        <a href={p.href} target="_blank" rel="noreferrer"
                                            className="ft-proj-link"
                                            style={{
                                                fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem",
                                                color: "#8892a4", textDecoration: "none",
                                                transition: "color 0.2s, padding-left 0.2s",
                                                paddingLeft: "0",
                                            }}>{p.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact info */}
                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                                color: "#63FFB4", letterSpacing: "0.15em", textTransform: "uppercase",
                                margin: "0 0 1.2rem 0",
                            }}>// contact</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {[
                                    { icon: "✉", val: "sardarjunaidsahil@gmail.com", href: "mailto:sardarjunaidsahil@gmail.com" },
                                    { icon: "📞", val: "0339-3999039", href: "tel:+923393999039" },
                                    { icon: "📍", val: "Lahore, Pakistan", href: null },
                                ].map(item => (
                                    <div key={item.val} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "0.8rem", flexShrink: 0, marginTop: "1px" }}>{item.icon}</span>
                                        {item.href ? (
                                            <a href={item.href} style={{
                                                fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem",
                                                color: "#8892a4", textDecoration: "none", transition: "color 0.2s",
                                                wordBreak: "break-all",
                                            }}
                                                onMouseEnter={e => e.target.style.color = "#63FFB4"}
                                                onMouseLeave={e => e.target.style.color = "#8892a4"}
                                            >{item.val}</a>
                                        ) : (
                                            <span style={{
                                                fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem",
                                                color: "#8892a4"
                                            }}>{item.val}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ── Divider ── */}
                    <div style={{
                        height: "1px", margin: "2.5rem 0 1.5rem",
                        background: "linear-gradient(to right,transparent,rgba(99,255,180,0.12),transparent)",
                    }} />

                    {/* ── Bottom bar ── */}
                    <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
                    }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                            color: "#4a5568", letterSpacing: "0.06em",
                        }}>
                            © {year} Junaid Sahil — All rights reserved
                        </span>

                        <span style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem",
                            color: "#4a5568", letterSpacing: "0.04em",
                            display: "flex", alignItems: "center", gap: "6px",
                        }}>
                            {"</>"}
                            <span>Built with</span>
                            <span style={{ color: "#f97583" }}>React</span>
                            <span>+</span>
                            <span style={{ color: "#79b8ff" }}>Vite</span>
                            <span>+</span>
                            <span style={{ color: "#63FFB4" }}>Node.js</span>
                        </span>
                    </div>
                </div>

                {/* Mobile responsive */}
                <style>{`
          @media(max-width:900px){
            .ft-grid { grid-template-columns:1fr 1fr !important; }
          }
          @media(max-width:560px){
            .ft-grid { grid-template-columns:1fr !important; }
          }
        `}</style>
            </footer>
        </>
    );
}