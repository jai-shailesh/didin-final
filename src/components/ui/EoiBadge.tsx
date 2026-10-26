"use client";

import { useEffect, useState } from "react";
import { project } from "@/content/project";

/** Honest status chip: counts whole days to the published EOI date, then switches to "EOI is open". */
export function EoiBadge({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState(`EOI opens ${project.eoi.opensLabel}`);
  useEffect(() => {
    const open = new Date(`${project.eoi.opensOn}T00:00:00+04:00`).getTime();
    const days = Math.ceil((open - Date.now()) / 86_400_000);
    if (days > 1) setLabel(`EOI opens in ${days} days, ${project.eoi.opensLabel}`);
    else if (days === 1) setLabel(`EOI opens tomorrow, ${project.eoi.opensLabel}`);
    else setLabel("EOI is open");
  }, []);
  return (
    <span className={`inline-flex items-center gap-3 border border-gold/45 bg-gold/10 px-4 py-2.5 text-[0.8125rem] tracking-wide text-gold-soft ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span>{label}</span>
      <span className="hidden h-3 w-px bg-gold/40 sm:block" />
      <span className="hidden sm:inline">AED {project.eoi.amount.toLocaleString("en-US")} per unit</span>
    </span>
  );
}
