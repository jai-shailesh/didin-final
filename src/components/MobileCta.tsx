"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { project } from "@/content/project";
import { waLink } from "@/config/site";
import { track } from "@/lib/track";
import { LeadButton } from "./ui/LeadModal";
import { WhatsApp } from "./ui/Icons";

/** Sticky bottom action bar on phones, where most paid traffic lands. */
export function MobileCta() {
  const pathname = usePathname();
  const onProject = pathname.startsWith(`/${project.slug}`);
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 520));
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-2 border-t border-white/10 bg-ink/92 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
        >
          <LeadButton source={onProject ? "sticky-mobile" : "site-sticky"} className="btn btn-gold !px-4">
            Request brochure
          </LeadButton>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            aria-label="Chat on WhatsApp"
            className="btn btn-line !min-w-[3.25rem] !px-0"
          >
            <WhatsApp />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
