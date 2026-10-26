"use client";

import { motion } from "motion/react";
import { vacancy, averageRents } from "@/content/project";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, Source } from "@/components/ui/SectionHead";

function Bar({ w, className, delay = 0 }: { w: number; className: string; delay?: number }) {
  return (
    <div className="h-3 w-full bg-white/8">
      <motion.div
        data-reveal
        initial={{ width: 0 }}
        whileInView={{ width: `${w}%` }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full ${className}`}
      />
    </div>
  );
}

export function WhyNow() {
  const max = 35;
  return (
    <section id="market" className="section relative overflow-hidden bg-ink text-ivory grain" aria-labelledby="market-title">
      <div className="container-x">
        <SectionHead
          id="market-title"
          eyebrow="Why offices, why now"
          title="Prime Dubai office vacancy has fallen to 0.7%"
          accent={["0.7%"]}
          intro="Tenants are competing for the best space. Vacancy across every office grade has dropped sharply since 2019, and prime rents have roughly doubled."
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow text-ivory/60">Vacancy rate by office grade</h3>
            </Reveal>
            <div className="mt-8 space-y-10">
              {vacancy.map((v, i) => (
                <Reveal key={v.grade} delay={i * 0.06}>
                  <div className="flex items-baseline justify-between">
                    <p className="display text-3xl">{v.grade}</p>
                    <p className="num text-[0.9375rem] text-ivory/65">
                      {v.y2019.toFixed(1)}% in 2019 <span className="mx-2 text-gold">to</span>
                      <span className="text-xl text-gold-soft">{v.h12026.toFixed(1)}%</span> in H1 2026
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Bar w={(v.y2019 / max) * 100} className="bg-ivory/30" delay={0.1 + i * 0.08} />
                    <Bar w={(v.h12026 / max) * 100} className="bg-gold" delay={0.3 + i * 0.08} />
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex gap-8 text-[0.8125rem] text-ivory/60">
              <span className="flex items-center gap-2">
                <i className="h-2 w-6 bg-ivory/30" /> 2019
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-6 bg-gold" /> H1 2026
              </span>
            </div>
          </div>

          <div className="grid content-start gap-px border border-white/12 bg-white/12 lg:col-span-5">
            <Reveal className="bg-ink p-9">
              <p className="eyebrow text-gold">Prime vacancy, H1 2026</p>
              <p className="display mt-4 text-[clamp(4rem,8vw,7rem)] leading-none">
                <CountUp to={0.7} decimals={1} suffix="%" />
              </p>
            </Reveal>
            <Reveal delay={0.1} className="bg-ink p-9">
              <p className="eyebrow text-gold">Prime rent growth, 2019 to H1 2026</p>
              <p className="display mt-4 text-[clamp(4rem,8vw,7rem)] leading-none">
                +<CountUp to={101} suffix="%" />
              </p>
              <p className="num mt-3 text-[0.9375rem] text-ivory/65">AED {averageRents[0].y2019} to AED {averageRents[0].h12026} per sq ft per year</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 overflow-x-auto border border-white/12">
            <table className="w-full min-w-[34rem] text-left text-[0.9375rem]">
              <caption className="sr-only">Average office rent per sq ft by grade, 2019 and H1 2026</caption>
              <thead className="bg-white/5 text-ivory/60">
                <tr>
                  <th scope="col" className="eyebrow p-5 font-medium">Average rent, AED per sq ft per year</th>
                  <th scope="col" className="eyebrow p-5 font-medium">2019</th>
                  <th scope="col" className="eyebrow p-5 font-medium">H1 2026</th>
                  <th scope="col" className="eyebrow p-5 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {averageRents.map((r) => (
                  <tr key={r.grade} className="border-t border-white/10">
                    <th scope="row" className="display p-5 text-2xl font-normal">{r.grade}</th>
                    <td className="num p-5">{r.y2019}</td>
                    <td className="num p-5 text-gold-soft">{r.h12026}</td>
                    <td className="num p-5">+{Math.round((r.h12026 / r.y2019 - 1) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Source>
          Source: Dubai office market reports reviewed by Didin Dileep, vacancy and average rent endpoints 2019 and H1 2026. Figures are indicative market averages, not a forecast for this building.
        </Source>
      </div>
    </section>
  );
}
