import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ── Route change pe automatically scroll top ──
export function ScrollReset() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// ── Scroll to top button ──
export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const p = total > 0 ? (scrolled / total) * 100 : 0;
            setPct(p);
            setVisible(scrolled > 300);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const r = 18;
    const c = 2 * Math.PI * r;
    const dash = c - (pct / 100) * c;

    return (
        <>
            <style>{`
        @keyframes sttFadeIn  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes sttFadeOut { from{opacity:1;transform:none} to{opacity:0;transform:translateY(12px)} }
        .stt-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9000;
          width: 48px; height: 48px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .stt-btn.show { animation: sttFadeIn  0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .stt-btn.hide { animation: sttFadeOut 0.25s ease forwards; pointer-events:none; }
        .stt-inner {
          width: 100%; height: 100%;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .stt-bg {
          position: absolute; inset: 0;
          background: #0D0D16;
          border: 1px solid rgba(99,255,180,0.2);
          border-radius: 50%;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .stt-btn:hover .stt-bg {
          border-color: #63FFB4;
          background: rgba(99,255,180,0.08);
          box-shadow: 0 0 20px rgba(99,255,180,0.2);
        }
        .stt-arrow {
          position: relative; z-index: 1;
          color: #63FFB4; font-size: 1rem; line-height: 1;
          transition: transform 0.3s;
        }
        .stt-btn:hover .stt-arrow { transform: translateY(-2px); }
        .stt-svg {
          position: absolute; inset: 0;
          transform: rotate(-90deg);
        }
      `}</style>

            <button
                className={`stt-btn ${visible ? "show" : "hide"}`}
                onClick={scrollUp}
                aria-label="Scroll to top"
                title="Back to top"
            >
                <div className="stt-inner">
                    <div className="stt-bg" />
                    <svg className="stt-svg" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r={r} stroke="rgba(99,255,180,0.08)" strokeWidth="2" fill="none" />
                        <circle cx="24" cy="24" r={r} stroke="#63FFB4" strokeWidth="2" fill="none"
                            strokeDasharray={c} strokeDashoffset={dash} strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.1s linear", filter: "drop-shadow(0 0 4px rgba(99,255,180,0.5))" }}
                        />
                    </svg>
                    <span className="stt-arrow">↑</span>
                </div>
            </button>
        </>
    );
}