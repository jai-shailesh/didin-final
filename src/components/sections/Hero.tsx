import { project } from "@/content/project";
import { waLink } from "@/config/site";
import { CountUp } from "@/components/ui/CountUp";
import { EoiBadge } from "@/components/ui/EoiBadge";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow, WhatsApp } from "@/components/ui/Icons";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-ivory grain" aria-labelledby="hero-title">
      <HeroMedia />

      <div className="container-x relative z-10 grid min-h-[100svh] grid-cols-[minmax(0,1fr)] gap-12 pb-16 pt-32 lg:items-end lg:pb-24">
        <div className="max-w-2xl">
          <p className="rise eyebrow flex items-center gap-4 text-gold" style={{ ["--d" as string]: "1.0s" }}>
            <span className="draw-x h-px w-12 bg-gold" style={{ ["--d" as string]: "1.1s" }} aria-hidden="true" />
            Investor briefing by Didin Dileep
          </p>

          <h1 id="hero-title" className="display h-xl mt-7 max-w-[11ch] text-ivory sm:max-w-none">
            <span className="mask">
              <span style={{ ["--d" as string]: "1.05s" }}>Christian A.</span>
            </span>
            <span className="mask">
              <span style={{ ["--d" as string]: "1.15s" }}>Rockefeller</span>
            </span>
            <span className="mask">
              <span className="italic-d text-gold-soft" style={{ ["--d" as string]: "1.25s" }}>
                Business Tower
              </span>
            </span>
          </h1>

          <p className="rise lead mt-8 max-w-xl text-ivory/85" style={{ ["--d" as string]: "1.4s" }}>
            {project.floors} floors on Sheikh Zayed Road. {project.offices} Grade A freehold offices from {project.smallestSqft.toLocaleString("en-US")} sq ft, priced from AED {project.priceFromPsf.toLocaleString("en-US")} per sq ft.
            Handover {project.handover}.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "1.5s" }}>
            <EoiBadge />
          </div>

          <div className="rise mt-9 flex flex-col gap-4 sm:flex-row" style={{ ["--d" as string]: "1.6s" }}>
            <LeadButton source="hero-brochure" title="Request the brochure" className="btn btn-gold">
              Request brochure <Arrow />
            </LeadButton>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-line">
              <WhatsApp /> WhatsApp Didin
            </a>
          </div>

          <dl className="rise mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4" style={{ ["--d" as string]: "1.75s" }}>
            {[
              { v: project.floors, l: "Floors", s: "" },
              { v: project.offices, l: "Offices", s: "" },
              { v: project.heightM, l: "Metres", s: "" },
              { v: 2031, l: "Handover Q2", s: "", raw: true },
            ].map((s) => (
              <div key={s.l}>
                <dt className="eyebrow text-[0.6875rem] text-ivory/55">{s.l}</dt>
                <dd className="display mt-2 text-4xl text-ivory sm:text-5xl">{s.raw ? "2031" : <CountUp to={s.v} duration={2.4} />}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/50 xl:flex" aria-hidden="true">
        <span className="eyebrow text-[0.625rem]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 bg-gold" style={{ animation: "scroll-cue 2.2s var(--ease-inout) infinite" }} />
        </span>
      </div>
    </section>
  );
}
