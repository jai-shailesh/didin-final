import Image from "next/image";
import { waLink, site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow, WhatsApp } from "@/components/ui/Icons";

/** Early trust band: who is explaining this tower and how to reach him. */
export function AdvisorStrip() {
  return (
    <section aria-label="Your advisor" className="bg-umber text-ivory">
      <div className="container-x grid items-center gap-8 py-12 md:grid-cols-[auto_1fr_auto] md:gap-12">
        <Reveal className="flex items-center gap-5">
          <span className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-full border border-gold/50">
            <Image src="/images/didin.webp" alt="Didin Dileep, Founder of Triad Realty" fill sizes="96px" className="object-cover object-[50%_18%]" />
          </span>
          <span>
            <span className="eyebrow block text-gold">Your advisor</span>
            <span className="display mt-2 block text-3xl">{site.name}</span>
            <span className="mt-1 block text-[0.875rem] text-ivory/65">{site.role}</span>
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="display max-w-2xl text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.15] text-ivory/95">
            I will walk you through the numbers, the plans and the risks, and tell you which unit sizes make sense for your goal.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <LeadButton source="advisor-strip" className="btn btn-gold">
            Get price list <Arrow />
          </LeadButton>
          <a href={waLink("Hi Didin, I would like a 15-minute call about the Rockefeller Tower.")} target="_blank" rel="noopener" className="btn btn-line">
            <WhatsApp /> Book a 15-minute call
          </a>
        </Reveal>
      </div>
    </section>
  );
}
