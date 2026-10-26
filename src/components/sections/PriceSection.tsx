"use client";

import { motion } from "motion/react";
import { priceBenchmarks as pb, launchBenchmarks } from "@/content/project";
import { aed } from "@/lib/finance";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Source } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";

function HBar({ label, value, max, tone, delay = 0, big = false }: { label: string; value: number; max: number; tone: "gold" | "ink" | "taupe"; delay?: number; big?: boolean }) {
  const bg = tone === "gold" ? "bg-gold" : tone === "ink" ? "bg-ink" : "bg-taupe/70";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`display ${big ? "text-3xl" : "text-2xl"}`}>{label}</p>
        <p className={`num ${big ? "display text-4xl" : "text-lg"}`}>AED {aed(value)}</p>
      </div>
      <div className="mt-3 h-4 bg-ink/8">
        <motion.div
          data-reveal
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.7, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${bg}`}
        />
      </div>
    </div>
  );
}

export function PriceSection() {
  const max = 6000;
  const below = (ref: number) => Math.round((1 - pb.entry / ref) * 100);
  return (
    <section id="price" className="section bg-ivory text-ink" aria-labelledby="price-title">
      <div className="container-x">
        <SectionHead
          id="price-title"
          tone="light"
          eyebrow="Price per sq ft"
          title="Christian A. Rockefeller Tower price: entry 16% below ready offices"
          accent={["16%"]}
          intro={`The pre-launch range is AED ${aed(4000)} to ${aed(4600)} per sq ft. At the entry reference of about AED ${aed(pb.entry)}, the tower sits below both the ready-office average nearby and the off-plan average.`}
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <HBar label="Rockefeller Tower, entry" value={pb.entry} max={max} tone="gold" big />
            <HBar label="Ready offices nearby, average" value={pb.readyAverage} max={max} tone="ink" delay={0.15} big />
            <HBar label="Off-plan offices, average" value={pb.offPlanAverage} max={max} tone="taupe" delay={0.3} big />
            <p className="text-[0.8125rem] text-ink/60">AED per sq ft. {pb.period}. The Rockefeller figure is a pre-launch entry reference, not a completed transaction price.</p>
          </div>

          <div className="grid gap-px border border-ink/12 bg-ink/12 self-start lg:col-span-5">
            <Reveal className="bg-ivory p-8">
              <p className="eyebrow text-gold-deep">Against the ready average</p>
              <p className="display mt-3 text-[clamp(3.6rem,6vw,5.6rem)] leading-none">
                <CountUp to={below(pb.readyAverage)} suffix="%" /> <span className="text-2xl italic text-ink/60">lower</span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="bg-ivory p-8">
              <p className="eyebrow text-gold-deep">Against the off-plan average</p>
              <p className="display mt-3 text-[clamp(3.6rem,6vw,5.6rem)] leading-none">
                <CountUp to={below(pb.offPlanAverage)} suffix="%" /> <span className="text-2xl italic text-ink/60">lower</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h3 className="display h-sm">The five ready towers behind the average</h3>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[22rem] text-left">
                <caption className="sr-only">Average sale rate per sq ft of five nearby ready office towers</caption>
                <tbody>
                  {pb.towers.map((t) => (
                    <tr key={t.name} className="border-t border-ink/12">
                      <th scope="row" className="py-4 pr-4 text-[1rem] font-normal">{t.name}</th>
                      <td className="num py-4 text-right text-lg">AED {aed(t.psf)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-ink bg-ink/[0.04]">
                    <th scope="row" className="py-4 pl-3 pr-4 text-[1rem] font-medium">Average of the five</th>
                    <td className="num py-4 pr-3 text-right text-lg font-medium">AED {aed(pb.readyAverage)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="display h-sm">Where recent Dubai office launches sit</h3>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[22rem] text-left">
                <caption className="sr-only">Office price per sq ft benchmarks across recent Dubai launches</caption>
                <tbody>
                  {launchBenchmarks.map((t, i) => (
                    <tr key={t.name} className={`border-t border-ink/12 ${i === launchBenchmarks.length - 1 ? "bg-gold/15" : ""}`}>
                      <th scope="row" className="py-4 pl-3 pr-4 text-[1rem] font-normal">{t.name}</th>
                      <td className="num py-4 pr-3 text-right text-lg">AED {t.psf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Source tone="light">
          Source: developer launch material and Dubai office-market data reviewed by Didin Dileep, project benchmarks year to 16 October 2026. Primary and resale prices are different bases and are shown for context. Figures are indicative and change as launches reprice.
        </Source>

        <Reveal className="mt-12">
          <LeadButton source="price-cta" className="btn btn-dark">
            Request brochure <Arrow />
          </LeadButton>
        </Reveal>
      </div>
    </section>
  );
}
