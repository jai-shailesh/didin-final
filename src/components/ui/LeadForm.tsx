"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { site, waLink } from "@/config/site";
import { captureAttribution, track } from "@/lib/track";
import { Arrow, WhatsApp } from "./Icons";

export const interestOptions = [
  "Core office, from 1,077 sq ft",
  "Medium office, from 1,488 sq ft",
  "Premier office, from 2,295 sq ft",
  "Half floor, from 5,887 sq ft",
  "Full floor, from 11,541 sq ft",
  "Not sure yet",
];

export const interestByUnit: Record<string, string> = {
  core: interestOptions[0],
  medium: interestOptions[1],
  premier: interestOptions[2],
  half: interestOptions[3],
  full: interestOptions[4],
};

const dialCodes = [
  ["+971", "UAE +971"],
  ["+91", "India +91"],
  ["+44", "UK +44"],
  ["+1", "US / Canada +1"],
  ["+966", "Saudi Arabia +966"],
  ["+974", "Qatar +974"],
  ["+965", "Kuwait +965"],
  ["+973", "Bahrain +973"],
  ["+968", "Oman +968"],
  ["+92", "Pakistan +92"],
  ["+86", "China +86"],
  ["+7", "Russia / Kazakhstan +7"],
  ["+49", "Germany +49"],
  ["+33", "France +33"],
  ["+41", "Switzerland +41"],
  ["+61", "Australia +61"],
  ["+65", "Singapore +65"],
  ["+20", "Egypt +20"],
  ["+234", "Nigeria +234"],
  ["+27", "South Africa +27"],
];

type Props = {
  source: string;
  defaultInterest?: string;
  tone?: "dark" | "light";
  cta?: string;
  className?: string;
  compact?: boolean;
};

export function LeadForm({ source, defaultInterest = "", tone = "dark", cta = "Send me the brochure", className = "", compact = false }: Props) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const started = useRef(false);
  const light = tone === "light";

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_source: source });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          dialCode: fd.get("dialCode"),
          phone: fd.get("phone"),
          
          interest: fd.get("interest"),
          consent: true,
          website: fd.get("website"),
          source,
          attribution: captureAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      try {
        sessionStorage.setItem("lead_ref", data.id || "");
        sessionStorage.setItem("lead_name", String(fd.get("name") || ""));
      } catch {}
      router.push(`/thank-you?s=${encodeURIComponent(source)}`);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} onFocus={onStart} noValidate={false} className={`${light ? "text-ink" : "text-ivory"} ${className}`} aria-label="Contact form">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={`grid gap-x-6 ${compact ? "gap-y-1" : "gap-y-2"} sm:grid-cols-2`}>
        <div className={`field ${light ? "field-light" : ""} sm:col-span-2`}>
          <input id={`${source}-name`} name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder=" " />
          <label htmlFor={`${source}-name`}>Full name</label>
        </div>

        <div className="grid grid-cols-[7.2rem_1fr] gap-x-4 sm:col-span-2">
          <div className={`field ${light ? "field-light" : ""}`}>
            <select id={`${source}-dial`} name="dialCode" defaultValue="+971" required aria-label="Country code">
              {dialCodes.map(([v, l]) => (
                <option key={v + l} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className={`field ${light ? "field-light" : ""}`}>
            <input id={`${source}-phone`} name="phone" type="tel" inputMode="tel" required minLength={6} maxLength={16} autoComplete="tel-national" placeholder=" " />
            <label htmlFor={`${source}-phone`}>WhatsApp number</label>
          </div>
        </div>

        <input type="hidden" name="interest" value={defaultInterest || "Not specified"} />
      </div>

      <p className={`mt-5 text-[0.75rem] leading-snug ${light ? "text-ink/65" : "text-ivory/60"}`}>
        By sending, you agree that Didin Dileep may contact you about your enquiry by WhatsApp, phone or email. See the{" "}
        <a href="/privacy" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>

      <button type="submit" disabled={state === "sending"} className={`btn btn-gold mt-7 w-full disabled:opacity-60 ${state === "sending" ? "pointer-events-none" : ""}`}>
        <span>{state === "sending" ? "Sending" : cta}</span>
        <Arrow />
      </button>

      <p role="status" aria-live="polite" className={`mt-3 min-h-5 text-[0.8125rem] ${state === "error" ? "text-[#f0a38e]" : "opacity-0"}`}>
        {state === "error" ? error : "."}
      </p>

      <p className={`mt-1 flex flex-wrap items-center gap-x-2 text-[0.8125rem] ${light ? "text-ink/70" : "text-ivory/65"}`}>
        Prefer to talk now?
        <a
          href={waLink()}
          data-wa={`form-${source}`}
          className="link-u inline-flex items-center gap-1.5 text-gold"
          style={light ? { color: "var(--color-gold-deep)" } : undefined}
          rel="noopener"
          target="_blank"
        >
          <WhatsApp width={15} height={15} /> WhatsApp {site.name.split(" ")[0]}
        </a>
      </p>
    </form>
  );
}
