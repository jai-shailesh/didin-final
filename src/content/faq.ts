import { project } from "@/content/project";
import { acquisition, aed, aedShort, yieldModel } from "@/lib/finance";

const core = acquisition(1077, project.entryPsf);
const low = yieldModel({ sqft: 1077, psf: project.entryPsf, rentPsf: 408, vacancyPct: 0 });
const high = yieldModel({ sqft: 1077, psf: project.entryPsf, rentPsf: 550, vacancyPct: 0 });

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is the price per sq ft at Christian A. Rockefeller Business Tower?",
    a: `The pre-launch range is AED ${aed(project.priceFromPsf)} to ${aed(project.priceToPsf)} per sq ft, with an entry reference of about AED ${aed(project.entryPsf)} per sq ft. Final pricing depends on the floor, size and position of each unit. For comparison, ready offices nearby average AED 4,803 per sq ft and off-plan offices average AED 5,378 per sq ft (January to October 2026).`,
  },
  {
    q: "What is the payment plan?",
    a: "The standard plan is 10% on signing, 10% after one month, 5% at months 15, 21, 27, 33, 39 and 45, and 50% on handover. A 4% DLD registration fee applies, and the 5% VAT is paid proportionately with each instalment instead of upfront.",
  },
  {
    q: "What does it cost on top of the purchase price?",
    a: `A 4% DLD registration fee and 5% VAT. For a 1,077 sq ft Core office at AED ${aed(project.entryPsf)} per sq ft, the price is about AED ${aedShort(core.price)} and the total including DLD and VAT is about AED ${aedShort(core.total)}. Agency, financing and legal costs are separate.`,
  },
  {
    q: "When is handover?",
    a: `Handover is expected in ${project.handover}, according to the developer. Off-plan dates can change, so treat it as an estimate and confirm it in the Sales and Purchase Agreement.`,
  },
  {
    q: "How many offices are there and what sizes are available?",
    a: "There are 332 offices: 124 Core offices (1,077 to 1,307 sq ft), 80 Medium (1,488 to 1,522 sq ft), 84 Premier (2,295 to 3,251 sq ft), 34 Half Floor (5,887 to 7,555 sq ft) and 10 Full Floor (11,541 to 13,400 sq ft). Mixed floors hold up to eight offices.",
  },
  {
    q: "What is the EOI and how do I register?",
    a: `The expression of interest opens on ${project.eoi.opensLabel} and costs AED ${aed(project.eoi.amount)} per unit. It is first come, first served and completed through the developer's official link. Didin can guide you through the steps and share the link. Refund and allocation terms are set by the developer, so ask for them in writing before you pay.`,
  },
  {
    q: "Is the tower freehold and who can buy?",
    a: "The developer lists the offices as freehold. Eligibility for individuals, non-residents and companies is confirmed at registration, so check your own case before paying an EOI.",
  },
  {
    q: "What is the service charge?",
    a: `The developer's estimate is AED ${project.serviceChargePsf} per sq ft per year. The final amount is determined and approved by the relevant authorities when the project is handed over.`,
  },
  {
    q: "What rental income can I expect?",
    a: `Nobody can promise a rent for a building that is not yet built. The calculator on this page starts at AED 408 per sq ft per year, the H1 2026 prime-office average in Dubai, and also shows AED 450, 500 and 550. For a 1,077 sq ft office at the entry price, the 408 and 550 cases model about ${low.netYield.toFixed(1)}% and ${high.netYield.toFixed(1)}% net on total acquisition cost, before vacancy, financing and agency fees. These are illustrations, not signed leases or forecasts.`,
  },
  {
    q: "Can I buy with a mortgage?",
    a: "Financing for off-plan offices varies by bank and by buyer profile. Didin can discuss options with you, but any mortgage is a separate decision between you and the lender.",
  },
  {
    q: "What amenities does the tower have?",
    a: "Five dedicated amenity levels: The Retreat (spa, sauna, steam and ice rooms, padel court and podium infinity pool), The Reset (fully equipped gym, studio and juice bar), The Exchange (business lounge, conference centre, co-working and podcast rooms) and The Observatory on level 87 (infinity pool, sky deck, ballroom and outdoor bar), plus a triple-height arrival lobby, on-site dining and retail, 23 elevators including 16 double-deck high-speed elevators, and 1,080 parking spaces.",
  },
  {
    q: "Who is the developer, who sells the offices, and who is Didin Dileep?",
    a: `The tower is developed by ${project.developer}, and ${project.salesAgent} handles exclusive sales and marketing. Didin Dileep is the founder of Triad Realty and an independent investment advisor. This is not the official project website, and expressions of interest are completed through the developer's official link.`,
  },
  {
    q: "How does Rockefeller Tower compare with Berkeley Business Tower?",
    a: "Rockefeller is priced at AED 4,000 to 4,600 per sq ft against an expected AED 4,500 to 5,000 for Berkeley, with 332 offices against 109, a lower estimated service charge (AED 18 against AED 24 per sq ft) and a later handover (Q2 2031 against Q3 2030). The full side-by-side is on the Berkeley vs Rockefeller page.",
  },
];
