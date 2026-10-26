import { project } from "@/content/project";
import { aed } from "@/lib/finance";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";

const who = [
  {
    t: "Business owners",
    d: "Own the office you now rent, on Sheikh Zayed Road, with a payment plan that keeps half the price until handover. Prime towers charge AED 450 to 1,350 per sq ft per year in rent.",
    k: "Core, Medium and Premier",
  },
  {
    t: "Investors",
    d: "Entry below the ready and off-plan averages nearby, in a market where prime vacancy is 0.7%. Run the yield with your own rent assumption, and weigh it against delivery and market risk.",
    k: "Core and Medium for lower tickets",
  },
  {
    t: "Holding companies and family offices",
    d: "Half and full floors for a regional headquarters or a long-term holding. Only 44 half-floor and full-floor offices exist in the tower.",
    k: "Half Floor and Full Floor",
  },
];

const steps = [
  { t: "Get the price list", d: "Share your details. Didin sends floor plans, the payment plan and current availability on WhatsApp." },
  { t: "Speak with Didin", d: "A 15-minute call to set your goal, budget and preferred unit type, and to answer questions on the risks." },
  { t: "Choose your unit", d: "Shortlist offices by size and level, and confirm the exact price and payment schedule with the developer." },
  { t: "Register your EOI", d: `Pay the AED ${aed(project.eoi.amount)} EOI per unit through the developer's official link. It opens on ${project.eoi.opensLabel}, first come, first served.` },
];

export function Who() {
  return (
    <section id="who" className="section bg-ivory text-ink" aria-labelledby="who-title">
      <div className="container-x">
        <SectionHead id="who-title" tone="light" eyebrow="Who it suits" title="Built for owners, investors and holding companies" accent={["owners,"]} size="md" />
        <ul className="mt-16 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          {who.map((w, i) => (
            <Reveal as="li" key={w.t} delay={i * 0.08} className="group bg-ivory p-9 transition-colors duration-500 hover:bg-paper">
              <p className="display text-6xl text-gold-deep/70">0{i + 1}</p>
              <h3 className="display mt-8 text-3xl leading-tight">{w.t}</h3>
              <p className="mt-4 text-ink/75">{w.d}</p>
              <p className="eyebrow mt-8 text-[0.6875rem] text-ink/55">{w.k}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section id="how" className="section relative overflow-hidden bg-umber text-ivory grain" aria-labelledby="how-title">
      <div className="container-x">
        <SectionHead id="how-title" eyebrow="How booking works" title="From price list to EOI in four steps" accent={["EOI"]} size="md" />
        <ol className="mt-16 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 0.08} className="bg-umber p-8">
              <p className="display num text-6xl text-gold">0{i + 1}</p>
              <h3 className="display mt-8 text-3xl leading-tight">{s.t}</h3>
              <p className="mt-4 text-[0.9375rem] text-ivory/75">{s.d}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row">
          <LeadButton source="how-cta" className="btn btn-gold">
            Get the EOI steps and link <Arrow />
          </LeadButton>
        </Reveal>
        <p className="mt-6 max-w-3xl text-[0.8125rem] text-ivory/55">
          Expressions of interest and payments are made only through the developer&rsquo;s official channel, never to an individual. Refund and allocation terms are set by the developer; ask for them in writing before paying.
        </p>
      </div>
    </section>
  );
}
