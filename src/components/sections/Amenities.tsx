"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { amenities } from "@/content/project";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Check } from "@/components/ui/Icons";

export function Amenities() {
  const [i, setI] = useState(3);
  const a = amenities[i];
  return (
    <section id="amenities" className="section bg-ink text-ivory" aria-labelledby="amenities-title">
      <div className="container-x">
        <SectionHead
          id="amenities-title"
          eyebrow="Amenities"
          title="Five levels of hotel-style amenities, up to an 87th-floor infinity pool"
          accent={["infinity"]}
          size="md"
          intro="Coffee before the first call, lunch between negotiations, padel before the last meeting, then drinks on level 87 as the city lights up."
        />

        <Reveal className="relative mt-16 aspect-[16/9] w-full overflow-hidden bg-umber md:aspect-[21/9]">
          <AnimatePresence mode="popLayout">
            <motion.div key={a.key} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
              <Image src={a.image} alt={a.alt} fill sizes="(min-width:1440px) 1344px, 100vw" className="object-cover" priority={false} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <p className="eyebrow text-gold">{a.level}</p>
            <p className="display mt-2 text-[clamp(2rem,4vw,3.6rem)] leading-none">{a.name}</p>
          </div>
        </Reveal>

        <ul className="mt-px grid gap-px border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Amenity levels">
          {amenities.map((x, idx) => (
            <li key={x.key} className="bg-ink">
              <button
                type="button"
                role="tab"
                aria-selected={i === idx}
                onClick={() => setI(idx)}
                onMouseEnter={() => setI(idx)}
                className={`group relative flex h-full w-full flex-col p-7 text-left transition-colors duration-500 ${i === idx ? "bg-umber" : "hover:bg-umber/60"}`}
              >
                <span className="absolute left-0 top-0 h-px bg-gold transition-all duration-700" style={{ width: i === idx ? "100%" : "0%" }} aria-hidden="true" />
                <span className="eyebrow text-gold">{x.level}</span>
                <span className="display mt-3 text-3xl">{x.name}</span>
                <span className="mt-2 text-[0.875rem] text-ivory/60">{x.tag}</span>
                <span className="mt-6 space-y-2 text-[0.9375rem] text-ivory/80">
                  {x.items.map((it) => (
                    <span key={it} className="flex gap-3">
                      <Check className="mt-1 shrink-0 text-gold" /> <span>{it}</span>
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-x-10 gap-y-3 text-[0.9375rem] text-ivory/75 sm:grid-cols-2 lg:grid-cols-4">
          {["Triple-height arrival lobby", "On-site dining and retail", `23 elevators, 16 double-deck`, "1,080 parking spaces over 16 levels"].map((t) => (
            <li key={t} className="flex gap-3 border-t border-white/12 pt-4">
              <Check className="mt-1 shrink-0 text-gold" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
