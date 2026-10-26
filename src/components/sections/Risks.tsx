import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const risks = [
  ["Delivery timing", "Handover is expected in Q2 2031. Construction schedules can move, and the 50% handover payment is due on completion."],
  ["Market cycles and supply", "Office prices and rents have risen strongly. New supply, demand shifts or financing conditions can change that."],
  ["Rent is an assumption", "No leases exist for a building that is not built. Rents in the calculator are assumptions, not forecasts."],
  ["Service charge is an estimate", "AED 18 per sq ft is the developer's estimate. The final amount is set by the authorities at handover."],
  ["Prices and plans can change", "Pricing, payment plans and unit availability are set by the developer and may change without notice."],
  ["Liquidity and resale rules", "Off-plan resale and assignment follow developer and regulator rules. Ask what applies before you commit."],
];

export function Risks() {
  return (
    <section id="risks" className="section-tight bg-ink text-ivory" aria-labelledby="risks-title">
      <div className="container-x">
        <div className="border border-gold/35 p-8 sm:p-14">
          <SectionHead id="risks-title" eyebrow="Read this before you commit" title="What to consider" size="md" intro="A good investment case includes the downside. These are the points Didin raises in every briefing." />
          <ul className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {risks.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 0.07}>
                <h3 className="display text-2xl text-gold-soft">{t}</h3>
                <p className="mt-3 text-[0.9375rem] text-ivory/75">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
