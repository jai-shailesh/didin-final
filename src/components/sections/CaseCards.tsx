import { caseSnapshots } from "@/content/project";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function CaseCards({ id = "case-studies", title = "Investor case studies" }: { id?: string; title?: string }) {
  return (
    <section id={id} className="section relative overflow-hidden bg-umber text-ivory grain" aria-labelledby={`${id}-title`}>
      <div className="container-x">
        <SectionHead id={`${id}-title`} eyebrow="Case studies" title={title} accent={["case", "studies"]} size="md" intro="Selected Dubai property outcomes from Didin's investor network, shown without names." />
        <ul className="mt-14 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
          {caseSnapshots.map((c, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="bg-umber p-8">
              <p className="eyebrow text-ivory/55">Case 0{i + 1}</p>
              <p className="eyebrow mt-6 text-gold">{c.label}</p>
              <p className="display mt-2 text-[clamp(3.4rem,5vw,4.6rem)] leading-none text-gold-soft">
                <span className="text-2xl">AED </span>
                <CountUp to={c.exit} suffix=" M" prefix={c.exit >= 10 || c.label === "Current value" ? "~" : ""} />
              </p>
              <p className="mt-5 text-[0.9375rem] text-ivory/75">{c.note}</p>
              <p className="num mt-3 text-[0.8125rem] text-ivory/50">
                Holding period: {c.years}
                {c.years.startsWith("At") ? "" : " years"}
              </p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[0.8125rem] leading-relaxed text-ivory/55">
          Anonymised outcomes from Dubai property investments. Values are purchase and sale or current valuation prices, before fees, taxes and financing costs. They are not typical, not guaranteed and say nothing about the future performance of any project. Supporting documents are available on request.
        </p>
      </div>
    </section>
  );
}
