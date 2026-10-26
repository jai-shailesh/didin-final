"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = Omit<ImageProps, "fill"> & {
  /** percentage the image travels vertically */
  travel?: number;
  /** clip-path reveal on scroll */
  reveal?: boolean;
  className?: string;
  imgClassName?: string;
  overlay?: string;
};

/** Container with an image that drifts slower than the page and reveals with an inset clip. */
export function ParallaxImage({ travel = 9, reveal = true, className = "", imgClassName = "", overlay, alt, width: _w, height: _h, ...img }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.1, 1.18]);

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={`relative overflow-hidden ${className}`}
      initial={reveal ? { clipPath: "inset(14% 10% 14% 10%)" } : undefined}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
        <Image alt={alt} fill className={`object-cover ${imgClassName}`} {...img} />
      </motion.div>
      {overlay ? <div className={`absolute inset-0 ${overlay}`} /> : null}
    </motion.div>
  );
}
