"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const nf = (n: number, d: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

/** Counts up when scrolled into view. The server-rendered HTML already contains the final number. */
export function CountUp({ to, from = 0, decimals = 0, prefix = "", suffix = "", duration = 2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${nf(v, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {prefix}
      {nf(to, decimals)}
      {suffix}
    </span>
  );
}
