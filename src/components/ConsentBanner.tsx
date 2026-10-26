"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const grant = (v: "granted" | "denied") =>
  window.gtag?.("consent", "update", {
    ad_storage: v,
    analytics_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem("consent");
    } catch {}
    if (v === "granted" || v === "denied") {
      grant(v);
      return;
    }
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const choose = (v: "granted" | "denied") => {
    try {
      localStorage.setItem("consent", v);
    } catch {}
    grant(v);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/12 bg-espresso/95 px-5 py-4 text-[0.8125rem] text-ivory/85 backdrop-blur-xl max-lg:bottom-[4.5rem] lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          We use cookies to measure visits and the performance of our ads. Read the{" "}
          <a href="/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => choose("granted")} className="btn btn-gold !min-h-10 !px-6">
            Accept
          </button>
          <button type="button" onClick={() => choose("denied")} className="btn btn-line !min-h-10 !px-6">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
