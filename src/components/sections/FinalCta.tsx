import Image from "next/image";
import { project } from "@/content/project";
import { site, waLink, telLink } from "@/config/site";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { EoiBadge } from "@/components/ui/EoiBadge";
import { WhatsApp } from "@/components/ui/Icons";

type Props = { home?: boolean };

export function FinalCta({ home = false }: Props) {
  return (
    <section id="contact" className="section relative isolate overflow-hidden bg-ink text-ivory" aria-labelledby="contact-title">
      <Image src="/images/tower-clouds.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,12,10,0.95),rgba(14,12,10,0.7)),linear-gradient(0deg,#0e0c0a,transparent_40%)]" />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Reveal>
            {home ? <p className="eyebrow text-gold">Contact</p> : <EoiBadge />}
          </Reveal>
          <SplitHeading id="contact-title" text="Request the brochure and price list" accent={["brochure"]} className="display h-lg mt-8" />
          <Reveal delay={0.15}>
            <p className="lead mt-8 max-w-xl text-ivory/80">
              Leave your name and WhatsApp number. Didin sends the brochure and replies personally, usually within minutes.
            </p>
            <div className="mt-12 flex items-center gap-5 border-t border-white/15 pt-8">
              <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gold/50">
                <Image src="/images/didin.webp" alt="Didin Dileep" fill sizes="80px" className="object-cover object-[50%_16%]" />
              </span>
              <div>
                <p className="display text-3xl">{site.name}</p>
                <p className="text-[0.875rem] text-ivory/65">{site.role}</p>
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                  <a href={telLink} className="link-u num">{site.phoneDisplay}</a>
                  <a href={waLink()} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-2 text-gold-soft">
                    <WhatsApp width={16} height={16} /> WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="relative border border-white/15 bg-ink/65 p-8 backdrop-blur-2xl sm:p-10">
            <span className="absolute -top-px left-0 h-px w-24 bg-gold" aria-hidden="true" />
            <p className="eyebrow text-gold">{project.shortName}</p>
            <h3 className="display mt-4 text-[2.2rem] leading-[1.05]">Request the brochure</h3>
            <LeadForm source={home ? "home-contact" : "final"} className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
