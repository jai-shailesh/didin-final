"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HeroMedia() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 180]);
  const o = useTransform(scrollY, [0, 700], [1, 0.25]);
  return (
    <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y, opacity: o }}>
      <div className="kenburns absolute inset-0 will-change-transform lg:left-[40%] lg:right-[4%] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_30%,#000_72%,transparent_100%),linear-gradient(180deg,#000_70%,transparent_100%)] lg:[mask-composite:intersect] lg:[-webkit-mask-composite:source-in]">
        <Image
          src="/images/tower-hero.webp"
          alt="Christian A. Rockefeller Business Tower rising through the clouds beside Burj Khalifa on Sheikh Zayed Road, Dubai"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-[50%_0%] brightness-[0.82] saturate-[0.92] max-md:object-[62%_6%]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,12,10,0.96)_0%,rgba(14,12,10,0.82)_30%,rgba(14,12,10,0.25)_62%,rgba(14,12,10,0.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(14,12,10,0.55)_0%,rgba(14,12,10,0.7)_45%,rgba(14,12,10,0.97)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
    </motion.div>
  );
}
