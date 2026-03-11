import { useEffect, useState } from "react";

export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);
    const [scrollPct, setScrollPct] = useState(0);
    const [direction, setDirection] = useState("down");
    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (y / total) * 100 : 0;

            setScrollY(y);
            setScrollPct(Math.round(pct));
            setDirection(y > lastY ? "down" : "up");
            setAtTop(y === 0);
            setAtBottom(Math.abs(y - total) < 5);

            lastY = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return { scrollY, scrollPct, direction, atTop, atBottom };
}