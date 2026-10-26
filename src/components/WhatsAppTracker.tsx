"use client";

import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/track";

/** Any click on a wa.me link is sent to GTM and logged to the lead sheet (no personal details). */
export function WhatsAppTracker() {
  useEffect(() => {
    captureAttribution();
    let last = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='wa.me']");
      if (!a) return;
      const now = Date.now();
      if (now - last < 4000) return;
      last = now;
      const placement = a.getAttribute("data-wa") || `${location.pathname}`;
      track("whatsapp_click", { placement });
      const body = JSON.stringify({ placement, attribution: captureAttribution() });
      try {
        if (!navigator.sendBeacon?.("/api/wa", new Blob([body], { type: "text/plain" }))) fetch("/api/wa", { method: "POST", body, keepalive: true });
      } catch {}
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
