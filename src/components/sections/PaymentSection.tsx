"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { paymentPlan, project, units } from "@/content/project";
import { acquisition, aed } from "@/lib/finance";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Source } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";

const nodes = [
  { m: 0, tag: "Signing + 1 month", pct: 20 },
  { m: 15, tag: "Month 15", pct: 5 },
  { m: 21, tag: "Month 21", pct: 5 },
  { m: 27, tag: "Month 27", pct: 5 },
  { m: 33, tag: "Month 33", pct: 5 },
  { m: 39, tag: "Month 39", pct: 5 },
  { m: 45, tag: "Month 45", pct: 5 },
  { m: 57, tag: "Handover", pct: 50 },
];
const SPAN = 57;

export function PaymentSection() {
  const [key, setKey] = useState(units[0].key);
  const u = units.find((x) => x.key === key)!;
  const a = acquisition(u.minSqft, project.entryPsf);
  const rows = paymentPlan.map((p) => {
    const amt = (a.price * p.pct) / 100;
    const vat = amt * project.vatRate;
    return { ...p, amt, vat, total: amt + vat };
  });
  const dld = a.dld;
  const entry = rows[0].total + rows[1].total + dld;

  return (
    <section id="payment" className="section relative overflow-hidden bg-ink text-ivory grain" aria-labelledby="payment-title">
      <div className="container-x">
        <SectionHead
          id="payment-title"
          eyebrow="Payment plan"
          title="Pay 20% in the first month, 50% only at handover"
          accent={["50%"]}
          intro={`The standard plan runs 10 / 10 / 30 / 50 over the build. VAT of 5% is paid with each instalment rather than upfront, and a 4% DLD registration fee applies. The EOI is AED ${aed(project.eoi.amount)} per unit and opens on ${project.eoi.opensLabel}.`}
        />

        {/* Timeline */}
        <Reveal className="mt-24">
          <div className="relative hidden h-52 md:block" role="img" aria-label="Payment timeline from signing to handover in Q2 2031">
            <div className="absolute left-0 right-0 top-[5.4rem] h-px bg-white/15" />
            <motion.div data-reveal initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }} style={{ transformOrigin: "left" }} className="absolute left-0 right-0 top-[5.4rem] h-px bg-gold" />
            {nodes.map((n, i) => {
              const size = 16 + n.pct * 0.7;
              return (
                <motion.div
                  key={n.tag}
                  data-reveal
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 -translate-x-1/2 text-center"
                  style={{ left: `${Math.min(Math.max((n.m / SPAN) * 100, 4), 96)}%` }}
                >
                  <p className="display num text-3xl text-gold-soft">{n.pct}%</p>
                  <span className="absolute left-1/2 top-[5.4rem] block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-ink" style={{ width: size, height: size }} />
                  <p className="eyebrow absolute left-1/2 top-[7.4rem] -translate-x-1/2 whitespace-nowrap text-[0.625rem] text-ivory/65">{n.tag}</p>
                </motion.div>
              );
            })}
          </div>

          <ol className="grid gap-px border border-white/12 bg-white/12 md:hidden">
            {nodes.map((n) => (
              <li key={n.tag} className="flex items-baseline justify-between bg-ink p-5">
                <span className="eyebrow text-ivory/65">{n.tag}</span>
                <span className="display num text-3xl text-gold-soft">{n.pct}%</span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Stage cards */}
        <div className="mt-16 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["First 30 days", "20%", "10% on signing and 10% after one month"],
            ["During construction", "30%", "Six instalments of 5% at months 15 to 45"],
            ["On handover", "50%", `Expected ${project.handover}`],
            ["Government fee", "4%", "DLD registration fee, paid separately"],
          ].map(([l, v, d], i) => (
            <Reveal key={l} delay={i * 0.07} className="bg-ink p-8">
              <p className="eyebrow text-gold">{l}</p>
              <p className="display mt-4 text-6xl leading-none">{v}</p>
              <p className="mt-4 text-[0.9375rem] text-ivory/70">{d}</p>
            </Reveal>
          ))}
        </div>

        {/* Cost table */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h3 className="display h-md">What it costs, instalment by instalment</h3>
              <p className="mt-6 text-ivory/70">Choose an office type to see the cash due at each stage at the entry reference of AED {aed(project.entryPsf)} per sq ft, using the smallest unit in that type.</p>
              <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Office type">
                {units.map((x) => (
                  <button key={x.key} type="button" aria-pressed={key === x.key} onClick={() => setKey(x.key)} className={`min-h-11 border px-4 text-[0.8125rem] tracking-wide transition ${key === x.key ? "border-gold bg-gold text-ink" : "border-white/25 hover:border-gold"}`}>
                    {x.name.replace(" Office", "")}
                  </button>
                ))}
              </div>
              <div className="mt-10 border-t border-white/15 pt-8" aria-live="polite">
                <p className="eyebrow text-ivory/60">Cash needed in the first 30 days</p>
                <p className="display num mt-3 text-[clamp(2.6rem,4vw,3.6rem)] leading-none text-gold-soft">AED {aed(entry)}</p>
                <p className="mt-3 text-[0.8125rem] text-ivory/60">20% of the price, VAT on those two instalments and the 4% DLD fee. Excludes the EOI, which is part of the process set by the developer.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="overflow-x-auto border border-white/12">
              <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
                <caption className="sr-only">Payment schedule for a {u.name} of {aed(u.minSqft)} sq ft at AED {aed(project.entryPsf)} per sq ft</caption>
                <thead className="bg-white/5 text-ivory/60">
                  <tr>
                    {["Milestone", "When", "%", "Amount (AED)", "VAT 5%", "Total due"].map((h, i) => (
                      <th key={h} scope="col" className={`eyebrow p-4 text-[0.625rem] font-medium ${i > 1 ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10 bg-gold/8">
                    <th scope="row" className="p-4 font-normal">DLD registration fee</th>
                    <td className="p-4 text-ivory/65">Government</td>
                    <td className="num p-4 text-right">4%</td>
                    <td className="num p-4 text-right">{aed(dld)}</td>
                    <td className="num p-4 text-right text-ivory/45">n/a</td>
                    <td className="num p-4 text-right">{aed(dld)}</td>
                  </tr>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <th scope="row" className="p-4 font-normal">{r.label}</th>
                      <td className="p-4 text-ivory/65">{r.month}</td>
                      <td className="num p-4 text-right">{r.pct}%</td>
                      <td className="num p-4 text-right">{aed(r.amt)}</td>
                      <td className="num p-4 text-right text-ivory/65">{aed(r.vat)}</td>
                      <td className="num p-4 text-right text-gold-soft">{aed(r.total)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gold bg-white/5">
                    <th scope="row" className="p-4 font-medium" colSpan={2}>Total, {u.name} of {aed(u.minSqft)} sq ft</th>
                    <td className="num p-4 text-right">100%</td>
                    <td className="num p-4 text-right">{aed(a.price)}</td>
                    <td className="num p-4 text-right">{aed(a.vat)}</td>
                    <td className="num p-4 text-right text-lg font-medium text-gold-soft">{aed(a.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Source>
              Illustrative schedule. Final price depends on the unit and floor. Amounts exclude agency, legal and financing costs. Payment plans and prices are set by the developer and can change; only the Sales and Purchase Agreement is binding.
            </Source>
            <div className="mt-8">
              <LeadButton source="payment-cta" className="btn btn-gold">
                Get the payment plan for my unit <Arrow />
              </LeadButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
