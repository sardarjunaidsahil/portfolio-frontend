import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function trackEvent(event, page = null) {
    try {
        await fetch(`${API}/analytics/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event,
                page: page || window.location.pathname,
                referrer: document.referrer || "",
            }),
        });
    } catch {
        // Silent fail
    }
}

export function useAnalytics() {
    const location = useLocation();
    useEffect(() => {
        trackEvent("page_view", location.pathname);
    }, [location.pathname]);
}