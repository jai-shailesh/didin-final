import type { Metadata } from "next";
import { site } from "@/config/site";
import { services } from "@/content/site-content";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";

const title = "Dubai Property Investment Services | Briefings, Launch Comparisons, Off-Plan Guidance";
const description = "Investment briefings, launch comparisons, off-plan guidance and commercial office investment advice in Dubai from Didin Dileep, founder of Triad Realty. Request the brochure.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Dubai property investment services", "off-plan guidance Dubai", "Dubai office investment", "property investment adviser Dubai", "Dubai launch comparison"],
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "/services", title, description, images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Dubai property investment services by Didin Dileep" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dubai property investment services by Didin Dileep",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.title, description: s.long, provider: { "@id": `${site.url}/#triad-realty` }, areaServed: "Dubai, UAE" },
    })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero eyebrow="Services" title="Dubai property investment, made clear" lead="Five ways Didin works with investors. Every one starts with a short conversation and ends with numbers you can check.">
        <LeadButton source="services-hero" className="btn btn-gold">
          Request brochure <Arrow />
        </LeadButton>
      </PageHero>
      <ServicesGrid limit={5} detailed />
      <FinalCta home />
    </>
  );
}
