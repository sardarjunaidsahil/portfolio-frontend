import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const from =
    direction === "left"
      ? "translateX(-36px)"
      : direction === "right"
        ? "translateX(36px)"
        : "translateY(28px)";
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : from,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const CONTACT_INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "sardarjunaidsahil@gmail.com",
    href: "mailto:sardarjunaidsahil@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+92 339 3999039",
    href: "https://wa.me/923393999039",
  },
  { icon: "📍", label: "Location", value: "Lahore, Pakistan", href: null },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/sardarjunaidsahil",
    href: "https://github.com/sardarjunaidsahil",
  },
  {
    icon: "↗",
    label: "MAUVE (Live)",
    value: "mauve-store.vercel.app",
    href: "https://mauve-store.vercel.app",
  },
  {
    icon: "↗",
    label: "ShopingNow (Live)",
    value: "shopingnow56.netlify.app",
    href: "https://shopingnow56.netlify.app",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch {
      alert("Network error. Is backend running?");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "12px 16px",
    fontFamily: "'Outfit',sans-serif",
    fontSize: "0.88rem",
    background: "rgba(255,255,255,0.03)",
    border:
      focused === name
        ? "1px solid rgba(99,255,180,0.5)"
        : "1px solid rgba(99,255,180,0.12)",
    borderRadius: "4px",
    color: "#fff",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: focused === name ? "0 0 0 3px rgba(99,255,180,0.07)" : "none",
    boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block",
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: "0.65rem",
    color: "#8892a4",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "7px",
  };

  return (
    <>
      <style>{`
                @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.95)} }
                @keyframes checkPop { 0%{transform:scale(0) rotate(-15deg);opacity:0}
                                      70%{transform:scale(1.2) rotate(3deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
                .contact-dot { animation:pulse 2s ease-in-out infinite; }
                .check-pop   { animation:checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
                ::placeholder { color:#4a5568 !important; }

                @media(max-width:900px){
                    .contact-grid { grid-template-columns:1fr !important; }
                }
                @media(max-width:600px){
                    .contact-header-section { padding: 1.8rem 0 1.2rem !important; }
                    .contact-main-section   { padding: 1.8rem 0 2.5rem !important; }
                    .contact-badge          { margin-top: 0.6rem !important; padding: 7px 12px !important; }
                    .contact-grid           { gap: 1.2rem !important; }
                    .name-email-grid        { grid-template-columns: 1fr !important; }
                    .contact-info-gap       { gap: 0.6rem !important; }
                }
            `}</style>

      <div
        style={{
          background: "#08080C",
          minHeight: "100vh",
          paddingTop: "72px",
          overflowX: "hidden",
        }}
      >
        {/* ── Header ── */}
        <section
          className="contact-header-section"
          style={{
            position: "relative",
            padding: "4rem 0 3rem",
            borderBottom: "1px solid rgba(99,255,180,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(99,255,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(99,255,180,0.02) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              left: "10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle,rgba(99,255,180,0.04) 0%,transparent 65%)",
            }}
          />

          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "0 2rem",
              position: "relative",
            }}
          >
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.68rem",
                  color: "#63FFB4",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "#63FFB4",
                  }}
                />
                Contact
              </div>
              <h1
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem,5vw,3.8rem)",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  margin: "0 0 1rem 0",
                }}
              >
                Let's Work
                <br />
                <span style={{ color: "#63FFB4" }}>Together</span>
              </h1>
              <p
                style={{
                  color: "#8892a4",
                  fontSize: "0.92rem",
                  lineHeight: 1.8,
                  maxWidth: "480px",
                  fontFamily: "'Outfit',sans-serif",
                  margin: 0,
                }}
              >
                Have a project in mind or want to hire me? Drop a message — I
                usually respond within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                className="contact-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1.2rem",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid rgba(99,255,180,0.2)",
                  background: "rgba(99,255,180,0.05)",
                }}
              >
                <span
                  className="contact-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#63FFB4",
                    boxShadow: "0 0 8px rgba(99,255,180,0.6)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.65rem",
                    color: "#63FFB4",
                    letterSpacing: "0.08em",
                  }}
                >
                  Available for freelance & full-time — Lahore / Remote
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section
          className="contact-main-section"
          style={{ padding: "4rem 0 6rem" }}
        >
          <div
            style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 2rem" }}
          >
            <div
              className="contact-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              {/* LEFT — Info */}
              <div>
                <Reveal>
                  <h2
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#fff",
                      margin: "0 0 1.2rem 0",
                    }}
                  >
                    Get in touch
                  </h2>
                </Reveal>

                <div
                  className="contact-info-gap"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {CONTACT_INFO.map((item, i) => (
                    <Reveal key={item.label} delay={i * 0.07} direction="left">
                      <div
                        style={{
                          background: "#0D0D16",
                          border: "1px solid rgba(99,255,180,0.08)",
                          borderRadius: "6px",
                          padding: "0.85rem 1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          transition: "border-color 0.3s, transform 0.3s",
                          cursor: item.href ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(99,255,180,0.25)";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(99,255,180,0.08)";
                          e.currentTarget.style.transform = "none";
                        }}
                        onClick={() =>
                          item.href && window.open(item.href, "_blank")
                        }
                      >
                        <span
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "6px",
                            background: "rgba(99,255,180,0.07)",
                            border: "1px solid rgba(99,255,180,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.95rem",
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <span
                            style={{
                              display: "block",
                              fontFamily: "'JetBrains Mono',monospace",
                              fontSize: "0.58rem",
                              color: "#4a5568",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              marginBottom: "2px",
                            }}
                          >
                            {item.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Outfit',sans-serif",
                              fontSize: "0.78rem",
                              color: item.href ? "#63FFB4" : "#c9d1d9",
                              wordBreak: "break-all",
                              display: "block",
                            }}
                          >
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* RIGHT — Form */}
              <Reveal delay={0.1} direction="right">
                <div
                  style={{
                    background: "#0D0D16",
                    border: "1px solid rgba(99,255,180,0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      background: "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid rgba(99,255,180,0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <span
                        key={c}
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: "8px",
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "0.62rem",
                        color: "#4a5568",
                      }}
                    >
                      new_message.js
                    </span>
                  </div>

                  <div style={{ padding: "2rem" }}>
                    {sent ? (
                      <div
                        style={{ textAlign: "center", padding: "3rem 1rem" }}
                      >
                        <div
                          className="check-pop"
                          style={{ fontSize: "3rem", marginBottom: "1rem" }}
                        >
                          ✓
                        </div>
                        <h3
                          style={{
                            fontFamily: "'Outfit',sans-serif",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            color: "#63FFB4",
                            margin: "0 0 8px 0",
                          }}
                        >
                          Message Sent!
                        </h3>
                        <p
                          style={{
                            color: "#8892a4",
                            fontSize: "0.88rem",
                            fontFamily: "'Outfit',sans-serif",
                            lineHeight: 1.7,
                            margin: "0 0 1.5rem 0",
                          }}
                        >
                          Thanks for reaching out. I'll get back to you within
                          24 hours.
                        </p>
                        <button
                          onClick={() => {
                            setSent(false);
                            setForm({
                              name: "",
                              email: "",
                              subject: "",
                              message: "",
                            });
                          }}
                          style={{
                            padding: "10px 24px",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            fontFamily: "'Outfit',sans-serif",
                            background: "transparent",
                            color: "#63FFB4",
                            border: "1px solid rgba(99,255,180,0.3)",
                            borderRadius: "2px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "rgba(99,255,180,0.05)";
                            e.target.style.borderColor = "#63FFB4";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.borderColor = "rgba(99,255,180,0.3)";
                          }}
                        >
                          Send Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div
                          className="name-email-grid"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <div>
                            <label style={labelStyle}>Name</label>
                            <input
                              name="name"
                              value={form.name}
                              required
                              placeholder="Muhammad Junaid"
                              onChange={handleChange}
                              onFocus={() => setFocused("name")}
                              onBlur={() => setFocused(null)}
                              style={inputStyle("name")}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>Email</label>
                            <input
                              name="email"
                              type="email"
                              value={form.email}
                              required
                              placeholder="you@example.com"
                              onChange={handleChange}
                              onFocus={() => setFocused("email")}
                              onBlur={() => setFocused(null)}
                              style={inputStyle("email")}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                          <label style={labelStyle}>Subject</label>
                          <input
                            name="subject"
                            value={form.subject}
                            required
                            placeholder="Project inquiry / Hiring / Collaboration"
                            onChange={handleChange}
                            onFocus={() => setFocused("subject")}
                            onBlur={() => setFocused(null)}
                            style={inputStyle("subject")}
                          />
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                          <label style={labelStyle}>Message</label>
                          <textarea
                            name="message"
                            value={form.message}
                            required
                            rows={5}
                            placeholder="Tell me about your project, timeline, and budget..."
                            onChange={handleChange}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused(null)}
                            style={{
                              ...inputStyle("message"),
                              resize: "vertical",
                              minHeight: "120px",
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={sending}
                          style={{
                            width: "100%",
                            padding: "14px",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            fontFamily: "'Outfit',sans-serif",
                            background: sending
                              ? "rgba(99,255,180,0.5)"
                              : "#63FFB4",
                            color: "#08080C",
                            border: "1px solid #63FFB4",
                            borderRadius: "2px",
                            cursor: sending ? "wait" : "pointer",
                            clipPath:
                              "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            if (!sending) {
                              e.target.style.background = "transparent";
                              e.target.style.color = "#63FFB4";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!sending) {
                              e.target.style.background = "#63FFB4";
                              e.target.style.color = "#08080C";
                            }
                          }}
                        >
                          {sending ? "Sending..." : "Send Message →"}
                        </button>

                        <p
                          style={{
                            marginTop: "12px",
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: "0.6rem",
                            color: "#4a5568",
                            textAlign: "center",
                            letterSpacing: "0.06em",
                          }}
                        >
                          // or email directly: sardarjunaidsahil@gmail.com
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
