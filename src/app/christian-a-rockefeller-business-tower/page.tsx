import type { Metadata } from "next";
import { project } from "@/content/project";
import { faqs } from "@/content/faq";
import { breadcrumbs, faqSchema, projectListing } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { FactsStrip } from "@/components/sections/FactsStrip";
import { Overview } from "@/components/sections/Overview";
import { UnitExplorer } from "@/components/sections/UnitExplorer";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { AdvisorSection } from "@/components/sections/AdvisorSection";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

const path = `/${project.slug}`;
const pageFaqs = faqs.slice(0, 5);

const title = "Christian A. Rockefeller Business Tower, Dubai: Brochure, Price & Payment Plan";
const description = `87-floor Grade A freehold offices on Sheikh Zayed Road, Dubai. From AED 4,000 per sq ft, 10/10/30/50 payment plan, handover ${project.handover}. EOI opens ${project.eoi.opensLabel}. Request the brochure from Didin Dileep, Triad Realty.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Christian A. Rockefeller Business Tower", "Christian A Rockefeller Tower", "Rockefeller Tower Dubai", "Rockefeller Tower price", "Rockefeller Tower payment plan", "Rockefeller Tower Business Bay", "LMD Rockefeller Tower", "Sheikh Zayed Road offices for sale", "off-plan office Dubai", "LMD Dubai tower", "Dubai commercial property investment"],
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title,
    description,
    images: [{ url: "/og/project.jpg", width: 1200, height: 630, alt: "Christian A. Rockefeller Business Tower, Sheikh Zayed Road, Dubai" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/project.jpg"] },
};

export default function ProjectPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: project.shortName, path }])} />
      <JsonLd data={projectListing()} />
      <JsonLd data={faqSchema(pageFaqs)} />
      <Hero />
      <FactsStrip />
      <Overview />
      <UnitExplorer />
      <PaymentSection />
      <LocationSection />
      <AdvisorSection />
      <Faq items={pageFaqs} />
      <FinalCta />
    </>
  );
}
