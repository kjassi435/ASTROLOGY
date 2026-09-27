"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: unknown;
  }
}

// Fires a page_view on every App Router navigation (the base gtag
// snippet only tracks the first load, so inner pages were under-counted).
export function PageViewTracker({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!gaId || window[`ga-disable-${gaId}`]) return;
    window.gtag?.("config", gaId, { page_path: pathname });
  }, [pathname, gaId]);
  return null;
}

const CONSENT_KEY = "aa-consent";

// Privacy banner: tracking stays ON by default (client requirement),
// Decline immediately disables GA via the official ga-disable flag.
export function ConsentBanner({ gaId }: { gaId?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (!v) setVisible(true);
      else if (v === "declined" && gaId) window[`ga-disable-${gaId}`] = true;
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, [gaId]);

  if (!visible) return null;

  const choose = (v: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* ignore */
    }
    if (v === "declined" && gaId) window[`ga-disable-${gaId}`] = true;
    setVisible(false);
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm z-[90] bg-card border border-primary-hover/25 rounded-2xl shadow-lg p-4 text-sm">
      <p className="opacity-80 mb-3">
        We use cookies to measure visits and improve your experience.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose("declined")}
          className="btn btn-outline !py-1.5 !px-4 text-xs"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="btn btn-primary !py-1.5 !px-4 text-xs"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
