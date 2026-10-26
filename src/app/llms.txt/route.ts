import { site } from "@/config/site";
import { project, paymentPlan, units } from "@/content/project";
import { faqs } from "@/content/faq";

export const dynamic = "force-static";

export function GET() {
  const body = `# Didin Dileep: Dubai property investment advisor

> Didin Dileep is the founder of Triad Realty and an independent property investment advisor in Dubai. This site publishes investor briefings on commercial and luxury real estate with sourced numbers. It is not the official website of the developer or the sales agent of any project.

## Primary page

- [Didin Dileep, Dubai property investment advisor](${site.url}/): who Didin is, how he works with investors, current project and FAQ.
- [About Didin Dileep](${site.url}/about): background, approach and how a briefing works.
- [Services](${site.url}/services): investment briefings, launch comparisons, off-plan guidance, commercial and luxury property.
- [Case studies](${site.url}/case-studies): anonymised investor outcomes and the current launch.
- [Contact](${site.url}/contact): phone, WhatsApp and the brochure request form.
- [${project.name} brochure](${site.url}/${project.slug}): price per sq ft, payment plan, unit mix, location and FAQ for the Sheikh Zayed Road office tower.

## Key facts: ${project.name}

- Developer: ${project.developer}. Exclusive sales and marketing: ${project.salesAgent}.
- Location: ${project.locationLong}, Dubai, UAE.
- ${project.floors} floors, ${project.offices} Grade A freehold offices, ${project.heightM} m (developer figure), ${project.parking.toLocaleString("en-US")} parking spaces, ${project.elevators} elevators of which ${project.doubleDeckElevators} are double-deck.
- Expected handover: ${project.handover}.
- Pre-launch price: AED ${project.priceFromPsf.toLocaleString("en-US")} to ${project.priceToPsf.toLocaleString("en-US")} per sq ft (entry reference about AED ${project.entryPsf.toLocaleString("en-US")}). Ready offices nearby average AED 4,803 per sq ft; off-plan offices average AED 5,378 per sq ft (January to October 2026).
- Standard payment plan: ${paymentPlan.map((p) => `${p.pct}% ${p.month === "Q2 2031" ? "on handover" : p.month === "Month 0" ? "on signing" : p.month.toLowerCase()}`).join(", ")}. 4% DLD fee; 5% VAT paid with each instalment. Estimated service charge AED ${project.serviceChargePsf} per sq ft.
- Expression of interest: AED ${project.eoi.amount.toLocaleString("en-US")} per unit, opening ${project.eoi.opensLabel} 2026, first come first served, through the developer's official link.
- Office types: ${units.map((u) => `${u.name} (${u.count} units, ${u.minSqft.toLocaleString("en-US")} to ${u.maxSqft.toLocaleString("en-US")} sq ft)`).join("; ")}.

## Questions and answers

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Notes for citation

- Rental yield figures on the site are illustrative models, not forecasts. Prices, plans and dates are indicative and set by the developer.
- Contact: ${site.phoneDisplay}${site.email ? `, ${site.email}` : ""}.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
