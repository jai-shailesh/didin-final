import Image from "next/image";
import { site, waLink, telLink } from "@/config/site";
import { caseSnapshots } from "@/content/project";
import { CountUp } from "@/components/ui/CountUp";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow, Check, WhatsApp } from "@/components/ui/Icons";

const does = [
  "Clarify your goal: own use, rental income or capital growth",
  "Compare this launch with others using the same numbers",
  "Check the payment plan, total cost and risks for your unit",
  "Guide you through the EOI and registration steps",
];

export function AdvisorSection({ home = false }: { home?: boolean }) {
  return (
    <section id="advisor" className="section relative overflow-hidden bg-umber text-ivory grain" aria-labelledby="advisor-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ParallaxImage src="/images/didin.webp" alt="Didin Dileep, Founder of Triad Realty and Dubai property investment advisor" width={788} height={1212} sizes="(min-width:1024px) 40vw, 100vw" travel={4} className="aspect-[4/5] w-full max-w-md" imgClassName="object-[50%_14%]" />
        </div>

        <div className="lg:col-span-7">
          <SectionHead id="advisor-title" eyebrow="Your advisor" title="Didin Dileep, Founder of Triad Realty" accent={["Didin", "Dileep,"]} size="md" />
          <Reveal delay={0.1}>
            <p className="eyebrow mt-6 text-ivory/60">{site.descriptor}</p>
            <p className="lead mt-8 max-w-2xl text-ivory/85">
              Didin began in property management. International property expos then showed him a gap: strong demand from large investors for luxury property, and almost nobody covering that segment with real numbers. As founder of Triad Realty he now works as an investment strategist, helping investors review and build property portfolios in Dubai.
            </p>
            <p className="display mt-10 text-[clamp(1.8rem,3vw,2.6rem)] italic leading-tight text-gold-soft">Real Facts. Real Numbers. Real Office.</p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="eyebrow mt-12 text-ivory/60">What a briefing covers</h3>
            <ul className="mt-5 space-y-3">
              {does.map((d) => (
                <li key={d} className="flex gap-4 text-ivory/85">
                  <Check className="mt-1.5 shrink-0 text-gold" /> {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <LeadButton source={home ? "home-advisor" : "advisor-section"} title={home ? "Speak with Didin" : undefined} intro={home ? "Leave your name and WhatsApp number. Didin will message you personally." : undefined} cta={home ? "Request a call" : undefined} className="btn btn-gold">
              {home ? "Talk to Didin" : "Request brochure"} <Arrow />
            </LeadButton>
            <a href={waLink(home ? "Hi Didin, I would like to book a 15-minute call about Dubai property investment." : "Hi Didin, I would like to book a 15-minute call about the Rockefeller Tower.")} target="_blank" rel="noopener" className="btn btn-line">
              <WhatsApp /> Book a 15-minute call
            </a>
            <a href={telLink} className="btn btn-line">
              {site.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>

      {home ? (
      <div className="container-x mt-28">
        <Reveal>
          <p className="eyebrow text-gold">Selected investor outcomes</p>
          <h3 className="display h-md mt-5 max-w-3xl">Dubai property results from Didin&rsquo;s investor network</h3>
        </Reveal>
        <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
          {caseSnapshots.map((c, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="bg-umber p-8">
              <p className="eyebrow text-ivory/55">Case 0{i + 1}</p>
              <p className="eyebrow mt-6 text-gold">{c.label}</p>
              <p className="display mt-2 text-[clamp(3.4rem,5vw,4.6rem)] leading-none text-gold-soft">
                <span className="text-2xl">AED </span>
                <CountUp to={c.exit} suffix=" M" prefix={c.exit >= 10 ? "~" : c.label === "Current value" ? "~" : ""} />
              </p>
              <p className="mt-5 text-[0.9375rem] text-ivory/75">{c.note}</p>
              <p className="num mt-3 text-[0.8125rem] text-ivory/50">Holding period: {c.years}{c.years.startsWith("At") ? "" : " years"}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[0.8125rem] leading-relaxed text-ivory/55">
          Anonymised outcomes from Dubai property investments. Values are purchase and sale or current valuation prices, before fees, taxes and financing costs. They are not typical, not guaranteed and say nothing about the future performance of any project. Supporting documents are available on request.
        </p>
      </div>
      ) : null}
    </section>
  );
}
