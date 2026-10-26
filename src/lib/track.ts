"use client";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    __lenis?: { scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void };
  }
}

/** Push an event to the GTM dataLayer. GA4, Google Ads, LinkedIn and Meta tags are configured inside GTM. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid", "li_fat_id", "msclkid"];

/** Capture campaign parameters once per session so the lead keeps its first-touch source. */
export function captureAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem("attr");
    const base: Record<string, string> = stored ? JSON.parse(stored) : {};
    const url = new URL(window.location.href);
    let changed = false;
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v && !base[k]) {
        base[k] = v;
        changed = true;
      }
    }
    if (!base.landing_page) {
      base.landing_page = url.pathname;
      base.referrer = document.referrer || "";
      changed = true;
    }
    if (changed) sessionStorage.setItem("attr", JSON.stringify(base));
    return base;
  } catch {
    return {};
  }
}
