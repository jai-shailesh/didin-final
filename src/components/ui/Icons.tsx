import type { SVGProps } from "react";

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 12" width="22" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" className="arrow" aria-hidden="true" {...p}>
    <path d="M0 6h22M17 1l5 5-5 5" />
  </svg>
);

export const WhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.5A9.94 9.94 0 1 0 12.04 2Zm0 1.8a8.13 8.13 0 1 1-4.16 15.12l-.3-.18-3 .9.92-2.93-.2-.31A8.12 8.12 0 0 1 12.04 3.8Zm-3.2 3.7c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.8 2.88 4.45 3.92 2.2.87 2.65.7 3.13.66.48-.04 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.27-.13-1.56-.77-1.8-.86-.24-.09-.42-.13-.59.13-.18.26-.68.86-.83 1.03-.15.18-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.12-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.58-1.4-.8-1.9-.2-.5-.42-.43-.58-.44h-.5Z" />
  </svg>
);

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...p}>
    <path d="M8 1v14M1 8h14" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...p}>
    <path d="M2 8.5 6 12.5 14 3.5" />
  </svg>
);

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...p}>
    <path d="M2 2l12 12M14 2 2 14" />
  </svg>
);

export const Pin = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

export const Mark = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...p}>
    <path d="M6 34V6h12c9 0 14 5 14 14s-5 14-14 14H6Z" />
    <path d="M13 28V12" opacity=".6" />
    <path d="M19 28V12" opacity=".35" />
  </svg>
);
