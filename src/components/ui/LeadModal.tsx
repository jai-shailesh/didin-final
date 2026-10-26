"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/track";
import { LeadForm } from "./LeadForm";
import { Close } from "./Icons";

type OpenOpts = { source: string; interest?: string; title?: string; intro?: string; cta?: string };
type Ctx = { open: (o: OpenOpts) => void };

const LeadCtx = createContext<Ctx>({ open: () => {} });
export const useLeadModal = () => useContext(LeadCtx);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [opts, setOpts] = useState<OpenOpts>({ source: "modal" });

  const open = useCallback((o: OpenOpts) => {
    setOpts(o);
    track("lead_modal_open", { form_source: o.source });
    requestAnimationFrame(() => {
      if (ref.current && !ref.current.open) {
        ref.current.showModal();
        window.__lenis?.scrollTo?.(window.scrollY, { immediate: true });
      }
    });
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <LeadCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="lead-modal-title"
        className="m-auto w-[min(92vw,34rem)] max-h-[92svh] overflow-y-auto border border-white/10 bg-espresso p-0 text-ivory shadow-2xl backdrop:bg-black/70"
        onClose={() => {
          /* state kept so reopening is instant */
        }}
      >
        <div className="relative p-7 sm:p-10">
          <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-ivory/70 transition hover:text-gold">
            <Close />
          </button>
          <p className="eyebrow text-gold">{opts.cta ? "Didin Dileep" : "Investor briefing"}</p>
          <h2 id="lead-modal-title" className="display mt-4 text-[2rem] leading-[1.05] sm:text-[2.4rem]">
            {opts.title ?? "Request the brochure"}
          </h2>
          <p className="mt-4 text-[0.95rem] text-ivory/75">{opts.intro ?? "Didin sends the brochure, price list and floor plans on WhatsApp within minutes."}</p>
          <LeadForm key={opts.source + (opts.interest ?? "")} source={opts.source} defaultInterest={opts.interest} cta={opts.cta} className="mt-8" />
        </div>
      </dialog>
    </LeadCtx.Provider>
  );
}

export function LeadButton({
  source,
  interest,
  title,
  intro,
  cta,
  className = "btn btn-gold",
  children,
}: OpenOpts & { className?: string; children: ReactNode }) {
  const { open } = useLeadModal();
  return (
    <button type="button" className={className} onClick={() => open({ source, interest, title, intro, cta })}>
      {children}
    </button>
  );
}
