"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  /** words rendered in italic gold-ish accent */
  accent?: string[];
};

/** Word-by-word masked reveal. Each word sits in an overflow-hidden mask and slides up when scrolled into view. */
export function SplitHeading({ text, as: Tag = "h2", className = "", delay = 0, accent = [], id }: Props) {
  const words = text.split(" ");
  const Comp = Tag as ElementType;
  return (
    <Comp id={id} className={className}>
      {words.map((w, i) => {
        const clean = w.replace(/[.,;:]/g, "");
        const isAccent = accent.includes(clean);
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              data-reveal
              className={`inline-block ${isAccent ? "italic-d text-gold" : ""}`}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Comp>
  );
}
