"use client";

import { useState } from "react";
import { project, units, type UnitKey } from "@/content/project";
import { aed, aedShort } from "@/lib/finance";
import { interestByUnit } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";

const tone: Record<UnitKey | "amenity" | "service", string> = {
  core: "#dccaa6",
  medium: "#c4a468",
  premier: "#8a6c3a",
  half: "#5a4f42",
  full: "#17130f",
  amenity: "#b8ae9c",
  service: "#cfc6b4",
};

type Band = { label: string; levels: string; h: number; kind: UnitKey | "amenity" | "service" | "mixed"; inset?: number };

// Top of the tower first
const bands: Band[] = [
  { label: "Observatory and Exchange", levels: "L87", h: 26, kind: "amenity", inset: 26 },
  { label: "Mechanical", levels: "L86", h: 5, kind: "service" },
  { label: "Half floors", levels: "L81 to 85", h: 25, kind: "half" },
  { label: "Full floors", levels: "L71 to 80", h: 50, kind: "full" },
  { label: "Half floors", levels: "L64 to 70", h: 35, kind: "half" },
  { label: "Mechanical", levels: "L63", h: 5, kind: "service" },
  { label: "Half floors", levels: "L58 to 62", h: 25, kind: "half" },
  { label: "Core, Medium and Premier offices", levels: "L15 to 57", h: 190, kind: "mixed" },
  { label: "The Retreat and The Reset", levels: "L13 to 14", h: 14, kind: "amenity" },
  { label: "Parking, dining and retail", levels: "GR to L12", h: 40, kind: "service" },
];

const stripes: UnitKey[] = ["medium", "core", "premier", "premier", "core", "core", "medium"];

export function UnitExplorer() {
  const [active, setActive] = useState<UnitKey | null>(null);
  const dim = (k: UnitKey | "amenity" | "service" | "mixed") => {
    if (!active) return 1;
    if (k === "mixed") return ["core", "medium", "premier"].includes(active) ? 1 : 0.18;
    return k === active ? 1 : 0.18;
  };

  return (
    <section id="units" className="section bg-ivory text-ink" aria-labelledby="units-title">
      <div className="container-x">
        <SectionHead
          id="units-title"
          tone="light"
          eyebrow="Unit mix and floor plans"
          title="Five office types, from 1,077 sq ft to a full floor"
          accent={["full", "floor"]}
          intro={`${project.offices} offices across the tower. Hover or focus a type to see where it sits. Entry prices below use AED ${aed(project.entryPsf)} per sq ft; pricing varies by floor.`}
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          {/* Stack */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mb-5 text-ink/60">The tower, level by level</p>
                <div className="relative mx-auto flex max-w-sm flex-col" role="img" aria-label="Diagram of the tower showing which office types sit on which levels">
                  {bands.map((b, i) => (
                    <div key={i} className="group flex items-stretch gap-3" style={{ height: b.h * 1.55 }}>
                      <div className="relative flex-1 transition-opacity duration-500" style={{ opacity: dim(b.kind), paddingLeft: b.inset ?? 0 }}>
                        <div className="flex h-full w-full overflow-hidden border-b border-ivory/70">
                          {b.kind === "mixed"
                            ? stripes.map((s, j) => (
                                <i key={j} className="block h-full flex-1 transition-opacity duration-500" style={{ background: tone[s], opacity: active && active !== s ? 0.22 : 1, borderRight: "1px solid rgba(245,240,230,.6)" }} />
                              ))
                            : <i className="block h-full w-full" style={{ background: tone[b.kind as keyof typeof tone] }} />}
                        </div>
                      </div>
                      <div className="w-36 min-w-0 shrink-0 self-center text-[0.6875rem] leading-tight text-ink/70 sm:w-44">
                        {b.h <= 14 ? (
                          <span className="block truncate" title={`${b.levels} · ${b.label}`}>
                            <span className="num font-medium text-ink">{b.levels}</span> · {b.label}
                          </span>
                        ) : (
                          <>
                            <span className="num font-medium text-ink">{b.levels}</span>
                            <br />
                            {b.label}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:col-span-7">
          <ul className="space-y-6">
            {units.map((u, i) => (
              <Reveal as="li" key={u.key} delay={0.05}>
                <article
                  tabIndex={0}
                  onMouseEnter={() => setActive(u.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(u.key)}
                  onBlur={() => setActive(null)}
                  className={`group relative border bg-ivory p-7 transition-colors duration-500 sm:p-9 ${active === u.key ? "border-ink bg-paper" : "border-ink/15"}`}
                >
                  <span className="absolute left-0 top-0 h-full w-1 transition-all duration-500" style={{ background: tone[u.key], opacity: active === u.key ? 1 : 0.55 }} aria-hidden="true" />
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow text-gold-deep">0{i + 1}</p>
                      <h3 className="display mt-3 text-[clamp(2rem,3.4vw,2.8rem)] leading-none">{u.name}</h3>
                      <p className="mt-3 max-w-md text-ink/75">{u.blurb}</p>
                    </div>
                    <div className="text-right">
                      <p className="eyebrow text-ink/55">Offices</p>
                      <p className="display num mt-2 text-5xl leading-none">{u.count}</p>
                    </div>
                  </div>

                  <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-ink/12 pt-6 sm:grid-cols-3">
                    <div>
                      <dt className="eyebrow text-[0.6875rem] text-ink/55">Size</dt>
                      <dd className="num mt-1.5 text-[1.0625rem]">
                        {aed(u.minSqft)} to {aed(u.maxSqft)} sq ft
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.6875rem] text-ink/55">Indicative from</dt>
                      <dd className="num mt-1.5 text-[1.0625rem]">AED {aedShort(u.minSqft * project.entryPsf)}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.6875rem] text-ink/55">Levels</dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-snug">{u.levels}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-[0.875rem] text-ink/65">
                    <span className="font-medium text-ink">Suits:</span> {u.suits}
                  </p>
                  <div className="mt-6">
                    <LeadButton source={`floorplan-${u.key}`} interest={interestByUnit[u.key]} title={`Floor plans: ${u.name}`} intro="Share your details and Didin will send the floor plans and current availability for this office type." className="btn btn-line-dark">
                      Request floor plans <Arrow />
                    </LeadButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-[0.8125rem] text-ink/60">Sizes from the developer&rsquo;s factsheet and floor plan brochure. Areas are approximate and vary by floor and orientation. Prices shown are indicative.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
