"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "section" | "article" };

/** Fade and rise on scroll. Content stays in the DOM for crawlers; a <noscript> rule in the layout shows it without JS. */
export function Reveal({ delay = 0, y = 34, children, className, as = "div", ...rest }: Props) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}
