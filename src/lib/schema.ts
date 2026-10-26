import { site } from "@/config/site";
import { project } from "@/content/project";

const abs = (p: string) => `${site.url}${p}`;
const sameAs = Object.values(site.social).filter(Boolean);

export const personId = abs("/#didin-dileep");
export const orgId = abs("/#triad-realty");
export const siteId = abs("/#website");

export function baseGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: "Didin Dileep",
        description: "Independent Dubai property investment advisory: commercial and luxury real estate, market data and investor briefings.",
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: "Founder, Triad Realty",
        description: "Property investment strategist for luxury and commercial investors in Dubai.",
        image: abs("/images/didin.webp"),
        url: site.url,
        telephone: site.phone,
        worksFor: { "@id": orgId },
        knowsAbout: ["Dubai commercial real estate", "Off-plan office investment", "Luxury property portfolios", "Sheikh Zayed Road offices"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "RealEstateAgent",
        "@id": orgId,
        name: site.company,
        url: site.url,
        telephone: site.phone,
        founder: { "@id": personId },
        areaServed: [{ "@type": "City", name: "Dubai" }, { "@type": "Country", name: "United Arab Emirates" }],
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        ...(site.email ? { email: site.email } : {}),
        ...(site.compliance.triadOrn ? { identifier: `RERA ORN ${site.compliance.triadOrn}` } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function projectListing() {
  const url = abs(`/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": ["WebPage", "RealEstateListing"],
    "@id": `${url}#listing`,
    url,
    name: `${project.name}, ${project.location}`,
    description: `${project.floors}-floor Grade A commercial tower with ${project.offices} freehold offices on Sheikh Zayed Road, Dubai. Pre-launch prices from AED ${project.priceFromPsf.toLocaleString("en-US")} per sq ft. Handover ${project.handover}.`,
    inLanguage: "en",
    isPartOf: { "@id": siteId },
    author: { "@id": personId },
    about: {
      "@type": "Place",
      name: project.name,
      address: { "@type": "PostalAddress", streetAddress: "Sheikh Zayed Road", addressLocality: "Dubai", addressCountry: "AE" },
      hasMap: project.mapsUrl,
      amenityFeature: ["Infinity pool", "Spa", "Gym", "Padel court", "Business lounge", "Co-working", "Ballroom", "Double-deck elevators"].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
    },
    primaryImageOfPage: { "@type": "ImageObject", url: abs("/images/tower-hero.webp") },
    image: abs("/images/tower-hero.webp"),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: project.smallestSqft * project.priceFromPsf,
      description: `Offices from ${project.smallestSqft.toLocaleString("en-US")} sq ft at AED ${project.priceFromPsf.toLocaleString("en-US")} to ${project.priceToPsf.toLocaleString("en-US")} per sq ft`,
      availability: "https://schema.org/PreOrder",
      seller: { "@id": orgId },
    },
  };
}
