"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { project, rentBenchmarks, units } from "@/content/project";
import { aed, pct, yieldModel } from "@/lib/finance";
import { track } from "@/lib/track";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Source } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { interestByUnit } from "@/components/ui/LeadForm";
import { Arrow } from "@/components/ui/Icons";

const rentChips = [
  { v: 408, l: "Market base", s: "Prime average H1 2026" },
  { v: 450, l: "Conservative", s: "Low end of new Grade A" },
  { v: 500, l: "Mid case", s: "Model assumption" },
  { v: 550, l: "Upside", s: "Top of model range" },
];

export function YieldSection() {
  const [unitKey, setUnitKey] = useState(units[0].key);
  const unit = units.find((u) => u.key === unitKey)!;
  const [sqft, setSqft] = useState(unit.minSqft);
  const [psf, setPsf] = useState<number>(project.entryPsf);
  const [rent, setRent] = useState(408);
  const [vac, setVac] = useState(0);
  const [touched, setTouched] = useState(false);

  const r = useMemo(() => yieldModel({ sqft, psf, rentPsf: rent, vacancyPct: vac }), [sqft, psf, rent, vac]);
  const maxRent = 1400;

  const touch = (what: string) => {
    if (!touched) {
      setTouched(true);
      track("calculator_use", { control: what });
    }
  };

  const pickUnit = (k: (typeof units)[number]["key"]) => {
    const u = units.find((x) => x.key === k)!;
    setUnitKey(k);
    setSqft(u.minSqft);
    touch("unit");
  };

  return (
    <section id="returns" className="section relative overflow-hidden bg-umber text-ivory grain" aria-labelledby="returns-title">
      <div className="container-x">
        <SectionHead
          id="returns-title"
          eyebrow="Rental returns"
          title="Model the rent yourself, from a cautious base case"
          accent={["cautious"]}
          intro="Prime Dubai towers rent for AED 450 to 1,350 per sq ft per year. The calculator starts at the market-wide prime average, not the most optimistic number, and shows net yield after service charge on your total acquisition cost."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow text-ivory/60">Current rent, AED per sq ft per year</h3>
            </Reveal>
            <ul className="mt-8 space-y-6">
              {rentBenchmarks.map((b, i) => (
                <li key={b.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.9375rem] text-ivory/85">{b.name}</span>
                    <span className="num display text-2xl text-gold-soft">{aed(b.rent)}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10">
                    <motion.div
                      data-reveal
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(b.rent / maxRent) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gold"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Source>Source: building-level rent data reviewed by Didin Dileep, October 2026. Existing, stabilised towers. Rockefeller Tower is not built and has no signed leases.</Source>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="bg-ivory p-7 text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:p-10" role="group" aria-labelledby="calc-title">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-gold-deep">Illustrative calculator</p>
                  <h3 id="calc-title" className="display mt-3 text-[2rem] leading-none">Net yield on total cost</h3>
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className="eyebrow mb-3 text-ink/60">Unit type</legend>
                <div className="flex flex-wrap gap-2">
                  {units.map((u) => (
                    <button
                      key={u.key}
                      type="button"
                      aria-pressed={unitKey === u.key}
                      onClick={() => pickUnit(u.key)}
                      className={`min-h-11 border px-4 text-[0.8125rem] tracking-wide transition ${unitKey === u.key ? "border-ink bg-ink text-ivory" : "border-ink/25 hover:border-ink"}`}
                    >
                      {u.name.replace(" Office", "")}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-size" className="flex justify-between text-[0.9375rem]">
                    <span>Size</span>
                    <span className="num font-medium">{aed(sqft)} sq ft</span>
                  </label>
                  <input id="c-size" type="range" min={unit.minSqft} max={unit.maxSqft} step={1} value={sqft} onChange={(e) => { setSqft(+e.target.value); touch("size"); }} className="mt-4" />
                </div>
                <div>
                  <label htmlFor="c-psf" className="flex justify-between text-[0.9375rem]">
                    <span>Purchase price</span>
                    <span className="num font-medium">AED {aed(psf)} per sq ft</span>
                  </label>
                  <input id="c-psf" type="range" min={project.priceFromPsf} max={project.priceToPsf} step={10} value={psf} onChange={(e) => { setPsf(+e.target.value); touch("price"); }} className="mt-4" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-rent" className="flex justify-between text-[0.9375rem]">
                    <span>Annual rent</span>
                    <span className="num font-medium">AED {aed(rent)} per sq ft</span>
                  </label>
                  <input id="c-rent" type="range" min={300} max={650} step={5} value={rent} onChange={(e) => { setRent(+e.target.value); touch("rent"); }} className="mt-4" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rentChips.map((c) => (
                      <button key={c.v} type="button" aria-pressed={rent === c.v} onClick={() => { setRent(c.v); touch("rent-chip"); }} className={`min-h-11 border px-3.5 text-left leading-tight transition ${rent === c.v ? "border-gold-deep bg-gold/25" : "border-ink/20 hover:border-ink"}`}>
                        <span className="block text-[0.8125rem] font-medium">{c.l} <span className="num">{c.v}</span></span>
                        <span className="block text-[0.6875rem] text-ink/60">{c.s}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[0.9375rem]">Vacancy allowance</p>
                  <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Vacancy allowance">
                    {[0, 5, 10].map((v) => (
                      <button key={v} type="button" role="radio" aria-checked={vac === v} onClick={() => { setVac(v); touch("vacancy"); }} className={`min-h-11 min-w-16 border px-4 text-[0.875rem] transition ${vac === v ? "border-ink bg-ink text-ivory" : "border-ink/25 hover:border-ink"}`}>
                        {v}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2" aria-live="polite">
                <div className="bg-ink p-7 text-ivory sm:row-span-2">
                  <p className="eyebrow text-gold">Net yield on total cost</p>
                  <p className="display num mt-4 text-[clamp(4.5rem,9vw,7rem)] leading-none text-gold-soft">{pct(r.netYield, 1)}</p>
                  <p className="mt-4 text-[0.8125rem] text-ivory/65">Gross yield {pct(r.grossYield, 1)}. Net of {project.serviceChargePsf} AED per sq ft service charge estimate{vac ? ` and ${vac}% vacancy` : ""}.</p>
                </div>
                {[
                  ["Purchase price", r.price],
                  ["DLD 4% and VAT 5%", r.dld + r.vat],
                  ["Total acquisition cost", r.total],
                  ["Net rental income per year", r.net],
                ].map(([l, v]) => (
                  <div key={l as string} className="flex items-baseline justify-between gap-3 bg-ivory p-5">
                    <span className="text-[0.875rem] text-ink/70">{l}</span>
                    <span className="num text-lg font-medium">AED {aed(v as number)}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink/65">
                Illustrative model only. Rents are assumptions for a new Grade A building, not signed leases or a forecast. The 408 base case is the H1 2026 prime average across Dubai. It excludes agency fees, financing costs, leasing commission and tax, and income would start only after handover in {project.handover}. Service charge is an estimate of AED {project.serviceChargePsf} per sq ft, to be set by the authorities at handover.
              </p>
              <div className="mt-6">
                <LeadButton source="calculator-cta" className="btn btn-dark" interest={interestByUnit[unit.key]}>
                  Ask Didin to check these numbers <Arrow />
                </LeadButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
