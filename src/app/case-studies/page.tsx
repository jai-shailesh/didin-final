import type { Metadata } from "next";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { CaseCards } from "@/components/sections/CaseCards";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { FinalCta } from "@/components/sections/FinalCta";

const title = "Dubai Property Case Studies | Investor Outcomes and Current Launch";
const description = "Anonymised Dubai property investor outcomes and the current launch Didin Dileep is briefing on: Christian A. Rockefeller Business Tower on Sheikh Zayed Road. Request the brochure.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Dubai property case studies", "Dubai off-plan investor results", "Christian A. Rockefeller Business Tower", "Rockefeller Tower Dubai"],
  alternates: { canonical: "/case-studies" },
  openGraph: { type: "website", url: "/case-studies", title, description, images: [{ url: "/og/project.jpg", width: 1200, height: 630, alt: "Case studies and current launch" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/project.jpg"] },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: "/case-studies", inLanguage: "en" }} />
      <PageHero eyebrow="Case studies" title="Results, and the launch Didin is briefing on now" lead="Anonymised outcomes from Didin's investor network, and the current launch on Sheikh Zayed Road." image="/images/tower-clouds.webp" />
      <FeaturedProject eyebrow="Current launch" />
      <CaseCards id="outcomes" title="Investor outcomes" />
      <FinalCta home />
    </>
  );
}
