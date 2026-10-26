"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { site, waLink } from "@/config/site";
import { project } from "@/content/project";
import { track } from "@/lib/track";
import { LeadButton } from "./ui/LeadModal";
import { Mark, WhatsApp } from "./ui/Icons";

const projectPath = `/${project.slug}`;
const projectLinks = [
  { href: `${projectPath}#overview`, label: "Overview" },
  { href: `${projectPath}#units`, label: "Units" },
  { href: `${projectPath}#payment`, label: "Payment" },
  { href: `${projectPath}#location`, label: "Location" },
  { href: `${projectPath}#advisor`, label: "Didin" },
];
const homeLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const onProject = pathname.startsWith(projectPath);
  const links = onProject ? projectLinks : homeLinks;
  const cta = { label: "Request brochure", title: undefined, intro: undefined, text: undefined };
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 500 && y > prev + 2 ? true : y < prev - 2 ? false : hidden);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.toggle("lenis-stopped", menu);
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menu ? "-100%" : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || menu ? "bg-ink/88 backdrop-blur-xl border-b border-white/8" : "bg-transparent"}`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 text-ivory" aria-label={`${site.name}, home`} onClick={() => setMenu(false)}>
            <Mark className="text-gold" />
            <span className="leading-none">
              <span className="display block text-[1.45rem] tracking-[0.01em]">Didin Dileep</span>
              {/* <span className="eyebrow mt-1 block text-[0.625rem] tracking-[0.34em] text-ivory/60">Triad Realty</span> */}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="link-u eyebrow text-[0.6875rem] tracking-[0.24em] text-ivory/80 hover:text-ivory">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/25 text-ivory transition hover:border-gold hover:text-gold sm:grid"
              aria-label="Chat with Didin on WhatsApp"
            >
              <WhatsApp />
            </a>
            <LeadButton source={onProject ? "header" : "site-header"} title={cta.title} intro={cta.intro} cta={cta.text} className="btn btn-gold hidden !min-h-11 !px-5 sm:inline-flex">
              {cta.label}
            </LeadButton>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center xl:hidden"
            >
              <span className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-7 bg-ivory transition-all duration-500 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-3 h-px w-7 bg-ivory transition-all duration-500 ${menu ? "top-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-[var(--gutter)] pb-10 pt-28"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={l.href} onClick={() => setMenu(false)} className="display block border-b border-white/10 py-3 text-[2.2rem] text-ivory">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 flex flex-col gap-3">
              <LeadButton source={onProject ? "menu" : "home-menu"} title={cta.title} intro={cta.intro} cta={cta.text} className="btn btn-gold w-full">
                {cta.label}
              </LeadButton>
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-line w-full">
                <WhatsApp /> WhatsApp Didin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
