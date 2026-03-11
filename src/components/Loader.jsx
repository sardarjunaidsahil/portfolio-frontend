import { useEffect, useState } from "react";

export default function Loader({ onDone }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0); // 0=loading, 1=done, 2=exit

    const LINES = [
        "Initializing portfolio...",
        "Loading projects...",
        "Compiling skills...",
        "Connecting to server...",
        "Ready.",
    ];

    useEffect(() => {
        // Progress bar fill
        const prog = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(prog); return 100; }
                return p + Math.random() * 12;
            });
        }, 120);

        // Phase transitions
        const t1 = setTimeout(() => setPhase(1), 1400); // show "Ready"
        const t2 = setTimeout(() => setPhase(2), 1900); // start exit
        const t3 = setTimeout(() => onDone(), 2500); // unmount

        return () => { clearInterval(prog); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    return (
        <>
            <style>{`
        @keyframes loaderFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes loaderSlideUp { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-30px)} }
        @keyframes termBlink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes lineFadeIn    { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
        @keyframes scanline      { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

        .loader-wrap {
          position: fixed; inset: 0; z-index: 99999;
          background: #08080C;
          display: flex; align-items: center; justify-content: center;
          animation: ${phase === 2 ? "loaderSlideUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards" : "loaderFadeIn 0.3s ease"};
        }
        .loader-scanline {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .loader-scanline::after {
          content: '';
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(99,255,180,0.06), transparent);
          animation: scanline 3s linear infinite;
        }
        .loader-term {
          width: min(480px, 90vw);
          background: #0D0D16;
          border: 1px solid rgba(99,255,180,0.2);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(99,255,180,0.08), 0 30px 80px rgba(0,0,0,0.8);
        }
        .loader-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(99,255,180,0.08);
        }
        .loader-body {
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          min-height: 160px;
        }
        .loader-line {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 8px; color: #8892a4;
          animation: lineFadeIn 0.3s ease both;
        }
        .loader-line.done  { color: #63FFB4; }
        .loader-line.ready { color: #fff; font-weight: 700; font-size: 0.9rem; }
        .loader-prompt { color: rgba(99,255,180,0.5); }
        .loader-cursor {
          display: inline-block; width: 8px; height: 14px;
          background: #63FFB4; vertical-align: middle;
          animation: termBlink 1s step-end infinite;
        }
        .loader-progress-wrap {
          padding: 0 1.5rem 1.5rem;
        }
        .loader-progress-track {
          height: 2px; background: rgba(99,255,180,0.08);
          border-radius: 2px; overflow: hidden;
        }
        .loader-progress-fill {
          height: 100%;
          background: linear-gradient(to right, #63FFB4, rgba(121,184,255,0.8));
          border-radius: 2px;
          transition: width 0.15s ease;
          box-shadow: 0 0 8px rgba(99,255,180,0.4);
        }
        .loader-pct {
          display: flex; justify-content: space-between;
          margin-bottom: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; color: #4a5568; letter-spacing: 0.08em;
        }
      `}</style>

            <div className="loader-wrap">
                <div className="loader-scanline" />

                {/* Glow */}
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "600px", height: "600px", borderRadius: "50%",
                    transform: "translate(-50%,-50%)", pointerEvents: "none",
                    background: "radial-gradient(circle,rgba(99,255,180,0.04) 0%,transparent 65%)",
                }} />

                <div className="loader-term">
                    {/* Title bar */}
                    <div className="loader-bar">
                        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                            <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                        ))}
                        <span style={{
                            marginLeft: "8px", fontFamily: "'JetBrains Mono',monospace",
                            fontSize: "0.62rem", color: "#4a5568"
                        }}>JunAid SAhil-Portfolio ~ bash</span>
                    </div>

                    {/* Terminal lines */}
                    <div className="loader-body">
                        {LINES.slice(0, phase === 0 ? 4 : 5).map((line, i) => (
                            <div
                                key={i}
                                className={`loader-line ${i < 4 ? "done" : "ready"}`}
                                style={{ animationDelay: `${i * 0.18}s` }}
                            >
                                <span className="loader-prompt">
                                    {i < 4 ? "✓" : "$"}
                                </span>
                                {line}
                            </div>
                        ))}
                        {phase === 0 && (
                            <div className="loader-line" style={{ animationDelay: "0.72s" }}>
                                <span className="loader-prompt">$</span>
                                <span className="loader-cursor" />
                            </div>
                        )}
                    </div>

                    {/* Progress */}
                    <div className="loader-progress-wrap">
                        <div className="loader-pct">
                            <span>loading...</span>
                            <span style={{ color: "#63FFB4" }}>{Math.min(Math.round(progress), 100)}%</span>
                        </div>
                        <div className="loader-progress-track">
                            <div className="loader-progress-fill"
                                style={{ width: `${Math.min(progress, 100)}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}