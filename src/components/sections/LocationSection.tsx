"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { connectivity, project } from "@/content/project";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Arrow, Pin } from "@/components/ui/Icons";

export function LocationSection() {
  return (
    <section id="location" className="section relative overflow-hidden bg-espresso text-ivory grain" aria-labelledby="location-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ParallaxImage src="/images/szr-aerial.webp" alt="Aerial view of Sheikh Zayed Road with Burj Khalifa and the Downtown Dubai skyline" width={1248} height={1640} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[3/4] w-full" overlay="bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="relative -mt-24 px-6 pb-2">
            <div className="flex items-center gap-3 text-gold">
              <Pin />
              <p className="eyebrow">Sheikh Zayed Road, Dubai</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <SectionHead
            id="location-title"
            eyebrow="Location"
            title="Offices on Sheikh Zayed Road, between DIFC, Downtown and Business Bay"
            accent={["Downtown"]}
            size="md"
            intro="The tower sits one minute from Sheikh Zayed Road and Al Mustaqbal Street, two minutes from two metro stations and five minutes from Burj Khalifa and Dubai Mall."
          />

          <ul className="mt-14 space-y-7">
            {connectivity.map((c, i) => (
              <li key={c.place}>
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-[1.0625rem] text-ivory/90">{c.place}</span>
                  <span className="display num text-3xl text-gold-soft">
                    {c.min}
                    <span className="ml-1 text-base italic text-ivory/60">min</span>
                  </span>
                </div>
                <div className="mt-3 h-px bg-white/12">
                  <motion.div
                    data-reveal
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: c.min / 20 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 1.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                    className="h-[3px] -translate-y-px bg-gold"
                  />
                </div>
              </li>
            ))}
          </ul>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <a href={project.mapsUrl} target="_blank" rel="noopener" className="btn btn-line">
              Open in Google Maps <Arrow />
            </a>
          </Reveal>
          <p className="mt-6 text-[0.8125rem] text-ivory/55">Travel times are the developer&rsquo;s estimates and vary with traffic.</p>
        </div>
      </div>

      <div className="container-x mt-24">
        <Reveal>
          <div className="relative aspect-[16/8] overflow-hidden">
            <Image src="/images/skyline-aerial.webp" alt="Christian A. Rockefeller Business Tower in the Dubai skyline near DIFC and Downtown" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
