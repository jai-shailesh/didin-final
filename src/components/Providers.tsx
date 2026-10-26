"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { LeadModalProvider } from "./ui/LeadModal";
import { WhatsAppTracker } from "./WhatsAppTracker";
import { SmoothScroll } from "./ui/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LeadModalProvider>
        <SmoothScroll />
        <WhatsAppTracker />
        {children}
      </LeadModalProvider>
    </MotionConfig>
  );
}
